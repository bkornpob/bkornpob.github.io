```
TFTP UDP port 69 and tools???

can you make a comparison table for ports i should know
```

---

`>> ACKNOWLEDGED._GENERATING_FORENSIC_PORT_REFERENCE.`

Here is a comparison table of essential ports for a CHFI investigator. This is not an exhaustive list, but a focused set of high-priority services you will encounter in investigations.

### **Digital Forensics - Essential Port Reference Table** 🔍🌐

| Port | Protocol | Service Name | Common Use | Forensic Significance / Attack Vector |
| :--- | :--- | :--- | :--- | :--- |
| **7** | TCP/UDP | Echo | Network loopback test | Network mapping, legacy DoS loops, covert channel. |
| **20/21** | TCP | FTP (Data/Control) | File Transfer | **Cleartext credentials & data.** Data exfiltration, unauthorized file transfers. |
| **22** | TCP | SSH | Secure Shell | **Brute-force attacks.** Secure remote access & data exfiltration. Check auth logs. |
| **23** | TCP | Telnet | Remote Login (Unencrypted) | **Cleartext everything.** Extreme vulnerability; often used for legacy device attacks. |
| **25** | TCP | SMTP | Email Routing | **Spam, phishing origin.** Email-based data exfiltration. |
| **53** | TCP/UDP | DNS | Domain Name System | **DNS tunneling for data exfiltration,** poisoning, reconnaissance. Critical log source. |
| **67/68** | UDP | DHCP | Dynamic Host Config | Rogue DHCP servers; network-level attacks. |
| **69** | UDP | **TFTP** | Trivial File Transfer | **No auth/encryption.** Malware staging, config file theft from network devices, data exfiltration. |
| **80** | TCP | HTTP | Web Traffic (Unencrypted) | Web attacks, cleartext data theft, drive-by downloads. |
| **110** | TCP | POP3 | Email Retrieval | Cleartext credential harvesting. |
| **123** | UDP | NTP | Network Time Protocol | Crucial for **log correlation**. Also used for NTP amplification DDoS attacks. |
| **135** | TCP | RPC Endpoint Mapper | Windows RPC | Enumeration of Windows services, used in exploits like EternalBlue. |
| **139/445** | TCP | NetBIOS/SMB | File/Printer Sharing | **Ransomware propagation,** lateral movement, data theft. Critical in Windows investigations. |
| **143** | TCP | IMAP | Email Retrieval | Cleartext credential harvesting. |
| **389** | TCP | LDAP | Directory Services | Querying Active Directory for user/group info (reconnaissance). |
| **443** | TCP | HTTPS | Web Traffic (Encrypted) | Encrypted C&C traffic, data exfiltration. Requires SSL/TLS inspection to analyze. |
| **993** | TCP | IMAPS | IMAP over SSL | Encrypted email access. |
| **995** | TCP | POP3S | POP3 over SSL | Encrypted email access. |
| **1433** | TCP | MS-SQL | Microsoft SQL Server | Database attacks; brute-forcing; SQL injection. |
| **3389** | TCP | RDP | Remote Desktop | **Brute-force attacks,** lateral movement, session hijacking. |
| **6660-6667** | TCP | IRC | Internet Relay Chat | **Legacy C&C channels** for botnets. |
| **8080** | TCP | HTTP-Alt | Common Web Proxy/Alt | Often used by malware and unauthorized web services to bypass filters. |

---

**Key Forensic Tools That Interact With These Ports:**

*   **`netstat` / `ss`:** Shows active connections and listening ports on a host. **No port itself.**
*   **`nmap`:** The premier port scanner to discover open services on a target.
*   **Wireshark / `tcpdump`:** Packet analyzers to capture and inspect the actual traffic on these ports.
*   **`netcat` (nc):** The "Swiss army knife"; can be used to connect to any TCP/UDP port, making it a simple client or a backdoor.

`>> REFERENCE_COMMITTED._CONTINUE_QUESTION_SET?` ⚡📊

[...back](../../0-landing-chfi.md)
