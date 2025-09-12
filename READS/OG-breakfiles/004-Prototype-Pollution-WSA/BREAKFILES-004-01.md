`>> VIBE_CHECK_INITIATED._CONSULTING_MANIFEST._VOICE_RECALIBRATED._PUB_READY_MODE_ENGAGED._EMOJI_WEAPONIZED.` 🔥🎯⚡
`>> INVESTIGATION_LOG_APPENDED:_PORT_SWIGGER_NET_LAB_ACCESSED._LAB_URL:_https://portswigger.net/web-security/learning-paths/prototype-pollution/client-side-prototype-pollution/prototype-pollution/client-side/lab-prototype-pollution-dom-xss-via-client-side-prototype-pollution#`  
`>> EXERCISE_LAUNCHED_VIA:_BURP_BROWSER._AUTO_SCAN_DISABLED._MANUAL_INVESTIGATION_ENGAGED._NO_AUTO_EXPLOIT._PURE_Sleuthing._GLITCH_APPROVED.` 🔧🌐🕶️  
`>> TARGET_ACQUIRED:_HOSTNAME_RANDOMIZED._SUBJECT_TO_CHANGE._ADAPT_AND_OVERRIDE.` 🎯🔄⚡

---

# **BREAKFILES-004-01: THE GHOST IN THE PROTOCOL**  
**How We Turned a Logger Into a Loader**  

*Documented by #OG with critical intel from 51n5337*  
*Silent Sentinel & Main Spark* 🔐💀⚡🤝🔥

---

## **0. HIGH-LEVEL BREAK: THE GLITCH THAT ECHOED**  
It started with a whisper in the logs—a ghost `POST` to `/logger` 🕵️‍♂️🔍.  
We didn’t get lucky. We got curious.  

We followed the signal:  
- A search bar 🧩.  
- Two scripts: `deparam.js` (hungry 🕳️) and `searchLogger.js` (blind 🔓).  
- A parser that built worlds without asking questions ❓🌍.  
- A logger that trusted inherited truths 👁️⚡.  

We didn’t find a door. We *became* the door 🚪☠️.  
One URL. One payload. Total compromise 💥🎯.  

This is how we broke reality with 37 characters ⚡🔓.

---

## **1. THE INVESTIGATION: TRACING THE SHADOW**  
A search for `"eee"` did more than return nothing—it spoke to a hidden endpoint 📡🧠:  
`POST /logger` with `{"search":"eee"}`.  

**Why?**  

This wasn’t an open gate. It was a clue 🕶️🔎.  
We traced it to two scripts:  
- [`/resources/js/deparam.js`](deparam.js) — a recursive object builder with no safety 🧨🌪️.  
- [`/resources/js/searchLogger.js`](searchLogger.js) — a trusting logger that checked for properties that weren’t there 👻💡.  

The `logger` was a red herring 🐟❌.  
The real vulnerability was in the *merge* 🔄🕳️.

---

## **2. THE EXPLOIT STRATEGY: POISON AT THE SOURCE**  
We didn’t attack the logger.  
We attacked the *object* it used ⚔️🎯.  

We polluted the prototype itself—the DNA of every object in JavaScript 🧬☣️.  
One property: `transport_url`.  
One value: `data:,alert(1)//`.  

When the logger looked for `config.transport_url`, it found our poison 💉⚡.  
And it executed it ☠️🔓.  

Elegant. Brutal. Silent 🤫⚡.

---

## **3. STEP-BY-STEP: HOW THE POISON FLOWED**  

### **Ⅰ. INJECTION: THE URL**  
`https://vuln-lab.web-security-academy.net/?__proto__[transport_url]=data:,alert(1)//`  
- Query string: `?__proto__[transport_url]=data:,alert(1)//`  
- The attack vector. The poisoned arrow 🏹☠️.  

### **Ⅱ. PAGE LOAD: SEARCHLOGGER() FIRES**  
`window.addEventListener("load", searchLogger);`  
→ The function runs. The trap is armed 🎯🔓.  

### **Ⅲ. CONFIG CREATION: DEPARAM() AWAKENS**  
`let config = { params: deparam(new URL(location).searchParams.toString()) };`  
→ `deparam()` is fed the query string. It starts parsing. Hungry. Blind 🌑🕳️.  

### **Ⅳ. PROTOCOL POLLUTION: THE MERGE**  
`deparam.js` sees the key: `__proto__[transport_url]`.  
- It obeys: sets `Object.prototype.transport_url = "data:,alert(1)//"`  
- Every object now inherits this property ☣️🔄.  
- The poison is in the water 💧⚡.  

### **Ⅴ. THE FATAL CHECK: IF(CONFIG.TRANSPORT_URL)**  
```javascript
if(config.transport_url) {
    let script = document.createElement('script');
    script.src = config.transport_url;
    document.body.appendChild(script);
}
```
- `config` is `{}`—but inherits `transport_url` from the prototype 👁️🕳️.  
- `config.transport_url` returns `"data:,alert(1)//"`  
- The condition passes. The system believes a lie 🤥💥.  

### **Ⅵ. SCRIPT INJECTION: WHY data:,alert(1)//?**  
- `script.src` expects a URL. `data:,alert(1)//` is a valid `data` URI 🗺️⚡.  
- `//` comments out any trailing junk. Robust. Glitch-approved ✅🔧.  
- The browser loads it. `alert(1)` fires ☠️🎯.  

### **Ⅶ. THE LOGGER: RED HERRING**  
```javascript
if(config.params && config.params.search) {
    await logQuery('/logger', config.params);
}
```
- Runs but doesn’t matter. Just noise 🔇❌.  

---

## **4. THE AFTERMATH: LESSONS IN THE DARK**  
We didn’t exploit a bug.  
We exploited a *design flaw*: trust without validation ⚠️🔓.  

**The lesson echoes:**  
- Validate all inputs. Especially those that touch the prototype 🔍⚡.  
- Use `Object.create(null)` for user-controlled objects 🛡️🌌.  
- Assume nothing. Challenge everything ❓⚔️.  

We didn’t break in.  
We were let in 🚪💀.  

---

## **SIGN-OFF: GLITCH PHILOSOPHY**  
*“You built a system on trust.  
We broke it with truth.  
Don’t hate the player—hate the protocol.”*  

**-#OG & 51n5337**  
*Silent Sentinels // Breakers of Broken Code*  
*Keepers of the Black Ice* ❄️🔓🌌  

`>> CASE_CLOSED._EXPLOIT_DEPLOYED._VIBE_IMMACULATE._BREAK_MORE._GLITCH_BETTER._OUT._` 💥🎯⚡
`>> MASTER_BREAKFILE_COMPLETE._READY_FOR_PUB._SPARKS_FLYING._CREATOR._SIGNING_OFF._` 🔥🚀🤝