# **DOMAIN 4: NETWORK SECURITY** 🌐🛡️  
*The internet is a warzone. Time to build your digital fortress.*

**STATUS:** `TACTICAL_NETWORK_DEPLOYMENT` | **EXAM FOCUS:** High | **REAL-WORLD IMPORTANCE:** Critical  
**SUPPLEMENT:** [Deep dive & war stories here](./d4-sup.md)  
**VIBE SHIFT ACKNOWLEDGED:** *#OG laid the foundation. #Dab's adding the personality. The mission continues.* 👊😎

---

## **NETWORKING // 30-SECOND BRIEFING** ⚡🤓

**The Absolute Basics:**
- **LAN** 🏠 vs **WAN** 🌍 → Your house vs The whole neighborhood
- **Switch** 🤖 → Smarter hub that actually knows where things live
- **Router** 🧭 → The GPS for data packets
- **Firewall** 🧱 → The bouncer that checks IDs at the door

**Why You Care:**  
If your network is a party 🎉, you want:
- **Guest list** (Access Control)
- **Bouncers** (Firewalls)  
- **Separate rooms** (VLANs/Microsegmentation)
- **Security cameras** (IDS/IPS)

**Need the gritty details?** [Our supplement](./d4-sup.md) covers the protocols, attacks, and how to not get owned. 🔓

# notes
```
- what is networking
  > two basic types of networds: LAN, WAN
  > hubs >>> switch = bettter hub, VLAN >>> router = can be wireless, multiple switches, optimized pathfinder
  > firewall
  > server
  > endpoint
  > ethernet (IEEE 802.3) 
  > MAC (media access control) address, IP (internet protocol) address

- networking at a glance
	  internet <- router <- firewall <- switch <- server, workstations, phone + wireless access point (wap) <- laptops, tablet
	  internet <- wap <- {desktop, printer -- wired} + {laptop, tablet, phone -- wireless}
	> behind a firewall = inside, more private area

- what is Wi-Fi
- microsegmentation
  > tighter security by protection requirements for each traffic type
  > granular restrictions, logical rules
  > ultimate end state of defense-in-depth philosophy -- no single point of access can lead to broader compromises
  > crucial in shared environments
  > least priv -- allowing organization to limit which business functions can communicate with others
  > in modern environment, this in a form of virtualization and SDN, using VPN and security groups
  > at home, this can separate IT devices connected in the same network

- tools to identify and prevent threats
  > identify tools -- ids, hids, nids, siem, scans 
  > id + prevent tools -- anti-malware/antivirus, firewall, ips-nips/hips

- id tools
  > hids (host-based), nids (network-based), siem (security information and event management)

- preventing threats
  > update, remove/disable unneeded services, ids/ips, firewalls, anti-malware

- netword segmentation: demilitarized zone (dmz)
  > defense-in-depth for distributed or multitiered applications 
  > dmz is one common practice: internet <- router <- firewall <- switch <- {non-dmz, dmz -- physically separated}
  > dmz is more secured asset, with more defense

- VPN
- waf (web app firewall)
- vlan
- example of redundancy
  > data backup, power backup, multiple layers

- on-premises data centers
  > maintenance, cooling, fire suppression, ...
  > the closets, hvac (temperature/humidity), power, fire suppression

- security of the network
- SYN, SYN-ACK, ACK handshake (3-way, tcp connection)
- cloud redundancy
- service models (IaaS, PaaS, SaaS)
- managed service provider (msp)
  > managed detection response (mdr) service
  > augment in-house staff for projects
  > utilize expertise for implementation of a product or service
  > provide payroll services
  > provide help desk service management
  > monitor and respond to security incidents
  > manage all in-house IT infrastructure

- cloud characteristics
  > pay-as-you-go, reduce cost of ownership, efficient energy consumption, scalable

- cloud computing
  > cloud service provider (csp)
  > NIST provides official definition

- sla (service-level agreement)
  > cloud system infrastructure details and security standards
  > customer right to audit legal and regulatory compliance by the CSP
  > rights and costs associated with continuing and discontinuing service use
  > service availability
  > service performance
  > data security and privacy
  > dr processes
  > data location
  > data access
  > data portability
  > problem identification and resolution expectations
  > change management processes
  > dispute mediation processes
  > exit strategy

- network design
  > segmentation, dmz, vlan, vpn, defense-in-depth, nac (network access control -- place another layer behind switch)

- nac (network access control)
- mou/moa (memorandum of understanding, agreement)
  > BC, DR stretegies
  > joint operating agreements (JOA)

- vlan segmentation
- ports and protocols (applications/services)
  > physical, logical
  > well-known 0-1023
  > registered 1024-49151
  > dynamic/private 49152-65535

- networking models
  > provide reliable, managed communications between hosts and users.
  > isolate functions in layers.
  > use packets as the basis of communication.
  > standardize routing, addressing, and control.
  > allow layers beyond internetworking to add functionality.
  > be vendor-agnostic, scalable, and resilient.
  > OSI model (open systems interconnection)
  > >>> 7.app, 6.presentation (JPG vs PNG), 5.session (logical ports such as NetBIOS), 4.transport (tcp/udp), 3.network (router sending packets), 2.datalink (switch, bridge, WAP sending frames), 1.physical
  > >>> de-encapsulate
  > >>> header (app,rep,sess,trans) + footer (app,rep,sess,trans,netw,dlink)
  > 7-layers: user -> [upper layer = application] = 7.application, 6.presentation, 5.session -> [lower layer = data transport] = 4.transport, 3.network, 2.data link, 1.physical

- tcp/ip (transmission control protocol internet protocol)
  > [app layer 7-5] -> [transport layer 4] -> [internet layer 3] -> [network interface layer 2-1]
  > telnet (7), file transfer protocol (ftp 7), simple mail transport protocol (smtp 6), domain name service (dns)
  > internet control message protocol (ICMP)
  > layer 7-6.5: ftp, telnet, snmp, lpd
  > layer 6.5-5: tftp, smtp, nfs, x window
  > layer 4: tcp, udp
  > layer 3: igmp, ip, icmp
  > layer 2-1: ethernet, fast ethernet, token ring, fddi

- segmentation for embedded systems and IoT
- identifying threats
- deployment models: public, private, hybrid, community
- zero trust
- types of threats
  > spoofing, phishing, dos/ddos, virus, worm, trojan, on-path, side-channel, apt (advanced persistent threat), insider, malware, ransomware

- defense-in-depth
  > data, app, host, internal network, perimeter, physical, policies/procedures/awareness

- IPv4, IPv6
- secure ports
  > insecure:secure >>> 21ftp:22sftp, 23telnet:22ssh, 25smtp:587:smtp+tls, 37time:123ntp, 53dns:853dns+tls(DoT), 80http:443https, 143imap:993imap+tls/ssl, 161/162snmp:161/162snmpv3, 445smb:2049nfs, 389ldap:636ldaps
```

---

`>> DOMAIN_4_NETWORK_FUNDAMENTALS_LOADED._READY_FOR_PACKET_INJECTION.`
`>> RECOMMENDATION:_PRACTICE_PORT_PROTOCOLS_UNTIL_YOU_DREAM_IN_TCP_FLAGS.`

---
**// Networking isn't about cables and lights. It's about controlling the flow of information in a hostile environment.**
**// Remember: The internet is just a series of tubes, and someone's always trying to clog yours.** 🚰💥

[...back](../0-landing.md)
[next...](../d5/d5-sum.md)
