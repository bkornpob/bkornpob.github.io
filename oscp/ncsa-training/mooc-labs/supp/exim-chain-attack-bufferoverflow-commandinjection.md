
[...back](../14-exim4rce-cve-2019-10149.md)

```
the flag is done, we got it
i'm trying to understand

DeepSearch is on. can you check in the internet of what these 'Received" injections do?

so is it buffer overflow -> crash noob exim session -> default use exim root session -> execute payload in 'rcpt to' as root

like this?
```

Your understanding is very close! The `Received` headers are part of exploiting **CVE-2018-6789**, a separate vulnerability from the command injection in CVE-2019-10149. This was a heap-based **buffer overflow**, not just a session crash, that allowed attackers to overwrite critical memory structures and ultimately achieve remote code execution.

### 🧠 Understanding CVE-2018-6789: The Buffer Overflow

The core of this vulnerability was an **off-by-one error** in the `b64decode` function in `base64.c` . When Exim decoded a specially crafted, invalid base64 string of a specific length (`4n+3`), it would allocate a buffer of `3n+1` bytes but write `3n+2` bytes to it. This resulted in a one-byte overflow, allowing a single, attacker-controlled byte to overwrite memory immediately after the buffer .

This single-byte overflow was powerful because it could corrupt the heap's memory management structures.

### ⚙️ The Path from Overflow to Code Execution

Exploiting this vulnerability was a complex, multi-stage process focused on manipulating Exim's custom memory management system, which uses structures called **storeblocks** .

The general exploitation strategy, as detailed by security researchers, involved these phases :

1.  **Heap Feng Shui**: The attacker first sends a series of specific SMTP commands (like `EHLO` with a very long hostname and unrecognized commands) to shape the heap layout into a desired state. The goal is to place a vulnerable storeblock adjacent to a critical, attacker-influenced storeblock.
2.  **Triggering the Overflow**: The attacker sends a malicious `AUTH` command containing the crafted base64 string. This triggers the off-by-one overflow, corrupting the size field of the adjacent storeblock and making it appear larger than it actually is .
3.  **Creating a Fake Chunk**: By expanding this storeblock, the attacker can make it overlap with another memory region. They then send further data to write a valid storeblock header into this overlapped area, tricking Exim's memory manager into accepting it .
4.  **Hijacking a Storeblock Pointer**: The attacker forces the release of the expanded storeblock and then re-allocates it. By doing so, they can overwrite a pointer within the storeblock chain, redirecting it to point to a storeblock that contains Exim's **Access Control List (ACL) strings** .
5.  **Overwriting ACLs and Gaining RCE**: The final step is to overwrite the content of an ACL string (e.g., `acl_smtp_mail`). Exim expands these strings when processing commands like `MAIL FROM`. If an attacker can change an ACL to contain a command like **`${run{<command>}}`**, Exim will execute that command with root privileges, achieving remote code execution .

The `Received` headers you saw in the proof-of-concept are likely part of the initial heap feng shui process, helping to create the necessary memory layout for the exploit to work.

### 💡 Key Differences Between the Two CVEs

It's helpful to distinguish the two vulnerabilities you've worked with:

| Feature | CVE-2019-10149 | CVE-2018-6789 |
| :--- | :--- | :--- |
| **Type** | Command Injection | Buffer Overflow |
| **Exploitation** | Direct injection via `${run{}}` syntax in `RCPT TO` | Complex multi-stage heap exploitation |
| **Complexity** | Relatively straightforward | Advanced, requires deep heap manipulation |
| **Primary Vector** | `RCPT TO` command | `AUTH` command with crafted base64 data |

I hope this clarifies the sophisticated process behind the CVE-2018-6789 exploit. Your investigation into these vulnerabilities shows great curiosity!