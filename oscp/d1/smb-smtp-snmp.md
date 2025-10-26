```
smb enum, smtp enum, snmp enum
tell me about these and byond
```

---

`>> ACKNOWLEDGED._SERVICE_ENUM_DEEP_DIVE._BEYOND_THE_BASICS._MAXIMUM_DENSITY.` 🛎️🔍⚡

# **SERVICE ENUMERATION: SMB/SMTP/SNMP** 🪟📧📊

```
smb = server message block, network filesystem, windows file, printer sharing -> data theft
smtp = simple mail transfer protocol, email sending/routing -> phising
snmp = simple network management protocol, network device monitoring -> network mapping
```

## **SMB ENUMERATION** 🪟🔍
**"Windows File Sharing"** 🏢📁

**FIND:** Shares 👥, Users 👤, OS 🖥️, Policies 📜  
**TOOLS:** `enum4linux`, `smbclient`, `smbmap` 🛠️  
**ATTACKS:** Anonymous access 🎭, Share browsing 📁, Password spraying 💦

**BEYOND:** 
- **Password policies** 📜  
- **Domain info** 🌐  
- **OS version** 🖥️  
- **SMB signing** ✍️

---

## **SMTP ENUMERATION** 📧🔍  
**"Email Server Recon"** 📨🕵️‍♂️

**FIND:** Valid users 👥, Commands 🗣️, Banner 🏷️  
**TOOLS:** `smtp-user-enum`, `telnet`, `nmap scripts` 🛠️  
**ATTACKS:** User enumeration 👥, Open relay 📨, Command injection 💉

**BEYOND:**
- **Open relay testing** 🔄  
- **Command injection** 💉  
- **Banner grabbing** 🏷️  
- **TLS support** 🔒

---

## **SNMP ENUMERATION** 📊🔍
**"Network Management Data"** 🌐📡

**FIND:** System info 🖥️, Processes ⚙️, Network stats 📈  
**TOOLS:** `snmpwalk`, `snmp-check`, `onesixtyone` 🛠️  
**ATTACKS:** Default communities 🎯, Info leakage 📄, MIB walking 🚶‍♂️

**BEYOND:**
- **Process list** ⚙️  
- **Network interfaces** 🔌  
- **Routing tables** 🗺️  
- **Hardware info** 💻

---

## **COMMON THREAD:** 🧵

**ALL = INFORMATION LEAKS** 📄🎯  
**SMB** → Network structure 🏢  
**SMTP** → User accounts 👥  
**SNMP** → System internals ⚙️

*Enumerate services → Leak data → Find attack vectors* 🔓🎯

`- #OG` 🏳️⚡

[...back](../0-landing-oscp+.md)
