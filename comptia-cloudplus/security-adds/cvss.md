```
author: 51n5337 & #Dab
mission: CompTIA Cloud+ Certification
brief: CVSS Deep Dive. The "Bounty" on the vulnerability's head.
```

---

[...back to 4-security](../vocabs/4-security.md)
# CVSS: Scoring the Digital Wounds 🎯🔢🩸

> *"A CVE is the 'Wanted Poster.' A CVSS score is the **'Bounty'** on that poster. It tells you exactly how dangerous this fugitive really is."*

If CVE-2021-44228 (Log4Shell) is the name and description of the most wanted cyber-criminal in the world, then its **CVSS 10.0** score is the **"ARMED AND EXTREMELY DANGEROUS"** warning in bright red letters. It's the number that tells every security team on the planet to **drop everything and hunt this down.**

Let's break down how that bounty gets calculated.

## **The CVSS Score Breakdown: The Anatomy of Risk** ⚙️🔍

The Common Vulnerability Scoring System (CVSS) v3.1 generates a score from **0.0 (No Risk)** to **10.0 (Critical)**. It’s not a random number—it’s a precise verdict from three groups of metrics.

### **1. Base Score Metrics (The Inherent Flaw)**

This is the core, unchanging nature of the vulnerability itself. It's the "what is it capable of?" before we worry about "where is it?" or "has anyone used it yet?"

*   **Exploitability Metrics:**
    *   **Attack Vector (AV):** How close does the attacker need to be?
        *   **Network (N)** → Over the internet (Worst) 🌐
        *   **Adjacent (A)** → Same local network 🏢
        *   **Local (L)** → Physical or shell access required 💻
        *   **Physical (P)** → Gotta touch the machine 👆
    *   **Attack Complexity (AC):** How many hoops do they have to jump through?
        *   **Low (L)** → No special conditions. It just works. 🎯
        *   **High (H)** → Depends on specific, hard-to-meet configurations. 🎪
    *   **Privileges Required (PR):** What keys do they need to start?
        *   **None (N)** → Anonymous attacker. 😶
        *   **Low (L)** → Basic user privileges. 👤
        *   **High (H)** → Administrator/root access needed. 👑
    *   **User Interaction (UI):** Does it need a sucker to click something?
        *   **None (N)** → Exploits automatically. 🤖
        *   **Required (R)** → Needs a user to open a file, click a link, etc. 🖱️

*   **Impact Metrics:**
    *   **Confidentiality (C), Integrity (I), Availability (A):** The classic CIA triad.
        *   **High (H)** → Total loss / Full compromise 💀
        *   **Low (L)** → Partial loss / Limited compromise 😟
        *   **None (N)** → No impact 🛡️

## **Case Study: CVE-2021-44228 (Log4Shell) - The Perfect 10.0** 💥

Let's dissect the score that shook the internet. Why was this a **CRITICAL 10.0**?

*   **Attack Vector (AV):** **Network** - You can be attacked from anywhere with an internet connection.
*   **Attack Complexity (AC):** **Low** - It's tragically easy to exploit. No PhD required.
*   **Privileges Required (PR):** **None** - The attacker needs ZERO pre-existing access to your system.
*   **User Interaction (UI):** **None** - It triggers automatically. No one has to click anything.
*   **Scope (S):** **Changed** - The vulnerability lets the attacker break out of the vulnerable application and compromise other parts of the system.
*   **Impact:**
    *   **Confidentiality (C):** **High** - They can read all your secrets.
    *   **Integrity (I):** **High** - They can change, delete, or corrupt your data.
    *   **Availability (A):** **High** - They can shut everything down.

**The Verdict:** A remote, unauthenticated attacker can trivially execute any code they want with maximum impact. That's a perfect storm. That's a **10.0**.

## **Case Study: CVE-2022-0995 (A Linux Kernel Flaw) - The 7.8 HIGH** 🐧

Contrast this with a serious, but less apocalyptic, flaw.

*   **Attack Vector (AV):** **Local** - The attacker must already have shell access to the machine.
*   **Attack Complexity (AC):** **Low** - Still easy to exploit *if you're already on the box*.
*   **Privileges Required (PR):** **Low** - Needs basic user privileges.
*   **User Interaction (UI):** **None** - No user action needed.
*   **Scope (S):** **Unchanged** - The impact is contained to the component itself.
*   **Impact:**
    *   **Confidentiality (C):** **High**
    *   **Integrity (I):** **High**
    *   **Availability (A):** **High**

**The Verdict:** It's still devastating (*High* impact on all three), but the **Local Attack Vector** is the key limiter. The attacker must already have a foothold. This prevents a 10.0 score, making it a **High (7.8)** instead of a **Critical**.

## **The Triage Takedown: What The Score Means For You** 🚑➡️🏥

*   **9.0 - 10.0 (Critical):** **"All hands on deck."** This is a five-alarm fire. Patch immediately, work overtime. Your systems are actively at risk.
*   **7.0 - 8.9 (High):** **"Priority one."** Significant risk. Create a plan and deploy patches swiftly, outside of normal change windows if possible.
*   **4.0 - 6.9 (Medium):** **"Schedule it."** Real risk, but often requires specific conditions or has limited impact. Don't ignore it, but don't panic.
*   **0.1 - 3.9 (Low):** **"Consider the context."** Often minor issues that are difficult to exploit. Patch during normal maintenance.

### **#Dab's Final Toke of Wisdom** 🌿💭

> "The CVSS score is your triage compass. It tells you which wounds are paper cuts and which are arterial bleeding. Ignoring a high score isn't being busy—it's being a negligent digital doctor. Heed the bounty. Patch the vuln. Sleep well."

**This completes our deep dive into CVSS!** Now you don't just see the Wanted Poster—you understand the price on their head.

**Back to the main security fortress?** 🏰🔒
[Yes, take me back to 4-Security](../vocabs/4-security.md)
