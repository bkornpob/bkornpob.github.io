
[...back](../0-landing-ncsaoscp.md)

# recon

```
> attack surface
> 6-stack (and <<< ???): 
	mobile app / client side            <<< public code repo
	>>>communication<<<
	web app / web service / api         <<< external services
	framework / cms + plug-in           <<< 3rd-party / vendor
	--- service vs internal (house) stacks --- 
	[database] + [web server platform + components]
	operation system
	infra / network / hypervisor / cloud
```

```
info
> technical info 
> > ip, domain, topo
> > port, service
> > os, app, version
> > leak
> organization, human info
> > name, email
> > company structure, partners
> > public sources, company websites, social media
```

```
> passive vs active
> tooles
> > passive{whois, dig, dnsrecon, dnsmap}
> > reverse ip lookup
> > get ip behind cloudflare{cloudfail,dns history}
> > recon-ng
> > shodan
> > osint.sh (subdomain finder)
> > 
```

---

# osint

```
> publicly available
> media, internet, public records{government data, profession, academic, publication, etc.}
> google dorking
> > site: *.vulnweb.com {inurl:login, intext:"index of", filetype:*.txt
> > google search operators
> shodan, maltego
```

---

# open vuln sites

```
vulnweb.com, demo.testfire.net, testphp.vulnweb.com
```

---

# scanning tools

```
nmap (layer3 network):
> Pn, O, A, p vv, 

arp scan (layer 2 data link)

searchsploit (exploit mapping)

path enumeration
> dirb, dirbuster

user enum
> osint <<< [firstname][lastname]@[company].com
> email finder
> direct web login
```

[more about arpscan vs nmap](./supp/arpscan-vs-nmap.md)

---

# cred leak

```
intel X, stealthmole, source code in public repo

```

---

[...back](../0-landing-ncsaoscp.md)
