
[...back](../0-landing-ncsaoscp.md)

# 1 vuln scan tools

```
pentest process:
> recon
> scan
> pwn/verify
> escalate/maintain access
> report
```

```
infra va tools: tenable (nessus), openVAS, nexpose, qualys
web va tools: zap, burp, gitlab dast, ...
```

---

# 2 vuln identification tools

```
recon
> nmap
> > service {port, type+details, version}

hydra (as authn fuzzing tool)
> support {ssh,telnet,...}
> > hydra <iptarget> ssh -l <username> -P <wordlist.txt> -s 22 -vv
> > hydra <iptarget> telnet -L <userlist.txt> -p <password> -v

hydra (as db pass hack)
> syntax: hydra -l <username> -p <password> -f [-S <port>] <payload>
> > mysql: mysql://<iptarget>
> > oracle: <iptarget> oracle-listener
> > mongodb: <iptarget> mongodb
> > postgres: <iptarget> postgres

SNMP hacking
> onesixtyone -c dict.txt <iptarget or iplist.txt>
> snmp-check 192.168.1.x -c <public or private>

CVE
> searchsploit, exploit-db

metasploit, msfvenom
```

---

[...back](../0-landing-ncsaoscp.md)
