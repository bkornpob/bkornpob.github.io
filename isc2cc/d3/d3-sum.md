# **DOMAIN 3: ACCESS CONTROL CONCEPTS** 🔐👥  
*Who gets what, why they shouldn't have it, and how to stop them anyway.*

**STATUS:** `PERMISSION_MATRIX_ACTIVE` | **EXAM FOCUS:** High | **PRACTICAL IMPORTANCE:** Daily Operations  
**SUPPLEMENT:** [Deep dive available here](./d3-sup.md) - *#OG's authorization decomposition*

---

## **ACCESS CONTROL // THE GATEKEEPER'S MANIFESTO**

**The 30-Second Security Posture:**

- **Defense in Depth:** Layers upon layers - because one lock is an invitation
- **Least Privilege:** Give only what's needed - because curiosity kills the CIA triad
- **Separation of Duties:** No single point of failure - because trust is a vulnerability

**The Control Trinity:**
- **Physical:** Gates, guards, guns
- **Technical:** Passwords, tokens, biometrics  
- **Administrative:** Policies, procedures, paperwork

**Need the breach scenarios?** [Our supplementary article](./d3-sup.md) shows how each control fails and how to layer them properly.

---

# notes
```
- security control
	  a control is a safeguard or countermeasure designed to preserve CIA of data.

- controls overview
  > subjects, objects, rules

- defense in depth
  > attack!!! >>> ( physical ( logical/technical ( admin ( assets ))))

- logical access controls
  > passwords, biometrics, badge/token readers connected to a system

- defense in depth in practice
- controls and risks
- controls assessments
	  consider a scenario where part of an office building is being re-purposed for use as a secure storage facility. due to the previous use of the area, there are 5 doors which must be secured before confidential files can be stored there. when securing a physical location, there are several things to consider.

- role-based access control (rbac)
  > access overflow, permissions anomaly, role deviation, privilege creep

- privileged access management
  > just-in-time pam <-> rbac with subset roles

- privileged accounts
  > sysadmin, help desk/it support, security analyst
  > typical measures used for moderating the potential for elevated risks from misuse or abuse of privileged accounts
  > >>> more extensive and detailed logging than regular user accounts.
  > >>> more stringent access control than regular user accounts.
  > >>> deeper trust verification than regular user accounts.
  > >>> more auditing than regular user accounts.

- monitoring
  > cameras, logs, alarm systems, security guards

- examples of least privilege
- mandatory access control (MAC) in the workplace
  > accompanied by separation of duties, where the scope of work is limited and users do not have access to information that does not concern them. this separtion of duties also facilitated by rbac.

- MAC
  > passing information to unauthz subjects or objects
  > granting privileges to other subjects
  > changing one or more security attributes on subjects, objects, the information system or system compoenents
  > choosing the security attributes to be associated with newly created or modified objects
  > changing the rules governing access control

- MAC vs DAC (discretionary access control): who control access? MAC = security admin, DAC = object owner's discretion
- physical security controls
  > single point of failure?

- benefit of multiple controls
- separation of duties
  > two-person integrity, requiring presence, no need for functioning the same

- DAC
- authz vs unauthz personnel
  > provisioing: new empoyee, change of position, separation of employment

- types of physical access controls: badge + color age and gate entry, crime prevention through environmental design (CPTED), biometrics, physiological, behavioural
```

---

`>> DOMAIN_3_PERMISSIONS_MAPPED._LEAST_PRIVILEGE_ENFORCED._AUDITING_ACTIVE.`
`>> RECOMMENDATION:_PRACTICE_PRIVILEGE_ESCALATION_SCENARIOS_TO_UNDERSTAND_DEFENSES.`

---
**// This isn't about building walls. It's about designing doors that only open for the right people.**
**// Remember: Every access control decision is a balance between security and productivity.**

[...back](../0-landing.md)
[next...](../d4/d4-sum.md)
