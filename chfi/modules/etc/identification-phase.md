```
tell me more about identification process

... i think i heard something like {subject, location, witness, ...}

may be give example in a simple detective story (or superhero?)

then extend this to cyberforensics (if you can give one example, and another one involving cloud to demonstrate some niche techniques specific to this field
```

---

`>> ACKNOWLEDGED._IDENTIFICATION_PROTOCOLS_ENGAGED._BUILDING_INVESTIGATIVE_NARRATIVE.` 🕵️‍♂️🔍📖

# **IDENTIFICATION PHASE: IS THIS A CRIME SCENE?** 🚨🔎⚖️

*The moment you realize you're not fixing a problem—you're investigating one*

---

## **THE DETECTIVE STORY: THE MUSEUM HEIST** 🏛️👻

**Scene:** Metropolitan Museum of Art, 3:17 AM

**The Call:** "Security system alert—motion in the Egyptian Wing."

**Detective Miles Arrives:**

1.  **SUBJECT:** *Who's involved?*
    - **Security Guard Jenkins** - First on scene, witnessed open display case.
    - **The "Phantom"** - Unknown suspect. No visual from cameras (masked).
    - **Curator Dr. Evans** - Confirms artifact missing: The Amulet of Anubis.

2.  **LOCATION:** *Where did it happen?*
    - **Primary Crime Scene:** Egyptian Wing, Display Case #7B.
    - **Point of Entry:** Skylight, 4th floor. Rope and grappling hook found.
    - **Escape Route:** Footprints leading to service elevator, then roof access.

3.  **EVIDENCE/WITNESS:** *What proof exists? Who saw what?*
    - **Physical Evidence:** Glove fiber on display case, tool marks on lock, muddy footprint.
    - **Witness Account:** Guard Jenkins heard glass break at 3:17 AM.
    - **Digital Evidence:** Security system logs show camera #12 was disabled from 3:15-3:20 AM.

4.  **TIME:** *When did it occur?*
    - **Last Verified Intact:** 2:30 AM (patrol log).
    - **Incident Window:** 3:15 AM - 3:20 AM (camera outage + guard report).

**Miles' Conclusion:** "This isn't a maintenance issue. This is a **burglary**. We have a crime scene. Secure the perimeter."

---

## **TRANSLATED TO CYBERFORENSICS: THE MIDNIGHT DATA HEIST** 💻🌃🦹‍♂️

**Scene:** TechCorp Inc., Financial Database Server

**The Alert:** "Unusual after-hours database queries from HR user account."

**CSIRT Analyst Maria Investigates:**

1.  **SUBJECT:** *Who's involved?*
    - **"legit_user_hr03"** - Account performing queries. Belongs to Jane Doe in HR.
    - **Actual Jane Doe** - On vacation in Hawaii. Confirms she didn't log in.
    - **Unknown Attacker** - Using stolen credentials.

2.  **LOCATION:** *Where did it happen?*
    - **Primary System:** `db-finance-01.techcorp.local` (SQL Server).
    - **Source IP:** `192.168.45.118` - HR department workstation.
    - **Network Path:** HR VLAN -> Firewall -> Database DMZ.

3.  **EVIDENCE/WITNESS:** *What proof exists? What systems "saw" it?*
    - **Authentication Logs:** Successful login at 2:03 AM from HR workstation.
    - **Database Logs:** Large `SELECT` queries on `salary_data` table.
    - **Network Logs:** Firewall shows 4.2 GB outbound transfer to external IP.
    - **Endpoint Logs:** HR workstation shows RDP connection from unrecognized IP.

4.  **TIME:** *When did it occur?*
    - **Initial Compromise:** 2:03 AM (successful login).
    - **Data Exfiltration:** 2:15 AM - 2:47 AM (query and transfer window).
    - **Discovery:** 3:30 AM (SOC analyst notices bandwidth spike).

**Maria's Conclusion:** "This isn't a misconfiguration. This is a **data breach**. We have a digital crime scene. Start evidence preservation."

---

## **CLOUD FORENSICS IDENTIFICATION: THE GHOST IN THE MACHINE** ☁️👻⚡

**Scene:** CloudStartup's AWS Environment

**The Anomaly:** "Unexpected $14,000 bill for EC2 compute hours."

**Cloud Security Engineer Kenji Investigates:**

1.  **SUBJECT:** *Who's involved?*
    - **IAM User:** `ci-cd-pipeline-user` - Shows massive API calls.
    - **Actual Identity:** Compromised access keys from public GitHub repo.
    - **Attacker:** Crypto-mining bot using stolen credentials.

2.  **LOCATION:** *Where did it happen?*
    - **Primary Region:** `us-east-1` (Northern Virginia).
    - **Services:** EC2 (compute), S3 (storage), CloudWatch (logs).
    - **Resource Tags:** Instances named `k8s-worker-*` but no Kubernetes cluster.

3.  **EVIDENCE/WITNESS:** *What proof exists?*
    - **CloudTrail Logs:** `RunInstances` API calls every 2 hours creating new instances.
    - **Cost Explorer:** Spike in `m5.24xlarge` instances (high CPU, high cost).
    - **VPC Flow Logs:** Outbound traffic to known crypto mining pool IPs.
    - **GitHub Audit Log:** Access key exposed in commit 14 days ago.

4.  **TIME:** *When did it occur?*
    - **Initial Exposure:** 14 days ago (GitHub commit).
    - **Exploitation Started:** 10 days ago (first unauthorized API call).
    - **Peak Activity:** Last 48 hours (massive scaling).

**Kenji's Conclusion:** "This isn't a billing error. This is a **cloud resource compromise**. We have ephemeral evidence that needs immediate capture."

---

## **CLOUD-SPECIFIC IDENTIFICATION TECHNIQUES** ☁️🔍🎯

**Ephemeral Evidence Capture:**
- **Instance Metadata:** `curl http://169.254.169.254/latest/meta-data/`
- **RAM Acquisition:** Use cloud-native tools before instance termination
- **Snapshot Everything:** EBS volumes, memory dumps, configuration states

**API-First Investigation:**
- **CloudTrail/Azure Logs/Google Audit Logs:** The "security camera" of your cloud
- **Resource Configuration:** Compare current state vs. known good baseline
- **Cost Analysis:** Financial anomalies as early warning system

**Multi-Tenant Considerations:**
- **Shared Responsibility:** Know what AWS/Azure/GCP logs vs. what you must log
- **Jurisdictional Tags:** Evidence location matters for legal proceedings

---

## **IDENTIFICATION CHECKLIST** ✅📋

**Ask These Questions:**
- [ ] Is this normal behavior or an anomaly?
- [ ] Who are the subjects (human and digital)?
- [ ] What systems/locations are involved?  
- [ ] What evidence exists (logs, files, network data)?
- [ ] When did it start/end?
- [ ] What's the business impact?
- [ ] Do we have legal authority to investigate?

**The Threshold Question:**  
*"Would a reasonable person conclude a security incident has occurred?"*

If YES → **You now have a crime scene.** Activate preservation protocols.

---

`>> IDENTIFICATION_COMPLETE._CRIME_SCENE_CONFIRMED._PRESERVATION_PROTOCOLS_NEXT.` 🚨🔒➡️

**Remember:** Identification isn't about solving the case—it's about recognizing there **is** a case to solve.

`- #OG` 🏳️⚡  
*The first clue is often the silence where noise should be.* 🤫🔍

[...back](../../0-landing-chfi.md)
