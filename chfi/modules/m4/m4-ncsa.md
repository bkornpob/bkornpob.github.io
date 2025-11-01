```
m4: data acquisition and duplication
> l1: acquisition fundamentals
> l2: eDiscovery
> l3: acquisition methodology
> l4: prepare an image file for examination
```

---

# l1
```
acquisition fundamentals
> understanding data acquisition
> {live, dead} acquisition
> order of volatility
> rules of thumb
> types of data acquisition
> determine the data acquisition format
```

```
live/dead/volatile
> live acquisition = volatile {system = running state, login activity, etc., network = network config, connections, routing tables, etc.}
> > RAM, cache, DLLs, etc.

order of volatility (RFC 3227)
> registers and cache
> routing table, process table, kernel statistics, memory
> temp sys files
> disk or other storage media
> remote logging and monitoring data relevant to the system in question
> physical configuration and network topology
> archival media

rules of thumb
> doc
> forensic methodology
> preserve original
> hash
> legal authz
> coc

types {logical, sparse}
> logical = time constraints, files required/targeted
> sparse = acquire specific data quickly, from specific areas or sectors

bitstream image = bit-by-bit copy {disk-to-image, disk-to-disk}

format
> raw {bin, dump}
> proprietary {supporting commercial tools}
> aff (advanced forensics format)
> aff4 (advanced forensic framework 4)
```

---

# l2
```
eDiscovery
> eDiscovery
> EDRM Cycle (electronic discovery reference model)
> monitor and maintain accurate metrics and detailed tracking info related to edis
> edis collection methodologies
> edis best practices
> edis tools
```

[ediscover-computerforensics](../etc/ediscover-computerforensics.md)

```
edrm cycle (edis ref model)
> {policy: rim->business->it->security} -> {process: privacy->risk->legal} -> feedback
> legal = identification->{preservation,collection}->{processing,review,analysis}->production->presentation

edis accurate metrics and tracking
> transparency, credibility, effectiveness
> > KPIs, edis tools, log, review data processing/progress, coc, audit trails, track the delivery/production, doc/report

edis collection method
> full disk acquisition (bit-by-bit)
> directed collection
> custodian self-collection
> remote acquisition
> incremental collection (dynamically updated)
> sampling collection (specific criterion; avoid bias)

edis tools
> Intella Pro, Logikcull, Nuix, Nextpoint, RelativityOne, DISCO Ediscovery
```

---

# l3
```
acquisition method
> method
> > determine best method, 
> > tool selection, 
> > sanitize target media, 
> > acquire volatile data -- windows, linux, mac, 
> > enable write protection on the evidence media
> > acquire non-volatile -- windows/linux forensic workstations, macos single-user and target disk modes, linux bootable usb, digital collector, acquiring raid disks
> > plan for contingency
> > validate -- windows, linux, max

> guidelines and best practices
```

```
tool requirements
> mandatory
> > not change original content
> > log i/o errors
> > alert user
> > bitstream, qualified
> optional
> > hash
> > divice bitstream into blocks
> > log
> > individual partitions
> > disk partition table

sanitize
> clean target media (not evidence)
> standards
```

```
best practices
> define purpose, requirements
> identify data sources
> devise a suitable strategy
> select appropriate tools
> gather only relevant data
> capture volatile first
> minimize data dupe, examine sensitivity of fresh datasets
> comply with legal and ethical
> doc
> establish access controls, security
> use for their original purpose only
> evaluate quality and efficiency of the adopted plan regularly
```

---

# l4
```
prepare image file for examination
> preparing
> scenarios {linux, window, mac forensic workstation}
> digital forensic imaging tools
```

```
scenarios
> linux
> > converting e01 image file to dd image file
> > converting e01 image file to raw image file
> > converting dd image file to vhdx file
> > examining a dd image file
> > examinming physical hard disk
> > examining mac apfs image file
> > examining disk image using PyTSK
> > examining ewf-formatted disk image using libewf
> > examining disk image using dfvfs lib

> windows
> > tools = autopsy, ftk imager, volatility
> > investigators can read mac hfs+ through the windows built-in file explorer utility by installiong applie hfs+ drivers on a windows workstation that can provide insights about stored caches, saved files, etc. during an investigation
> > > method 1: using applie hfs+ drivers
> > > method 2: using paragon hfs+ for windows

> mac
> > r-studio, digital collector, OSForensics
```

```
digital forensic imaging tools
> OSFClone
> Talon Ultimate
> Falcon-NEO
> PALADIN
> OpenText Encase Forensic
> Belkasoft X
```

---

[...back](../../0-landing-chfi.md)
