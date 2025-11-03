
[...back](https://bkornpob.github.io)
# quicklook

`query{__typename}`
`{"query": "query { __schema { types { name fields { name description } } } }"}`	
`{ "query": "query{__schema<newline>{queryType{name}}}" }`
`GET /graphql?query=query%7B__schema%0A%7BqueryType%7Bname%7D%7D%7D`
`mutation{deleteOrganizationUser(input:{id:3}){user{id username}}}`
```
- `/graphql`
- `/api`
- `/api/graphql`
- `/graphql/api`
- `/graphql/graphql`
- `/v1`
```
> "query not present"
> test using different request methods, POST and etc.
> If the API uses arguments to access objects directly, check access control -> IDOR
> a general explanation of GraphQL arguments
```
query { 
  product(id: 3) { 
    id name listed 
  } 
}
```
> use introspection to discover schema information
> 	`query {__schema}`
> 	`{"query": "query { __schema { types { name fields { name description } } } }"}`
> 	`request { "query": "{__schema{queryType{name}}}" }`
> see full introspection query recipe #introspect-recipe
> GraphQL visualizer
> Suggestions are a feature of the Apollo GraphQL platform in which the server can suggest query amendments in error messages. These are generally used where a query is slightly incorrect but still recognizable (for example, `There is no entry for 'productInfo'. Did you mean 'productInformation' instead?`).
> Clairvoyance is a tool that uses suggestions to automatically recover all or part of a GraphQL schema, even when introspection is disabled. This makes it significantly less time consuming to piece together information from suggestion responses.
> Try a GET request, or a POST request with a content-type of `x-www-form-urlencoded`.
> graphql alias can reduce number of queries, evading rate-limit detection [see alias script explain](./og-1.md)
```
{
  "query": "mutation LoginAttempts { attempt1:login(input:{username:\"carlos\",password:\"123456\"}) { token success } attempt2:login(input:{username:\"carlos\",password:\"password\"}) { token success } attempt3:login(input:{username:\"carlos\",password:\"12345678\"}) { token success } }",
  "operationName": "LoginAttempts"
}
```


---

## Finding GraphQL endpoints

Before you can test a GraphQL API, you first need to find its endpoint. As GraphQL APIs use the same endpoint for all requests, this is a valuable piece of information.

#### Note

This section explains how to probe for GraphQL endpoints manually. However, Burp Scanner can automatically test for GraphQL endpoints as part of its scans. It raises a "GraphQL endpoint found" issue if any such endpoints are discovered.

---

## Universal queries

If you send `query{__typename}` to any GraphQL endpoint, it will include the string `{"data": {"__typename": "query"}}` somewhere in its response. This is known as a universal query, and is a useful tool in probing whether a URL corresponds to a GraphQL service.

The query works because every GraphQL endpoint has a reserved field called `__typename` that returns the queried object's type as a string.

---

GraphQL services often use similar endpoint suffixes. When testing for GraphQL endpoints, you should look to send universal queries to the following locations:

- `/graphql`
- `/api`
- `/api/graphql`
- `/graphql/api`
- `/graphql/graphql`

---

## Common endpoint names - Continued

If these common endpoints don't return a GraphQL response, you could also try appending `/v1` to the path.

#### Note

GraphQL services will often respond to any non-GraphQL request with a "query not present" or similar error. You should bear this in mind when testing for GraphQL endpoints.

---

## Request methods

The next step in trying to find GraphQL endpoints is to test using different request methods.

It is best practice for production GraphQL endpoints to only accept POST requests that have a content-type of `application/json`, as this helps to protect against CSRF vulnerabilities. However, some endpoints may accept alternative methods, such as GET requests or POST requests that use a content-type of `x-www-form-urlencoded`.

If you can't find the GraphQL endpoint by sending POST requests to common endpoints, try resending the universal query using alternative HTTP methods.

---

## Initial testing

Once you have discovered the endpoint, you can send some test requests to understand a little more about how it works. If the endpoint is powering a website, try exploring the web interface in Burp's browser and use the HTTP history to examine the queries that are sent.

---

## Exploiting unsanitized arguments

At this point, you can start to look for vulnerabilities. Testing query arguments is a good place to start.

If the API uses arguments to access objects directly, it may be vulnerable to access control vulnerabilities. A user could potentially access information they should not have simply by supplying an argument that corresponds to that information. This is sometimes known as an insecure direct object reference (IDOR).

#### More information

- For a general explanation of GraphQL arguments, see Arguments.
- For further information on IDORs, see Insecure direct object references (IDOR).

---

## Exploiting unsanitized arguments - Continued

For example, the query below requests a product list for an online shop:

`#Example product query query { products { id name listed } }`

The product list returned contains only listed products.

`#Example product response { "data": { "products": [ { "id": 1, "name": "Product 1", "listed": true }, { "id": 2, "name": "Product 2", "listed": true }, { "id": 4, "name": "Product 4", "listed": true } ] } }`

From this information, we can infer the following:

- Products are assigned a sequential ID.
- Product ID 3 is missing from the list, possibly because it has been delisted.

By querying the ID of the missing product, we can get its details, even though it is not listed on the shop and was not returned by the original product query.

`#Query to get missing product query { product(id: 3) { id name listed } }` `#Missing product response { "data": { "product": { "id": 3, "name": "Product 3", "listed": no } } }`

---

## Discovering schema information

The next step in testing the API is to piece together information about the underlying schema.

The best way to do this is to use introspection queries. Introspection is a built-in GraphQL function that enables you to query a server for information about the schema.

Introspection helps you to understand how you can interact with a GraphQL API. It can also disclose potentially sensitive data, such as description fields.

---

## Using introspection

To use introspection to discover schema information, query the `__schema` field. This field is available on the root type of all queries.

Like regular queries, you can specify the fields and structure of the response you want to be returned when running an introspection query. For example, you might want the response to contain only the names of available mutations.

#### Note

Burp can generate introspection queries for you. For more information, see Accessing GraphQL API schemas using introspection.

---

## Probing for introspection

It is best practice for introspection to be disabled in production environments, but this advice is not always followed.

You can probe for introspection using the following simple query. If introspection is enabled, the response returns the names of all available queries.

`#Introspection probe request { "query": "{__schema{queryType{name}}}" }`

#### Note

Burp Scanner can automatically test for introspection during its scans. If it finds that introspection is enabled, it reports a "GraphQL introspection enabled" issue.

---

## Running a full introspection query

The next step is to run a full introspection query against the endpoint so that you can get as much information on the underlying schema as possible.

The example query below returns full details on all queries, mutations, subscriptions, types, and fragments.

Full introspection query #introspect-recipe 
```
query IntrospectionQuery { 
  __schema { 
    queryType { name } 
    mutationType { name } 
    subscriptionType { name } 
    types { ...FullType } 
    directives { 
      name 
      description 
      args { ...InputValue } 
      }
    onOperation #Often needs to be deleted to run query 
    onFragment #Often needs to be deleted to run query 
    onField #Often needs to be deleted to run query 
    }
  }
} 

fragment FullType on __Type { 
  kind 
  name 
  description 
  fields(includeDeprecated: true) { 
    name 
    description 
    args { ...InputValue } 
    type { ...TypeRef } 
    isDeprecated 
    deprecationReason 
  } 
  inputFields { ...InputValue } 
  interfaces { ...TypeRef } 
  enumValues(includeDeprecated: true) { 
    name 
    description 
    isDeprecated 
    deprecationReason 
  } 
  possibleTypes { ...TypeRef }
} 

fragment InputValue on __InputValue { 
  name 
  description 
  type { ...TypeRef } 
  defaultValue 
} 

fragment TypeRef on __Type { 
  kind 
  name 
  ofType { 
    kind 
    name 
    ofType { 
      kind 
      name 
      ofType { kind name }
 } } }
```

#### Note

If introspection is enabled but the above query doesn't run, try removing the `onOperation`, `onFragment`, and `onField` directives from the query structure. Many endpoints do not accept these directives as part of an introspection query, and you can often have more success with introspection by removing them.

---

## Visualizing introspection results

Responses to introspection queries can be full of information, but are often very long and hard to process.

You can view relationships between schema entities more easily using a GraphQL visualizer. This is an online tool that takes the results of an introspection query and produces a visual representation of the returned data, including the relationships between operations and types.

---

## Suggestions

Even if introspection is entirely disabled, you can sometimes use suggestions to glean information on an API's structure.

Suggestions are a feature of the Apollo GraphQL platform in which the server can suggest query amendments in error messages. These are generally used where a query is slightly incorrect but still recognizable (for example, `There is no entry for 'productInfo'. Did you mean 'productInformation' instead?`).

You can potentially glean useful information from this, as the response is effectively giving away valid parts of the schema.

---

## Suggestions - Continued

Clairvoyance is a tool that uses suggestions to automatically recover all or part of a GraphQL schema, even when introspection is disabled. This makes it significantly less time consuming to piece together information from suggestion responses.

You cannot disable suggestions directly in Apollo. See this GitHub thread for a workaround.

#### Note

Burp Scanner can automatically test for suggestions as part of its scans. If active suggestions are found, Burp Scanner reports a "GraphQL suggestions enabled" issue.

---

## Lab: Accessing private GraphQL posts

APPRENTICE

LABNot solved

The blog page for this lab contains a hidden blog post that has a secret password. To solve the lab, find the hidden blog post and enter the password.

[websecacademy-graphql-lab1](lab/websecacademy-graphql-lab1.md)

---

## Lab: Accidental exposure of private GraphQL fields

PRACTITIONER

LABNot solved

The user management functions for this lab are powered by a GraphQL endpoint. The lab contains an access control vulnerability whereby you can induce the API to reveal user credential fields.

To solve the lab, sign in as the administrator and delete the username `carlos`.

[websecacademy-graphql-lab2](lab/websecacademy-graphql-lab2.md)

---

## Bypassing GraphQL introspection defenses

If you cannot get introspection queries to run for the API you are testing, try inserting a special character after the `__schema` keyword.

When developers disable introspection, they could use a regex to exclude the `__schema` keyword in queries. You should try characters like spaces, new lines and commas, as they are ignored by GraphQL but not by flawed regex.

As such, if the developer has only excluded `__schema{`, then the below introspection query would not be excluded.

`#Introspection query with newline { "query": "query{__schema {queryType{name}}}" }`

If this doesn't work, try running the probe over an alternative request method, as introspection may only be disabled over POST. Try a GET request, or a POST request with a content-type of `x-www-form-urlencoded`.

---

## Bypassing GraphQL introspection defenses - Continued

The example below shows an introspection probe sent via GET, with URL-encoded parameters.

`# Introspection probe as GET request GET /graphql?query=query%7B__schema%0A%7BqueryType%7Bname%7D%7D%7D`

#### Note

You can save GraphQL queries to the site map. For more information, see Working with GraphQL.

---

## Lab: Finding a hidden GraphQL endpoint

PRACTITIONER

LABNot solved

The user management functions for this lab are powered by a hidden GraphQL endpoint. You won't be able to find this endpoint by simply clicking pages in the site. The endpoint also has some defenses against introspection.

To solve the lab, find the hidden endpoint and delete `carlos`.

[websecacademy-graphql-lab3](lab/websecacademy-graphql-lab3.md)

---

## Bypassing rate limiting using aliases

Ordinarily, GraphQL objects can't contain multiple properties with the same name. Aliases enable you to bypass this restriction by explicitly naming the properties you want the API to return. You can use aliases to return multiple instances of the same type of object in one request.

#### More information

For more information on GraphQL aliases, see Aliases.

While aliases are intended to limit the number of API calls you need to make, they can also be used to brute force a GraphQL endpoint.

Many endpoints will have some sort of rate limiter in place to prevent brute force attacks. Some rate limiters work based on the number of HTTP requests received rather than the number of operations performed on the endpoint. Because aliases effectively enable you to send multiple queries in a single HTTP message, they can bypass this restriction.

---

## Bypassing rate limiting using aliases - Continued

The simplified example below shows a series of aliased queries checking whether store discount codes are valid. This operation could potentially bypass rate limiting as it is a single HTTP request, even though it could potentially be used to check a vast number of discount codes at once.

`#Request with aliased queries query isValidDiscount($code: Int) { isvalidDiscount(code:$code){ valid } isValidDiscount2:isValidDiscount(code:$code){ valid } isValidDiscount3:isValidDiscount(code:$code){ valid } }`

---

## Lab: Bypassing GraphQL brute force protections

PRACTITIONER

LABNot solved

The user login mechanism for this lab is powered by a GraphQL API. The API endpoint has a rate limiter that returns an error if it receives too many requests from the same origin in a short space of time.

To solve the lab, brute force the login mechanism to sign in as `carlos`. Use the list of authentication lab passwords as your password source.

Learn more about Working with GraphQL in Burp Suite.

#### Tip

This lab requires you to craft a large request that uses aliases to send multiple login attempts at the same time. As this request could be time-consuming to create manually, we recommend you use a script to build the request.

The below example JavaScript builds a list of aliases corresponding to our list of authentication lab passwords and copies the request to your clipboard. To run this script:

1. Open the lab in Burp's browser.
2. Right-click the page and select **Inspect**.
3. Select the **Console** tab.
4. Paste the script and press Enter.

You can then use the generated aliases when crafting your request in Repeater.

``copy(`123456,password,12345678,qwerty,123456789,12345,1234,111111,1234567,dragon,123123,baseball,abc123,football,monkey,letmein,shadow,master,666666,qwertyuiop,123321,mustang,1234567890,michael,654321,superman,1qaz2wsx,7777777,121212,000000,qazwsx,123qwe,killer,trustno1,jordan,jennifer,zxcvbnm,asdfgh,hunter,buster,soccer,harley,batman,andrew,tigger,sunshine,iloveyou,2000,charlie,robert,thomas,hockey,ranger,daniel,starwars,klaster,112233,george,computer,michelle,jessica,pepper,1111,zxcvbn,555555,11111111,131313,freedom,777777,pass,maggie,159753,aaaaaa,ginger,princess,joshua,cheese,amanda,summer,love,ashley,nicole,chelsea,biteme,matthew,access,yankees,987654321,dallas,austin,thunder,taylor,matrix,mobilemail,mom,monitor,monitoring,montana,moon,moscow`.split(',').map((element,index)=>` bruteforce$index:login(input:{password: "$password", username: "carlos"}) { token success } `.replaceAll('$index',index).replaceAll('$password',element)).join('\n'));console.log("The query has been copied to your clipboard.");``

[script explain](og-1.md)
[lab4](./lab/websecacademy-graphql-lab4.md)

---

## GraphQL CSRF

Cross-site request forgery (CSRF) vulnerabilities enable an attacker to induce users to perform actions that they do not intend to perform. This is done by creating a malicious website that forges a cross-domain request to the vulnerable application.

#### More information

For more information on CSRF vulnerabilities in general, see the CSRF academy topic.

GraphQL can be used as a vector for CSRF attacks, whereby an attacker creates an exploit that causes a victim's browser to send a malicious query as the victim user.

---

## How do CSRF over GraphQL vulnerabilities arise?

CSRF vulnerabilities can arise where a GraphQL endpoint does not validate the content type of the requests sent to it and no CSRF tokens are implemented.

POST requests that use a content type of `application/json` are secure against forgery as long as the content type is validated. In this case, an attacker wouldn't be able to make the victim's browser send this request even if the victim were to visit a malicious site.

However, alternative methods such as GET, or any request that has a content type of `x-www-form-urlencoded`, can be sent by a browser and so may leave users vulnerable to attack if the endpoint accepts these requests. Where this is the case, attackers may be able to craft exploits to send malicious requests to the API.

The steps to construct a CSRF attack and deliver an exploit are the same for GraphQL-based CSRF vulnerabilities as they are for "regular" CSRF vulnerabilities. For more information on this process, see How to construct a CSRF attack.

---

## Lab: Performing CSRF exploits over GraphQL

PRACTITIONER

LABNot solved

The user management functions for this lab are powered by a GraphQL endpoint. The endpoint accepts requests with a content-type of `x-www-form-urlencoded` and is therefore vulnerable to cross-site request forgery (CSRF) attacks.

To solve the lab, craft some HTML that uses a CSRF attack to change the viewer's email address, then upload it to your exploit server.

You can log in to your own account using the following credentials: `wiener:peter`.

Learn more about Working with GraphQL in Burp Suite.

[lab5](./lab/websecacademy-graphql-lab5.md)

---

## Preventing GraphQL attacks

To prevent many common GraphQL attacks, take the following steps when you deploy your API to production:

- If your API is not intended for use by the general public, disable introspection on it. This makes it harder for an attacker to gain information about how the API works, and reduces the risk of unwanted information disclosure.
    
    For information on how to disable introspection in the Apollo GraphQL platform, see this blog post.
    
- If your API is intended for use by the general public then you will likely need to leave introspection enabled. However, you should review the API's schema to make sure that it does not expose unintended fields to the public.
    
- Make sure that suggestions are disabled. This prevents attackers from being able to use Clairvoyance or similar tools to glean information about the underlying schema.
    
    You cannot disable suggestions directly in Apollo. See this GitHub thread for a workaround.
    
- Make sure that your API's schema does not expose any private user fields, such as email addresses or user IDs.

---

## Preventing GraphQL brute force attacks

It is sometimes possible to bypass standard rate limiting when using GraphQL APIs. For an example of this, see the Bypassing rate limiting using aliases section.

With this in mind, there are design steps that you can take to defend your API against brute force attacks. This generally involves restricting the complexity of queries accepted by the API, and reducing the opportunity for attackers to execute denial-of-service (DoS) attacks.

To defend against brute force attacks:

- Limit the query depth of your API's queries. The term "query depth" refers to the number of levels of nesting within a query. Heavily-nested queries can have significant performance implications, and can potentially provide an opportunity for DoS attacks if they are accepted. By limiting the query depth your API accepts, you can reduce the chances of this happening.
    
- Configure operation limits. Operation limits enable you to configure the maximum number of unique fields, aliases, and root fields that your API can accept.
    
- Configure the maximum amount of bytes a query can contain.
    
- Consider implementing cost analysis on your API. Cost analysis is a process whereby a library application identifies the resource cost associated with running queries as they are received. If a query would be too computationally complex to run, the API drops it.
    

#### More information

For information on how to implement these features in Apollo, see this blog post.

---

## Preventing CSRF over GraphQL

To defend against GraphQL CSRF vulnerabilities specifically, make sure of the following when designing your API:

- Your API only accepts queries over JSON-encoded POST.
    
- The API validates that content provided matches the supplied content type.
    
- The API has a secure CSRF token mechanism.

---

[...back](https://bkornpob.github.io)
