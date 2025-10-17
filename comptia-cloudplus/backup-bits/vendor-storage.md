
[...back](../vocabs/3-operations.md)

**AYYYYE!** Let me cook up that comprehensive vendor storage temperature table! 🍳📊✨

---

## **CLOUD STORAGE TIER COMPARISON - UNIVERSAL TEMPERATURE SCALE** 🌡️☁️

| Temperature | Performance | Cost | Access Time | Use Cases | **AWS** | **Azure** | **Google Cloud** | **Backblaze** |
|-------------|-------------|------|-------------|-----------|---------|-----------|------------------|---------------|
| **🔥 HOT** | 🐇🐇🐇 | 💸💸💸 | Instant ⚡ | Live DBs, active files | S3 Standard | Blob Hot Storage | Cloud Storage Standard | B2 Cloud Storage |
| **☀️ WARM** | 🐇🐇 | 💸💸 | Instant ⚡ | Recent backups, dev data | S3 Standard-IA | Blob Cool Storage | Cloud Storage Nearline | - |
| **❄️ COLD** | 🐢 | 💸 | Hours ⏳ | Archives, compliance | S3 Glacier | Blob Archive | Cloud Storage Coldline | - |
| **🧊 DEEP FREEZE** | 🐌 | 🆓 | Days 📅 | Legal, permanent | S3 Glacier Deep | Archive Storage | Archive Storage | - |

---

## **BLOCK STORAGE COMPARISON** 💾🔧

| Type | Performance | IOPS | Throughput | **AWS** | **Azure** | **Google Cloud** |
|------|-------------|------|------------|---------|-----------|------------------|
| **🔥 HIGH PERF** | 🐇🐇🐇 | 64K+ | 4 GB/s+ | io2 Block Express | Ultra SSD | Extreme PD |
| **⚡ BALANCED** | 🐇🐇 | 16K | 1 GB/s | gp3 | Premium SSD | Balanced PD |
| **💰 ECONOMY** | 🐇 | 3K | 250 MB/s | st1 | Standard SSD | Standard PD |
| **📚 ARCHIVE** | 🐢 | 500 | 80 MB/s | sc1 | - | - |

---

## **FILE STORAGE COMPARISON** 📁📊

| Service | Performance | Protocol | Use Case | **AWS** | **Azure** | **Google Cloud** |
|---------|-------------|----------|----------|---------|-----------|------------------|
| **🔥 ENTERPRISE** | 🐇🐇🐇 | NFS/SMB | Databases, apps | EFS, FSx | NetApp Files | Filestore High Scale |
| **⚡ GENERAL** | 🐇🐇 | NFS/SMB | File shares, home dirs | EFS Standard | Azure Files | Filestore Enterprise |
| **💰 BUDGET** | 🐇 | NFS/SMB | Backup, archive | - | Azure Files Standard | Filestore Basic |

---

## **BACKUP SERVICE COMPARISON** 💾🛡️

| Service | Retention | RTO/RPO | Integration | **AWS** | **Azure** | **Google Cloud** |
|---------|-----------|---------|-------------|---------|-----------|------------------|
| **🔥 ENTERPRISE** | Unlimited | Minutes ⏱️ | Native | AWS Backup | Azure Backup | Google Cloud Backup |
| **⚡ VM-FOCUSED** | 9999 days | Hours ⏰ | Hyper-V/Vmware | - | Recovery Services Vault | - |
| **💰 OBJECT** | Custom | Hours ⏰ | Cross-cloud | S3 Versioning | Blob Versioning | Object Versioning |

---

## **DISASTER RECOVERY TIERS** 🚨🏥

| Tier | RTO | RPO | Cost | **AWS** | **Azure** | **Google Cloud** |
|------|-----|-----|------|---------|-----------|------------------|
| **🔥 HOT SITE** | Minutes ⏱️ | Seconds ⚡ | 💸💸💸💸 | Pilot Light | Site Recovery | Cloud DR |
| **☀️ WARM SITE** | Hours ⏰ | Minutes ⏱️ | 💸💸💸 | Warm Standby | Warm Standby | - |
| **❄️ COLD SITE** | Days 📅 | Hours ⏰ | 💸 | Backup & Restore | Backup & Restore | Backup & Restore |

---

## **PRICING COMPARISON EXAMPLE** 💰📈
*(Per GB per month - approximate)*

| Tier | **AWS** | **Azure** | **Google Cloud** |
|------|---------|-----------|------------------|
| **🔥 HOT** | $0.023 | $0.018 | $0.020 |
| **☀️ WARM** | $0.012 | $0.010 | $0.010 |
| **❄️ COLD** | $0.004 | $0.002 | $0.004 |
| **🧊 DEEP** | $0.00099 | $0.0008 | $0.0012 |

---

## **THE VIBE CHECK SUMMARY** 🌊🎯

**AWS:** Most mature, most features, slightly pricier 🏢  
**Azure:** Great hybrid integration, competitive pricing 🔄  
**Google:** Simpler pricing, strong data analytics 🧠  
**Backblaze:** Disruptor pricing, S3-compatible 💸

**Your cheat code:** Start with **hot storage** for active data, then **automate lifecycle policies** to move data down the temperature scale automatically! 🔄❄️

---

Now you've got the **universal cloud storage decoder ring**! No matter which vendor you're working with, you can speak the temperature language! 🌡️🗣️

**This table is your cloud storage Swiss Army knife!** 🔧✨

[...back](../vocabs/3-operations.md)
