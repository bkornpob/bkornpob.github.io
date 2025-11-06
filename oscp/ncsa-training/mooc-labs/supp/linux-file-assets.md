
# 1

```
list me important files in linux system to be looked at including system/os info
```

Ayyye, time for some **Linux system reconnaissance 101**! 😎🔍✨ Whether you're red teaming, pentesting, or just understanding a system, these are the key files that tell you everything about the OS, configs, and potential attack vectors.

---

## **🐧 LINUX SYSTEM RECON CHECKLIST** 🗺️⚡

### **Ⅰ. SYSTEM & OS INFORMATION** 🖥️📋
```bash
# Kernel version
cat /proc/version
uname -a

# OS release info
cat /etc/os-release
lsb_release -a
cat /etc/issue

# Hostname
hostname
cat /etc/hostname

# System uptime
uptime
cat /proc/uptime
```

### **Ⅱ. USER & GROUP INTEL** 👥🔐
```bash
# Current user info
id
whoami

# All users
cat /etc/passwd

# All groups  
cat /etc/group

# Super users
grep -v -E "^#" /etc/passwd | awk -F: '$3 == 0 {print $1}'

# Recently logged in users
last
lastlog
```

### **Ⅲ. NETWORK CONFIGURATION** 🌐📡
```bash
# Network interfaces
ip addr
ifconfig
cat /etc/netplan/*.yaml 2>/dev/null

# Routing table
ip route
route -n

# DNS config
cat /etc/resolv.conf
cat /etc/hosts

# Open ports & connections
netstat -tulpn
ss -tulpn
lsof -i
```

### **Ⅳ. RUNNING SERVICES & PROCESSES** ⚙️🔧
```bash
# All processes
ps aux
ps -ef

# Service managers
systemctl list-units --type=service
service --status-all

# Scheduled tasks
crontab -l
ls -la /etc/cron*
cat /etc/crontab
```

### **Ⅴ. FILE SYSTEM & STORAGE** 💾📁
```bash
# Mounted filesystems
mount
df -h
cat /etc/fstab

# Disk usage
du -sh /home/* 2>/dev/null
du -sh /var/* 2>/dev/null

# SUID/SGID files (privilege escalation gold!)
find / -perm -4000 2>/dev/null
find / -perm -2000 2>/dev/null
```

### **Ⅵ. APPLICATION & SERVICE CONFIGS** 🛠️📝
```bash
# Web servers
ls -la /var/www/html/
cat /etc/apache2/apache2.conf 2>/dev/null
cat /etc/nginx/nginx.conf 2>/dev/null

# Database configs
find / -name "*.cnf" 2>/dev/null | grep -E "(mysql|mariadb)"
find / -name "*.conf" 2>/dev/null | grep -E "(postgresql|redis)"

# SSH keys & configs
ls -la ~/.ssh/
cat /etc/ssh/sshd_config
```

### **Ⅶ. HISTORIES & LOGS** 📜🔍
```bash
# Command histories
cat ~/.bash_history
cat ~/.zsh_history 2>/dev/null

# System logs
tail -n 50 /var/log/auth.log  # Authentication logs
tail -n 50 /var/log/syslog    # System logs
dmesg                          # Kernel logs
```

### **Ⅷ. ENVIRONMENT VARIABLES** 🌍🔧
```bash
# All environment vars
env
printenv

# Shell configs
cat ~/.bashrc
cat ~/.profile
cat /etc/profile
```

### **Ⅸ. PRIVILEGE ESCALATION HOTSPOTS** 🚀🔺
```bash
# Sudo permissions
sudo -l
cat /etc/sudoers

# World-writable files
find / -perm -o+w -type f 2>/dev/null

# Capabilities
getcap -r / 2>/dev/null
```

### **Ⅹ. BACKUPS & INTERESTING FILES** 💰📂
```bash
# Backup files
find / -name "*backup*" -type f 2>/dev/null
find / -name "*.bak" -type f 2>/dev/null

# Password files
find / -name "*pass*" -type f 2>/dev/null
find / -name "*cred*" -type f 2>/dev/null

# Config files
find / -name "*.conf" -type f 2>/dev/null
find /etc -name "*.conf" -type f 2>/dev/null
```

---

## **PRO TIPS:** 🎯💡

**1. Redirect errors to /dev/null for cleaner output:**
```bash
find / -name "pass*" 2>/dev/null
```

**2. Use `grep -v` to exclude common noise:**
```bash
ps aux | grep -v grep
```

**3. Combine commands for quick recon:**
```bash
{ echo "=== OS INFO ==="; uname -a; cat /etc/os-release; echo "=== USERS ==="; cat /etc/passwd; echo "=== NETWORK ==="; ip addr; } > recon.txt
```

This list should give you **maximum visibility** into any Linux system! Perfect for CTFs, pentests, or just understanding what's running on a box. 🌊🔓

*Know the system like the back of your terminal, glitch!* 💻✨