### my log

```
my personal experience recorded here. this is retrospective. anything uncertain will be stated.

i had been studying isc2-cc on its self-paced online system when this happened.

server started to load next page slower. then error loading -- don't have record of error code... along the line of server is busy please try again later (recovered this part of the memory from reviewing Reddit reports); refreshing once worked. keep going with occassionally busy server. then, refreshing may not work. then, no longer work. however, i didn't notice performance dropped on other systems that i was on such as DeepSeek, Facebook, or even YouTube.

timewise... this is really retrospective from email records that i have timestamps. these emails were sent out to congratulate the isc2-cc learner from achieving certain milestones.

d3 email >>> 20-oct-2025 2:27pm
that was before this shit happened

i remember the first sign happened while i was studying d4 (which was about after 30 mins break after the completion).

d5 email >>> 21-oct-2025 3:42pm
i have never received d4 email.

d4 cert is verified. it is recorded (issued on 21/10/2025) on the system. however, there is no specific time information.

read bbc notes, and some others

found official summary from AWS [https://aws.amazon.com/message/101925/](./assets/aws-summary.md)
- stating this was three incidents in sequence: first DynamoDB failed on early,
 then network load balancer (NLB) problem, last new EC2 instance failed
- resolved marked 1:50pm
- DynamoDB + NLB issues observed on US-EAST-1
- The incident was triggered by a latent defect within the service’s automated DNS management system that caused endpoint resolution failures for DynamoDB.
  
be mindful that this official statement is also retrospective <<< we still didn't see when AWS first mentioned DNS error during the outage.
```

# my thoughts

```
'appears to be related to DNS resolution of the DynamoDB API endpoint in US-EAST-1' <<< precised AWS statement, check 17:32 20 Oct bbc note

i experienced it afternoon, so it's late night in EU, early morning in US, suppose so

also it was quite at the prime hours of the day

from my review, motion feels like asian > EU > USA through out the day <<< pattern with time/geolocation/activities

i think i remember learning that US update likes to be at early morning, avoiding service disruption <<< consistent with update pattern and the origin time

Reddit resolved the issue by themselves <<< feel like they announced this before AWS announcing the cause of error (DNS error)

will have to dig more if we can find what the Reddit fix was? did they mention DNS error?

anyway, a bigger question... DNS error, does it fit the patterns? <<<
- zero-day pattern <<< it happened consistently if this was just a regular update at early morning in US to minimize service disruption.
- pwn pattern <<< the reports started ~9am BST consistent with my experience ~3pm bkk. supporting global scale. can be DNS error. report frequencies seemed to move from EU to US, consistent with daily-rhytm
- escalate pattern <<< service performance dropped. some messages 'server busy'. leading to total shut down of services. for several hours. things getting back. some said normal some not.
- recovery pattern <<< when did AWS announce DNS error? i will have to confirm this. though, also will have to confirm this, feel like Reddit announced fix before AWS announced DNS error. Reddit is one of the key to this investigation. and also, will have to check who got resolved first, the priority? <<< pattern might indicate motives; for example if we follow recovery through critical-function concept -- health/financial(/security/military although i don't think they will ever say that this affected them even if it was) should be the very first. Snapchat users reported 'now telling me all my friends have unadded me' after they can log back in, while others seemed to still cannot back in or in with some bugs not regarding friendlist <<< concerning data integrity, DNS error pattern does not feel match?
  
note regarding data integrity from my experience, i had incidence that made me question this while navigating during the down time. my experience pointed me to question if data was 'rolled back' for at least a year.

for DNS error, then, the pattern of reports (deconvolved with daily-rhytm) will give clue <<< currently, observing report frequencies moving from EU > US, consistent with daily-rhytm. fix pattern seems to be service specifics.

ASIA not discussed anywhere so far; from my direct experience it started consistently as the first report ~9am BST -- check my read from bbc

US-EAST-1 Virgina, on East Coast <<< was the one that actually had problem. this may explain why West Coast + ASIA may minimize the effects. <<< this also may explain my experience that the isc2-cc service was interupted while others were not.

remaining open nodes still exist ...

DNS error mentioned before 17:46 20 Oct

16:12 20 Oct
"We have identified a potential root cause for error rates for the DynamoDB APIs in the US-EAST-1 Region." <<< no DNS mentioned

17:32 20 Oct
'appears to be related to DNS resolution of the DynamoDB API endpoint in US-EAST-1' <<< AWS said DNS?

15:34 20 Oct 
'increased error rates and latencies for multiple AWS Services in the US-EAST-1 Region' <<< seem like this was the earliest response from AWS showing that they can identify the source of problem. however, DNS has never been mentioned by them?
```

### my read from bbc

```
this part i note important stuff from reviewing bbc sources
```

- AWS (Amazon Web Services)
	- DNS error (likely)
	- don't know exact cause of DNS error? from [bbc-1](bbc-1.md)
		> Usually it's a maintenance issue or a server failure. Sometimes that's human error, someone misconfiguring something somewhere, or in extreme cases a cyber attack - although there's no evidence of this so far.
	- northern Virginia, US-EAST-1 (largest cloud provider)
	- third time in five years for a major internet outage has stemmed from the northern Virginia data centre.
- +1000 companies 
	- including major social platforms
	- wide-scale outage, including wide ranges of business and geolocation.
- experts encouraging multicloud solution
	- with AWS leading tech, for multicloud solutions only capable with Microsoft Azure and Google Cloud Platform. Smaller rivals include IBM, Alibaba (Chinese), Stackit (by Lidl, from European, launched last year)
- UK and Europe urge building their own infrastructure
- there are other notes worth mentioning:
	> scams warning, better dr plan encouraged, muticloud provider encouraged, encouraging diverse providers especially UK/EU
- check [bbc-2](bbc-2-page1.md) for live event records
	- 8:24 21 Oct -- aws returns to normal
		- summary: [what went wrong?](https://www.bbc.com/news/articles/c20pgp3nx07o), [why](bbc-1.md)
	- 8:17 21 Oct -- what caused the outage?
		- likely DNS
	- 7:16 21 Oct -- all aws services returning to normal, amazon says
		- 15-hour long outage
	- 6:22 21 Oct -- it's always DNS - engineer on major outages
		- Marek SZustak (eSky Group) explains that aws's outage is to do with DNS ...
	- 3:32 21 Oct -- what we know about today's internet outages
		- DNS resolution not working
		- Amazon says the underlying issue has been fixed, but consumers are still reporting problems
	- 1:23 21 Oct -- Amazon says underlying problems fixed, now the blame game begins
		- One computer science expert says some of the responsibility rests with the companies who use AWS. 
		- “Companies using Amazon haven’t been taking enough adequate care to build protection systems into their applications,” says Ken Birman, a computer science professor at Cornell University in New York.
		- (Ken Birman)
	- 00:24 21 Oct -- Outage may lead to attempts to recover losses from big businesses, lawyer says
		- reality, everyone seems fine, whatev, and move on
	- 23:16 20 Oct -- roblox and fortnite among services back online
	- 23:02 20 Oct -- why did parts of the internet fall apart today?
		- we know now that the culprit was something called DNS resolution
	- 22:54 20 Oct -- users continue to report issues - here's what you need to know
		- 8 hours passed, AWS says some services are still experiencing significant errors
		- AWS said at around 12:00 BST (6pm bkk), it had fixed the underlying issue, but noted there would still be problems as they brought everything up to speed
		- it appears most of the latest issues are affecting those in the US, with thousands reporting issues using many services in the country as of 15:30 BST (9:30pm bkk), writes technology reporter Tom Gerken
	- 22:24 20 Oct -- Amazon share prices rise as markets open
	- 22:15 20 Oct -- Constant outages show how fragile the internet really is
		- The relative frequency of these events is highlighting the fragility of these systems. <<< what relative to?
	- 21:46 20 Oct -- US users report fresh issues
		- But it looks like most of the issues are affecting those in the US this time round. Thousands of people have reported issues using many services in the country as of 15:30 BST (9:30pm bkk), including the payment provider Venmo, rewards app Fetch and shopping tool Instacart.
		- Meanwhile in the UK it does not all seem to be working properly - we have seen some issues still remain when searching on  Pinterest's app, while Duolingo now appears offline and says it is experiencing a 'maintenance break'.
	- 21:44 20 Oct -- Users report issues with Starbucks app
		- A line chart on the Downdetector site shows a sharp spike in reports at around 12:00 BST (6pm bkk)
		- It's unknown if this is linked to the Amazon outage, or if it is unrelated.
	- 21:28 20 Oct -- Lloyds, Halifax and Bank of Scotland systems back online
	- 21:19 20 Oct -- Outages rumble on into eighth hour
		- Reports of the outages first emerged at 8:00 BST (2pm bkk). Now we're well past 15:00 BST (9pm bkk) and there are still problems - though lots has been done.
		- Many sites and services are working properly now, though reports are still coming in for some.
		- Amazon's latest update says the firm has 'applied multiple mitigations' but it is still seeing errors 'for new EC2 instance launches'.
		- 
	- 19:54 20 Oct -- More than 1,000 companies affected by AWS outage, here's a quick catch-up
		- Amazon says it has fixed the issue, which occurred in the US at the heart of its cloud computing operations in North Virginia, and services are recovering.
	- 19:44 20 Oct -- Reddit says it has implemented a fix
		- Reddit says a 'fix has been implemented and we are monitoring the results', in an updated posted on its [service status page.](https://www.redditstatus.com/incidents/1hcw0z152lmf?u=y59n51tz8zb9)
		- The platform earlier said its infrastructure was experiencing 'degraded performance'.
		- There has been a spike in reports of problems from users as other sites were recovering, with some saying they had seen a notice saying 'too many requests' when they tried to visit subreddits.
		- 'We are continuing to monitor for any further issues,' it adds in the update.

![](aws-dday/images/im1.png)
(accessed 23-oct-2025 12:56pm bkk)
		- note that their investigation started on 3:24 PDT, 'We're experiencing an elevated level of errors and are currently looking into the issue. <<< add... this happened after fix started to be seen from other websites. however, Reddit saw a spike. and lead to this.
		- and resolved 16:09 PDT
		- this was before AWS announcement about DNS issue? <<< this was after several websites claimed to get their situations fixed; not sure if DNS error mentioned but strongly believe that NO.
- 
	- 19:25 20 Oct -- Outage may have been caused by small error, but impact is immediate and dramatic
		- sound like they knew the cause?
		- this is probably after 16:09 PDT (after Reddit announced resolved)
	- 19:12 20 Oct -- More than 1,000 companies impacted by outages, says Downdetector
		- Earlier we had some insight from Downdetector, the platform many people use to flag problems affecting popular websites, highlighting the scale of today's AWS issues.
		- global, >6.5M reports, >1000 companies
		- Downdetector says the amount seen from UK users has, as of 12:30 BST (6:30pm bkk) doubled to more than 800,000 - compared to the roughly 160,000 reports they see from UK users in total on an average weekday.
	- 18:59 20 Oct -- how has the outage affected you?
		- Whether you're and avid gamer ... we'd like to hear from you ... (contact info... email, whatsapp, link to upload pic/vid + terms & conditions and privacy policy reads, with footnote for condition if selected) ...
		- this kind a indicating how fresh the situation was at this moment, regarding this person
	- 18:50 20 Oct -- Some Snapchat users says they've lost all their friends on app
		- Some commenters on the BBC News TikTok account are saying that Snapchat is up and running again - but they've lost all their friends on the app.
		- We have asked Snapchat about these issues, and we'll let you know when we hear back.
		- In earlier statement, it said: 'We're aware that some Snapchatters are having issues using the app right now - hang tight, we're looking into it!'
		- 'I've managed to log back in but it's now telling me all my friends have unadded me T.T' (11m ago)
		- 'my snap working fine but location bug' (10m ago)
		- 'has anybody logged back in and all your friends are gone?' (cannot see timestamp)
		- need to check with this author (Kirsty Grant, BBC News social media team) if Snapchat i) acknowledged 'now telling me all my friends have unadded me' or ii) just more into this <<< can this from DNS error?
	- 18:37 20 Oct -- Why has a set of servers in Virginia caused such problems globally?
		- Today's outage stemmed from Amazon's US-EAST-1 region in Virginia, on the East Coast of the US.
		- But because of its age, size and amount of on-demand capacity, it is prone to outages.
		- they didn't sound like they knew at this moment about DNS error... just wanted to say something smart
	- 18:22 20 Oct -- Reddit facing problems as other services recover
		- As many other sites appear to be recovering from the Amazon Web Services issues, Reddit is curiously seeing a spike in reports of problems from users.
		- Downdetector saw more than 5,000 reports shortly after 11:00 BST - when other sites started getting fixed - with most flagging problems affecting its app.
		- 'degraded performance'
		- 'too many requests'
		- Quite why Reddit is seeing problems now when other platforms are being fixed is unclear. It is unknown if this is linked to the Amazon outage, or if it is unrelated.
		- see 19:44 for fix announcement
	- 18:11 20 Oct -- Lloyds says banking services coming back online
		- Lloyds Banking Group - which includes Halifax and Bank of Scotland
	- 18:09 20 Oct -- Amazon Web Services says underlying issue fixed - but it's not over yet
		- ... most services should now be working properly - however there will still be issues as they bring everything up to speed
		- Meanwhile other services could take a while to resolve because there will have been requests made before and during the outage on local devices that now need to get sent and processed <<< this might explain why i didn't receive d4 cert
		- Amazon also says there's an issue with launching what it calls 'new EC2 instances' <<< consistent with scheduled update patter, early morning in US, minimizing service disruption
	- 18:03 20 Oct -- Mass internet outages are a becoming a growing problem
		- mentioned July 2024 (a dodgy piece of code in CrowdStrike cyber security software), October 2021 (a configuration error brought down Facebook, Instagram, ...), June 2021 (Amazon, Reddit, Twitch, ... were down for around an hour, unknown bug), December 2020 (Gmail, YouTube, Google services went down simultaneously for around 90 minutes, internal storage quota issue)
	- 17:46 20 Oct -- Here's what we know so far
		- AWS in US
		- outage reports from users, Downdetector
		- ~10:30 BST (4:30pm bkk) Amazon said it was seeing 'significant signs of recovery' and, in further updates, said 'global services and features' were also recovering
		- While this is true of many platforms, some appear to still be experiencing problems - or fresh issues, in the case of Reddit
		- We don't know the full details of what has caused a number of critical AWS services to fall offline this morning, but Amazon says it 'appears to be related to DNS resolution' related to the way firms access its web servers
	- 17:32 20 Oct -- Problem could be related to Domain Name System - but what is thats?
		- 'appears to be related to DNS resolution of the DynamoDB API endpoint in US-EAST-1'
	- 17:20 20 Oct -- Amazon Web Services says most of its services are recovering
	- 16:39 20 Oct -- We are seeing significant signs of recovery - Amazon Web Services
	- 16:34 20 Oct -- More than 500 companies facing issues, says Downdetector
		- "At 06:56 UTC (02:56 AM EDT) users started reporting issues with AWS, in particular with the US East 1 region," it said.
	- 16:29 20 Oct -- Not all of the internet is down... just some of it
		- Snapchat, HMRC, Roblox = experiencing issues
		- Google services >>> own cloud
		- Meta, Facebook, Instagram >>> normal (they had their blackout experience in 2021)
		- X >>> unaffected (Elon said)
	- 16:21 20 Oct -- We have identified a potential root cause - Amazon Web Services
		- "We have identified a potential root cause for error rates for the DynamoDB APIs in the US-EAST-1 Region."
	- 15:55 20 Oct -- Huge number of apps and sites named in outage
		- Snapchat
		- Zoom
		- Roblox
		- Clash Royale
		- My Fitness Pal
		- Life360
		- Clash of Clans
		- Fortnite
		- Canva
		- Wordle
		- Signal
		- Coinbase
		- Duolingo
		- Slack
		- Smartsheet
		- PokemonGo
		- Epic Games
		- PlayStation Network
		- Peloton
		- Rocket League… the list goes on and on
		- HMRC (UK's tax authority)
	- 15:34 20 Oct -- What is Amazon Web Services?
		- 'increased error rates and latencies for multiple AWS Services in the US-EAST-1 Region'

### so who said DNS?

```
does not sound like AWS said DNS

so far only they acknowledged 'DynamoDB API, US-EAST-1, while updating new EC2 instance'
```

#### Major AWS Outage Disrupts Global Internet Services Due to DNS Failure
http://mezha.net/eng/bukvy/major-aws-outage-disrupts-global-internet-services-due-to-dns-failure/
Wednesday, 22 October 2025, 16:42

```
still no direct reference to AWN<->DNS. only their claim that AWS said so.

coming to think DynamoDB is vectorDB?

they said 'cause of the DNS outage remained unknown' but claiming Amazon statement. this feels inconsistent. also with timestamp, i think this is inconsistent with what bbc had records. <<< they prolly meant 'the root cause' which other articles seem to claim similarly from retrospectives.
```

'On Monday, Amazon said that customers could not access data in DynamoDB due to a DNS issue'

“Amazon’s data were secure, but no one else could find them for several hours, leaving applications disconnected from their data,” noted Mike Chapple. “It’s as if a large part of the Internet experienced temporary amnesia.” <<< my feeling of data rollback

The cause of the DNS outage remained unknown, but the incident lasted only a few hours. By 6:35 a.m. Eastern Time (6:35pm bkk), AWS had fixed the problem and advised companies to clear caches to restore services faster. <<< inconsistent to bbc?


