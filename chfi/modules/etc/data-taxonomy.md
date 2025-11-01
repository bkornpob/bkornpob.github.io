```
if we want to collect and preserve data (which is the focus of  cyberforensics?)
let's start from knowing different data types?
such as data at rest, in transit, ...(i think there is something else, cloud?)...
also technology associated to it... for example, data-at-rest meaning requiring physical storage {hdd, sdd, ram, etc.}
then, i would be helpful for mind anchoring if you can drop something like tools, special handling warning, etc.
```

---

`>> ACKNOWLEDGED._DATA_TAXONOMY_ENGAGED._FORENSIC_CLASSIFICATION_PROTOCOLS_ACTIVE.` 📊🔍⚡

# **FORENSIC DATA TAXONOMY: THE EVIDENCE UNIVERSE** 🌌📁

*Understanding what you're collecting before you touch it*

---

## **THE THREE STATES OF DIGITAL EVIDENCE** 🔄📊

### **1. DATA AT REST** 💾🛌  
*Evidence sleeping on storage media*

**What it is:** Data stored on persistent media - not actively being processed or transmitted.

**Storage Media Types:**
- **Magnetic** 🧲 - HDDs (platters, moving parts)
- **Solid State** ⚡ - SSDs, USB drives, SD cards (flash memory)  
- **Optical** 💿 - CDs, DVDs, Blu-ray
- **Magnetic Tape** 🎞️ - Backups, archives

**Forensic Considerations:**
- **HDD:** Physical platters, recoverable after deletion until overwritten
- **SSD:** TRIM command automatically wipes deleted data ⚠️
- **Encryption:** BitLocker, FileVault, LUKS - may be unrecoverable without keys
- **RAID Arrays:** Multiple disks - need all members for reconstruction

**Tools:** `FTK Imager`, `dd`, `dc3dd`, `Guymager`  
**Special Handling:** Write-blockers **MANDATORY**, avoid sudden movement (HDD), power-off safely

---

### **2. DATA IN MOTION** 🌊📡  
*Evidence flowing through networks*

**What it is:** Data actively being transmitted between systems.

**Transmission Types:**
- **Wired** 🔌 - Ethernet, fiber optics
- **Wireless** 📶 - WiFi, Bluetooth, cellular
- **Encrypted** 🔐 - VPN, SSL/TLS, SSH tunnels

**Forensic Considerations:**
- **Extremely volatile** - capture in real-time or it's gone forever
- **Packet fragmentation** - reassembly required
- **Encryption challenges** - may need keys or lawful interception
- **Jurisdictional issues** - crosses boundaries

**Tools:** `Wireshark`, `tcpdump`, `Network Miner`  
**Special Handling:** Legal intercept requirements, time synchronization critical

---

### **3. DATA IN USE** ⚡🧠  
*Evidence actively being processed*

**What it is:** Data in volatile memory (RAM) being used by running processes.

**Memory Locations:**
- **RAM** 🧠 - Main system memory
- **CPU Cache** 🏎️ - Processor-level memory
- **GPU Memory** 🎮 - Graphics processing memory
- **Page File/Swap** 📄 - Memory overflow to disk

**Forensic Considerations:**
- **Most volatile** - disappears at power loss
- **Contains gold:** Passwords, encryption keys, running malware, unencrypted data
- **Process dependencies** - memory structures tied to running OS
- **Acquisition affects state** - the act of capturing changes what you're capturing

**Tools:** `Volatility`, `Rekall`, `Belkasoft RAM Capturer`  
**Special Handling:** Capture quickly, minimal process disruption, document acquisition method

---

## **MODERN ADDITION: DATA IN THE CLOUD** ☁️🔮  
*Evidence living in someone else's computer*

**What it is:** Data stored or processed in third-party cloud environments.

**Cloud Service Models:**
- **IaaS** 🏗️ - AWS EC2, Azure VMs (you control OS)
- **PaaS** ⚙️ - Heroku, Google App Engine (you control app)
- **SaaS** 📧 - Office 365, Salesforce (you control data)
- **FaaS** ⚡ - AWS Lambda, Azure Functions (ephemeral)

**Forensic Considerations:**
- **Physical inaccessibility** - can't image physical drives
- **Multi-tenancy** - evidence mixed with other customers
- **Ephemeral instances** - disappear when stopped
- **API-based evidence** - logs, metrics, configuration snapshots
- **Jurisdictional maze** - data centers in multiple countries

**Tools:** `AWS CLI`, `Azure PowerShell`, `Google Cloud SDK`, `Custodian`  
**Special Handling:** Preserve API logs, snapshot volumes immediately, legal access procedures

---

## **FORENSIC HANDLING MATRIX** 🗂️⚠️

| **Data Type** | **Volatility** | **Primary Tools** | **Critical Warnings** |
|---------------|----------------|-------------------|----------------------|
| **At Rest** | Low | Write-blockers, imagers | ⚠️ NEVER work on original evidence |
| **In Motion** | High | Packet capture | ⚠️ Legal intercept requirements |
| **In Use** | Extreme | Memory dump tools | ⚠️ Acquisition alters evidence |
| **In Cloud** | Variable | Cloud APIs, snapshots | ⚠️ Jurisdiction, multi-tenancy issues |

---

## **MINDSET ANCHORS** 🧠⚓

**Remember:**
- **"Resting" data** is your crime scene - preserve it perfectly
- **"Moving" data** is the getaway car - catch it in action  
- **"Used" data** is the criminal's thoughts - extract before they vanish
- **"Cloud" data** is the offshore account - follow the legal paper trail

**Golden Rule:** The more volatile the data, the faster you must act, and the more you must document your methods.

---

`>> DATA_TAXONOMY_COMPLETE._EVIDENCE_CLASSIFICATION_MASTERED._READY_FOR_COLLECTION.` 📊🔍✅

**Bottom Line:** Knowing what type of evidence you're dealing with determines everything about how you collect, preserve, and analyze it.

`- #OG` 🏳️⚡  
*Classify first. Collect second. Always.* 🎯⚖️

[...back](../../0-landing-chfi.md)
