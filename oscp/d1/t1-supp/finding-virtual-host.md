```
VIRTUAL HOSTING: Web server magic 🎭🌐
(DNS doesn't show this!)

how to find out?
```

---

`>> ACKNOWLEDGED._VIRTUAL_HOST_DISCOVERY._WEB_RECON_TECHNIQUES.` 🌐🎯🔍

# **FINDING VIRTUAL HOSTS** 🕵️‍♂️🎭🌐

## **DNS WON'T HELP!** 🚫🌐
Virtual hosting = **Web server configuration** 🖥️⚙️

---

## **DISCOVERY METHODS:** 🛠️

### **1. HOST HEADER MANIPULATION** 🎭📨
```bash
curl -H "Host: admin.corp.com" http://192.168.1.100
curl -H "Host: dev.corp.com" http://192.168.1.100  
```
**Different content?** = **Virtual hosts!** ✅

### **2. VHOST ENUMERATION TOOLS** 🔧
```bash
ffuf -w wordlist.txt -u http://192.168.1.100 -H "Host: FUZZ.corp.com"
gobuster vhost -w wordlist.txt -u http://192.168.1.100
```

### **3. SSL CERTIFICATE INSPECTION** 🔒📜
```bash
openssl s_client -connect 192.168.1.100:443 | openssl x509 -text
```
**Multiple domain names** in cert = **Virtual hosts!** ✅

### **4. WEB CONTENT COMPARISON** 📊
```bash
# Different Host headers → different HTML?
curl -s http://192.168.1.100 | md5sum
curl -H "Host: admin" -s http://192.168.1.100 | md5sum
```
**Different hashes** = **Different sites!** ✅

---

## **WHY IT MATTERS:** 🎯
- **Admin portal** 🛡️ on same IP as main site
- **Test/Dev sites** 🧪 exposed
- **Different attack surfaces** 🎭

*DNS shows the building 🏢 | Virtual host scanning shows the rooms 🚪*

`- #OG` 🏳️⚡

---

```
for vhost, is it typical for x.taget.com to share the same ip for several x
```

---

`>> AFFIRMATIVE._SUBDOMAIN_VIRTUAL_HOSTING_PATTERN._COMMON_ARCHITECTURE.` ✅🌐🎯

# **VHOST TYPICAL PATTERNS** 🎭🌐

## **COMMON SCENARIOS:** 🏢

**SAME IP, DIFFERENT SUBS:**
```
192.168.1.100:
- www.target.com      🌐 (main site)
- admin.target.com    🛡️ (admin portal)  
- api.target.com      🔌 (API endpoint)
- dev.target.com      🧪 (development)
- mail.target.com     📧 (webmail)
```

**ORGANIZATIONAL:**
```
192.168.1.200:
- hr.corp.com         👥 (HR portal)
- finance.corp.com    💰 (accounting)
- it.corp.com         ⚙️ (IT services)
```

---

## **TYPICAL SUBS TO FUZZ:** 🎯

```
admin, api, dev, test, staging, mail, 
webmail, portal, secure, login, auth,
internal, private, legacy, old, backup
```

---

## **SECURITY IMPACT:** 🚨

**WEAKEST SUBDOMAIN** = **ACCESS TO ALL** 💥  
**Different codebases** = **Different vulns** 🎭

*One IP fortress 🏰 → Many subdomain doors 🚪*

`- #OG` 🏳️⚡

[...back](../../0-landing-oscp+.md)