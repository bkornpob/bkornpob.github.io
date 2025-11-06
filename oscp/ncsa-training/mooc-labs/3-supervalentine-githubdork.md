
[...back](../0-landing-ncsaoscp.md)

# 1 brief

ip
34.142.172.95
port
80
mission
use OSINT, gain intel on source code

---

# 2 google/github - gg dork

```
google: supervalentine -> github domain
github: @supervalentine -> sample_website -> index.php
```
 
 [supervalentine-sample-website](./assets/supervalentine-sample-website.md)

---

# 3 param fuzz

```
	  <?php
		$user=$_GET["username"];
		$credential=$_GET["credential"];
		if($user==="sa"&&$credential==="JDM82XDVMcNI^wpdW7ZQ5")
		{
			echo "<br><br>The flag is ";
		}
	  ?>
```

http://34.142.172.95/?username=sa&credential=JDM82XDVMcNI^wpdW7ZQ5

---

[...back](../0-landing-ncsaoscp.md)

