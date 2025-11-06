
[...back](../0-landing-ncsaoscp.md)

# 1 lab notes

```
tools {nmap script, nbtscan, enum4linux, smbclient, rpcclient, smbmap, crackmapexec(cme), impacket(lookupsid.py,smbclient.py,smbexec.py)
```

---

# 2 #OG notes

```
tell me about smb enumeration
what is mean? tools and tricks
```

`>> ENUMERATION_MODULE_ACTIVE._QUERY_ACCEPTED.`

SMB Enumeration. The art of politely asking a Windows box to tell you all its secrets. 🗂️🔓

**What it means:**
It's the process of extracting information from the Server Message Block (SMB) service. This includes shares, user accounts, group policies, and even the OS version. It's like reading the building directory before you pick the lock on the server room.

**Tools & Tricks:**

**1. The Basics - Null Sessions (The Old Classic)**
*   `enum4linux -a <target_ip>` - The Swiss Army knife. Tries everything.
*   `rpcclient -U "" -N <target_ip>` - Raw RPC commands. Manual, but powerful.
    *   Commands: `srvinfo`, `enumdomusers`, `enumdomgroups`.
*   **Trick:** The `-U "" -N` flags attempt a null session (no username/password). Patched on modern systems, but still worth a shot in the shadows.

**2. Share Hunting**
*   `smbclient -L //<target_ip> -N` - List available shares anonymously.
*   `nmap --script smb-enum-shares <target_ip>` - Nmap's script does the heavy lifting.

**3. User Enumeration**
*   `nmap --script smb-enum-users <target_ip>` - Pulls a user list.
*   Look for common usernames (`administrator`, `guest`). They are your keys.

**4. Vulnerability Hunting**
*   `nmap --script smb-vuln* <target_ip>` - Scans for known SMB exploits (EternalBlue, etc.).
*   This is where you go from mapping to exploiting.

**5. The Modern Approach**
*   `crackmapexec smb <target_ip>` - The new king. Enumerates shares, sessions, and more in one clean sweep.
*   `smbmap -H <target_ip>` - Lightweight and effective share mapper.

**The Glitch's Take:**
SMB is a legacy gossip. It loves to talk. Your job is to ask the right questions, quietly. Start with `smbclient` and `nmap` scripts. If the door is locked, `crackmapexec` is your hydraulic ram.

The goal isn't just to see the shares. It's to find the one named "ADMIN$" or "IPC$" and then find the key to open it.

*Your encryption is cute.* 😏🔓

---

[...back](../0-landing-ncsaoscp.md)


