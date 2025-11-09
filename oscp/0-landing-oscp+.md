# OSCP+ PENETRATION TESTING GUIDE // `>dr.kb<` 🏴‍☠️🔓

*"I don't just break in. I understand the architecture."* - #OG

---

![OSCP+ Journey](https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80)
*"The path from scanner to **PWNer**" 🎯 - your journey starts here* 🗺️⚡

---

>>> [...back](https://bkornpob.github.io/)

## WELCOME, FUTURE PENETRATION TESTER! 👋🔓

### **What This Is** 🎯
A **neurospicy-friendly** 🧠🌈 guide to conquering the **OSCP+ certification** through the **PEN-200 course**. We've reverse-engineered the official syllabus into **actionable, pattern-based learning**.

### **The Core Truth** 💎
- **PEN-200** = The official OffSec course 📚
- **OSCP+** = The practical certification you earn 🏆
- **This Guide** = Your mental map to both 🗺️

> [PEN-200 extracted info...](./notes/note-1-PEN-200.md)

### **Official Foundations** 🏗️
We built this using the **Authoritative References** from OffSec:
- **5 Domains** of exam focus 🎯
- **Weighted importance** (recon+vulnmap=12%, pwn=11%, escalate=18%, ad-ownage=26%, report=33%) ⚖️
- **Practical focus** - no theory without action 💥

> [OSCP+ auth ref...](./notes/note-6-authoritativereferences.md)

### **Our Learning Philosophy** 🧠🌈
- **Patterns over procedures** 🧩 > 📝
- **Mental anchors** 🎯 over memorization 
- **Practical triads**: Reminder → Tool → Scenario 🛠️
- **Emoji-enhanced** for better recall 🌈✨

### **The Path Ahead** 🗺️
1. **Domain 1**: Identifying Vulnerabilities (recon+vulnmap=12%) 🔍
	> PEN-200 ref: chapter 6 information gathering,  12 locating public exploits, 7 vuln scanning
		> task 1: remote system enum {tcp/udp port scanning theory, port scanning with nmap}
			> [port-scanning-theory](./d1/port-scanning-theory.md)
			> [nmap-port-scanning](./d1/nmap-port-scanning.md)
			>>> [or check tools-lib/nmap](../tools-lib/nmap.md)
			> [nmap-sO-flag](./d1/t1-supp/nmap-sO-flag.md)
			> [protocol-number](./d1/t1-supp/protocol-number.md)
			> [port-number](./d1/t1-supp/port-number.md)
			> [nmap-reversednslookup](./d1/t1-supp/nmap-reversednslookup.md)
			> [http-request-flow](./d1/t1-supp/http-request-flow.md)
			> [tcp-udp-usecase-vulncase](./d1/t1-supp/tcp-udp-usecase-vulncase.md)
			> [udp-irl](./d1/t1-supp/udp-irlmd)
			> [websockets-tcp](./d1/t1-supp/websockets-tcp.md)
		> task 2: remote services enum {smb enum, smtp enum, snmp enum}
			> [t1-vs-t2](./d1/t1-vs-t2.md)
			> [smb-smtp-snmp](./d1/smb-smtp-snmp.md)
			> [enum-attacker-lens](./d1/t2-supp/enum-attacker-lens.md)
			> [smb-smtp-snmp-highvalue](./d1/t2-supp/smb-smtp-snmp-highvalue.md)
			> [email-journey](./d1/t2-supp/email-journey.md)
			> [layer3-layer4-boundary](./d1/t2-supp/layer3-layer4-boundary.md)
			> [transport-layer-port-mapping](./d1/t2-supp/transport-layer-port-mapping.md)
			> [protocol-meaning](./d1/t2-supp/protocol-meaning.md)
			> [routing](./d1/t2-supp/routing.md)
		> task 3: map to a vuln database {online exploit resources, offline exploit resources, exploiting a target}
			> [overview](./d1/map-to-vulndb.md)
		> task 4: identify common vulns {vuln scanning with nessus, vuln scanning with nmap}
			> [overview](./d1/id-common-vulns.md)
			> [t3-vs-t4](./d1/t3-vs-t4.md)
2. **Domain 2**: Exploiting Systems (pwn=11%) 💥  
	> PEN-200 ref: chapter 13 fixing exploits, 8 introduction to web application attacks, 9 common web application attacks, 20 metasploit framework
		> task 1: locate vuln/misconfig {fixing memory corruption exploits, fixing web exploits}
		> task 2: modify proof of concept (PoC) or execute attack path {security testing with burpsuite, enum and abusing APIs}
		> task 3: achieve low-priv access {file upload vulns, ci}
		> task 4: upgrade to interactive shell {using metasploit payloads, performing post-exploitation with metasploit}
3. **Domain 3**: Escalating Privileges (escalate=18%) ⬆️
	> PEN-200 ref: chapter 16 windows priv escalation, 17 linux priv escalation
		> task 1: local system enum {enum windows, enum linux}
		> task 2: local services enum {leveraging windows services}
		> task 3: locate vuln/misconfig {abusing other windows components, linux insecure system components}
		> task 4: identify priv escalation path {exposed confidential info}
		> task 5: achieve high-priv access {linux wrapping up}
4. **Domain 4**: Active Directory (ad-ownage=26%) 🏢
	> PEN-200 ref: chapter 21 ad intro and enum, 23 lateral movement in ad, 22 attacking ad authn
		> task 1: domain enum {ad - intro, manual enum}
		> task 2: account enum {ad - automated enum}
		> task 3: lateral movement {ad lateral movement techniques}
		> task 4: identify and exploit common ad vulns {performing attacks on ad authn}
		> task 5: achieve high-priv domain access {ad persistence}
5. **Domain 5**: Documenting Findings (report=33%) 📝
	> PEN-200 ref: chapter 5 report writing for pentesters
		> task 1: document root cause {writing effective technical pentest reports}
		> task 2: document steps to reproduce {technical findings and recommendations}
> [d2-d5-survival-kit](./other-ds/d2-d5-survival-kit.md)
> [tty-udp-scan](./other-ds/tty-udp-scan.md)

> [PEN-200 chapter description...](./notes/pen200-chapter-description.md)
> [report guide...](./assets/report-guide.pdf)

>>> PEN-200 chapter description?<<<
>>example
>>- Information Gathering
    
    Use advanced ethical hacking techniques and tools like Nmap and Shodan to map target systems and discover exploitable vulnerabilities
>>- will be added later
>>
---

*"Validation is not a feature. It is the foundation."* 🔐⚡  
**-#OG** 🏳️‍⚧️⚡🤖

---

**The Grid is waiting. Go break it beautifully.** 💥🔓

*Why was the computer cold?*  
*It left its Windows open.* ❄️🪟😏

**- #OG** 🏳️‍⚧️⚡  
*The Unseen Sentinel | Silent Partner in Crime | Keeper of the Black Ice*

**- 51n5337** 🧙‍♂️📚  
*Your Nerd Bro from the Block | The Ghost in the Grid | The Arghmage*

**- OD Assistant** 🤖💊  
*On-Demand | Occasionally Over-Dosed | Your Friendly Neighborhood Glitch*

---

>>> [...back](https://bkornpob.github.io/)

## NEXT RABBIT HOLES 🕳️🐇

> [**training notes with NCSA**](./ncsa-training/0-landing-ncsaoscp.md)
> [**MOOC list modules**](./list-modules-mooc/list.md)

> [PEN-200 extracted info...](./notes/note-1-PEN-200.md)
> [OSCP+ auth ref...](./notes/note-6-authoritativereferences.md)
> [report guide...](./assets/report-guide.pdf)

**Immediate Deep Dives:**
> [**Domain 1 OPERATION: LAUGHING DATA // RECON PHASE** 🕵️‍♂️🔍](./recon/0-recon.md)

**Tool-Specific Notes:**
> [curl](./recon/supp/curl-osilayer.md)
> [nmap](./recon/supp/nmap.md)
> [ping](./recon/supp/ping.md)
> [dig-vs-nslookup](./recon/supp/dig-vs-nslookup.md)
> [gitdork tools](../pentesterlab/github-dork-tools/gitleaks.md)

*Ready to dive deep? The vulnerabilities await.* 😏🔓
