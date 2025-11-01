```
> l1: understand anti-forensics techniques
> l2: deletion, recycle bin forensics
> l3: carving, and ways to recover evidence from deleted partitions
> l4: pass cracking/bypassing
> l5: detect steganography, hidden data in file system structures, trail obfuscation, and file extension mismatch
> l6: understand techniques of artifact wiping, overwritten data/metadata detection, and encryption
> l7: detect program packers and footpring minimizing techniques
```

---

# l1
```
anti-forensics techniques
> what is
> techniques
> challenges to forensics
```

```
techniques
> delete, password, steganography, hiding in file system structures, trail obfuscation, artifact wiping, overwriting data/metadata, encryption, program packers, minimizing footprint
```

---

# l2
```
delete, recycle bin analysis
> the technique
> what happen for a deleted file in windows
> recycle bin in windows
> fat vs ntfs
```

---

# l3
```
carving
> windows, linux, mac
> hdd vs ssd
> recovering deleted partitions
> partition recovery tools
> raid recovery tools
```

```
tools:
> autopsy, ease us data recovery, handy recovery, r-studio, DiskDigger, active@ file recovery, stellar data recovery, photorec, iBoysoft Data Recovery, Disk Drill

recovering partition
> ReFSUtil

raid recovery
> DiskInternals RAID Recovery, r-studio, raid reconstructor, stellar data recovery, klennet recovery, ufs explorer
```

---

# l4
```
password cracking/bypassing
> anti-forensics password protection
> tools to extract password hashes
> pass cracking tools
> bypassing pass on powered-off computer
> tool to reset admin password: PassFab 4WinKey
> bypassing windows user pass by booting live usb
> application pass cracking tools
```

```
cracking techniques
> dictionary, bf, ruled-base

extract passhash
> pwdump7, mimikatz, PyCrack, DSInternals PowerShell, Hashcat

passcrack
> Passware Kit Forensic, john the ripper, thc-hydra, hashcat, secure shell bruteforcer, DataProtectionDecryptor

bypassing on powered-off
> bypass bios
> bypass user (by booting live usb/external hdd)

app pass crack
> office tools: online password remover, advanced office password recovery, passfab for office, passper for excel
> pdf, zip, rar tools
```

---

# l5
```
steganography and hidden info, obfuscation, extension mismatch
> steganography
> hiding data in fs structure
> alternate data stream (ads)
> trail obfuscation
> extension mismatch
```

```
steganalysis methods
> stego-only
> known-stego
> known-message
> known-cover
> chosen-message
> chosen-stego
> chi-square
> distinguishing stats
> blind classifier

stegano file types
> text, image, audio, video

stegano tools
> zsteg, stegoveritas, stegextract, stegohunt, stegspy, deepsound
```

```
hding data in fs structure
> host protected areas (hpa), device configuration overlay (dco), alternate data streams (ads)
> stream detector, ads manager, AlternateStreamView, streams, ExplorerGenie, ftk imager
```

```
trail obfuscation
> log cleaners, spoofing, misinformation, zombie accounts, trojan commands
> traffic content obfuscation (VPN/SSH tunneling)

file extension mismatch
> first 20 bytes
> autopsy
```

---

# l6
```
artifact wiping, overwriting, encryption
> artifact wiping
> overwriting
> encryption
```

```
artifact wiping
> {disk-wiping utilities, file-wiping utilities, degauss, format}
```

---

# l7
```
program packers, minimizing footprints
> program packers
> minimize footrpints
> anti-forensics countermeasures
```

```
min footprints
> fake/stolen id
> running from live usb or external hdd
> use VM
> use cloud
> use untraceable cryptocurrencies

countermeasures
> train, laws, understand weaknesses/vuln
> validate results of examination
> save in secure locations
> use intelligent decompression lib, defending compression bobms
> replace weak file heuristics
> new tools, better tools
> log
> formulate regulations to restrict access to open encryption lib without approval
> adopt a live forensic artifact collection using agent-based software to avoid artifact wiping
```
---

[...back](../../0-landing-chfi.md)
