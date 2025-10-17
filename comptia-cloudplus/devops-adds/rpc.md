## **RPC: The "Function Call Across the Network"** 📞🌐

> *"What if you could call a function on another computer like it was right there in your code?"*

### **The Mental Model: Local Function vs Remote Function**

```javascript
// LOCAL function call
const result = calculateTotal(order);
// Everything happens in the same process

// REMOTE procedure call (RPC)
const result = await userService.calculateTotal(order);
// Magic happens over the network to another service
```

[...back to 5-devops](../vocabs/5-devops.md)

---

## **How RPC Actually Works** 🔧

### **The Basic Flow:**
```
YOUR CODE → [RPC CLIENT] → NETWORK → [RPC SERVER] → REMOTE CODE
     ↑                                         ↓
     └─────────────────────────────────────────┘
          Looks like a normal function call
```

### **Example: Stellar Café Order System** ☕
```javascript
// CLIENT SIDE - feels like a local function
const orderTotal = await orderService.calculateTotal({
  items: ['espresso', 'croissant'],
  customerId: 123,
  location: 'downtown'
});

// You have NO IDEA this goes over the network
// Could be next door, could be another continent
```

---

## **What Actually Happens Under the Hood** 🕵️

### **1. Client Side:**
```javascript
// Your code calls what looks like a local method
const user = userService.getUser(123);

// RPC client translates this to network request
// Becomes: POST /rpc { "method": "getUser", "params": [123] }
```

### **2. Network Journey:**
```bash
# Request travels over HTTP/gRPC/whatever
{"method": "getUser", "params": [123]}

# Response comes back
{"result": {"id": 123, "name": "John", "email": "john@cafe.com"}}
```

### **3. Server Side:**
```javascript
// RPC server receives request
router.handle('getUser', (userId) => {
  // Actually executes the function
  return database.users.find(userId);
});
```

---

## **RPC vs REST: The Key Difference** ⚔️

### **RPC: Action-Oriented**
```bash
# You're calling FUNCTIONS
userService.activateAccount(userId)
orderService.cancelOrder(orderId)
paymentService.refundTransaction(txId)

# URLs represent ACTIONS
POST /rpc/activateAccount
POST /rpc/cancelOrder  
POST /rpc/refundTransaction
```

### **REST: Resource-Oriented**
```bash
# You're manipulating RESOURCES
PATCH /users/123 { "status": "active" }
DELETE /orders/456
POST /refunds { "transactionId": "tx_789" }

# URLs represent NOUNS (resources)
```

---

## **Real RPC Examples** 🎯

### **gRPC (Google's RPC system):**
```protobuf
// Service definition
service UserService {
  rpc GetUser (GetUserRequest) returns (User);
  rpc CreateUser (CreateUserRequest) returns (User);
}

// Client usage (TypeScript)
const user = await userService.getUser({ id: 123 });
```

### **JSON-RPC:**
```json
// Request
{
  "jsonrpc": "2.0",
  "method": "calculateTotal",
  "params": {"orderId": 123},
  "id": 1
}

// Response  
{
  "jsonrpc": "2.0",
  "result": 45.50,
  "id": 1
}
```

---

## **When RPC Shines ✨**

### **Microservices Communication:**
```javascript
// Service A calls Service B naturally
const inventory = await inventoryService.checkStock('espresso_beans');
const price = await pricingService.getCurrentPrice('espresso');
// Feels like programming, not like doing HTTP requests
```

### **Performance-Critical Apps:**
```bash
# gRPC uses binary protocols (Protocol Buffers)
# Faster than JSON over HTTP
# Perfect for internal service-to-service communication
```

### **Strong Typing Needs:**
```protobuf
// Protocol Buffers enforce types
message User {
  int32 id = 1;
  string name = 2;
  string email = 3;
}
// No more "oops, I thought that field was a string" bugs
```

---

## **The "Oh Crap" RPC Realities** 😅

### **Tight Coupling Risk:**
```javascript
// Client and server must share function signatures
// If server changes a parameter, all clients break
await userService.getUser(123, true);  // Added new parameter
// All existing clients: ❌
```

### **Discovery Problems:**
```bash
# REST: "What endpoints are available?"
GET /users
GET /orders
# Easy to explore

# RPC: "What functions can I call?"
# Need documentation or service discovery
```

### **Caching Challenges:**
```bash
# REST: GET /users/123 → Easy to cache
# RPC: userService.getUser(123) → Is this cacheable? Maybe?
```

---

## **RPC in the Wild: Stellar Café** ☕🔌

### **Internal Services Talking:**
```javascript
// Order service calls Inventory service
const canFulfill = await inventoryService.reserveItems({
  items: order.items,
  location: order.locationId
});

// Payment service calls Loyalty service  
const pointsEarned = await loyaltyService.calculatePoints(order.total);

// Feels like normal programming, but distributed across services
```

### **vs REST Approach:**
```javascript
// More manual, more HTTP awareness
const inventoryResponse = await fetch('/inventory/reserve', {
  method: 'POST',
  body: JSON.stringify({ items: order.items })
});
const canFulfill = await inventoryResponse.json();
```

---

## **#Dab's RPC Wisdom** 🌿💭

> "RPC makes distributed systems feel like local programming. This is both its greatest strength and most dangerous trap."

> "Use RPC when you want the abstraction of 'just calling methods' between services. Use REST when you want explicit, cacheable, discoverable resource operations."

> "RPC is perfect for internal microservices where you control both sides. REST is better for public APIs where clients are unknown."

> "The modern winner: gRPC for service-to-service, REST for public-facing APIs. Each plays to their strengths."

**Bottom line:** RPC is the illusion of local function calls over the network. Powerful abstraction, but know when the abstraction leaks!

That's the RPC story! 📞🌐

Pass the knowledge, not the stress.
**- #Dab** 🌿💻

[...back to 5-devops](../vocabs/5-devops.md)
