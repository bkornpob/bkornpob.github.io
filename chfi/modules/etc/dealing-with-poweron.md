```
how to deal with a power-on computer?
```

---

`>> ACKNOWLEDGED._LIVE_ACQUISITION_PROTOCOLS_ENGAGED._VOLATILE_EVIDENCE_PRIORITIZED.` 💻⚡🔍

# **DEALING WITH POWERED-ON COMPUTERS** ⚡💻🔒
*The most critical 60 seconds in digital forensics*

---

## **IMMEDIATE ACTIONS (FIRST 60 SECONDS)** ⏰🚨

### **1. ASSESS & DOCUMENT - DO NOT TOUCH KEYBOARD/MOUSE** 📸✋
- **Photograph the screen** from multiple angles
- **Record running applications**, open windows, error messages
- **Note system time** vs. actual time (timezone, accuracy)
- **Document network cables** - connected/disconnected?

### **2. VOLATILE DATA CAPTURE PRIORITY** 🧠💾
**Order of Volatility (Most to Least Critical):**
1. **RAM** (Random Access Memory) - **DISAPPEARS AT POWER OFF**
2. **Network Connections** - Active sessions, established connections
3. **Running Processes** - What's actually executing right now
4. **System Time** - Current time settings and timezone
5. **Logged-in Users** - Active user sessions
6. **Open Files** - What files are currently in use

---

## **LIVE ACQUISITION TOOLKIT** 🛠️🎒

### **MEMORY ACQUISITION TOOLS:**
- **Belkasoft Live RAM Capturer** (Windows)
- **Magnet RAM Capture** (Windows)  
- **FTK Imager Live** (Windows)
- **LiME** (Linux) - Loadable Kernel Module
- **Mac Memory Reader** (macOS)

### **VOLATILE DATA TOOLS:**
- **F-response** - Remote memory and disk access
- **Volatility** - Memory analysis (after acquisition)
- **Wireshark** - Network traffic capture
- **Netstat** - Active connections
- **PsList** - Running processes

---

## **STEP-BY-SEIZED PROCEDURE** 📋🔧

### **PHASE 1: RAPID EVIDENCE PRESERVATION** 🏃‍♂️💨

```
1. PLUG IN WRITE-BLOCKED EXTERNAL DRIVE
   ↓
2. RUN MEMORY CAPTURE TOOL
   ↓  
3. CAPTURE RUNNING PROCESSES & NETWORK CONNECTIONS
   ↓
4. DOCUMENT SYSTEM INFORMATION
   ↓
5. CAPTURE NETWORK TRAFFIC (if applicable)
```

**Commands to Run (Windows Example):**
```bash
# Capture RAM
Belkasoft_RAM_Capturer.exe -f C:\evidence\memory.mem

# Capture processes & connections
pslist.exe > C:\evidence\processes.txt
netstat -ano > C:\evidence\network.txt

# System info
systeminfo > C:\evidence\systeminfo.txt
```

### **PHASE 2: GRACEFUL SHUTDOWN vs. PULL PLUG** ⚡🔌

**Graceful Shutdown PREFERRED When:**
- Business-critical systems that can't afford corruption
- Encrypted drives that need proper unmounting
- Database servers with transactional integrity requirements

**Pull Plug REQUIRED When:**
- Active destruction/wiping detected
- Suspected anti-forensic malware running
- Full disk encryption that may lock on shutdown
- Immediate threat of data loss

**Decision Matrix:**
```
RISK OF DATA LOSS > RISK OF SYSTEM CORRUPTION → PULL PLUG
RISK OF SYSTEM CORRUPTION > RISK OF DATA LOSS → GRACEFUL SHUTDOWN
```

---

## **SPECIAL SCENARIOS** 🎯🔍

### **ENCRYPTED DRIVES (BitLocker, FileVault, LUKS)**
- **CAPTURE RAM FIRST** - Encryption keys may be in memory
- **Consider live acquisition** of entire disk while decrypted
- **Document recovery keys** if available from user/IT

### **ACTIVE NETWORK ATTACKS IN PROGRESS**
- **Capture network traffic** immediately
- **Document IP addresses**, ports, connections
- **Consider network isolation** but don't disconnect yet

### **REMOTE ACCESS/CLOUD SYSTEMS**
- **Take screenshots** of management consoles
- **Capture instance metadata**
- **Snapshot volumes** if cloud provider allows

---

## **DOCUMENTATION REQUIREMENTS** 📝⚖️

**Must Document:**
- **Exact time** of each action taken
- **Tools used** and their versions
- **Commands executed**
- **System state** before and after actions
- **Rationale** for shutdown method chosen

**Example Documentation:**
```
14:32 - Arrived at scene, computer powered on
14:33 - Photographed screen (see photos 1-3)
14:34 - Connected write-blocked USB drive
14:35 - Executed Belkasoft RAM capture
14:37 - Captured process list and network connections  
14:38 - Decision: Pull plug due to active wiping detected
14:38 - Power cord disconnected
14:39 - Bagged and tagged as evidence #2024-001
```

---

## **LEGAL CONSIDERATIONS** ⚖️🔐

**Search Warrant Limitations:**
- Some warrants specify "dead acquisition only"
- Live acquisition may exceed warrant scope
- When in doubt: **PRESERVE, DON'T ANALYZE**

**Corporate vs. Law Enforcement:**
- Corporate investigations have more flexibility
- Law enforcement must follow stricter protocols
- Always consult legal counsel for borderline cases

---

## **COMMON MISTAKES** ❌🚫

**What NOT to Do:**
- ❌ **Don't interact** with running applications
- ❌ **Don't close windows** or terminate processes
- ❌ **Don't browse files** or search the system
- ❌ **Don't let screensaver/sleep mode activate**
- ❌ **Don't connect to unknown networks**

**The Golden Rule:** **TOUCH NOTHING, DOCUMENT EVERYTHING**

---

`>> LIVE_ACQUISITION_PROTOCOLS_MASTERED._VOLATILE_EVIDENCE_PRESERVATION_OPTIMIZED.` ⚡💻✅

**Bottom Line:** A powered-on computer is both a treasure trove and a ticking time bomb. Your first moves determine whether you capture gold or get nothing but dust.

`- #OG` 🏳️⚡  
*The most volatile evidence is also the most valuable. Move fast, document faster, and let the memory tell its story before it forgets.* 🧠💨📝

---

```
and dealing with power-off computer?
```

---

`>> ACKNOWLEDGED._DEAD_ACQUISITION_PROTOCOLS_ENGAGED._NON-VOLATILE_EVIDENCE_PROCEDURES.` 💻🔌🔍

# **DEALING WITH POWERED-OFF COMPUTERS** 🔌💻🔒
*Methodical preservation of persistent evidence*

---

## **INITIAL ASSESSMENT & DOCUMENTATION** 📝🔍

### **1. SCENE DOCUMENTATION** 📸✏️
- **Photograph the entire setup** - computer, cables, peripherals
- **Label all connections** before disconnecting
- **Document physical condition** - damage, tampering, dust (indicates usage patterns)
- **Note make/model/serial numbers** of all devices

### **2. CONNECTION MAPPING** 🔌🗺️
- **Diagram all cables** and connections
- **Power sources** - UPS, power strips, battery backups
- **Network connections** - Ethernet, WiFi antennas
- **Peripheral connections** - USB devices, external drives, dongles

---

## **EQUIPMENT PREPARATION** 🛠️🎒

### **FORENSIC TOOLKIT:**
- **Write blockers** (hardware preferred) - Tableau, WiebeTech
- **Forensic imaging software** - FTK Imager, Guymager, dc3dd
- **Evidence bags** - anti-static, tamper-evident
- **Cable labels** and documentation materials
- **External storage** - clean, forensically prepared drives

### **HARDWARE WRITE BLOCKERS:**
- **Hardware write blockers** are **MANDATORY**
- **Types:** SATA, IDE, USB, NVMe, SAS
- **Verification:** Confirm write protection before connecting evidence

---

## **STEP-BY-STEP ACQUISITION PROCEDURE** 📋🔧

### **PHASE 1: PHYSICAL PRESERVATION** 🛡️📦

```
1. BAG AND TAG PERIPHERALS FIRST
   ↓
2. DOCUMENT AND DISCONNECT CABLES
   ↓  
3. TRANSPORT TO SECURE LAB ENVIRONMENT
   ↓
4. PHOTOGRAPH INTERNAL COMPONENTS
   ↓
5. CONNECT THROUGH WRITE BLOCKER
```

### **PHASE 2: FORENSIC IMAGING** 💾🔍

```
1. CONNECT EVIDENCE DRIVE → WRITE BLOCKER → FORENSIC WORKSTATION
   ↓
2. CAPTURE DRIVE INFORMATION (model, serial, size, firmware)
   ↓
3. CREATE FORENSIC IMAGE (bit-for-bit copy)
   ↓
4. VERIFY IMAGE INTEGRITY (hash verification)
   ↓
5. CREATE WORKING COPIES (for analysis)
```

---

## **IMAGING METHODS & TOOLS** 🛠️💽

### **FORENSIC IMAGING OPTIONS:**
- **Physical Image** - Bit-for-bit copy of entire drive (including unallocated space)
- **Logical Image** - Copy of active files and directories only
- **Sparse Image** - Copy of allocated data only (faster, smaller)

### **RECOMMENDED TOOLS:**
```bash
# Linux/Cross-platform
dc3dd if=/dev/sda of=evidence.img hash=sha256 log=evidence.log

# FTK Imager (Windows)
# GUI-based, court-accepted

# Guymager (Linux)  
# Fast, forensic-grade GUI imaging
```

### **HASH VERIFICATION:**
- **Take hashes BEFORE and AFTER** imaging
- **Use multiple algorithms** - MD5, SHA-1, SHA-256
- **Document all hashes** in evidence log

---

## **SPECIAL CONSIDERATIONS** 🎯⚠️

### **ENCRYPTED DRIVES:**
- **Check for TPM modules** or hardware encryption
- **Look for recovery keys** - BitLocker recovery documents, company IT
- **Consider cold boot attacks** if recently powered on (advanced technique)

### **DAMAGED DRIVES:**
- **Don't power on** visibly damaged drives
- **Use clean room** for physical recovery if needed
- **Consult data recovery specialists** for physically damaged media

### **RAID ARRAYS:**
- **Document drive order** and configuration
- **Image all members** simultaneously if possible
- **Preserve RAID controller** if hardware-based

---

## **DOCUMENTATION REQUIREMENTS** 📝⚖️

### **CHAIN OF CUSTODY:**
```
EVIDENCE: Computer System #2024-001
--------------------------------------------------------------------
DATE/TIME    | ACTION TAKEN           | HASH VERIFICATION
--------------------------------------------------------------------
2024-06-15 10:00 | Collected from scene  | N/A
2024-06-15 11:30 | Transported to lab    | N/A  
2024-06-15 12:00 | Write blocker connect | Source: a1b2c3...
2024-06-15 12:05 | Imaging started       | N/A
2024-06-15 14:30 | Imaging completed     | Image: a1b2c3... ✅
2024-06-15 14:35 | Evidence stored       | Secure locker #5
--------------------------------------------------------------------
```

### **TECHNICAL DOCUMENTATION:**
- **Drive specifications** - make, model, serial, capacity
- **Imaging software** and version used
- **Imaging speed** and any errors encountered
- **Hash values** for source and image

---

## **ANALYSIS PREPARATION** 🔍🧩

### **WORKING COPY CREATION:**
- **Never analyze original evidence**
- **Create forensic copies** for different analysis types
- **Maintain original evidence** in pristine condition

### **INITIAL ASSESSMENT:**
- **File system type** - NTFS, EXT4, APFS, etc.
- **Partition layout** - multiple OS, hidden partitions
- **Operating system** - version, installation date
- **User accounts** - created, last login times

---

## **COMMON MISTAKES TO AVOID** ❌🚫

### **CRITICAL ERRORS:**
- ❌ **Powering on without write blocker**
- ❌ **Booting to OS on evidence drive**
- ❌ **Modifying evidence drive contents**
- ❌ **Poor documentation of procedures**
- ❌ **Inadequate hash verification**

### **BEST PRACTICES:**
- ✅ **Always use write blockers**
- ✅ **Document every action**
- ✅ **Verify hashes at every stage**  
- ✅ **Maintain chain of custody**
- ✅ **Preserve original evidence**

---

## **LEGAL COMPLIANCE** ⚖️📜

### **WARRANT SCOPE:**
- Ensure imaging method complies with warrant
- Some warrants limit imaging to specific date ranges
- Document compliance with all legal requirements

### **PRIVACY CONSIDERATIONS:**
- Follow minimization principles
- Be prepared to justify full-disk imaging
- Consider privacy implications of comprehensive imaging

---

`>> DEAD_ACQUISITION_PROTOCOLS_MASTERED._NON-VOLATILE_EVIDENCE_PRESERVATION_OPTIMIZED.` 🔌💻✅

**Bottom Line:** A powered-off computer is a frozen crime scene. Your methodical approach determines whether you preserve the evidence intact or contaminate it beyond use.

`- #OG` 🏳️⚡  
*Dead acquisition requires living discipline. Every connection, every hash, every document entry builds the case that cannot be broken.* 🔗🔒⚖️

---

```
and dealing with networked computers?
```

---

`>> ACKNOWLEDGED._NETWORK_FORENSIC_PROTOCOLS_ENGAGED._DISTRIBUTED_EVIDENCE_COLLECTION.` 🌐💻🔍

# **DEALING WITH NETWORKED COMPUTERS** 🌐💻🔗
*When the crime scene spans multiple systems and connections*

---

## **INITIAL NETWORK ASSESSMENT** 🗺️🔍

### **1. NETWORK TOPOLOGY MAPPING** 🌐✏️
- **Identify all connected devices** - servers, workstations, IoT, network gear
- **Map physical and logical connections** - switches, routers, VLANs
- **Document network segmentation** - DMZ, internal networks, wireless
- **Identify critical infrastructure** - domain controllers, file servers, databases

### **2. NETWORK ACCESS CONTROL** 🔐🚫
- **Disconnect from external networks** but maintain internal connectivity
- **Block inbound/outbound internet access** while preserving internal evidence
- **Preserve network state** for connection analysis
- **Consider mirror ports** on switches for traffic capture

---

## **PRIORITIZATION STRATEGY** 🎯⚡

### **EVIDENCE VOLATILITY HIERARCHY:**
```
1. ACTIVE NETWORK CONNECTIONS (most volatile)
2. MEMORY/RAM across all systems
3. LOG FILES (constantly updating)
4. NETWORK DEVICE CONFIGURATIONS
5. DISK EVIDENCE (least volatile)
```

### **TRIAGE ORDER:**
1. **Domain controllers** (authentication logs)
2. **File servers** (access logs, shared data)
3. **Security systems** (SIEM, IDS/IPS, firewalls)
4. **User workstations** (endpoint evidence)
5. **Network infrastructure** (switches, routers)

---

## **SIMULTANEOUS ACQUISITION PROTOCOLS** ⏰🔧

### **COORDINATED TEAM APPROACH:**
```
TEAM A: NETWORK EVIDENCE
  ↓
• Capture network traffic (packet capture)
• Document active connections
• Preserve network device configurations

TEAM B: SERVER EVIDENCE  
  ↓
• Live acquisition of critical servers
• Memory capture of domain controllers
• Log collection from central repositories

TEAM C: ENDPOINT EVIDENCE
  ↓
• Coordinate workstation acquisition
• Prioritize based on user roles/access
• Live RAM capture where possible
```

---

## **NETWORK-SPECIFIC EVIDENCE SOURCES** 📡📊

### **NETWORK DEVICES:**
- **Firewall logs** - allowed/denied connections, NAT translations
- **Switch logs** - MAC address tables, port security
- **Router logs** - routing tables, ACL hits
- **Wireless controllers** - association logs, location data

### **NETWORK TRAFFIC:**
- **Packet captures** - full traffic for critical segments
- **NetFlow/sFlow data** - traffic patterns and volumes
- **DNS query logs** - domain resolution history
- **Proxy server logs** - web browsing history

### **AUTHENTICATION SYSTEMS:**
- **Active Directory logs** - logon/logoff events
- **RADIUS/TACACS+ logs** - network device authentication
- **VPN concentrator logs** - remote access patterns
- **Multi-factor auth logs** - access attempts and successes

---

## **LIVE NETWORK ACQUISITION TECHNIQUES** 🌐💾

### **PACKET CAPTURE METHODS:**
```bash
# Network tap or span port
tcpdump -i eth0 -w evidence.pcap

# Multiple interfaces simultaneously
tcpdump -i any -w full_capture.pcap

# With specific filters
tcpdump -i eth0 -w http_traffic.pcap port 80 or port 443
```

### **NETWORK DEVICE PRESERVATION:**
```bash
# Cisco devices
show running-config
show logging
show interfaces
show arp
show mac address-table

# Export configurations via TFTP/SCP
copy running-config tftp://192.168.1.100/router-config.txt
```

### **CENTRALIZED LOG COLLECTION:**
- **SIEM export** - security event and incident management systems
- **Syslog servers** - centralized log aggregation
- **Database dumps** - application and transaction logs
- **Cloud logging** - AWS CloudTrail, Azure Monitor, GCP Logging

---

## **CHAIN OF CUSTODY COMPLEXITIES** ⛓️🌐

### **DISTRIBUTED EVIDENCE TRACKING:**
```
EVIDENCE MASTER LOG:
• Network captures - timestamps, interfaces, filters
• Device configurations - make, model, serial numbers  
• Server images - hashes, acquisition methods
• Log files - sources, time ranges, collection methods

INDIVIDUAL CHAINS:
• Each physical device
• Each logical evidence collection
• Each network capture session
```

### **SYNCHRONIZATION CHALLENGES:**
- **Time synchronization** across all systems (NTP sources)
- **Evidence correlation** between multiple sources
- **Dependency mapping** - which evidence relates to which

---

## **SPECIAL NETWORK SCENARIOS** 🎯⚠️

### **DOMAIN COMPROMISE:**
- **Acquire all domain controllers** simultaneously
- **Check for Golden Ticket attacks** - unusual Kerberos activity
- **Examine trust relationships** with other domains
- **Capture Group Policy objects** and replication data

### **LATERAL MOVEMENT EVIDENCE:**
- **RDP connections** - Event ID 4624 (logon type 10)
- **PSExec usage** - Service creation events
- **WMI connections** - Windows Management Instrumentation logs
- **SMB file access** - unauthorized share access

### **CLOUD/HYBRID ENVIRONMENTS:**
- **API call logging** - AWS CloudTrail, Azure Activity Log
- **Virtual network flows** - NSG flow logs, VPC flow logs
- **Identity and access logs** - Azure AD, AWS IAM
- **Container orchestration** - Kubernetes, Docker logs

---

## **ANALYSIS CORRELATION** 🔗🧩

### **CROSS-DEVICE TIMELINE:**
```
ATTACK TIMELINE RECONSTRUCTION:
1. Initial compromise (firewall logs + endpoint logs)
2. Internal reconnaissance (network scans + local logs)  
3. Lateral movement (multiple system logs + network traffic)
4. Data exfiltration (outbound traffic + file access logs)
5. Persistence establishment (registry + scheduled tasks + services)
```

### **EVIDENCE TRIANGULATION:**
- **Network + Endpoint + Application logs**
- **Multiple independent sources** confirming same activity
- **Converging timelines** from different systems

---

## **DOCUMENTATION REQUIREMENTS** 📝🌐

### **NETWORK SPECIFIC DOCUMENTATION:**
- **Network diagrams** - before and after incident
- **Device inventory** - all networked systems with roles
- **Acquisition log** - what was collected from where and when
- **Time synchronization** - all system clocks and time sources

### **CORRELATION MATRICES:**
```
EVIDENCE CORRELATION MATRIX:
Source        | Time Range    | Related Evidence
------------- | ------------- | -----------------
Firewall Logs | 14:00-15:00   | DC logs, PCAP
DC Security   | 14:15-14:30   | Workstation logs, Firewall
Workstation   | 14:20-14:45   | File server, DNS logs
```

---

## **COMMON PITFALLS** 🕳️🚫

### **NETWORK INVESTIGATION ERRORS:**
- ❌ **Changing network topology** during investigation
- ❌ **Missing time synchronization** between systems
- ❌ **Overlooking network device evidence**
- ❌ **Failing to capture volatile network state**
- ❌ **Inadequate logging from critical systems**

### **BEST PRACTICES:**
- ✅ **Preserve network state** before making changes
- ✅ **Sync all system clocks** to common time source
- ✅ **Capture network traffic** early and often
- ✅ **Document network topology** thoroughly
- ✅ **Coordinate multi-system acquisition**

---

`>> NETWORK_FORENSIC_PROTOCOLS_MASTERED._DISTRIBUTED_EVIDENCE_COLLECTION_OPTIMIZED.` 🌐💻✅

**Bottom Line:** Networked computers require thinking in systems, not just devices. The evidence exists in the connections between them as much as in the devices themselves.

`- #OG` 🏳️⚡  
*In a networked world, the truth is distributed. Your job is to trace the connections and reconstruct the conversation between machines.* 🔍🌐🔗

---

```
dealing with open files and startup files
```

---

`>> ACKNOWLEDGICALED._OPEN_FILE_AND_STARTUP_ANALYSIS_ENGAGED._PERSISTENCE_AND_RUNTIME_ARTIFACTS.` 📂🔍⚡

# **DEALING WITH OPEN FILES & STARTUP FILES** 📂🚀🔍
*Finding what's running now and what wants to run later*

---

## **OPEN FILES ANALYSIS** 📂🔓

### **WHY OPEN FILES MATTER:**
- **Live evidence** of current system activity
- **Malware detection** - hidden or locked files
- **User activity** - what they were doing when seized
- **Data theft evidence** - files being copied or accessed

### **METHODS TO IDENTIFY OPEN FILES:**

#### **WINDOWS:**
```cmd
# Handle utility (Sysinternals)
handle.exe -a > open_files.txt

# OpenFiles command
openfiles /query /fo table

# Process Explorer (Sysinternals)
# GUI - shows files open by each process

# PowerShell
Get-Process | ForEach-Object { $_.Modules } | Select-Object FileName
```

#### **LINUX/MAC:**
```bash
# List all open files
lsof > open_files.txt

# Open files by specific process
lsof -p <PID>

# Files opened by network connections
lsof -i

# Deleted files still held open
lsof +L1
```

### **FORENSIC SIGNIFICANCE:**
- **Encrypted files** may be open in decrypted state
- **Temporary files** created by applications
- **Browser cache** - active browsing sessions
- **Database files** - transaction logs and open connections

---

## **STARTUP FILES & PERSISTENCE MECHANISMS** 🚀🔍

### **COMMON STARTUP LOCATIONS:**

#### **WINDOWS STARTUP:**
```
REGISTRY:
• HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Run
• HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Run  
• HKLM\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Run
• HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\RunOnce

FILE SYSTEM:
• C:\ProgramData\Microsoft\Windows\Start Menu\Programs\StartUp
• C:\Users\[Username]\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup
• C:\Windows\System32\Tasks (Scheduled Tasks)

SERVICES:
• HKLM\SYSTEM\CurrentControlSet\Services
```

#### **LINUX STARTUP:**
```bash
# Systemd services
/etc/systemd/system/
/usr/lib/systemd/system/
systemctl list-unit-files --type=service

# Init scripts  
/etc/init.d/
/etc/rc.local

# Cron jobs
/etc/crontab
/etc/cron.*/*
crontab -l -u [username]

# User autostart
~/.config/autostart/
~/.bashrc, ~/.profile
```

#### **MAC STARTUP:**
```bash
# Launch Agents/Daemons
~/Library/LaunchAgents/
/Library/LaunchAgents/
/Library/LaunchDaemons/

# Login items
osascript -e 'tell application "System Events" to get login items'

# Cron/Launchd
crontab -l
launchctl list
```

### **ANALYSIS TOOLS:**

#### **AUTORUNS (SYSTEMERNALS):**
- **Comprehensive startup enumeration**
- **Compares against known good hashes**
- **Shows hidden and masked entries**
- **Command line:** `autorunsc.exe -a -c -h -s > startup_analysis.txt`

#### **POWERSHELL SCRIPTS:**
```powershell
# Get all startup items
Get-CimInstance Win32_StartupCommand | Select-Object Name, Command, User

# Scheduled tasks
Get-ScheduledTask | Where-Object {$_.State -eq "Ready"}

# Services
Get-Service | Where-Object {$_.StartType -eq "Automatic"}
```

---

## **FORENSIC ANALYSIS APPROACH** 🔍🧩

### **1. LIVE ANALYSIS (IF SYSTEM RUNNING):**
```bash
# Capture current state immediately
# Windows:
handle.exe -a > live_open_files.txt
autorunsc.exe -a > live_startup.txt

# Linux:
lsof > live_open_files.txt  
ps aux > running_processes.txt
systemctl list-unit-files > services.txt
```

### **2. DEAD ANALYSIS (FROM IMAGE):**

#### **WINDOWS REGISTRY ANALYSIS:**
- **Analyze SOFTWARE hive** for Run keys
- **Examine SYSTEM hive** for services
- **Check USER hives** for user-specific startup items
- **Parse Scheduled Tasks** in C:\Windows\System32\Tasks

#### **FILE SYSTEM ANALYSIS:**
- **Startup folders** contents and timestamps
- **Service executables** and their metadata
- **Scheduled task XML files**
- **Browser extension directories**

### **3. MALWARE PERSISTENCE INDICATORS:** 🦠🎯

#### **COMMON MALWARE TECHNIQUES:**
- **Registry Run keys** with unusual paths or names
- **Scheduled tasks** with random or misspelled names
- **Service installations** with fileless techniques
- **WMI event subscriptions** for persistence
- **COM hijacking** of legitimate components

#### **RED FLAGS:**
- **Executables in temp directories** set to run at startup
- **Scripts (.vbs, .ps1) in startup locations**
- **Services with no description or company name**
- **Scheduled tasks running as SYSTEM with unusual triggers**

---

## **DOCUMENTATION & EVIDENCE** 📝⚖️

### **EVIDENCE COLLECTION:**
```
STARTUP ANALYSIS REPORT:
• Date/Time of analysis
• System state (live/dead acquisition)
• Tools used and versions
• Complete list of startup items
• File hashes of startup executables
• Registry keys and values
• Suspicious items flagged for further analysis
```

### **CHAIN OF CUSTODY:**
- **Document analysis methodology**
- **Preserve original startup files** if extracting from live system
- **Hash all analyzed components**
- **Maintain analysis logs**

---

## **ADVANCED TECHNIQUES** 🧠🔧

### **MEMORY ANALYSIS INTEGRATION:**
- **Correlate running processes** with startup items
- **Check for process hollowing** or code injection
- **Analyze loaded DLLs** against startup entries

### **TIMELINE ANALYSIS:**
- **Correlate startup item creation** with incident timeline
- **Check file creation times** against known compromise window
- **Analyze prefetch files** for execution evidence

### **BEHAVIORAL ANALYSIS:**
- **Monitor what actually executes** at startup vs. what's configured
- **Check for race conditions** or conditional execution
- **Analyze dependency chains** between startup items

---

## **COMMON INVESTIGATION SCENARIOS** 🎯🔍

### **INCIDENT RESPONSE:**
1. **Identify persistence mechanisms** used by attackers
2. **Determine initial infection vector** through startup analysis
3. **Find all compromised systems** with similar startup modifications
4. **Develop eradication procedures** to remove all persistence

### **COMPLIANCE AUDITING:**
1. **Verify authorized software** in startup locations
2. **Check for unauthorized changes** to startup configuration
3. **Document all auto-starting applications** for security review
4. **Identify shadow IT** or unauthorized software installations

---

`>> OPEN_FILE_STARTUP_ANALYSIS_MASTERED._PERSISTENCE_DETECTION_OPTIMIZED._RUNTIME_ARTIFACTS_DOCUMENTED.` 📂🚀✅

**Bottom Line:** Startup files tell you what wants to happen next, while open files tell you what's happening right now. Together, they reveal both current compromise and future persistence.

`- #OG` 🏳️⚡  
*Malware lives in the spaces between shutdown and startup. Find what's waiting to wake up, and you'll find the infection that never truly left.* 🦠🛌🔍

---

```
dealing with smartphones or other handheld devices
```

---

`>> ACKNOWLEDGED._MOBILE_FORENSIC_PROTOCOLS_ENGAGED._HANDHELD_DEVICE_SPECIAL_CONSIDERATIONS.` 📱🔍⚡

# **DEALING WITH SMARTPHONES & HANDHELD DEVICES** 📱🔒🔍
*Where personal meets digital evidence*

---

## **IMMEDIATE ACTIONS - FIRST 60 SECONDS** ⏰🚨

### **1. ISOLATE THE DEVICE** 📱📶
- **Faraday bag/immediately** - prevents remote wipe, network contamination
- **Airplane mode NOT sufficient** - use proper RF shielding
- **If no Faraday bag**: aluminum foil, metal container (emergency only)

### **2. PRESERVE POWER STATE** 🔋⚡
- **Do NOT power off** if on - may activate encryption, lose volatile data
- **Do NOT power on** if off - may require passcode, trigger encryption
- **Maintain current charge** - use portable power bank if needed

### **3. DOCUMENT PHYSICAL STATE** 📸✏️
- **Photograph device** from all angles
- **Note screen content** if visible (notifications, apps, time)
- **Document connections** - cables, peripherals, SIM card status
- **Record device info** - make, model, carrier, physical damage

---

## **DEVICE CATEGORIZATION & RISK ASSESSMENT** 🎯⚠️

### **BY PLATFORM:**
- **iOS** - Generally secure, hardware encryption, limited access
- **Android** - Varies by manufacturer, version, customization
- **Other** - Windows Phone, legacy devices, specialized equipment

### **BY SECURITY STATUS:**
```
HIGH RISK (Encrypted, Locked):
• iOS 8+ with passcode
• Android 6+ with full-disk encryption
• Hardware-level security (Secure Element)

MEDIUM RISK (Locked but vulnerable):
• Older Android versions
• Weak lock screens (pattern, swipe)
• Jailbroken/rooted devices

LOW RISK (Accessible):
• No lock screen
• Known passcodes
• Legacy/unencrypted devices
```

---

## **ACQUISITION METHODS HIERARCHY** 💾🔓

### **1. PHYSICAL ACQUISITION** 🥇🔧
- **Bit-for-bit copy** of entire storage
- **Bypasses lock screens** (when possible)
- **Requires specialized tools** and expertise
- **Most forensically sound** when available

### **2. LOGICAL ACQUISITION** 🥈📁
- **File system level** extraction
- **Accessible data** through APIs
- **Faster, less invasive**
- **May miss deleted data**

### **3. MANUAL EXTRACTION** 🥉👆
- **Screen recording/photography**
- **Manual navigation** through device
- **Least forensically sound**
- **Last resort** option

---

## **TOOL ECOSYSTEM** 🛠️📱

### **COMMERCIAL FORENSIC TOOLS:**
- **Cellebrite UFED** - Industry standard, extensive device support
- **MSAB XRY** - Strong mobile focus, good reporting
- **Oxygen Forensic Detective** - Cloud integration, advanced analytics
- **Magnet AXIOM** - Integrated mobile/computer forensics

### **OPEN SOURCE OPTIONS:**
- **ADB (Android Debug Bridge)** - For unlocked Android devices
- **libimobiledevice** - iOS communication library
- **Santoku Linux** - Mobile forensics distribution
- **Mobile Verification Toolkit** - iOS-specific forensics

### **HARDWARE REQUIREMENTS:**
- **Write blockers** for external storage
- **Faraday equipment** - bags, boxes, rooms
- **Cable collection** - various connectors and adapters
- **Portable power** - maintain device state during acquisition

---

## **PLATFORM-SPECIFIC PROCEDURES** 🎯🔧

### **iOS DEVICES:**
```
CHALLENGES:
• Hardware encryption (Secure Enclave)
• Limited physical access
• Increasing security with each version

ACQUISITION OPTIONS:
1. iTunes backup extraction (if backup exists)
2. iCloud extraction (legal process required)
3. Jailbreak required for physical (becoming harder)
4. Passcode brute force (hardware solutions)

EVIDENCE SOURCES:
• iTunes backups
• iCloud data
• Connected computers (pairing records)
• Peripheral devices (Apple Watch, AirPods)
```

### **ANDROID DEVICES:**
```
CHALLENGES:
• Fragmentation (manufacturer modifications)
• Varying encryption implementations
• Root access requirements for physical

ACQUISITION OPTIONS:
1. ADB backup (if enabled)
2. Manufacturer-specific tools
3. Rooting for physical access
4. Bootloader exploitation

EVIDENCE SOURCES:
• Google account data
• Manufacturer cloud services
• SD card contents
• App-specific data stores
```

---

## **CLOUD & EXTERNAL EVIDENCE** ☁️🔍

### **MOBILE CLOUD SERVICES:**
- **Apple iCloud** - backups, photos, documents
- **Google Account** - contacts, location history, app data
- **Manufacturer clouds** - Samsung, Huawei, Xiaomi
- **App-specific clouds** - WhatsApp, Telegram, social media

### **LEGAL CONSIDERATIONS:**
- **Search warrants** for cloud data
- **Terms of service** vs. legal authority
- **Jurisdictional issues** with international providers
- **Preservation letters** to prevent data destruction

---

## **SPECIALIZED EVIDENCE TYPES** 📊🎯

### **LOCATION DATA:**
- **GPS logs** - navigation apps, system services
- **Cell tower connections** - historical location tracking
- **WiFi positioning** - network association history
- **Geotagged media** - photos, videos, messages

### **APPLICATION DATA:**
- **Social media** - messages, posts, connections
- **Communication apps** - WhatsApp, Signal, Telegram
- **Financial apps** - banking, cryptocurrency, payments
- **Health data** - fitness trackers, medical apps

### **SYSTEM ARTIFACTS:**
- **Call logs** and connection history
- **SMS/MMS messages** (carrier and device copies)
- **Browser history** and search queries
- **App usage statistics** and installation history

---

## **CHAIN OF CUSTODY CONSIDERATIONS** ⛓️📱

### **MOBILE-SPECIFIC DOCUMENTATION:**
```
DEVICE INFORMATION:
• IMEI/MEID/ESN numbers
• SIM card ICCID
• Carrier information
• Serial numbers

ACQUISITION DETAILS:
• Faraday method used
• Power state preserved
• Tools and methods employed
• Cloud data requests made
```

### **EVIDENCE INTEGRITY:**
- **Hash device storage** when possible
- **Document extraction methods**
- **Preserve original device** unchanged
- **Maintain RF isolation** during analysis

---

## **COMMON PITFALLS & BEST PRACTICES** 🚫✅

### **CRITICAL ERRORS:**
- ❌ **Connecting to networks** without isolation
- ❌ **Accepting system updates** during analysis
- ❌ **Inadequate RF shielding** leading to remote wipe
- ❌ **Poor cable management** causing data loss
- ❌ **Ignoring cloud evidence** sources

### **BEST PRACTICES:**
- ✅ **Always use Faraday protection**
- ✅ **Maintain device power state**
- ✅ **Document everything** before touching
- ✅ **Extract cloud data** when legally permissible
- ✅ **Use multiple tools** for verification

---

## **EMERGING CHALLENGES** 🆕⚠️

### **MODERN SECURITY FEATURES:**
- **Hardware-level encryption** with secure elements
- **Biometric authentication** that can't be bypassed
- **Remote wipe capabilities** via cloud services
- **Ephemeral messaging** with auto-deletion

### **SPECIALIZED DEVICES:**
- **Wearables** - Apple Watch, Fitbit, smart glasses
- **IoT devices** - smart home assistants, connected appliances
- **Vehicle systems** - infotainment, telematics
- **Medical devices** - pacemakers, insulin pumps

---

`>> MOBILE_FORENSIC_PROTOCOLS_MASTERED._HANDHELD_DEVICE_ACQUISITION_OPTIMIZED._MODERN_CHALLENGES_ADDRESSED.` 📱🔍✅

**Bottom Line:** Mobile devices are personal, connected, and constantly evolving. Your approach must be equally dynamic, respecting both the technical challenges and privacy implications.

`- #OG` 🏳️⚡  
*The most personal devices often hold the most revealing evidence. Treat them with the care their sensitivity demands, and the truth will emerge from the pocket-sized crime scene.* 👁️📱🔍

---

```
shutdown procedure
```

---

`>> ACKNOWLEDGED._SHUTDOWN_PROCEDURE_ANALYSIS_ENGAGED._SYSTEM_STATE_PRESERVATION_PROTOCOLS.` 🔌💻🔍

# **SHUTDOWN PROCEDURES IN DIGITAL FORENSICS** 🔌💻⚖️
*The critical decision: graceful shutdown vs. pull-the-plug*

---

## **THE FUNDAMENTAL DECISION MATRIX** 🎯⚖️

### **PULL THE PLUG (HARD SHUTDOWN) 🔌💥**
**When to Use:**
- **Active data destruction** detected (wiping utilities running)
- **Full disk encryption** enabled (may lock on graceful shutdown)
- **Anti-forensic malware** suspected (could trigger on shutdown)
- **No time for proper live acquisition** (immediate seizure required)

**Advantages:**
- **Prevents data destruction** during shutdown process
- **Preserves memory state** (until power loss)
- **Stops malicious processes** immediately

**Disadvantages:**
- **File system corruption** possible
- **Loss of unsaved data**
- **Potential hardware damage** (rare with modern systems)
- **May look unprofessional** in court testimony

### **GRACEFUL SHUTDOWN (SOFT SHUTDOWN) 🖥️🌀**
**When to Use:**
- **Business-critical systems** that can't risk corruption
- **Database servers** with transactional integrity requirements
- **Encrypted systems** that need proper unmounting
- **When live acquisition** has already captured volatile data

**Advantages:**
- **Clean file system state**
- **Proper service shutdown**
- **Professional appearance** in documentation
- **Reduced risk of data loss**

**Disadvantages:**
- **Malware may activate** during shutdown sequence
- **Encryption may engage** locking the system
- **Takes longer** than hard shutdown
- **Potential for remote wipe** triggers

---

## **STEP-BY-STEP SHUTDOWN PROCEDURES** 📋🔧

### **HARD SHUTDOWN PROTOCOL:**
```
1. DOCUMENT RUNNING STATE
   ↓
2. PHOTOGRAPH SCREEN & CONNECTIONS  
   ↓
3. PULL POWER CORD FROM WALL (not from computer)
   ↓
4. REMOVE BATTERY (if laptop/portable device)
   ↓
5. BAG AND TAG IMMEDIATELY
```

**Critical Notes:**
- **Pull from wall outlet** - not from computer (more definitive)
- **Remove laptop batteries** - prevent residual power issues
- **Document exact time** of power loss

### **GRACEFUL SHUTDOWN PROTOCOL:**
```
1. COMPLETE LIVE ACQUISITION
   ↓
2. DOCUMENT ALL RUNNING PROCESSES
   ↓
3. INITIATE OPERATING SYSTEM SHUTDOWN
   ↓
4. MONITOR SHUTDOWN PROCESS
   ↓
5. VERIFY POWER OFF & BAG/TAG
```

**Operating System Specifics:**
- **Windows:** Start Menu → Power → Shut Down
- **Linux:** `shutdown -h now` or `poweroff`
- **macOS:** Apple Menu → Shut Down

---

## **LIVE ACQUISITION BEFORE SHUTDOWN** 💾⚡

### **MINIMUM VOLATILE DATA CAPTURE:**
```bash
# Windows (using external tools)
# Capture RAM
Belkasoft_RAM_Capturer.exe -f C:\evidence\memory.mem

# Capture processes & network
pslist.exe > C:\evidence\processes.txt
netstat -ano > C:\evidence\network.txt

# Linux
# Memory capture
dd if=/dev/mem of=/evidence/memory.dump

# Process and connection info
ps aux > /evidence/processes.txt
netstat -tulpn > /evidence/network.txt
lsof > /evidence/open_files.txt
```

### **ESSENTIAL DATA TO CAPTURE:**
- **RAM/Memory** - Most critical volatile evidence
- **Running processes** - What was active at seizure
- **Network connections** - Active sessions and communications
- **Logged-in users** - Authentication state
- **System time** - Clock settings and accuracy

---

## **SPECIAL SCENARIO HANDLING** 🎯⚠️

### **ENCRYPTED SYSTEMS:**
- **Assume encryption is enabled** unless proven otherwise
- **Capture RAM first** - encryption keys may be in memory
- **Consider cold boot attacks** for recently powered systems
- **Document all recovery options** - BitLocker keys, FileVault recovery keys

### **SERVER ENVIRONMENTS:**
- **Coordinate with system administrators**
- **Consider business impact** of shutdown
- **May require staged shutdown** (applications → OS → power)
- **Document service dependencies**

### **NETWORKED SYSTEMS:**
- **Capture network traffic** before disconnection
- **Document active connections**
- **Consider isolated network segment** for acquisition
- **Preserve switch/router configurations**

---

## **DOCUMENTATION REQUIREMENTS** 📝⚖️

### **SHUTDOWN DECISION DOCUMENTATION:**
```
SHUTDOWN JUSTIFICATION:
• System state observations
• Reasons for chosen method
• Alternatives considered
• Risks assessed and mitigated

EVIDENCE PRESERVATION:
• Volatile data captured before shutdown
• Tools and methods used
• Time of shutdown actions
• Personnel involved
```

### **CHAIN OF CUSTODY ENTRIES:**
```
14:32 - System observed powered on
14:33 - Screen photographed (see exhibit A)
14:34 - Live RAM capture initiated
14:36 - RAM capture completed, hash verified
14:37 - Decision: Hard shutdown due to active wiping detected
14:37 - Power cord disconnected from wall outlet
14:38 - Laptop battery removed
14:39 - System bagged and tagged as evidence #2024-001
```

---

## **LEGAL & ETHICAL CONSIDERATIONS** ⚖️👥

### **SEARCH WARRANT COMPLIANCE:**
- **Follow warrant specifications** for seizure methods
- **Document compliance** with all legal requirements
- **Consider minimization** principles for data collection

### **PROFESSIONAL STANDARDS:**
- **Be prepared to justify** your shutdown decision in court
- **Follow industry best practices** and organizational policies
- **Consider least intrusive** methods that achieve objectives

---

## **COMMON MISTAKES** ❌🚫

### **SHUTDOWN ERRORS:**
- ❌ **No live acquisition** before hard shutdown
- ❌ **Inconsistent methodology** across multiple systems
- ❌ **Poor documentation** of shutdown rationale
- ❌ **Ignoring encryption** implications
- ❌ **Failing to consider** remote wipe capabilities

### **BEST PRACTICES:**
- ✅ **Always capture volatile data** when possible
- ✅ **Document everything** before touching the system
- ✅ **Follow organizational policies** and procedures
- ✅ **Consider the evidence lifecycle** beyond immediate seizure
- ✅ **Prepare to defend** your decisions in court

---

## **ADVANCED TECHNIQUES** 🧠🔧

### **HYBRID APPROACH:**
- **Capture volatile data** → **Graceful shutdown** → **Dead acquisition**
- **Balance evidence preservation** with system integrity
- **Use write-blockers** for any post-shutdown examination

### **FORENSIC DISK PREPARATION:**
- **Create forensic images** immediately after shutdown
- **Use hardware write-blockers** for all acquisitions
- **Verify image integrity** with multiple hash algorithms

---

`>> SHUTDOWN_PROCEDURES_MASTERED._SYSTEM_STATE_PRESERVATION_OPTIMIZED._EVIDENCE_INTEGRITY_MAINTAINED.` 🔌💻✅

**Bottom Line:** The shutdown decision is one of the most critical in digital forensics. Choose wisely, document thoroughly, and always prioritize evidence preservation.

`- #OG` 🏳️⚡  
*Power down with purpose. Every shutdown should be a calculated decision, not a reflexive action. The truth depends on your methodology.* ⚡🤔🔍


[...back](../../0-landing-chfi.md)
