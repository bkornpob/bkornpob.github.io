
[...back](../2-samba-rce-cve-2017-7494.md)

# 1

```
2>/dev/null

this kind of directives like those & 0 /dev/sda ... yada yada yada

i need to learn more can you give me a quick rundown
```

`>> FILE_DESCRIPTOR_REDIRECTION._QUICK_MASTERCLASS.` 📚⚡

## **Linux File Descriptors:**

### **Standard File Descriptors:**
- **0** - STDIN (Standard Input)
- **1** - STDOUT (Standard Output)  
- **2** - STDERR (Standard Error)

## **Redirection Syntax:**

### **Basic Redirection:**
```bash
# Redirect STDOUT to file
command > file.txt

# Redirect STDOUT (append)
command >> file.txt

# Redirect STDERR to file
command 2> error.log

# Redirect both STDOUT and STDERR to file
command &> output.log
command > output.log 2>&1
```

### **The Magic: `2>/dev/null`**
```bash
# Send STDERR to /dev/null (black hole)
find / -name "flag.txt" 2>/dev/null
```
- **2>** - Redirect file descriptor 2 (STDERR)
- **/dev/null** - Null device (discards everything)

## **Common Penetration Testing Uses:**

### **1. Suppress Permission Errors:**
```bash
# Without suppression - messy output
find / -name "passwd"
# Permission denied errors everywhere

# With suppression - clean output
find / -name "passwd" 2>/dev/null
# Only shows successful finds
```

### **2. Hide Error Messages:**
```bash
# Noisy command
ls /root/ /nonexistent/

# Clean output
ls /root/ /nonexistent/ 2>/dev/null
```

### **3. Discard Unwanted Output:**
```bash
# Only care about success
wget http://target.com/shell.php 2>/dev/null
```

## **Advanced Redirection Patterns:**

### **Separate Output Streams:**
```bash
# Success to one file, errors to another
command > success.log 2> error.log
```

### **Combine Streams:**
```bash
# Both STDOUT and STDERR to same file
command > combined.log 2>&1
```

### **Discard Everything:**
```bash
# Complete silence
command > /dev/null 2>&1
```

### **Pipeline with Error Suppression:**
```bash
find / -type f 2>/dev/null | grep password
```

## **Practical Examples:**

### **Clean Nmap Output:**
```bash
nmap -sS target 2>/dev/null | grep "open"
```

### **Quiet Directory Busting:**
```bash
gobuster dir -u http://target.com -w wordlist.txt 2>/dev/null
```

### **Stealthy Download:**
```bash
wget http://target.com/exploit -O /tmp/exploit 2>/dev/null
```

## **Special Files:**

- **/dev/null** - Discards everything
- **/dev/zero** - Provides null bytes
- **/dev/random** - Random data generator
- **/dev/urandom** - Faster random data

## **Quick Reference:**

| Command | Effect |
|---------|--------|
| `> file` | STDOUT to file |
| `2> file` | STDERR to file |
| `&> file` | Both to file |
| `2>/dev/null` | Hide errors |
| `> /dev/null 2>&1` | Complete silence |

*Silence the noise. Focus on the signal.* 🔇🎯

**In pentesting: Use `2>/dev/null` to hide permission errors and clean up output during reconnaissance.**

---

[...back](../2-samba-rce-cve-2017-7494.md)
