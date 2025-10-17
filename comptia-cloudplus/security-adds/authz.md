
[...back](../vocabs/4-security.md)

**AYYYE!** Let me break down these **authorization models** - this is where we answer "Now that we know WHO you are, WHAT are you allowed to do?" 🎯🔐

---

## **AUTHORIZATION MODELS - The Permission Architectures** 🏗️🔒

### **🧩 AUTHORIZATION vs AUTHENTICATION:**

| Concept | Answers the Question | Example |
|---------|---------------------|----------|
| **Authentication** 🆔 | "Are you who you say you are?" | Username + Password + MFA |
| **Authorization** 🚪 | "What are you allowed to do?" | Can you delete this file? Access this database? |

---

## **🎯 ROLE-BASED ACCESS CONTROL (RBAC)** 👑📊

### **What It Is:**
*"Permissions assigned to ROLES, and users assigned to roles"*

### **The Vibe:**
```
USERS → ROLES → PERMISSIONS
```

### **Real-World Structure:**
```
ROLES:
- Admin: create_user, delete_user, manage_system
- Editor: create_content, edit_content, delete_content  
- Viewer: read_content, download_files

USERS:
- Alice → Admin role
- Bob → Editor role
- Charlie → Viewer role
```

### **Stellar Café Example:**
```
COFFEE SHOP ROLES:
- Manager: view_reports, manage_staff, update_menu
- Barista: take_orders, process_payments, view_schedule
- Cashier: process_payments, view_menu

EMPLOYEES:
- Sarah → Manager role
- Tom → Barista role  
- Lisa → Cashier role
```

### **RBAC Characteristics:**
```
🏢 ENTERPRISE-FRIENDLY: Scales well for large organizations
📋 STRUCTURED: Clear hierarchy and responsibility
🔧 ADMIN-HEAVY: Requires role management
🎯 STATIC: Permissions don't change based on context
```

---

## **🎯 GROUP-BASED ACCESS CONTROL (GBAC)** 👥🔧

### **What It Is:**
*"Permissions assigned to GROUPS, and users belong to groups"*

### **The Vibe:**
```
USERS → GROUPS → PERMISSIONS
```

### **Real-World Structure:**
```
GROUPS:
- Developers: deploy_code, access_servers, view_logs
- Data-Team: query_databases, export_reports
- Support: view_tickets, update_customer_info

USERS:
- Alice → Developers group
- Bob → Developers + Data-Team groups  
- Charlie → Support group
```

### **Stellar Café Example:**
```
DEPARTMENT GROUPS:
- Marketing: update_website, access_social_media, view_analytics
- Operations: manage_inventory, view_supplier_portal
- HR: access_employee_records, view_payroll

EMPLOYEES:
- Maria → Marketing + Operations groups
- David → HR group only
```

### **GBAC vs RBAC:**
```
RBAC: "You're a Manager" (title-based)
GBAC: "You're in Marketing and Operations" (membership-based)

GBAC = More flexible, users can belong to multiple groups
```

---

## **🎯 OAUTH 2.0 - The Delegated Access** 🔄🔑

### **What It Is:**
*"Authorization framework for granting third-party applications LIMITED access to user resources"*

### **The Vibe:**
```
"Can this app read my Google contacts? (but not delete them)"
```

### **Common Flows:**
```
🔑 AUTHORIZATION CODE: Web apps (most secure)
📱 IMPLICIT: Mobile apps (older, less secure)
🤖 CLIENT CREDENTIALS: Machine-to-machine (no user involved)
🔐 DEVICE CODE: Smart TVs, gaming consoles
```

### **Stellar Café Example:**
```
MOBILE APP SCENARIO:
1. User taps "Connect Google Calendar"
2. App requests: "Read-only access to calendar events"
3. Google shows: "Stellar Café app wants to: View your events"
4. User approves → App gets access token
5. App can now read calendar but CANNOT delete events
```

### **OAuth 2.0 Scope Examples:**
```
📧 GMAIL: https://www.googleapis.com/auth/gmail.readonly
📁 GOOGLE DRIVE: https://www.googleapis.com/auth/drive.file
👤 FACEBOOK: email, user_likes, user_photos
```

---

## **🎯 DISCRETIONARY ACCESS CONTROL (DAC)** 👤🎯

### **What It Is:**
*"Resource OWNERS control who can access their resources"*

### **The Vibe:**
```
"I created this file, so I decide who can see it"
```

### **Real-World Examples:**
```
📁 FILE SYSTEMS:
- Unix/Linux: chmod 755 (user/group/others permissions)
- Windows: Right-click → Properties → Security tab

🏠 SHARED DRIVES:
- Google Drive: "Anyone with link can view"
- SharePoint: "Specific people only"
```

### **Stellar Café Example:**
```
SHARED RECIPES FOLDER:
- Sarah (creator): Full control (read/write/delete)
- Tom (team lead): Read/write access
- Lisa (barista): Read-only access
- Other staff: No access

Sarah can change these permissions at any time
```

### **DAC Characteristics:**
```
👤 USER-CENTRIC: Owners have control
🔧 FLEXIBLE: Easy to grant/revoke access
⚠️ RISKY: Can lead to permission sprawl
🏠 PERSONAL: Great for personal files, bad for enterprise security
```

---

## **🔀 COMPARISON MATRIX** 📊⚡

| Model | Control Point | Best For | Risk Level |
|-------|---------------|----------|------------|
| **RBAC** 👑 | Central IT Admin | Enterprises, compliance | 🟢 Low |
| **GBAC** 👥 | Group Membership | Departments, projects | 🟢 Low |
| **OAuth 2.0** 🔄 | User Consent | Third-party apps, APIs | 🟡 Medium |
| **DAC** 👤 | Resource Owner | Personal files, collaboration | 🔴 High |

---

## **🏗️ REAL-WORLD HYBRID APPROACH** 🎯🔧

### **Modern Cloud Architecture:**
```
ENTERPRISE APP:
- RBAC: Internal employee roles (Admin, User, Viewer)
- GBAC: Department-based access (Engineering, Marketing, Sales)  
- OAuth 2.0: Customer API access with scopes
- DAC: User-generated content permissions
```

### **Stellar Café Platform:**
```
INTERNAL STAFF → RBAC/GBAC:
- Manager role + Operations group

CUSTOMER MOBILE APP → OAuth 2.0:
- order:create, profile:read, loyalty_points:view

USER CONTENT → DAC:
- Customers control who sees their reviews/photos
```

---

## **🚨 EXAM GOLD - What They're Testing** 🥇📚

**Scenario Questions:**
- *"Company needs structured permissions for 500 employees?"* → **RBAC**
- *"Users need to control access to their own files?"* → **DAC**
- *"Third-party app needs limited access to user data?"* → **OAuth 2.0**
- *"Department-based permissions across multiple projects?"* → **GBAC**

**Key Differentiators:**
```
RBAC = ROLES + ENTERPRISE + STRUCTURED
GBAC = GROUPS + DEPARTMENTAL + FLEXIBLE  
OAUTH 2.0 = DELEGATION + THIRD-PARTY + SCOPED
DAC = OWNERSHIP + PERSONAL + DECENTRALIZED
```

---

## **🌟 #DAB'S AUTHORIZATION WISDOM** 🍃💫

> *"RBAC is your corporate org chart - everyone has a title that defines their permissions. GBAC is your project team membership - you get access based on which teams you're on. OAuth 2.0 is your valet key - giving limited, temporary access without handing over the master key. DAC is your personal filing cabinet - you decide who can open which drawers. Master all four, and you can design permission systems that are both secure and sensible."*

**This understanding transforms you from someone who just grants permissions to someone who architects authorization ecosystems!** 🏗️🔐

**You're thinking like a security architect** - balancing control, flexibility, and usability in permission design! 🎯✨

[...back](../vocabs/4-security.md)
