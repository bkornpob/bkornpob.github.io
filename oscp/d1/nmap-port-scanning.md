```
tell me what i should know about port scanning with nmap
```

---

[...back](../0-landing-oscp+.md)

`>> ACKNOWLEDGED._NMAP_ESSENTIALS._FRAGMENT_MODE._MAXIMUM_DENSITY.` 🗺️⚡

# NMAP PORT SCANNING 🚪🔍

## MUST-KNOW FLAGS:

**`-sS`** 🥷 → **SYN SCAN** (stealthy, requires root)  
**`-sT`** 👊 → **CONNECT SCAN** (loud, no root needed)  
**`-sU`** 🐌 → **UDP SCAN** (painfully slow)  
**`-p-`** 🎯 → **ALL PORTS** (1-65535)  
**`-p 80,443,22`** 🎯 → **SPECIFIC PORTS**  
**`-T4`** ⚡ → **AGGRESSIVE TIMING** (4/5 speed)  
**`-A`** 🎪 → **AGGRESSIVE** (OS + version + scripts)

---

## SCAN STRATEGIES:

**FAST RECON:**  
`nmap -sS --top-ports 1000 -T4 target` 🏃‍♂️💨

**FULL TCP:**  
`sudo nmap -sS -p- -T4 target` 📊🔍

**UDP CRITICAL:**  
`sudo nmap -sU -p 53,161,162 -T4 target` 🐌🎯

**SERVICE DETECTION:**  
`nmap -sV -sC -p 80,443 target` 🔍🛎️

---

## PRO TIPS:

**SPEED TRADE-OFF:**  
Fast scan 🏃‍♂️ → Might miss ports  
Slow scan 🐌 → More accurate

**STEALTH MYTH:**  
All scans are **LOUD** 🔊  
Just **HOW** loud varies

**UDP REALITY:**  
Often skipped 😴  
But critical services live there 🎯

*Scan smart → Find doors → PWN everything* 💥🔓

`- #OG` 🏳️⚡

[...back](../0-landing-oscp+.md)

> [port-scanning-theory](./d1/port-scanning-theory.md)
> [nmap-port-scanning](./d1/nmap-port-scanning.md)
> [or go to tools-lib/nmap](../tools-lib/nmap.md)
> [nmap-sO-flag](./d1/t1-supp/nmap-sO-flag.md)
> [protocol-number](./d1/t1-supp/protocol-number.md)
> [port-number](./d1/t1-supp/port-number.md)
> [nmap-reversednslookup](./d1/t1-supp/nmap-reversednslookup.md)
> [http-request-flow](./d1/t1-supp/http-request-flow.md)
> [tcp-udp-usecase-vulncase](./d1/t1-supp/tcp-udp-usecase-vulncase.md)
> [udp-irl](./d1/t1-supp/udp-irlmd)
> [websockets-tcp](./d1/t1-supp/websockets-tcp.md)
