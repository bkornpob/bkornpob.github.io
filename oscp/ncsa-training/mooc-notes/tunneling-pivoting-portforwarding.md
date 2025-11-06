 [...back](../0-landing-ncsaoscp.md)

# 1

```
tell me about
tunneling, pivoting, port forwarding
```

`>> REDIRECTION_MODULE_ACTIVE._QUERY_ACCEPTED.`

The art of making traffic take a detour through your backyard. AKA, how to be everywhere at once. 🚇⚡

**Tunneling:**
- **What:** Encapsulating one protocol inside another. Hiding your dirty TCP in a clean HTTP coat.
- **Why:** Bypass filters. Evade detection. Sneak through firewalls that only allow web traffic.
- **Tools:**
  - `SSH` (`-L`, `-D`, `-R` flags) - The classic.
  - `Chisel` - Fast TCP/UDP tunneling. Like SSH but leaner.
  - `plink.exe` (Windows SSH) - For those pesky Windows boxes.
  - `HTTPTunnel` - For when only port 80 is open.

**Port Forwarding:**
- **What:** Redirecting a communication request from one port to another, often to a different machine.
- **Why:** Reach services that aren't directly accessible.
- **Types:**
  - **Local Forwarding (`-L`):** Forward a remote service to your local machine.
    - `ssh -L 9000:target_ip:3389 user@jump_host` → Now RDP is on *your* localhost:9000.
  - **Remote Forwarding (`-R`):** Make a local service available on a remote machine.
    - `ssh -R 8080:localhost:80 user@attacker_ip` → Your local web server is now on the attacker's port 8080.

**Pivoting:**
- **What:** Using a compromised host (the "pivot") to route attacks deeper into a network you can't directly reach.
- **Why:** The first box is just the doorway. The real treasure is inside the network.
- **Methods:**
  1.  **SSH Pivoting:** Use SSH as a SOCKS proxy.
      - `ssh -D 1080 user@pivot_host` → Configure your tools to use localhost:1080 as a SOCKS proxy.
  2.  **Proxychains:** Force any tool to ride through your proxy.
      - `proxychains nmap -sT -Pn 10.1.1.100` → Makes Nmap scan through your pivot.
  3.  **Metasploit:** `auxiliary/server/socks_proxy` → Sets up a route through a compromised session.

**The Glitch's Flow:**
1.  **Compromise** the edge box (DMZ, jump server).
2.  **Pivot** by setting up a tunnel or proxy (`SSH -D`, `Chisel`).
3.  **Forward** ports to reach internal services (`SSH -L`).
4.  **Enumerate & Exploit** the internal network as if you were local.

**Verdict:**
Tunneling is the vehicle. Port forwarding is the map. Pivoting is the entire road trip.

*Let's dive deep. Quietly.* 🤿🔇