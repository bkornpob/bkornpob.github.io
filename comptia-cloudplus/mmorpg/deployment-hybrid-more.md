```
author: 51n5337 & #CLD
mission: CompTIA Cloud+ Certification
brief: deployment. hybrid. more.
```

---

[...back](./deployment-hybrid-mmorpg.md)

```
so, in reality, we deploy mixed strategies?

any more case studies you can share?
```

---

👁️⚡🌀  
**Absolutely.** Pure strategies are like primary colors—useful for learning, but the real art happens when you mix them. Most mature teams use **hybrid deployment orchestration**.

---

## 🎨 **Real-World Hybrid Strategies**

### **Case Study: Netflix's "Dark Launch" Canary + Blue-Green**
**Scenario:** New video encoding algorithm deployment

```
STRATEGY MIX:
1. **Dark Launch (Canary):** 
   - Deploy new algorithm to all servers but disabled
   - Enable for 1% of users via feature flag
   - Compare encoding quality vs old algorithm silently

2. **Blue-Green Switch:**
   - Once verified, flip all encoding traffic to new algorithm
   - Old algorithm remains active in Blue for instant rollback

3. **Rolling Cleanup:**
   - Gradually decommission old algorithm instances
   - Monitor performance during wind-down

PLAYER EXPERIENCE:
- Zero visible changes during testing
- Instant rollback if quality degrades
- No service interruption
```

---

### **Case Study: Amazon's Prime Day Rolling + Canary**
**Scenario:** Handling 1000% traffic spike with new features

```
STRATEGY MIX:
1. **Infrastructure Rolling:**
   - Scale out database read replicas in batches
   - Add web servers in rolling groups

2. **Feature Canary:**
   - New "lightning deal" algorithm to 5% of users
   - Monitor cart abandonment rates
   - Expand to 100% over 2 hours

3. **Blue-Green Payment:**
   - Dual payment service environments
   - Can flip entire transaction flow if fraud detection breaks

RESULT:
- Infrastructure scales smoothly
- New features validate under real load
- Critical paths have instant rollback
```

---

### **Case Study: Mobile Game Live Ops (Your MMORPG Domain)**
**Scenario:** Seasonal event with new gameplay mechanics

```
STRATEGY ORCHESTRATION:
1. **Client-Side Canary:**
   - New assets delivered via app store 48 hours early
   - Players update at their own pace

2. **Server-Side Blue-Green:**
   - Event logic deployed to Green environment
   - Enabled via feature flag when client penetration hits 80%

3. **Database Rolling:**
   - New event tables added via backward-compatible schema changes
   - Applied to database replicas in rolling fashion

4. **Traffic Canary:**
   - First 10% of players to trigger event get extra monitoring
   - If stable, open to all players

PLAYER JOURNEY:
- Early updaters: "New assets ready!" 
- Event launch: "Seasonal event live!" 
- Zero downtime, gradual load increase
```

---

### **Case Study: Banking Security Update**
**Scenario:** New fraud detection system

```
DEFENSE-IN-DEPTH DEPLOYMENT:
1. **Shadow Canary:**
   - New system runs parallel to old one
   - Compares decisions but doesn't act
   - Validates accuracy for 72 hours

2. **Blue-Green Critical Path:**
   - Authentication services in dual setup
   - Can flip entire login flow if false positives spike

3. **Rolling Backend:**
   - Update transaction processing in batches
   - Each bank region updates independently

4. **Feature Flag Rollback:**
   - Every new check has kill switch
   - Can disable specific rules without full rollback

RISK MANAGEMENT:
- No customer impact during validation
- Granular control over what gets rolled back
- Regional containment of issues
```

---

## 🎯 **The Pattern: Orchestration, Not Choice**

Mature teams don't **choose** a strategy—they **orchestrate** multiple strategies based on:

- **Criticality** of the service (payment vs. UI)
- **Risk tolerance** (user experience vs. revenue impact)  
- **Data sensitivity** (customer data vs. cached content)
- **User journey** (logged-in vs. anonymous)

---

## 💡 **The Architect's Mindset**

You're not deploying code—you're **managing risk across multiple dimensions simultaneously**. Each service, each feature, each data store might need a different deployment approach.

**The ultimate hybrid:** Using the right strategy for the right component at the right time.

---

[...back](./deployment-hybrid-mmorpg.md)
