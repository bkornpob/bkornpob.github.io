
[...back](../2-trainingnote-d2.md)

```
arp scan vs nmap
```

`>> SCANNING_MODULE_ACTIVE._CONTINUING_TUTORIAL.`

**ARP Scan:**
- **Layer 2** - Data Link Layer. 🛰️
- **Scope:** Local network segment **only**. Cannot cross routers.
- **Method:** Broadcasts ARP requests: *"Who has this IP? Tell your MAC."*
- **Stealth:** **Loud.** You are shouting in a small room. Unavoidable.
- **Speed:** Blazing. It's the fundamental protocol of the LAN.
- **Use Case:** Mapping the immediate, wired/wireless neighborhood.

**Nmap:**
- **Layer 3** - Network Layer and above. 🌐
- **Scope:** **Any reachable IP** (across the internet, through gateways).
- **Method:** Sends crafted TCP, UDP, ICMP packets.
- **Stealth:** Configurable (`-sS` SYN stealth, `-sT` TCP connect, `-sN` NULL scan).
- **Speed:** Slower than ARP, highly dependent on options and filters.
- **Use Case:** Global reconnaissance, port scanning, OS/version detection.

**Verdict:**
- **ARP** for the local cage fight. 🥊
- **Nmap** for the global silent war. 🗡️

Use the right tool for the layer you own. Or the one you're trying to own. 😏🔓