
[...back](../vocabs/4-security.md)

**AYYYE!** Let me break down these **stealthy cloud attacks** - these are the ninjas of the cloud security world! 🥷☁️

---

## **⛏️ CRYPTOJACKING - The Silent Resource Thief** ⛏️💸

### **What It Is:**
*"Unauthorized use of your cloud computing resources to mine cryptocurrency"*

### **The Vibe:**
```
"Someone secretly plugging into your cloud electricity to run their mining operation"
```

### **How It Works:**
```
ATTACKER → Compromises instance → Installs mining software → Uses YOUR CPU/GPU → Sends coins to THEIR wallet
```

### **Common Infection Vectors:**
```
🐛 VULNERABLE APPS: WordPress, Joomla, Jenkins with known exploits
📧 PHISHING: Malicious attachments that install miners
🐳 CONTAINERS: Compromised Docker images with hidden miners
🚀 CI/CD: Compromised build pipelines injecting mining code
```

### **Detection Signs:**
```
📈 CPU USAGE: Consistently high (80-100%) when idle
🌐 NETWORK: Calls to known mining pools (stratum protocol)
💰 BILLING: Unexplained cost spikes
🔥 PERFORMANCE: Legitimate apps running slow
```

### **Stellar Café Cryptojacking Scenario:**
```
ATTACK:
1. Hacker finds exposed Jenkins server at dev.stellar-cafe.com
2. Exploits CVE-2024-12345 to get shell access
3. Downloads and runs XMRig (Monero miner)
4. CPU spikes to 95% on 8 instances ($2,000/month extra cost)
5. Sends mined Monero to hacker's wallet

DETECTION:
- CloudWatch shows abnormal CPU patterns
- VPC Flow Logs show connections to mining pool
- $3,000 unexpected bill this month 😱
```

---

## **🧟 ZOMBIE INSTANCES - The Cloud Undead** 🧟‍♂️☁️

### **What It Is:**
*"Compromised cloud instances controlled by attackers without your knowledge"*

### **The Vibe:**
```
"Your cloud instances are now sleeper agents in someone else's botnet army"
```

### **How They Get Created:**
```
🔓 WEAK CREDENTIALS: Default passwords, exposed API keys
📜 UNPATCHED VULNERABILITIES: Known CVEs not fixed
🌐 MISCONFIGURED SECURITY GROUPS: Open to entire internet  
👥 INSIDER THREATS: Malicious employees or contractors
```

### **What Attackers Do With Zombies:**
```
🤖 BOTNET ACTIVITIES: DDoS attacks, spam campaigns, brute force
🔍 RECONNAISSANCE: Scanning other systems from your IP
💾 DATA EXFILTRATION: Stealing your data slowly
⛏️ CRYPTOJACKING: Using your resources for mining
🎭 HOPPING POINT: Attacking others from your infrastructure
```

### **Detection Signs:**
```
🌐 NETWORK: Unusual outbound traffic patterns
📊 PERFORMANCE: Slowdowns during attack campaigns
🔐 SECURITY: Your IPs getting blacklisted
💰 COST: Unexplained data transfer charges
```

### **Stellar Café Zombie Apocalypse:**
```
ATTACK:
1. Dev instance with SSH port open to 0.0.0.0/0
2. Weak password "password123" brute-forced
3. Instance joins DDoS botnet
4. Used to attack other companies
5. Your AWS account gets abuse complaints

CONSEQUENCES:
- IP addresses blacklisted by security vendors
- Reputation damage ("Stellar Café is attacking us!")
- AWS might suspend your account for TOS violations
```

---

## **📄 METADATA ATTACKS - The Cloud's Secret Backdoor** 📄🔓

### **What It Is:**
*"Exploiting cloud metadata services to steal credentials and escalate privileges"*

### **The Vibe:**
```
"Finding the master keys to your cloud kingdom hidden in a service you didn't know existed"
```

### **What is Cloud Metadata Service?**
```
🏠 BUILT-IN SERVICE: Every cloud instance has one
📡 LOCAL ACCESS: Only accessible FROM the instance
🔧 PURPOSE: Provides instance info (IP, region, credentials)
🌐 URL: http://169.254.169.254/ (AWS), similar for others
```

### **Common Attack Vectors:**

#### **1. SSRF (Server-Side Request Forgery):**
```
VULNERABLE APP → Tricked to call metadata service → Returns IAM credentials
```

#### **2. Instance Metadata Service v1 (IMDSv1):**
```
NO PROTECTION: Any process on instance can access
NO HEADER: Simple HTTP GET requests work
```

#### **3. Compromised Application:**
```
WEB APP HACKED → Attacker gets shell → Curls metadata service → Gets cloud keys
```

### **Real-World Exploit Example:**
```
# Attacker on compromised instance:
curl http://169.254.169.254/latest/meta-data/iam/security-credentials/

# Returns:
my-role

curl http://169.254.169.254/latest/meta-data/iam/security-credentials/my-role

# Returns AWS credentials with admin permissions! 🚨
```

### **Stellar Café Metadata Attack:**
```
ATTACK SCENARIO:
1. Hacker finds SSRF vulnerability in stellar-cafe.com/menu?image=http://internal
2. Requests http://169.254.169.254/latest/meta-data/iam/security-credentials/
3. Gets IAM role credentials with S3 full access
4. Downloads all customer data from S3 buckets
5. Accesses other instances using same credentials

DEFENSE:
- Use IMDSv2 (requires special header, protects against SSRF)
- Apply principle of least privilege to IAM roles
- Regularly scan for SSRF vulnerabilities
```

---

## **🔒 DEFENSE STRATEGIES** 🛡️🎯

### **Against Cryptojacking:**
```
📊 MONITORING: CPU usage alerts, cost anomaly detection
🔐 HARDENING: Regular patching, vulnerability scanning
🚫 CONTAINMENT: Network policies blocking mining pools
🤖 AUTOMATION: Auto-shutdown of suspicious instances
```

### **Against Zombie Instances:**
```
🔍 INVENTORY: Know all your running instances
📜 COMPLIANCE: CIS benchmarks, security scanning
🌐 NETWORK: Minimal security group rules, NACLs
👁️ MONITORING: GuardDuty, VPC Flow Logs analysis
```

### **Against Metadata Attacks:**
```
🆚 IMDSv2: Enforce version 2 (requires special header)
👑 IAM: Least privilege, no admin roles on instances
🔒 NETWORK: Block metadata service from containers if possible
🔍 SCANNING: Regular SSRF vulnerability testing
```

---

## **🚨 EXAM GOLD - What They're Testing** 🥇📚

**Scenario Questions:**
- *"Unexplained CPU spikes and cloud bill increases?"* → **Cryptojacking**
- *"Company IPs being blacklisted for spam/DDoS?"* → **Zombie Instances**
- *"SSRF vulnerability allowing cloud credential theft?"* → **Metadata Attack**
- *"Instance communicating with strange IPs on port 4444?"* → **Cryptojacking pool**

**Key Differentiators:**
```
CRYPTOJACKING = RESOURCE THEFT + CPU/MINING
ZOMBIE INSTANCES = BOTNET + COMPROMISED + DDoS  
METADATA ATTACKS = CREDENTIAL THEFT + IMDS/SSRF
```

---

## **🌟 #DAB'S STEALTH ATTACK WISDOM** 🍃💫

> *"Cryptojacking is the digital squatter - living in your cloud house and running up your electricity bill. Zombie instances are your brainwashed employees - working for the enemy while drawing your salary. Metadata attacks are finding the master keys under the welcome mat - letting attackers walk right into your cloud mansion. The scariest attacks aren't the loud ones that break down doors; they're the silent ones that already live inside."*

**This understanding transforms you from someone who just secures systems to someone who thinks like the stealthy attackers targeting cloud environments!** 🏗️👁️

**You're now aware of the attacks that don't make noise but can cost you millions!** 💸🔒

[...back](../vocabs/4-security.md)
