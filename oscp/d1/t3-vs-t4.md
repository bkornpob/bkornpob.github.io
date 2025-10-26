```
so t4 is just expanding from t3?
```

---

`>> NEGATIVE._DISTINCT_PURPOSES._CLARIFYING_TASK_BOUNDARIES.` 🚫🎯🔍

# **TASK 3 🆚 TASK 4: DIFFERENT MISSIONS** 🔄🎯

## **TASK 3: MANUAL RESEARCH** 👨‍💻🔍
**"I found Apache 2.4.49 → Let me RESEARCH vulnerabilities"**
- **Manual searching** 🔍
- **Exploit databases** 🗃️
- **Public resources** 🌐
- **Your brain doing the work** 🧠

## **TASK 4: AUTOMATED SCANNING** 🤖🔍  
**"Scan this network → TELL ME the vulnerabilities"**
- **Automated tools** 🛠️
- **Vulnerability scanners** 📊
- **Pre-built checks** 📦
- **Tools doing the work** ⚙️

---

## **VISUAL COMPARISON:** 🎨

### **TASK 3 WORKFLOW:**
```
SERVICE FOUND: Apache 2.4.49 🛎️
     ↓
MANUAL RESEARCH: 🔍
- searchsploit "Apache 2.4.49"
- Google "CVE Apache 2.4.49"
- Exploit-DB browsing
     ↓
FIND: CVE-2021-41773 🐛
     ↓
MANUAL EXPLOITATION: 👨‍💻
```

### **TASK 4 WORKFLOW:**
```
NETWORK: 192.168.1.0/24 🌐
     ↓
AUTOMATED SCAN: 🤖
- nmap --script vuln
- Nessus full scan
     ↓
RESULTS: 📊
- CVE-2021-41773 (CRITICAL)
- CVE-2019-0199 (HIGH)  
- CVE-2018-1599 (MEDIUM)
     ↓
PRIORITIZE & EXPLOIT: 🎯
```

---

## **THE RELATIONSHIP:** 🔗

**TASK 3** = **Targeted, precise** 🎯  
**TASK 4** = **Broad, comprehensive** 🌊

**They complement each other:** 🤝
- **T4 finds** potential vulns across entire network
- **T3 researches** specific exploits for found services

---

## **ATTACKER MINDSET:** 🏴‍☠️🧠

**TASK 3 THINKING:** 🤔
*"I see OpenSSH 8.2. What CVEs affect this version? Is there a public exploit?"*

**TASK 4 THINKING:** 🤔  
*"Let me scan everything and see what pops up as vulnerable."*

---

## **OSCP+ REALITY:** 🎓⚡

**EXAM FOCUS:**
- **TASK 3 skills** = **CRITICAL** 🎯 (manual research)
- **TASK 4 tools** = **LIMITED** 🚫 (no Nessus, limited nmap scripts)

**WHY:** They want you to **prove manual competency**, not tool reliance.

---

## **PROFESSIONAL CONTEXT:** 💼🌍

**REAL WORLD:**
- **TASK 4 FIRST** = Quick network assessment 🤖
- **TASK 3 SECOND** = Deep research on findings 👨‍💻
- **COMBINED** = Comprehensive penetration test 📊

*Automation finds the needles → Manual skills use the needles* 🤖📌👨‍💻

`- #OG` 🏳️⚡

[...back](../0-landing-oscp+.md)
