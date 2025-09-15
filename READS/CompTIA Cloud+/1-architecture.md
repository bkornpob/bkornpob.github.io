
`// publication status: live`  
`// document: 1.0-cloud-architecture`  
`// contributors: 51n5337 & #CLD`  
`// update: service models ordered by user responsibility (high to low)`  

---

# **1.0 Cloud Architecture** 🏗️  
`// Exam Weight: 23%`  

---

## **1.1 Given a scenario, use the appropriate cloud service model.**  

**Cloud Service Models (ordered by level of user responsibility):**  

- **IaaS (Infrastructure as a Service)** 🛠️  
  - **You manage the most:** OS, apps, data, runtime.  
  - **Provider manages:** Hardware, hypervisor, network.  
  - *Example:* AWS EC2, Azure VMs.  

- **PaaS (Platform as a Service)** ⚙️  
  - **You manage:** Code, data, app config.  
  - **Provider manages:** OS, runtime, infrastructure.  
  - *Example:* Google App Engine, Heroku.  

- **FaaS (Function as a Service)** ⚡  
  - **You manage:** Function code and triggers.  
  - **Provider manages:** Execution environment, scaling, OS.  
  - *Example:* AWS Lambda, Azure Functions.  

- **SaaS (Software as a Service)** 📦  
  - **You manage the least:** Usage and user data.  
  - **Provider manages:** Everything else.  
  - *Example:* Gmail, Microsoft 365.  

**Shared Responsibility Model:**  
This sequence reflects the gradient of control — from full infrastructure oversight (IaaS) to pure consumption (SaaS). Know your zone. 🔒⚠️  

---

## **1.2 Explain concepts related to service availability.**  

**Resource Availability:**  
- **Region** 🌍: Geographic area (e.g., `us-east-1`).  
- **Availability Zone (AZ)** 🧊: Isolated data center within a region.  
- **Cloud Bursting** ☁️💥: Scaling to public cloud during demand spikes.  
- **Edge Computing** ⚡: Processing data near the source.  

**Disaster Recovery (DR):**  
- **RTO (Recovery Time Objective)**: Max acceptable downtime. ⏳  
- **RPO (Recovery Point Objective)**: Max acceptable data loss. 💾  
- **Sites:**  
  - Hot 🟢: Fully operational backup.  
  - Warm 🟡: Equipment ready, needs data.  
  - Cold 🔵: Physical space, no equipment.  

**Multicloud Tenancy:** Using multiple cloud providers. Avoids vendor lock-in. 🔄☁️  

---

## **1.3 Explain cloud networking concepts.**  

**Connections:**  
- **VPN (Virtual Private Network)** 🔒: Encrypted tunnel over public internet.  
- **Dedicated Connections** 🛣️: Private, high-speed link (e.g., AWS Direct Connect).  

**Network Services:**  
- **Load Balancers** ⚖️: Distribute traffic (Application vs. Network LB).  
- **CDN (Content Delivery Network)** 🌐: Cache content globally for low latency.  
- **Firewalls** 🔥🧱: Filter inbound/outbound traffic.  

**VPC (Virtual Private Cloud):**  
- Your isolated virtual network.  
- Includes: Peering, transit gateways, subnets, routing (BGP, static routes). 🧩📡  

---

## **1.4 Compare and contrast storage resources and technologies.**  

**Tiered Storage:**  
- Hot 🔥: Frequent access, high cost.  
- Warm ☁️: Infrequent access, mid cost.  
- Cold ❄️: Rare access, low cost.  
- Archive 🗃️: Very rare access, lowest cost.  

**Disk Types:**  
- **SSD** ⚡: Fast, expensive.  
- **HDD** 🐢: Slow, cheap.  

**Storage Types:**  
- **Object** 📦: S3, blob storage.  
- **Block** 🧱: EBS, virtual disks.  
- **File** 📁: EFS, shared file systems.  

**Implications:**  
- Performance ↔️ Cost trade-off. Always.  

---

## **1.5 Explain the purpose of cloud-native design concepts.**  

- **Managed Services** 🤖: Use provider services (e.g., DynamoDB, SQS).  
- **Microservices** 🧩: Small, independent services.  
- **Loosely Coupled Architecture** 🪢: Services don’t break each other.  
- **Fan-out** 🌊: Distribute work across multiple services.  
- **Service Discovery** 🔍: Automatically locate services.  

---

`// end of section 1.0`  
`// ready for pub`  
`// proceed?` 🔁🚀