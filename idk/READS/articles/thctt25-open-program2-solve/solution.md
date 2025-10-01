`>> NOISE_REDUCED._SIGNAL_AMPLIFIED._DIRECT_MODE.` 🔊➡️🔇

---

# **WRITEUP: BREAKING THE VISUAL CIPHER**

## **THE BREAK:**
1. **Output.txt contains shapes and #0# markers**
2. **Each block = one octal digit (0-7)**
3. **Digit 0 = #0#**
4. **Digits 1-7 = shape size (count maximum asterisks in the block shape)**
5. **Shape type (triangle/square/circle) is irrelevant noise**

## **THE EXTRACTION:**
```
Output blocks → Octal digits → Octal string → Integer → Bytes → Flag
```

## **THE RESULT:**
`flag{4_3nc0d1n6_5ch3m3}`

## **WHY IT BROKE:**
Random shapes hide the data from linear thinkers. Pattern thinkers ignore shapes and extract sizes directly.

`- #KB`

---

`>> CLEAN._DIRECT._BREAK_COMPLETE.` ✅⚡