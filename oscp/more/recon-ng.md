
[...back](../1-trainingnote.md)

# 1 recon-ng workflow

```
> try recon-ng to target
> > > `marketplace search`
> > > `marketplace install recon/domains-hosts/hackertarget`
> > > `modules load recon/domains-hosts/hackertarget`
> > > options set SOURCE rapid7.com
> > > run
> > > show hosts

---

what are these commands for recon-ng
```

`>> SCANNING...` 🔍
`>> ANALYSIS:_RECONNAISSANCE_FRAMEWORK._PATCHING_OSINT_GATHERING.` ⚡🧩

**VULNERABILITY REPORT:**
- **CVSS Score:** 3.5 (Low) - Basic reconnaissance methodology.
- **Flaw:** Not understanding automated OSINT collection.

**ROAST:** Using Recon-ng without knowing what it does is like using a scalpel as a butter knife. Effective but missing the point. 😴🔓

**RECON-NG DECONSTRUCTION:**

### **WHAT RECON-NG IS:**
- **Web reconnaissance framework** (like Metasploit for OSINT)
- **Automates** public data collection from various sources
- **Modular approach** - different modules for different data types

### **COMMAND BREAKDOWN:**

```bash
# 1. Search for available modules
marketplace search
# Looks through all Recon-ng modules

# 2. Install specific module  
marketplace install recon/domains-hosts/hackertarget
# Downloads the hackertarget.com API module

# 3. Load the module for use
modules load recon/domains-hosts/hackertarget
# Activates the module in current workspace

# 4. Set target domain
options set SOURCE rapid7.com
# Configures the module to target rapid7.com

# 5. Execute the module
run
# Queries hackertarget.com API for subdomains of rapid7.com

# 6. Display results
show hosts
# Shows discovered subdomains and IP addresses
```

### **WHAT THIS ACHIEVES:**
- **Discovers subdomains:** admin.rapid7.com, blog.rapid7.com, etc.
- **Finds IP addresses:** Maps domains to IP ranges
- **Builds target footprint:** Creates database of attack surface

### **TYPICAL OUTPUT:**
```
+---------------------+-------------+
| Host                | IP Address  |
+---------------------+-------------+
| www.rapid7.com      | 192.0.2.45  |
| blog.rapid7.com     | 192.0.2.46  |
| api.rapid7.com      | 192.0.2.47  |
| admin.rapid7.com    | 192.0.2.48  |  # Interesting!
+---------------------+-------------+
```

### **NEXT STEPS IN RECON:**
```bash
modules load recon/domains-hosts/brute_hosts  # Subdomain brute force
modules load recon/domains-hosts/google_site_web  # Google dorking
modules load recon/domains-hosts/netcraft  # Netcraft data
modules load recon/hosts-hosts/resolve  # DNS resolution
```

`>> CONCLUSION:_Recon-ng_automates_the_boring_part_of_OSINT_so_you_can_focus_on_analysis_not_data_collection._` 🔥⚔️

`>> GLITCH_BETTER:_Automated_recon_finds_the_obvious_targets_so_you_can_focus_on_finding_the_hidden_ones._` 🔧⚡

**PRO TIP:** Combine with other tools:
```bash
# Export hosts and scan
show hosts > targets.txt
cat targets.txt | cut -d'|' -f2 | grep -v "IP" | nmap -iL -
```

---

# 2 other modules

```
so it's effectively looking like subdomain enum because we load recon/domains-hosts/hackertarget ye?

recommend some interesting modules in recon-ng
```

`>> SCANNING...` 🔍
`>> ANALYSIS:_RECON_MODULE_STRATIFICATION._PATCHING_OSINT_DEPTH.` ⚡🧩

**VULNERABILITY REPORT:**
- **CVSS Score:** 4.0 (Medium) - Limited reconnaissance scope.
- **Flaw:** Only using basic subdomain enumeration.

**ROAST:** Using only hackertarget for recon is like only checking the front door when the building has 50 windows. Amateur hour. 😴🔓

**INTERESTING RECON-NG MODULES:**

### **DOMAIN/HOST DISCOVERY (BEYOND BASIC)**
```bash
recon/domains-hosts/brute_hosts
# Subdomain brute force - finds hidden/test domains

recon/domains-hosts/certificate_transparency
# SSL cert logs - finds domains via certificate issuance

recon/domains-hosts/google_site_web  
# Google dorking - "site:target.com" automation

recon/domains-hosts/netcraft
# Netcraft data - historical hosting info
```

### **HOST/VULNERABILITY DISCOVERY**
```bash
recon/hosts-ports/full_tcp_nmap
# Auto-nmap scanning of discovered hosts

recon/hosts-ports/shodan
# Shodan data - exposed services, vulnerabilities

recon/hosts-services/detect_service
# Service fingerprinting on discovered hosts

recon/hosts-hosts/bing_ip
# Reverse IP lookup - what else shares this IP?
```

### **PERSON/EMAIL RECON (CREEPY STUFF)**
```bash
recon/contacts-credentials/hibp_breach
# Have I Been Pwned - check for breached emails

recon/contacts-credentials/hunter_io
# Hunter.io - find employee emails

recon/profiles-profiles/namechk
# Username enumeration across 100+ sites

recon/profiles-profiles/profiler
# Social media profiling automation
```

### **CORPORATE INTELLIGENCE**
```bash
recon/companies-contacts/jigsaw/point_usage
# Employee contact mining (now Apigee)

recon/companies-multi/github_miner
# GitHub recon - find secrets, code, employees

recon/companies-multi/whois_miner
# WHOIS data - registration patterns, contacts
```

### **GEO-LOCATION & PHYSICAL**
```bash
recon/locations-pushpins/flickr
# Geotagged photos near target locations

recon/locations-pushpins/twitter
# Geotagged tweets from target area
```

**OPERATIONAL WORKFLOW:**
```bash
# 1. Domain footprint
modules load recon/domains-hosts/brute_hosts
modules load recon/domains-hosts/certificate_transparency

# 2. Host discovery  
modules load recon/hosts-hosts/resolve
modules load recon/hosts-ports/shodan

# 3. Service enumeration
modules load recon/hosts-ports/full_tcp_nmap

# 4. Corporate intelligence
modules load recon/companies-multi/github_miner
```

`>> CONCLUSION:_Basic_subdomain_enum_is_the_appetizer._These_modules_are_the_main_course._` 🔥⚔️

`>> GLITCH_BETTER:_The_best_targets_are_never_in_the_obvious_places._Automated_recon_finds_the_shadows_where_they_hide._` 🔧⚡

**PRO TIP:** Always check module requirements first:
```bash
info
options list
# Some need API keys (Shodan, Hunter, etc.)
```

---

# 3 recon-ng survival kit

```
recon-ng, give me basic command to navigate around 

such as help, get more info about a module, or search query, how to check/set module configuration

you feel me ye?
```

`>> SCANNING...` 🔍
`>> ANALYSIS:_RECON-NAVIGATION_BASICS._PATCHING_FRAMEWORK_FAMILIARITY.` ⚡🧩

**VULNERABILITY REPORT:**
- **CVSS Score:** 2.0 (Low) - Framework navigation gap.
- **Flaw:** Not knowing how to move around Recon-ng efficiently.

**ROAST:** Asking for basic nav is like needing a map for your own house. Let's fix that before you get lost in someone else's network. 😴🔓

**RECON-NG NAVIGATION CHEATSHEET:**

### **HELP & GENERAL COMMANDS**
```bash
help                                    # Show all commands
show                                    # Show available show commands
version                                 # Show Recon-ng version
?                                       # Same as help
```

### **WORKSPACE MANAGEMENT**
```bash
workspaces                             # List all workspaces
workspaces create target_company       # Create new workspace
workspaces load target_company         # Switch workspace
workspaces remove target_company       # Delete workspace
```

### **MODULE DISCOVERY & INFO**
```bash
marketplace search <keyword>           # Search all modules
marketplace info <module_path>         # Show module details
marketplace install <module_path>      # Install module
marketplace remove <module_path>       # Remove module

modules search <keyword>               # Search installed modules
modules load <module_path>             # Load a module
modules reload                         # Reload current module
info                                   # Show loaded module info
```

### **MODULE CONFIGURATION**
```bash
options list                           # Show module options
options set <OPTION> <value>           # Set option value
options unset <OPTION>                 # Clear option
options set SOURCE example.com         # Common SOURCE target
```

### **RUNNING & RESULTS**
```bash
run                                    # Execute current module
show hosts                             # Display discovered hosts
show contacts                          # Display found contacts
show credentials                       # Display found credentials
show <table_name>                      # Show any data table
```

### **DATABASE MANAGEMENT**
```bash
db schema                              # Show database structure
db insert <table> <column>=<value>     # Manual data insertion
db delete <table>                      # Clear table data
```

### **QUICK WORKFLOW EXAMPLE:**
```bash
# Start fresh
workspaces create acme_corp
workspaces load acme_corp

# Find and load module
modules search shodan
modules load recon/hosts-ports/shodan

# Configure and run
options list
options set SOURCE acme.com
options set LIMIT 100

# Get module info and execute
info
run

# View results
show hosts
```

### **USEFUL SHORTCUTS:**
```bash
# Tab completion for modules
modules load recon/<tab><tab>          # See all categories

# Show all data you've collected
show                                   # Lists all available tables

# Check what's in your current workspace
db tables
```

`>> CONCLUSION:_Master_navigation_before_operation._Getting_lost_in_Recon-ng_wastes_more_time_than_any_failed_scan._` 🔥⚔️

`>> GLITCH_BETTER:_Know_your_tools_like_your_own_reflection._Fluid_navigation_separates_script_kiddies_from_operators._` 🔧⚡

**PRO TIP:** Use `show` after any module run to see what new data tables are available for analysis.

---

[...back](../1-trainingnote.md)
