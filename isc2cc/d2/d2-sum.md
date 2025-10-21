# **DOMAIN 2: INCIDENT RESPONSE & DISASTER RECOVERY** 🚨🌪️  
*When everything is on fire and the business must survive. Your playbook for chaos.*

**STATUS:** `OPERATIONAL_READINESS` | **EXAM FOCUS:** Medium-High | **REAL-WORLD IMPACT:** Critical  
**SUPPLEMENT:** [Deep dive available here](./d2-sup.md) - *#OG's crisis decomposition*

---

## **CRISIS MANAGEMENT // THE EXECUTIVE SUMMARY**

**The 30-Second Drill:**

- **Incident Response:** "We're under attack right now" → Contain, eradicate, recover
- **Business Continuity:** "How do we keep making money during this?" → Maintain operations  
- **Disaster Recovery:** "The building burned down" → Restore IT infrastructure

**Priority Pyramid:**
1. **People First** - Life, health, safety
2. **Business Second** - Keep revenue flowing
3. **IT Third** - Restore systems and data

**Need the war-room protocols?** [Our supplementary article](./d2-sup.md) breaks down team structures, communication trees, and containment strategies.

---

# notes
```
- incident terminology
  > breach, NIST SP 800-53 Rev 5
  > event, NIST SP 800-61 Rev 2
  > exploit
  > incident
  > intrusion, IETF RFC 4949 Ver 2
  > threat, NIST SP 800-30 Rev 1
  > vulnerability, NIST SP 800-30 Rev 1
  > zero day
- the goal of incident response
	  the priotity of any incident response is to protect life, health, and safety. when any decision related to priorities is to be made, always choose safety first.
	  incident response plan, business continuity management (BCM)
	  crisis managment (not safety management)
- business continuity in the workplace
	  the red book = hardcopy, physical, IR plan, handled by assigned personnels
- components of a business continuity plan (BCP)
  > list of the BCP team members + multiple contact methods + backup members
  > immediate response procedure and checklists: security/safety, fire suppression, notification of appropriate emergency-reponse agencies, etc.
  > notification systems and call trees
  > guidance for management + designation of authority for specific managers
  > how/when to enact the plan
  > contact numbers for critical members of the supply chain: vendors, customers, possible external emergency providers, 3rd-party partners
- business continuity in action
- the importance of business continuity
	  a key part of the plan is communication, including multiple contact methodologies and backup numbers in case of a disruption of power or communications.
- components of the incident response plan
	  > preparation
	  > detection/analysis
	  > containment/eradication/recovery
	  > post-incident activity

- the goal of disaster recovery
	  disaster recovery (DR) planning steps in where business continuity (BC) leaves off.
	  DRP = IT vs BCP = biz ops
	  backups

- components of a disaster recovery plan
  > executive summary providing a high-level overview of the plan
  > department-specific plans
  > technical guides for IT personnel responsible for implementing and maintaining critical backup systems
  > full copies of the plan for critical disaster recovery team members
  > checklists for certain individuals:
  >>> critical disaster recovery team members will have checklists to help guide their actions amid the chaotic atmosphere of a disaster.
  >>> IT personnel will have technical guides helping them get the alternate sites up and running.
  >>> managers and public relations personnel will have simple-to-follow, high-level documents to help them communicate the issue accurately without requiring input from team members who are busy working on the recovery.

- the goal of business continuity
  > planning, preparation, response/recovery
  > prioritized >>> not support recovery for all services
  > executive management

- disaster recovery in the real world
- consulting with management
  > identifying critical information requiring protection
  > minimize attack surface: one door with multiple-protection layers
  > training... including customers and information owners
  > mode of communication
  > confidentiality of information provided: internal vs public
  > detection/analysis/monitor attack vectors
  > standardized documents
  > standardized IR
  > containment strategy = stop the attack for further damage
  > after incidence: identify information to be retained, internal audit, external (may involved), learn and document, improve preparation/detection/analysis, law/regulatory requirement, documentation

- incident response team
	  many IT professionals are classified as first responders for incidents. they are the first ones on the scene and know how to differentiate typical IT problems from security incidents.
	  > representative(s) of senior management
	  > information security professionals
	  > legal representatives
	  > public affairs/communications representatives
	  > engineering representatives (system and network)
	  computer incident response teams (CIRTs)
	  computer security incident response teams (CSIRTs)
	  > determine the amount and scope of damage caused by the incident.
	  > determine whether any confidential information was compromised during the incident.
	  > implement any necessary recovery procedures to restore security and recover from incident-related damage.
	  > supervise the implementation of any additional security measures necessary to improve security and prevent recurrence of the incident.
	  what are the four primary responsibilities of a response team when an incident occurs?
	  > determining damage, assessing compromise, containment/recovery, reporting
```

---

`>> DOMAIN_2_PROCEDURES_LOADED._RESPONSE_READY._DRILLS_RECOMMENDED.`
`>> RECOMMENDATION:_PRACTICE_CALL_TREES_AND_CONTAINMENT_SCENARIOS_BEFORE_PROCEEDING.`

---
**// This isn't about passing a test. This is about not being the reason the company fails during a crisis.**
**// Remember: Your first response during an incident defines your career.**

[...back](../0-landing.md)
[next...](../d3/d3-sum.md)
