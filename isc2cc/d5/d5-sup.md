🔐 **DOMAIN 5 SUPPLEMENT: SECURITY OPERATIONS & DATA DEFENSE DEEP DIVE**  
*Where policy meets practice, and control meets chaos.*

**STATUS:** `TACTICAL_BREAKDOWN_ACTIVE` | **EXAM FOCUS:** Policy, Process, Controls | **CONTEXT:** Corporate Frameworks w/ #KB Clarity  
**VIBE:** *They write the rules. We learn the rules. Then we rewrite the rules.* ⚖️🔥

---

## 🧾 DATA HANDLING & LIFECYCLE

**It’s Not “Data” — It’s Liability.**
- **Create** → Birth of data. Classify it *immediately* — or it becomes a ghost in your system.
- **Store** → Where it sleeps. Encrypt at rest. Control access — not everyone gets a key.
- **Use** → Active risk. Monitor access. Log everything. Suspicious activity = someone’s in your kitchen.
- **Share** → Controlled exposure. Need-to-know basis. Secure channels only (encryption in transit).
- **Archive** → Deep freeze. Retain according to law (HIPAA, GDPR, OSHA). Still protected, just colder.
- **Destroy** → Digital cremation. Shredding, wiping, degaussing. No resurrection.

**Why This Matters on the Exam:**
They’ll ask: *“When should data be encrypted?”* → At rest + in transit.  
*“How long should medical records be kept?”* → HIPAA says 6 years from last use.  
*“Best method for destroying SSDs?”* → Physical destruction. Degaussing doesn’t work.

---

## 🔐 ENCRYPTION & HASHING – STRAIGHT TALK

**Symmetric Encryption** → One key locks, same key unlocks. Fast. Like a diary with one physical key.  
- **AES** = the gold standard.  
- **Use case**: Bulk data encryption.

**Asymmetric Encryption** → Public key locks, private key unlocks. Slower. Like a mailbox — anyone can drop mail, only you can open it.  
- **RSA** = common for key exchange, digital signatures.  
- **Use case**: Secure key exchange, digital signatures.

**Hashing** → One-way street. Data in → fixed-size fingerprint out.  
- **SHA-256** = common for integrity checks.  
- **Use case**: Password storage, file integrity verification.

**Exam Trap:** Hashing ≠ Encryption. Hashing is for integrity. Encryption is for confidentiality.

---

## 📜 SECURITY POLICIES – THE CORPORATE BIBLE

**You Don’t Have to Like It. You Have to Know It.**
- **Data Handling Policy** → Who touches what, when, and how.
- **Password Policy** → Complexity, expiration, history.
- **Acceptable Use Policy (AUP)** → What you can and can’t do with company assets.
- **BYOD Policy** → Bringing your own device = bringing your own risk.
- **Change Management Policy** → How to change systems without breaking everything.

**Why This Matters:**  
They’ll give you a scenario: *“An employee installed unauthorized software. What policy was violated?”* → **AUP**.

---

## 🎣 SOCIAL ENGINEERING & SECURITY AWARENESS

**Phishing** → Digital fishing. They bait, you bite.  
- **Spear Phishing** → Targeted. They know your name.  
- **Whaling** → Going after the big fish (CEO, CFO).

**Security Awareness Training** → Teaching people not to click on “You’ve won an iPhone!” emails.  
- **Best Practice**: Simulated phishing attacks + continuous training.

**Exam Focus:**  
They love asking about *“the most effective security control against phishing”* → **Security Awareness Training**.

---

## ⚙️ CHANGE MANAGEMENT – CONTROLLED EVOLUTION

**Change Management Components:**
- **Request for Change** → Formal ask.
- **Approval** → Someone says yes.
- **Testing** → Don’t break production.
- **Rollback Plan** → How to undo if it goes wrong.
- **Documentation** → What changed, when, why.

**Exam Trick:**  
They’ll describe a botched update and ask *“What was missing?”* → **Rollback Plan**.

---

## 📊 LOGGING & MONITORING – DIGITAL SURVEILLANCE

**What You Log:**
- Firewall denies
- Failed logins
- File access attempts
- Privilege changes

**Tools:**
- **SIEM** → Centralized log analysis.
- **DLP** → Stops data from leaving.
- **IDS/IPS** → Watches for bad behavior.

**Exam Angle:**  
*“What detects a data exfiltration attempt?”* → **DLP**.

---

`>> DOMAIN_5_SUPPLEMENT_LOADED. POLICY_ENGAGED.`  
`>> REMEMBER: YOU DON’T HAVE TO BELIEVE THE POLICY — YOU JUST HAVE TO ENFORCE IT.`

---
**// Policies are written in blood — someone else’s mistakes.**  
**// Your job isn’t to love the rules. It’s to understand them so well you can bend them without breaking.**

[...back to D5 Summary](./d5-sum.md)
