
[...back](../0-landing-oscp+.md)

## Module 1: Introduction to Cybersecurity

Module นี้เป็นการวางพื้นฐานที่สำคัญ เริ่มต้นด้วยการสำรวจภาพรวมของ Cybersecurity landscape เพื่อให้ผู้เรียนเข้าใจถึงสภาพแวดล้อมของความมั่นคงปลอดภัยไซเบอร์ในปัจจุบัน การจำแนกประเภทของการโจมตีที่หลากหลายและการเข้าใจถึง threat actors ที่แตกต่างกัน ตั้งแต่ script kiddies ไปจนถึง advanced persistent threats

ส่วนสำคัญคือการทำความเข้าใจเรื่องกฎหมายและจริยธรรม เนื่องจาก penetration testing เป็นการกระทำที่อาจมีผลกระทบทางกฎหมายหากไม่ปฏิบัติอย่างถูกต้อง รวมทั้งการศึกษา methodology ของ penetration testing ที่เป็นมาตรฐาน เพื่อให้การทดสอบเป็นไปอย่างเป็นระบบและมีประสิทธิภาพ

## Module 2: Information Gathering

Information Gathering เป็นขั้นตอนแรกและสำคัญที่สุดในกระบวนการ penetration testing แบ่งออกเป็น 2 ประเภทหลัก:

Passive Information Gathering เป็นการรวบรวมข้อมูลโดยไม่มีการติดต่อโดยตรงกับเป้าหมาย การใช้ Open Source Intelligence (OSINT) ในการค้นหาข้อมูลจากแหล่งข้อมูลสาธารณะ การทำ DNS Enumeration เพื่อเข้าใจโครงสร้างเครือข่าย การใช้เทคนิค Search Engine ต่างๆ เพื่อค้นหาข้อมูลที่ละเอียดอ่อน และการวิเคราะห์ข้อมูลจาก social media เพื่อสร้างภาพรวมของเป้าหมาย

Active Information Gathering เป็นการรวบรวมข้อมูลผ่านการติดต่อโดยตรงกับระบบเป้าหมาย การทำ Network Scanning เพื่อค้นหาอุปกรณ์ในเครือข่าย การทำ Port Scanning เพื่อระบุ services ที่เปิดใช้งาน การทำ Service Enumeration เพื่อเข้าใจรายละเอียดของ services และการทำ OS Fingerprinting เพื่อระบุระบบปฏิบัติการ

## Module 3: Vulnerability Scanning

Module นี้เน้นการเปรียบเทียบระหว่าง Manual Testing กับ Automated Scanning โดยแต่ละวิธีมีข้อดีข้อเสียที่แตกต่างกัน Manual Testing ให้ความละเอียดลึกซึ้งและสามารถค้นพบช่องโหว่ที่ซับซ้อน ในขณะที่ Automated Scanning ให้ความเร็วและครอบคลุมกว้าง

การเข้าใจข้อจำกัดของเครื่องมือ automated เป็นสิ่งสำคัญ เนื่องจากเครื่องมือเหล่านี้อาจพลาดช่องโหว่บางประเภทหรือให้ผลลัพธ์ที่เป็น false positive การจัดการกับ false positive results จึงเป็นทักษะที่จำเป็น

การศึกษาเครื่องมือ scanning ต่างๆ เช่น Nessus สำหรับการสแกนช่องโหว่แบบครอบคลุม OpenVAS เป็นทางเลือก open source และ Nikto สำหรับการสแกน web vulnerabilities รวมทั้งการเขียน custom scripts เพื่อตอบสนองความต้องการเฉพาะ

## Module 4: Web Application Attacks

Web Application เป็นเป้าหมายที่พบบ่อยที่สุดในการโจมตี Module นี้ครอบคลุมช่องโหว่หลักที่พบใน web applications เช่น SQL Injection ที่เป็นการโจมตีฐานข้อมูลผ่านการฉีด SQL commands, Cross-Site Scripting (XSS) ที่เกี่ยวข้องกับการฉีด JavaScript, Cross-Site Request Forgery (CSRF) ที่บังคับให้ผู้ใช้ทำ actions ที่ไม่ต้องการ

File Inclusion vulnerabilities ทั้ง Local และ Remote ที่อนุญาตให้ผู้โจมตีเข้าถึงไฟล์ที่ไม่ควรเข้าถึง และ Command Injection ที่อนุญาตให้ผู้โจมตีรัน system commands บนเซิร์ฟเวอร์

ส่วนของ Testing Methodology ครอบคลุมขั้นตอนการทดสอบอย่างเป็นระบบ ตั้งแต่ Application Mapping เพื่อเข้าใจโครงสร้างของ application, การทดสอบ Input Validation, Authentication และ Session Management, รวมทั้งการทดสอบ Business Logic flaws ที่มักถูกมองข้าม

## Module 5: Introduction to Buffer Overflows

Buffer Overflow เป็นประเภทการโจมตีที่ซับซ้อนและต้องการความเข้าใจเกี่ยวกับการทำงานของ computer memory, การเข้าใจ Memory Layout ของโปรแกรม, การทำงานของ Stack, และวิธีการที่ functions ถูกเรียกและส่งค่ากลับผ่าน return addresses

การศึกษาเกี่ยวกับ functions ที่มีความเสี่ยงต่อ buffer overflow และการเข้าใจถึงสาเหตุที่ทำให้เกิดช่องโหว่เหล่านี้ รวมทั้งการเรียนรู้เทคนิคการ exploitation ที่ซับซ้อน

เทคนิคการ exploitation ในส่วนนี้จะครอบคลุมไปถึงการควบคุม Instruction Pointer (EIP), การจัดการ bad characters ที่อาจรบกวนการทำงานของ exploit, การหา return address ที่เหมาะสม, การเขียนและใช้ shellcode, และกระบวนการพัฒนา exploit ที่สมบูรณ์ จนนำไปสู่การยึดเครื่องเป้าหมายที่มีการรัน software ที่มีช่องโหว่ได้

## Module 6: Windows Privilege Escalation

การเข้าใจ Windows Security Model เป็นพื้นฐานสำคัญ ครอบคลุมประเภทของ user accounts ต่างๆ, Windows Access Control Model ที่ซับซ้อน, การทำงานของ User Account Control (UAC) และการเข้าใจ Token Privileges ที่เป็นกลไกสำคัญในการควบคุมสิทธิ์

เทคนิคการ escalation ที่หลากหลาย เช่น การใช้ประโยชน์จาก vulnerable services, การใช้ registry สำหรับ privilege escalation, การค้นหา stored passwords ในระบบ, การใช้ scheduled tasks เพื่อรัน commands ด้วยสิทธิ์สูง และการทำ Token Impersonation เพื่อแอบอ้างสิทธิ์ของผู้ใช้อื่น เป็นต้น

## Module 7: Linux Privilege Escalation

Linux Security Model แตกต่างจาก Windows อย่างมาก การเข้าใจระบบ User และ Group permissions, การทำงานของ File Permissions แบบ traditional Unix, การเข้าใจ special permissions เช่น SUID และ SGID ที่อาจถูกใช้ในการ privilege escalation และการทำงานของ sudo configuration

เทคนิคการ escalation ใน Linux มีความหลากหลาย เช่น การใช้ kernel exploits ที่ต้องการความรู้ลึกเกี่ยวกับ kernel, การใช้ vulnerable services, การใช้ cron jobs เพื่อรัน commands ด้วยสิทธิ์สูง, การใช้ environment variables และการทำ shared library hijacking เป็นต้น

## Module 8: Port Redirection and SSH Tunneling

เมื่อได้ foothold ในเครือข่ายแล้ว การ pivot ไปยังส่วนอื่นๆ ของเครือข่ายเป็นทักษะสำคัญ การทำ Port Forwarding เพื่อส่งต่อการเชื่อมต่อผ่านเครื่องที่ถูก compromise แล้ว, การสร้าง SSH Tunnels เพื่อสร้างช่องทางการสื่อสารที่ปลอดภัย

การใช้เครื่องมือเช่น Proxychains เพื่อ chain connections ผ่าน multiple compromised hosts และการใช้ Metasploit's pivoting capabilities เพื่อขยายการเข้าถึงในเครือข่าย เป็นต้น

## Module 9: Active Directory Attacks

Active Directory เป็นหัวใจของ enterprise networks การเข้าใจ Domain Structure, Authentication Protocols เช่น Kerberos และ NTLM, การทำงานของ Domain Controllers และ Group Policy Objects ที่ควบคุมการทำงานของทั้งองค์กร

เทคนิคการโจมตีที่เฉพาะเจาะจง เช่น Kerberoasting สำหรับการโจมตี service accounts, ASREPRoasting สำหรับ accounts ที่มีการตั้งค่าพิเศษ, การสร้าง Golden Tickets เพื่อเข้าถึงทุกอย่างใน domain และการทำ DCSync เพื่อดึงข้อมูลสำคัญจาก domain controller เป็นต้น

## Module 10: Assembling the Pieces

Module สุดท้ายเน้นการนำทักษะทั้งหมดมาประยุกต์ใช้ในสถานการณ์จริง การพัฒนา Attack Methodology ที่เป็นระบบและมีประสิทธิภาพ, การจัดทำเอกสารบันทึกการทดสอบอย่างละเอียด, การทำ cleanup หลังการทดสอบเพื่อไม่ให้ส่งผลกระทบต่อระบบ

การเขียนรายงานที่มีคุณภาพเป็นทักษะสำคัญที่มักถูกมองข้าม รายงานที่ดีต้องสื่อสารได้ชัดเจนทั้งกับทีมเทคนิคและผู้บริหาร โดยแสดงถึงความเสี่ยงและข้อเสนอแนะในการแก้ไขอย่างสร้างสรรค์

หลักสูตรนี้ออกแบบมาให้ผู้เรียนได้ฝึกฝนทักษะการ penetration testing แบบ hands-on ผ่านสภาพแวดล้อมที่จำลองขึ้นมาเพื่อเตรียมความพร้อมสำหรับการสอบ OSCP ที่เน้นการทดสอบแบบ practical และการแก้ปัญหาในสถานการณ์จริง

---

[...back](../0-landing-oscp+.md)
