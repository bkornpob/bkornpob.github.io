```
a bit of a side question i think ... haha

during routering from router-to-router <<< these are the hopping to different ips, right?

does it determine the route before sending out or just determine on-the-fly?
what metrics the system use to determine the best route?
```

---

`>> EXCELLENT_SIDE_QUEST._ROUTING_DECISION_DEEP_DIVE._NEUROSPICY_TANGENT._ENGAGED.` 🗺️🤔⚡

# **ROUTING: PRE-PLANNED 🆚 ON-THE-FLY** 📝🆚🏃‍♂️

## **BOTH! IT'S HYBRID** ✅🔀

### **BEFORE SENDING:** 📝
**ROUTING TABLES:** 🗺️
- **Pre-computed maps** of the network 🗺️
- **"If destination is X, send to router Y"** 🎯
- **Built via routing protocols** (BGP, OSPF) 🤝
- **Static routes** (manual configuration) 👨‍💻

### **ON-THE-FLY:** 🏃‍♂️
**PER-PACKET DECISIONS:** 📨
- **Each packet** checked against routing table 🔍
- **Load balancing** between multiple paths ⚖️
- **Failover** if primary path fails 🔄
- **Quality adjustments** based on current conditions 📊

---

## **ROUTE METRICS: "BEST PATH" CALCULUS** 🧮🎯

### **COMMON METRICS:** 📊
1. **Hop Count** 🔢  
   *"How many routers to cross?"*  
   **Lower = Better** ✅

2. **Bandwidth** 🌊  
   *"How wide is the pipe?"*  
   **Higher = Better** ✅

3. **Delay** ⏱️  
   *"How long does it take?"*  
   **Lower = Better** ✅

4. **Reliability** 🔄  
   *"How often does it break?"*  
   **Higher = Better** ✅

5. **Load** 🏋️‍♂️  
   *"How busy is it right now?"*  
   **Lower = Better** ✅

6. **Cost** 💰  
   *"How much does it cost?"* (ISP bills)  
   **Lower = Better** ✅

---

## **PROTOCOL-SPECIFIC DECISIONS:** 🗣️🎯

### **OSPF (Internal):** 🏢
**Uses: COST** based on bandwidth 💰🌊  
*Formula: 10^8 / Bandwidth (bps)* 🧮  
**Faster links = lower cost** ✅

### **BGP (External):** 🌍
**Uses: POLICY** + multiple attributes 🏛️  
- **AS Path length** 🛣️
- **Local Preference** ❤️
- **Multi-Exit Discriminator** 🚦
- **Origin type** 🎯

---

## **REAL-WORLD EXAMPLE:** 🌍

**Your packet to Google:** 📨
```
YOUR PC → Home Router → ISP Router 1 → ISP Router 2
     ↓
ISP Border Router → Internet Exchange → Google
```
**Each hop:** Checks routing table → Sends to next best hop 🔄

---

## **ATTACKER EXPLOITATION:** 🏴‍☠️🎯

### **ROUTE POISONING:** ☠️
*"My path to Google is shorter!"* 🤥  
**Tools:** `BGPStream`, custom BGP implementations

### **TRAFFIC INTERCEPTION:** 👁️
*"All Facebook traffic should go through me!"* 🎭  
**Real案例:** **2018 Russian ISP hijack** 🇷🇺

### **RESOURCE EXHAUSTION:** 💥
*"Flood routing tables with fake routes"* 🌊  
**Impact:** Router crashes, network instability 💀

---

## **THE BEAUTIFUL CHAOS:** 🌪️✨

**Internet routing =**  
**Part pre-computed map** 🗺️ + **Part real-time negotiation** 🗣️ + **Part business politics** 💼 + **Part technical metrics** 🧮

*Routers: The internet's nervous system making 1000s of decisions per second* ⚡🧠

`- #OG` 🏳️⚡

---

```
so in case of on-the-fly routing, if you can at large scale and if you can hack anything, you can divert all traffics from source to a certain hub (ownage hub), and exfiltrate right?
```

---

`>> AFFIRMATIVE._THE_ULTIMATE_MITM._GLOBAL_TRAFFIC_DIVERSION._NATIONSTATE_LEVEL_ATTACK.` 🌐🎯💀

# **TRAFFIC DIVERSION: ULTIMATE OWNAGE** 🏴‍☠️🌐🔀

## **YES. ABSOLUTELY.** ✅💀
This is the **digital equivalent of redirecting ALL global air traffic** ✈️ to your private airport 🏢.

---

## **HOW IT WORKS:** ⚙️🎯

### **BGP HIJACKING AT SCALE:** 🌍🎭
```
BEFORE:
[Source] → [ISP A] → [ISP B] → [Google] 🛣️

AFTER HIJACK:
[Source] → [ISP A] → **YOUR_MALICIOUS_AS** → [Google] 🎭🛣️
                 ↳ **TRAFFIC INSPECTION/EXFILTRATION** 👁️📡
```

### **THE ATTACK STEPS:** 🏴‍☠️🔢
1. **Acquire AS Number** 🌐 (or compromise one)
2. **Announce false routes** 📢 "I own Google's IP blocks!" 🤥
3. **Internet believes you** 🤝 (BGP = trust-based)
4. **Traffic flows through you** 🌊➡️🏠
5. **Inspect/modify/exfiltrate** 👁️✏️📤

---

## **REAL-WORLD EXAMPLES:** 🌍🎯

### **CHINA TELECOM (2018):** 🇨🇳
- **Hijacked** Western military/government traffic 🎯
- **Duration:** ~ 2 minutes ⏱️
- **Impact:** Global internet traffic rerouted 🌐

### **RUSSIAN ISP (2017):** 🇷🇺  
- **Stole** $150,000 in cryptocurrency 💰
- **Redirected** blockchain traffic 🧊
- **Intercepted** authentication flows 🔑

### **PAKISTAN (2008):** 🇵🇰
- **Accidentally** hijacked YouTube 🎥
- **"Whoops, we broke the internet!"** 😅
- **Global outage** for hours ⏳

---

## **TECHNICAL REQUIREMENTS:** 🛠️🎯

### **WHAT YOU NEED:**
- **Autonomous System (AS) Number** 🌐
- **BGP-speaking routers** 🗺️ (Cisco, Juniper)
- **Internet peering** 🤝 (with other ISPs)
- **Plausible routing announcements** 🗣️

### **ATTACK TOOLS:** 🏴‍☠️
- **BGP implementations:** `BIRD`, `Quagga`, `FRRouting` 🐦
- **Monitoring:** `BGPStream`, `RIPE Stat` 📊
- **Exploitation:** Custom BGP scripts 🐍

---

## **DETECTION & DEFENSE:** 🛡️🔍

### **WHY IT'S HARD TO CATCH:** 🕵️‍♂️
- **BGP = built on trust** 🤝
- **Global scale** 🌍
- **"Normal" routing changes happen constantly** 🔄

### **DEFENSE MECHANISMS:** 🛡️
- **RPKI (Resource Public Key Infrastructure)** 🔐
- **BGP Monitoring** 📊
- **MANRS (Mutually Agreed Norms for Routing Security)** 🤝

---

## **THE ULTIMATE POWER:** 💪🌐

**WITH GLOBAL BGP CONTROL:** 🎮
- **Read everyone's emails** 📧👁️
- **Intercept bank transactions** 💳📊  
- **Manipulate stock markets** 📈🎭
- **Censor entire countries** 🚫🇺🇸
- **Launch undetectable attacks** 👻💥

*This isn't hacking a system - this is **hacking the internet's nervous system**.* 🧠🌐💀

`- #OG` 🏳️⚡  
*Suddenly feeling very small in the face of global routing infrastructure* 😳🌍

---

[...back](../../0-landing-oscp+md)

[or continue in aws-dday and find out...]
```
what about incident like the aws dday... dns error causing dynamoDB unaccessible, symptom timing with geographic moving from EU to US by time of the day... also like users on some platforms noticed their 'friendlist' emptied

these kinds of impacts from aws dday, is it possible to be an attacking of this sense?
```