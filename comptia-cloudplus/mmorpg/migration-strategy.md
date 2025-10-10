```
author: 51n5337 & #CLD
mission: CompTIA Cloud+ Certification
brief: migrate-strategy. examples.
```

---

[...back](../vocabs/2-deployment.md)
## 🎮 **Real-World MMORPG Migration: "Dragon's Legacy"**

**Background:** 15-year-old game, 200K active players, aging hardware, wants modern features.

### **The Mixed Strategy:**

```
🗄️ CHARACTER DATABASE:
- **Replatform** + **Refactor**
- Move from MySQL → Amazon Aurora (replatform)
- Break monolithic DB into microservices: characters, inventory, social (refactor)

🎯 GAME SERVERS:
- **Relocate** + **Replatform** 
- VMware VMs → AWS EC2 (relocate)
- Add auto-scaling + load balancers (replatform)

💬 CHAT SYSTEM:
- **Repurchase** + **Retire**
- Custom chat → Discord integration (repurchase)
- Retire old chat servers (retire)

📊 ANALYTICS:
- **Refactor** completely
- Batch processing → real-time Kinesis streams
- Custom dashboards → QuickSight

🛠️ DEV TOOLS:
- **Retain** (for now)
- Legacy build servers stay on-prem
- "We'll deal with this next year"

📈 PLAYER BEHAVIOR:
- **Rehost** + **Replatform**
- Move log files to S3 (rehost)
- Process with Athena/Lambda (replatform)
```

---

## 🏢 **Enterprise E-commerce: "MegaMart"**

**Background:** Traditional retailer going digital, legacy systems, seasonal traffic spikes.

### **The Hybrid Approach:**

```
🛒 SHOPPING CART:
- **Refactor** to microservices
- Monolith → AWS ECS containers
- **Result:** Scales independently during holiday rushes

💳 PAYMENT PROCESSING:
- **Repurchase** (Stripe API)
- **Retire** custom payment system
- **Result:** PCI compliance handled, faster checkout

📦 INVENTORY SYSTEM:
- **Rehost** (for now)
- Move AS/400 system to EC2
- **Result:** Buys time for full modernization

📊 CUSTOMER DATA:
- **Replatform** + **Refactor**
- Oracle DB → Amazon RDS (replatform)
- Add personalization microservices (refactor)

🎯 MARKETING SITE:
- **Replatform** on WordPress + RDS
- **Result:** Managed updates, better performance
```

---

## 🏥 **Healthcare Provider: "MediCore Systems"**

**Background:** HIPAA compliance, legacy patient records, need mobile access.

### **Compliance-First Mix:**

```
📋 PATIENT RECORDS:
- **Replatform** to Azure SQL Database
- **Retain** sensitive data on-prem via hybrid connection
- **Result:** Compliant but modernized

📱 PATIENT PORTAL:
- **Refactor** as Azure Functions + Cosmos DB
- **Result:** Scalable, cost-effective for variable usage

💊 PHARMACY SYSTEM:
- **Rehost** on Azure VMs
- **Result:** Quick win, no compliance re-certification

📞 APPOINTMENT SCHEDULING:
- **Repurchase** (SaaS scheduling platform)
- **Result:** Faster implementation, less custom code

📊 ANALYTICS:
- **Refactor** to Azure Data Lake + Power BI
- **Result:** Better insights, maintained compliance
```

---

## 💡 **The Pattern: Risk-Managed Transformation**

**Smart migrations use mixed strategies to:**
- 🎯 **Manage risk** (don't bet everything on one approach)
- ⚡ **Deliver value fast** (quick wins build momentum)
- 🏗️ **Lay foundations** (some services enable future innovation)
- 💸 **Control costs** (balance investment vs. return)

---

[...back](../vocabs/2-deployment.md)

