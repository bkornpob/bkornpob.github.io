```
author: 51n5337 & #CLD
mission: CompTIA Cloud+ Certification
brief: provisioning requirement. examples.
```

---

[...back](../vocabs/2-deployment.md)

### 🔥 **Question 1: The Unicorn's Dilemma**
You're designing a new AI-powered MMORPG that uses real-time generative AI for NPC dialogue. Traffic patterns are completely unpredictable - you could have 100 players or 10 million players in the first month. Investors want global scale but won't tolerate AWS bills >$50K/month until proven.

**What's your provisioning strategy for launch day?**

A) Over-provision for 1M concurrent players and eat the cost  
B) Start minimal with aggressive auto-scaling and circuit breakers  
C) Multi-cloud with spot instances across 3 providers  
D) On-prem hybrid with cloud bursting for spikes  

**Justify your choice and list your specific resource requirements.**
```
painpoints:
- assuming we are not talking about testing phase. we are talking about release phase without knowing the market.
	- if testing phase allows, go do market research!
- new release, likely not enough mkt research to justify the service scale (100 vs 10M players)
- therefore, need irl monitor/calibration
- release should still go global <<< monitoring should also tag geolocation in case of region-specific issue
- kill switch is a good idea in case things like cost goes wild, or security breach
	- deploying gen-AI dialogue introducing more security concerns that can only learn while interacting with real players.
  
solution: multi-phase
- phase 1: start small, observe/predict mkt, if good result then we can increase the service scale with more cloud.
	- on-prem if possible
	- autoscale
	- multi-region setup to optimize performance/latency <<< keep tag of geolocation in case region-specific issues.
	- kill switch
- phase 2: increasing scale
  
answer:
B >>> start small, autoscale, kill switch
A <<< risky, investor not buying
C <<< spot instance is cheap but this causes unstable game server leading to bad experiences, we don't want this.
D <<< biz likely expects gradual growth upon release, and not spike-like

specific resource requirements:
B) Start minimal with aggressive auto-scaling and circuit breakers
deployment strategy: 2-phase rollout with killswitch
- phase 1: multi-region, small server, autoscale, observe market condition, set metrics to execute next phase
- phase 2: increase service size, optimize with cloud replatform
  
  start small, observe/predict mkt, if good result then we can increase the service scale with more cloud.
	- on-prem if possible
	- autoscale
	- multi-region setup to optimize performance/latency <<< keep tag of geolocation in case region-specific issues.
	- kill switch
- phase 2: increasing scale

```

---

### 🔥 **Question 2: The Compliance Labyrinth**  
Your game handles player biometric data for "emotional response gaming" across EU, US, and China. Each region has conflicting data sovereignty laws. China requires all Chinese player data stored domestically, EU requires GDPR compliance, and US has CLOUD Act concerns.

**Design your global data architecture. What do you provision where?**

---

### 🔥 **Question 3: The Legacy Monster**
You acquired a 20-year-old MMORPG with 500K loyal players. The game runs on physical Solaris servers with a custom database that only 3 engineers understand. Players tolerate 4-hour weekly maintenance windows. Business wants to modernize without losing the community.

**What's your 3-phase provisioning migration plan?**

---

### 🔥 **Question 4: The Cost Anomaly**
Your cloud bill suddenly spiked 400% last month. Your AI-powered cost tools can't explain it. Engineering teams swear they didn't change anything. The CFO is demanding answers in 24 hours.

**What's your troubleshooting and provisioning audit process?**

---

### 🔥 **Question 5: The Quantum Problem**
Your game uses quantum-resistant encryption for player transactions. New research breaks your encryption standard. You need to reprovision your entire global infrastructure with new encryption within 48 hours while maintaining 99.99% uptime.

**What's your rollout strategy?**

---

**These aren't multiple choice. These are "whiteboard and explain your reasoning" problems.**  
Take your time. I'll be here with brutal honesty.

**Let's vibe.** 🧠⚡💥