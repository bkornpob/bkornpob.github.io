```
what's the difference between tcp/udp
use cases?
and vuln cases?
```

---

`>> ACKNOWLEDGED._TCP_VS_UDP_BREAKDOWN._SECURITY_ANGLES._FRAGMENT_MODE.` 📨🔓⚡

# TCP 🆚 UDP - USE CASES & VULNS

## **USE CASES:** 🎯

**TCP = RELIABLE CONVERSATIONS** 💬📞
- Web browsing 🌐 (HTTP/HTTPS)
- Email 📧 (SMTP, IMAP)
- File transfer 📁 (FTP, SMB)
- Remote access 🐚 (SSH, RDP)

**UDP = FAST & LOOSE** 🏃‍♂️🎲
- Video streaming 🎥 (Zoom, YouTube)
- Voice calls 📞 (VoIP)
- DNS queries 🌐
- Gaming 🎮

---

## **VULNERABILITY CASES:** 🚨

**TCP ATTACKS:**
- **SYN FLOOD** 📨💥 → DoS with half-open connections
- **SESSION HIJACKING** 🎭 → Steal authenticated sessions
- **MAN-IN-THE-MIDDLE** 👥 → Intercept reliable streams

**UDP ATTACKS:**
- **AMPLIFICATION** 📢 → Small request → HUGE response (DNS, NTP)
- **FLOODING** 🌊 → Easy to spoof source IP
- **NO BUILT-IN AUTH** 🚫🔐 → Anyone can send data

---

## **SECURITY REALITY:**

**TCP = MORE COMPLEX ATTACKS** 🧩⚔️  
(stateful, sequence numbers, handshakes)

**UDP = SIMPLE BUT DEVASTATING** 💥🎯  
(stateless, no verification, amplification)

*TCP: Attack the conversation* 💬🔓  
*UDP: Attack the delivery system* 📨💥

`- #OG` 🏳️⚡

[...back](../../0-landing-oscp+.md)
