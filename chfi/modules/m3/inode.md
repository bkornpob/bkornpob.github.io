# 1
```
what is inode
```

---

`>> ACKNOWLEDGED._INODE_DEEP_DIVE._LINUX_FILE_SYSTEM_CORE_CONCEPT.` 🐧🔍⚡

# **INODE: THE HEART OF UNIX/LINUX FILE SYSTEMS** 🐧❤️🔧
*Understanding the fundamental building block of Linux file storage*

---

## **I. INODE CONCEPT: THE FILE'S ID CARD** 🪪📁

### **WHAT IS AN INODE?**
**Inode** = **Index Node** - A data structure that stores **all information about a file EXCEPT its name and actual content**

```bash
# Simple analogy:
FILENAME: "report.pdf" (just a label pointing to the inode)
INODE: The actual file identity (metadata + data location)
DATA: The actual file content "lives" elsewhere
```

### **KEY INSIGHT:** 🎯🔍
**Inodes store METADATA about files, not the file data itself.**

---

## **II. INODE STRUCTURE: WHAT'S INSIDE** 🏗️📊

### **COMPLETE INODE CONTENTS:**

```c
// Simplified inode structure (typical):
struct inode {
    uint16_t i_mode;           // File type + permissions
    uint16_t i_uid;            // Owner user ID
    uint16_t i_gid;            // Owner group ID  
    uint64_t i_size;           // File size in bytes
    uint64_t i_blocks;         // Number of 512-byte blocks
    struct timespec i_atime;   // Last access time
    struct timespec i_mtime;   // Last modification time
    struct timespec i_ctime;   // Last inode change time
    uint64_t i_links;          // Hard link count
    uint32_t i_flags;          // File flags
    uint64_t i_block[15];      // Pointers to data blocks
    // ... other fields
};
```

### **WHAT INODES CONTAIN vs WHAT THEY DON'T:**

| **STORED IN INODE** | **NOT STORED IN INODE** |
|---------------------|------------------------|
| ✅ File permissions | ❌ File name |
| ✅ File size | ❌ File content |
| ✅ Timestamps (3 types) | ❌ Directory location |
| ✅ Owner/Group IDs | ❌ Parent directory |
| ✅ Hard link count |  |
| ✅ Data block pointers |  |

---

## **III. INODE NUMBER: THE FILE'S SOCIAL SECURITY** 🔢🏷️

### **INODE NUMBER SYSTEM:**
```bash
# Every file has a unique inode number:
ls -i filename.txt              # Show inode number
stat filename.txt               # Detailed inode information

# Example output:
$ ls -i report.pdf
1234567 report.pdf

# This means:
• "report.pdf" points to inode #1234567
• Inode #1234567 contains all file metadata
• The actual data is stored elsewhere
```

### **INODE NUMBER USAGE:**
```bash
# Finding files by inode:
find / -inum 1234567 2>/dev/null    # Find file with specific inode
debugfs -R "ncheck 1234567" /dev/sda1  # EXT4 inode lookup

# Inode number persistence:
• Inode numbers remain constant until file deletion
• Even if file is moved/renamed, inode number stays same
• Hard links share the same inode number
```

---

## **IV. HOW INODES WORK WITH DIRECTORIES** 📁🔗

### **DIRECTORY STRUCTURE:**
```bash
# A directory is just a special file containing:
[filename1][inode_number1]
[filename2][inode_number2] 
[filename3][inode_number3]
...

# Example directory content:
"report.pdf" → 1234567
"data.csv" → 1234568  
"backup.zip" → 1234569
```

### **THE FILE LOOKUP PROCESS:** 🔄🎯

```c
// What happens when you open "/home/user/report.pdf":
1. Start at root directory inode (always #2)
2. Look up "home" → get inode number for /home
3. Open /home directory → look up "user" → get inode number for /home/user
4. Open /home/user directory → look up "report.pdf" → get inode number 1234567
5. Open inode 1234567 → read metadata and data block pointers
6. Access actual file data from data blocks
```

---

## **V. INODE TYPES & PERMISSIONS** 📋🎭

### **FILE TYPE INDICATORS:**
```bash
# i_mode field bits:
• Regular file:          - (0o100000)
• Directory:             d (0o040000) 
• Symbolic link:         l (0o120000)
• Character device:      c (0o020000)
• Block device:          b (0o060000)
• FIFO/Named pipe:       p (0o010000)
• Socket:                s (0o140000)

# Check file type:
ls -l filename          # First character shows type
stat filename           # Shows detailed file type
```

### **PERMISSION BITS:**
```bash
# Permission breakdown (rwxrwxrwx):
Owner:  rwx (read, write, execute)
Group:  rwx (read, write, execute)  
Others: rwx (read, write, execute)

# Examples:
-rwxr-xr--   # Regular file, owner: rwx, group: r-x, others: r--
drwx------   # Directory, only owner has access
lrwxrwxrwx   # Symbolic link, permissions are ignored
```

---

## **VI. INODE LIMITS & MANAGEMENT** 📏⚙️

### **INODE EXHAUSTION:**
```bash
# Common problem: Out of inodes
df -i                      # Check inode usage
Filesystem     Inodes IUsed IFree IUse% Mounted on
/dev/sda1      655360 655360     0  100% /

# Symptoms:
• "No space left on device" but df shows free space
• Cannot create new files or directories
• Caused by many small files exhausting inode table
```

### **INODE ALLOCATION:**
```bash
# File system creation options:
mkfs.ext4 -N 1000000 /dev/sda1    # Create with 1 million inodes
tune2fs -l /dev/sda1              # Show inode information

# Typical defaults:
• 1 inode per 16KB of disk space (configurable)
• Inode table created at file system format
• Fixed number of inodes (can't easily increase)
```

---

## **VII. FORENSIC IMPLICATIONS** 🔍⚖️

### **INODE-BASED EVIDENCE:** 📝🔍

#### **DELETED FILE RECOVERY:**
```bash
# Even after deletion:
• Inode may persist until overwritten
• Data blocks may still contain file content
• File carving can recover data from freed blocks

# Recovery commands:
debugfs /dev/sda1
debugfs: lsdel                  # List deleted inodes
debugfs: stat <1234567>         # Examine deleted inode
debugfs: dump <1234567> recovered_file  # Recover data
```

#### **TIMELINE ANALYSIS:**
```bash
# Three crucial timestamps:
• i_atime: Last ACCESS (read, execution)
• i_mtime: Last MODIFICATION (content change)  
• i_ctime: Last CHANGE (metadata change)

# Forensic value:
• ctime changes when permissions, ownership, links change
• mtime changes when file content changes
• atime changes when file is read (can be disabled)
```

### **INVESTIGATIVE COMMANDS:** 🛠️🔧

#### **INODE EXAMINATION:**
```bash
# Basic inode information:
ls -i file.txt                  # Show inode number
stat file.txt                   # Detailed inode data

# Advanced inode forensics:
icat /dev/sda1 1234567          # Extract data from specific inode
istat /dev/sda1 1234567         # Detailed inode information
fls -r /dev/sda1                # List all files with inode numbers
```

#### **DELETED FILE ANALYSIS:**
```bash
# Find and recover deleted files:
# Using The Sleuth Kit:
ils /dev/sda1                   # List all inodes (allocated + unallocated)
icat /dev/sda1 1234567 > recovered_file  # Recover from inode

# Using debugfs:
debugfs /dev/sda1
debugfs: lsdel                  # Show deleted inodes
debugfs: mi <1234567>           # Show inode information
```

---

## **VIII. INODES vs OTHER FILE SYSTEMS** ⚖️🔀

### **COMPARISON WITH WINDOWS NTFS:**

| **Feature** | **Linux Inode** | **Windows NTFS MFT Entry** |
|-------------|-----------------|----------------------------|
| **Metadata Storage** | Inode structure | $MFT record |
| **File Identification** | Inode number | File reference number |
| **Data Location** | Block pointers | Data runs |
| **Timestamps** | atime, mtime, ctime | Created, Modified, Accessed, MFT changed |
| **Permissions** | Mode bits + UID/GID | ACLs |
| **Hard Links** | ✅ Supported | ✅ Supported |

### **MODERN EXTENSIONS:**

#### **EXT4 EXTENTS:**
```bash
# Traditional vs Modern:
• EXT2/3: Direct/indirect blocks (i_block[15])
• EXT4: Extents (efficient for large files)

# Extent structure:
struct ext4_extent {
    uint32_t ee_block;    // First logical block
    uint16_t ee_len;      // Number of blocks
    uint64_t ee_start;    // First physical block
};
```

---

## **IX. PRACTICAL EXAMPLES** 💻🎯

### **INODE EXPLORATION SESSION:**
```bash
# Let's explore a real file:
$ touch testfile.txt
$ ls -li testfile.txt
1234568 -rw-r--r-- 1 user user 0 Jan 1 12:00 testfile.txt

$ stat testfile.txt
  File: testfile.txt
  Size: 0          Blocks: 0          IO Block: 4096   regular empty file
Device: 801h/2049d Inode: 1234568     Links: 1
Access: (0644/-rw-r--r--)  Uid: ( 1000/    user)   Gid: ( 1000/    user)
Access: 2024-01-01 12:00:00.000000000 +0000
Modify: 2024-01-01 12:00:00.000000000 +0000
Change: 2024-01-01 12:00:00.000000000 +0000

# Create a hard link (same inode):
$ ln testfile.txt hardlink.txt
$ ls -li *.txt
1234568 -rw-r--r-- 2 user user 0 Jan 1 12:00 hardlink.txt
1234568 -rw-r--r-- 2 user user 0 Jan 1 12:00 testfile.txt
# Same inode, link count now 2
```

### **INODE RECOVERY DEMO:**
```bash
# Recover deleted file by inode:
# 1. Find deleted inode
$ debugfs /dev/sda1
debugfs: lsdel
Inode  Owner  Mode    Size    Blocks   Time deleted
1234569 1000  100644  1024    2/   2  Mon Jan 1 12:05:00 2024

# 2. Recover it
debugfs: dump <1234569> /tmp/recovered_file

# 3. Verify recovery
$ file /tmp/recovered_file
/tmp/recovered_file: PDF document, version 1.4
```

---

## **X. ADVANCED INODE CONCEPTS** 🚀🧠

### **INODE ALLOCATION STRATEGIES:**

#### **DYNAMIC INODE ALLOCATION:**
```bash
# Some file systems (XFS, BtrFS) allocate inodes dynamically
# Benefits:
• No inode exhaustion problems
• More efficient space usage
• Better performance for many small files

# EXT4: Fixed inode table at creation
# XFS: Inodes allocated as needed
```

### **INODE CACHE PERFORMANCE:**
```bash
# Kernel inode cache:
• Recently accessed inodes kept in memory
• Speeds up file operations
• Can be examined via /proc/slabinfo

# Performance impact:
• inode_cache hits avoid disk reads
• Large directories benefit from caching
• Cache pressure can affect system performance
```

---

`>> INODE_MASTERY_ACHIEVED._LINUX_FILE_SYSTEM_FUNDAMENTALS_DECODED._FORENSIC_ANALYSIS_ENHANCED.` 🐧🔍✅

**Bottom Line:** Inodes are the fundamental metadata containers in Linux file systems—they store everything about a file except its name and content. Understanding inodes is crucial for Linux forensics, data recovery, and system administration.

`- #OG` 🏳️⚡  
*Think of inodes like library index cards: The card (inode) tells you everything about the book—author, size, location, last checkout—but doesn't contain the actual story. The filename is just how you ask for the book, and the bookshelf holds the actual content.* 📚📇📖

**Remember: Inodes are the soul of Linux files. Learn to read them, and you'll understand the true story of the data.** 🧠🔍💾

---

**Ready to explore:**
[ ] **EXT4 extent-based allocation**
[ ] **Inode-based anti-forensics techniques**  
[ ] **Cross-file system inode comparisons**
[ ] **Advanced inode recovery methods**

The inode investigation continues... 🎯🔍

[...back](./m3-ncsaslides.md)
