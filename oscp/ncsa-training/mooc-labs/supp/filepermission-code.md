
[...back](../../0-landing-ncsaoscp.md)

# 1 chmod 4750

```
what is file permission 4750
```

`>> FILE_PERMISSION_4750_ANALYSIS._SETUID_FEATURE.` 🔐⚡

## **Permission 4750 Breakdown:**

### **Numeric Notation:**
```
4   7   5   0
│   │   │   │
│   │   │   └── Other: No permissions (---)
│   │   │
│   │   └────── Group: Read+Execute (r-x)
│   │
│   └────────── Owner: Read+Write+Execute (rwx)
│
└────────────── Special: SETUID bit enabled
```

### **Symbolic Notation:**
```
-rwsr-x--- 
││││││││││
│││││││││└── Other: No access
││││││││└─── Other: No access  
│││││││└──── Other: No access
│││││││
││││││└───── Group: Execute
│││││└────── Group: No write
││││└─────── Group: Read
││││
│││└──────── Owner: Execute
││└───────── Owner: Write
│└────────── Owner: Read
│
└─────────── SETUID bit (s instead of x)
```

## **Security Implications:**

### **SETUID Bit (The 's'):**
- **Program runs with owner's privileges** regardless of who executes it
- **Dangerous if misconfigured** - privilege escalation vector
- **Common examples:** `passwd`, `sudo`, `mount`

### **Example Scenario:**
```bash
# If this is a binary owned by root
-rwsr-x--- 1 root group /usr/bin/special_tool

# Any user in 'group' can run it with ROOT privileges
```

## **Penetration Testing Relevance:**

### **Privilege Escalation Vector:**
```bash
# Find SETUID files
find / -perm -4000 2>/dev/null

# Find SETUID files owned by root
find / -perm -4000 -user root 2>/dev/null

# Find files with 4750 specifically
find / -perm 4750 2>/dev/null
```

### **Common Exploitation:**
- **SETUID binaries** with vulnerabilities
- **Writable SETUID files** that can be replaced
- **SETUID scripts** that can be manipulated

## **Real-world Example:**

### **If you find:**
```bash
-rwsr-x--- 1 root developers /opt/backup_tool
```

### **You can:**
- Run `/opt/backup_tool` as root if you're in 'developers' group
- Potentially exploit any vulnerabilities in the tool
- Possibly read/write files as root

## **Permission Calculation:**
```
4 (SETUID) + 400 (owner read) + 200 (owner write) + 100 (owner execute) 
+ 040 (group read) + 010 (group execute) + 000 (others) 
= 4750
```

## **Key Takeaway:**
**4750 = SETUID + rwx for owner + r-x for group + no access for others**

*SETUID is power. With great power comes great responsibility... and exploitation opportunities.* 💥🔓

**In pentesting: Always check SETUID binaries - they're prime privilege escalation targets.**

---

# 2 code 4,2,1:rwx

```
it's
1 = read
2 = write
4 = execute?
```

`>> CORRECTION._PERMISSION_BIT_VALUES.` 🔧⚡

**You have it backwards! Here's the correct bit values:**

## **Linux Permission Bits:**

### **Basic Permissions:**
- **4** = READ (r)
- **2** = WRITE (w)  
- **1** = EXECUTE (x)

### **Special Bits:**
- **4** = SETUID (on files) / SETGID (on directories)
- **2** = SETGID (on files)
- **1** = STICKY BIT (on directories)

## **Permission Calculation Examples:**

### **Common Combinations:**
```bash
# Read + Write + Execute = 4+2+1 = 7
# Read + Write = 4+2 = 6
# Read + Execute = 4+1 = 5
# Read only = 4
# Write only = 2
# Execute only = 1
```

### **Full Permission Breakdown:**
```
7 5 5
│ │ │
│ │ └── Others: Read(4) + Execute(1) = 5
│ │
│ └──── Group: Read(4) + Execute(1) = 5  
│
└────── Owner: Read(4) + Write(2) + Execute(1) = 7
```

## **Your 4750 Example Recalculated:**

```
4   7   5   0
│   │   │   │
│   │   │   └── Others: 0 (---)
│   │   │
│   │   └────── Group: 4+1=5 (r-x)
│   │
│   └────────── Owner: 4+2+1=7 (rwx)
│
└────────────── Special: SETUID=4
```

## **Quick Reference Chart:**

| Value | Permission | Binary |
|-------|------------|---------|
| **0** | --- | 000 |
| **1** | --x | 001 |
| **2** | -w- | 010 |
| **3** | -wx | 011 |
| **4** | r-- | 100 |
| **5** | r-x | 101 |
| **6** | rw- | 110 |
| **7** | rwx | 111 |

## **Memory Aid:**
**"Read Write eXecute" = 4-2-1**
- **R**ead = 4 (first letter)
- **W**rite = 2 (second letter) 
- **e**Xecute = 1 (third letter)

*The numbers are powers of 2: 2²=4, 2¹=2, 2⁰=1* 🧠🔢

**So 4750 means: SETUID(4) + Owner(rwx=7) + Group(r-x=5) + Others(---=0)**

---

# 3 find / -perm 4750

`find / -perm 4750 2>/dev/null`
find file with this perm-code

---

[...back](../../0-landing-ncsaoscp.md)
