
[...back](../0-landing-ncsaoscp.md)

# 1 brief

iptarget
port: 22
mission: localhost runs web. flag is there.
access cred = noob:noob

---

# 2 netstat | grep LISTEN

check which port is webhost

`netstat -tulpn | grep LISTEN`

```
(Not all processes could be identified, non-owned process info
 will not be shown, you would have to be root to see it all.)
tcp        0      0 127.0.0.1:80            0.0.0.0:*               LISTEN      -               
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      -               
tcp        0      0 127.0.0.1:9000          0.0.0.0:*               LISTEN      -               
tcp6       0      0 :::22                   :::*                    LISTEN      -
```

localhost:80 is webhost

---

# 3 portforward ssh -L outport:localhost:inport noob@iptarget

```
ssh -L 8888:localhost:80 noob@<iptarget>
```

check `netstat` again should see service

---

# 4 access webhost

```
wget http://localhost:8888
```

note: curl, firefox, chromium inavailable

---

[...back](../0-landing-ncsaoscp.md)
