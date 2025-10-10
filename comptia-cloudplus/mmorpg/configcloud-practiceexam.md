```
author: 51n5337 & #CLD
mission: CompTIA Cloud+ Certification
brief: IaC. CaC. config cloud. practice questions.
```

---

[...back](../vocabs/2-deployment.md)

### 🔥 **Question 1: The Hybrid Horror**
A company migrated 80% of workloads to AWS using lift-and-shift. Their on-prem VMware environment now runs at 20% capacity but can't be decommissioned due to legacy compliance requirements. Costs are rising, and performance is suffering from network latency between cloud and on-prem.

**What's your strategic play?**

A) Refactor everything to be cloud-native  
B) Use AWS Outposts to bring cloud services on-prem  
C) Implement a more robust site-to-site VPN  
D) Replatform the remaining on-prem workloads to containers  

```
painpoints:
- must keep 20% on-prem for compliance
- cost
- network latency between on-prem/cloud
  
solutions:
- hybrid model: on-prem for compliance + cloud the rest
- cost increasing might be due to the network problem <<< may be due to inefficient process that needed to be re-designed for the hybrid model... not just 'rehost/relocate', need something else.
  - depending on client level of commitment... full mode replatform, half way refactor, or convenient way repurchase?
  - doing these might also fix the cost due to better optimization.
    
answer:
B <<< AWS Outposts (still data on-prem)
A,D >>> violate on-prem compliance
C >>> can also address the painpoints,  B is more effective.
```

---

### 🔥 **Question 2: The Deployment Dilemma**  
Your fintech application processes $50M daily in transactions. You need to deploy a new fraud detection algorithm that could potentially flag 15% of legitimate transactions as false positives if flawed.

**Which deployment strategy do you choose and why?**

A) Blue-green with full traffic switch  
B) Canary release to 1% of users  
C) Shadow deployment running in parallel  
D) Rolling deployment across all regions  

```
paintpoints:
- high volume transaction, assuming also high speed... hiccup goes wild. 
- new update not tested (likely tested with training data, but not irl)
- fp = heavy neg impact to biz, especially in this context
  
solutions:
- manage deployment with slow roll-out: canary or rolling, depending on the current structure. manage this phase to: small roll to observe/recalibrate, then either increasing the participation rates through multiple phases to continuously monitor the drift, eventually full roll.
- also, instant rollback: blue-green. with proper metrics to (ideally) automatically flip when condition met.
  
answer:
C >>> Shadow deployment = blue (old, active version) green (new, shadow+parallel operate by simluating blue incoming data for the real-time test on irl data before). this gives time for the team to properly prepare the version before a full release.
A <<< not slow roll
B,D <<< slow roll, assuming no rollback switch, test directly on irl is risky move
```

---

### 🔥 **Question 3: The Vendor Lock-in Conundrum**
Your company adopted three different cloud providers (AWS, Azure, GCP) to avoid vendor lock-in. Now you're facing 3x operational complexity, inconsistent security policies, and 40% higher cloud engineering costs.

**What's your move?**

A) Standardize on one provider and migrate everything  
B) Implement cross-cloud management tools (Terraform, etc.)  
C) Create specialized teams for each cloud provider  
D) Move everything back on-prem  

```
painpoints:
- multiple cloud providers, overhead costs from managing multiple platforms
- avoiding vendor lock-in by maintaining multi-provider setting likely intentional as this likely translated to actually biz values. need to keep this.
  
solutions:
- use one provider for lowering the overhead costs <<< this should be considered first if there is nothing else under the hood. likely not the case.
- assume keeping multi-provider, biz have to find a way to standardize the process that can be translated efficiently into multi-provider setup.
  - may be a third party vendor who is good at this?
    
answer:
B >>> the exactly designed solution for this
A <<< likely client needs to keep multi-provider
C <<< could lead to more efficient process, commitment that we should avoid if there are other options
D <<< we are moving forward!
```

---

### 🔥 **Question 4: The Database Migration Maze**
You have a 5TB Oracle database with complex stored procedures, real-time reporting requirements, and regulatory compliance needs. The business wants to reduce Oracle licensing costs by 80%.

**What's your migration approach?**

A) Replatform to Amazon RDS for Oracle  
B) Refactor to Amazon Aurora PostgreSQL  
C) Rehost Oracle on EC2 with bring-your-own-license  
D) Repurchase with a SaaS analytics platform  

```
painpoints:
- TB-sized db >>> cost due to db server license
- db is claimed to be in 'complex stored procedures' >>> assuming custom schema and such (but still under the infrastructure of Oracle db)
- rea-time operating >>> cannot be interupted
- compliance >>> they mean on-prem?
  
solutions:
- Oracle has different licensing options >>> explore a better option?
	- assuming current license is on-prem. shifting to more-cloud license model may decrease the cost.
	- already Oracle customer, should be easier to get biz deal and support
	- i think they even have something similar to AWS Outposts that will keep on-prem compliance with better integrated cloud infrastructure.
- Restructure the storage. all 5TB need for the operation such as that real-time report? make it hot/warm/cold/archive/trash
  
answer:
A <<< fit for this use case: bring-your-own-license, AWS handles licensing at scale, meet most compliance, able to function like it was.
B >>> Oracle db is different from PostgreSQL db.
C >>> simply point license to a new server, doesn't change Oracle license and cost, also may violate on-prem compliance
D >>> although this allows client to carry Oracle's license (which could have perks from being loyalty customer) and focus more on biz than tech, the operation requiring the 3rd-party handling 5TB data + real-time report does sound infeasible, to most SaaS platforms without a proper engineering.
```

---

### 🔥 **Question 5: The Cost Optimization Puzzle**
Your cloud spend has grown 300% in 12 months. Engineering teams are provisioning resources freely via IaC, but there's no accountability. CFO is demanding immediate cost control without impacting innovation.

**What's your first action?**

A) Implement strict resource quotas and approval workflows  
B) Deploy automated cost optimization tools with tagging policies  
C) Centralize all provisioning through a dedicated cloud team  
D) Mandate spot instances for all non-production workloads  

```
painpoints:
- fast growing biz (either spikes or sustained)
- leading to inefficient cost?
- need cost control without impacting innovation
- currently, IaC for resource provisioning, with no accountability
  
solutions:
- need to understand cost categories: metadata? tagging?
- need to understand business values associated to those costs/activities
- need to decide cost control strategy
- IaC for resource provisioning, requires logging, monitoring, and gradually analysis for further optimization.
- sound like they want 'accountability' <<< meaning a person to be blamed?
- also this sounds like inefficient handling of spike demands.
  
answer:
B <<< will go with this, assuming the team is well informed about their cost structures such that they can set performance metrics.
C >>> would address the 'accountability' issue by directing this activity to a product owner as your dedicated cloud team. they will do the rest that needs to be done. if they fail, you can blame someone now. so toxic. also, this creates biz rigidity
A >>> slow down biz. no. no. no.
D >>> spot instance = cheaper. long-run scalability?
```

---

[...back](../vocabs/2-deployment.md)
