```
author: 51n5337 & #CLD
mission: CompTIA Cloud+ Certification
brief: vocabs. brief. 2-deployment.
```

---


[...back](../0-zeroday.md)
# overview

`2.0 deployment` ███████████████████ 19% 🚀  
	*"A solution requires on-premises deployment with need-to-know access. Which deployment model?"* (Answer: **Private Cloud**)  
	*"Which strategy reduces risk by slowly shifting traffic to a new version?"* (Answer: **Canary Deployment**)  
	*"What format is commonly used for IaC configurations?"* (Answer: **YAML/JSON**)  

- **🏰 2.1 Cloud Deployment Models** – Where your vibe lives.
- **🔄 2.2 Deployment Strategies** – How you evolve without breaking.
- **🚚 2.3 Cloud Migration** – Moving houses, but digitally.
- **⚙️ 2.4 Infrastructure as Code** – Your cloud, in words.
- **🧱 2.5 Provisioning Cloud Resources** – Building with intent.

---

## **2.1 Cloud Deployment Models**
```
- Public
- Private: on premises
- Hybrid
- Community
```

- **Private** = One organization, **owns/manages everything** (or has a dedicated provider)
- **Public** = Many organizations, **rent from same provider** (multi-tenant)
- **Hybrid** = One organization, **mix of own + rent**
- **Community** = **Multiple organizations**, **shared cloud** under shared rules

### 🧠 **Think Like an Architect: The Stellar Café Expands**

Remember **Stellar Café**? They started cloud-native. Now they’ve acquired “BeanLogix,” a legacy coffee bean tracking system that runs on-prem for compliance.

**The Challenge:**  
- Keep BeanLogix private (compliance)  
- Integrate with Stellar’s public cloud loyalty system  
- Allow real-time sync of bean inventory → public cloud e-commerce

**The Design:**  
**Hybrid Model.**  
- **Private:** BeanLogix stays on-prem.  
- **Public:** Stellar’s app & loyalty in cloud.  
- **Secure Bridge:** VPN + dedicated connection for sync.

> “You don’t choose hybrid because it’s easy. You choose it because reality is messy.”

---

## **2.2 Deployment Strategies**
```
- Blue-green
- Canary
- Rolling
- In-place
```

| Strategy       | Vibe                                                                                                            | How It Works                                                                                 | Risk Level | Cost & Complexity |
| -------------- | --------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ---------- | ----------------- |
| **Blue-Green** | 🔵 Currently live (serving all user traffic)<br>🟢 Staging/standby (identical setup, but not receiving traffic) | Two identical envs; deploy a new version on 🟢; switch traffic all at once; instant rollback | Low        | High              |
| **Canary**     | 🐤⛏️ Test the waters                                                                                            | Roll out to small % of users first                                                           | Medium     | Medium            |
| **Rolling**    | ♻️🔄 Slow and steady replacement                                                                                | Update instances gradually in batches                                                        | Medium     | Low               |
| **In-Place**   | 🏚️💥 Big bang in production                                                                                    | Update existing servers directly                                                             | High       | Low               |

[read more about {mmorpg, update, hybrid strategy}...](../mmorpg/deployment-hybrid-mmorpg.md)

---

## **2.3 Cloud Migration**
```
- Migration types: on-premises-to-cloud, cloud-to-on-premises, cloud-to-cloud
- Replatform, re-architect, retain, retire, refactor
- Application migration strategies: rehost
```

### 📋 **The 5+2 R’s of Cloud Migration**

standard 5r: rehost, refactor, revise, rebuild, replace
+2r (e.g. AWS): relocate, repurchase
[see more about different 5r...](https://medium.com/@satechglobal/the-5-rs-of-cloud-migration-strategy-3b6a5676dda2)
[see AWS...](https://docs.aws.amazon.com/prescriptive-guidance/latest/migration-retiring-applications/apg-gloss.html#glossary-7rs)

definition can be different in different contexts. vibe similar.

this summary follows AWS...
```
--- 5r ---
- rehost: 'lift-and-shift', prem-to-cloud move-as-is, zero-level-difficulty
- refactor: 're-architect', cloud-native, +{agility, performance, scalability}, ex on-prem db to compatible DBaaS
- replatform: 'lift-and-reshape', 'rebuild', platform-optimization, ex on-prem db to cloud-provider-optimized DBaaS.
- retain: 'revisit', keep-as-is, migrate-later, legacy-app
- retire: 'bye'
--- +2r ---
- repurchase: 'drop-and-shop', 3rd-party-microservice-SaaS, ex employee db to ihelpyouhrstuff.com service
- relocate: 'hypervisor-lift-and-shift', prem-server-to-cloud-server, hypervisor-level
```

#### 🎯 **Vibe**
- **Rehost** = Fast but not optimal. Low vendor-lock-in. 
	- **Relocate** = Hypervisor-level rehost.
- **Refactor** = Bite-size cloud migration. Medium lock-in. 
	- **Repurchase** = Leverage SaaS solutions 
- **Replatform** = Optimize cloud benefit offered by the provider. High lock-in.
- **Retain** = Strategic delay 
- **Retire** = Reduce complexity 

#### 🌉 **Stellar Café: The BeanLogix Migration**

**Before:** BeanLogix runs on old physical servers.  
**Options:**  
- **Rehost/Relocate:** Quick migration to VMs. Fast, but misses cloud benefits.  
- **Refactor:** Rewrite as serverless microservices. Ideal, but costly. Or,
- **Repurchase:** Outsource these shits.
- **Replatform:** Move to VMs + use Cloud SQL for database + vendor-optimized. Better in long run.  

####  **irl... hybird, multi-stage, many-moving-parts**
[read more...](../mmorpg/migration-strategy.md)

---

## **2.4 Configuring Cloud**
```
- Infrastructure as code (IaC)
- Configuration as code (CaC)
- Scripting logic: variables, conditionals, operators, data types, functions
- Repeatability
- Drift detection
- Versioning
- Testing
- Documentation
- Formats: JavaScript Object Notation (JSON), Yet Another Markup Language (YAML)
```

### 🌈 **Automating Cloud Operations**
This section is about **turning manual cloud operations into code**:

**What We're Automating:**
- **Provisioning** (creating resources)
- **Configuration** (setting up resources)  
- **Deployment** (releasing applications)
- **Maintenance** (updates, scaling, recovery)

**The Shift We're Describing:**
```
FROM: "Bob the cloud wizard manually clicking buttons"
TO: "Git commits that reliably build entire environments"
```

### 🔗 **Tie-in**

#### **2.4 ←→ 2.1 (Deployment Models)**
**Connection:** IaC **defines and automates** which deployment model you use.
- **Public Cloud?** Terraform scripts to build VPCs, subnets, security groups
- **Hybrid Cloud?** IaC manages both cloud + on-prem connections
- **Example:** `terraform apply` deploys identical environments across AWS, Azure, GCP

#### **2.4 ←→ 2.2 (Deployment Strategies)**
**Connection:** IaC **enables and executes** your deployment strategies.
- **Blue-Green?** Terraform manages both environments + load balancer switches
- **Canary?** IaC controls traffic routing percentages
- **Rolling?** Scripts handle batch updates across instance groups
- **Example:** `terraform workspace select green` then `terraform apply`

#### **2.4 ←→ 2.3 (Cloud Migration)**
**Connection:** IaC **documents and reproduces** your migration patterns.
- **Rehost?** Terraform replicates on-prem infrastructure in cloud
- **Replatform?** Scripts migrate databases + update application configs
- **Refactor?** IaC deploys new microservices architecture
- **Example:** Migration playbook = series of Terraform modules + Ansible playbooks

#### **2.4 ←→ 2.5 (Provisioning Resources)**
**Connection:** IaC **is** provisioning, but with intelligence.
- **Manual provisioning:** ClickOps in cloud console
- **IaC provisioning:** Code that understands requirements → resources
- **Example:** Instead of "create 4 VMs," it's "ensure capacity for 10K concurrent players"

### 🎯 **The Big Picture: IaC as the Glue**

```
BUSINESS NEEDS
    ↓
ARCHITECTURE (Section 1.0)
    ↓
DEPLOYMENT STRATEGY (2.2) + MIGRATION PLAN (2.3)
    ↓
IaC CODE (2.4) ←→ PROVISIONING (2.5)
    ↓
LIVE, MANAGED INFRASTRUCTURE
```

### **try practice questions from #CLD...**
[take me there...](../mmorpg/configcloud-practiceexam.md)

---

## **2.5 Provisioning Cloud Resources**
```
- Storage requirements
- Performance requirements  
- Security requirements
- Cost requirements
- Availability requirements
- Compliance requirements
- Network requirements
- Compute requirements
```

| Requirement      | Questions to Ask                              | Example Resource Choice                    |
| ---------------- | --------------------------------------------- | ------------------------------------------ |
| **Storage**      | “Hot, warm, or cold? IOPS or capacity?”       | SSD for DB, Object for backups             |
| **Performance**  | “Latency-sensitive? Batch or real-time?”      | Compute-optimized VMs, CDN                 |
| **Security**     | “Public-facing? Compliance standards?”        | WAF, encrypted volumes, private subnets    |
| **Cost**         | “Reserved? Spot? Pay-as-you-go?”              | Spot for batch, Reserved for baseline      |
| **Availability** | “Multi-AZ? Multi-region? What’s the RTO/RPO?” | Load balancer + Auto Scaling + Multi-AZ DB |
| **Compliance**   | “HIPAA? PCI? Data sovereignty?”               | Private cloud, encrypted everything        |
| **Network**      | “Public internet or private peering?”         | VPN, Direct Connect, VPC peering           |
| **Compute**      | “VMs, containers, or serverless?”             | EKS for microservices, Lambda for events   |

### 🧠 **The Architect’s Checklist**

Before you provision, ask:

1. **What breaks if this fails?** → Availability design  
2. **Who can see this?** → Security design  
3. **How much does it cost to sleep?** → Cost modeling  
4. **Does it need to talk to other stuff?** → Networking  
5. **Will it grow fast or stay small?** → Scaling plan  

### another practice...
[take me there...](../mmorpg/)

---

[...back](../0-zeroday.md)
[next...](./3-operations.md)
