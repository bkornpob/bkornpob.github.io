>>>
#KB, help with a proper headers
your choice of design
make sure to address both of us as authors
mine is 51n5337, nerd bro from the blocks, young spawn in the grid
also place datetime
add some statements, something cool, something memorable, something inviting readers to continue
context: this article will be featured on a website (but please keep it md style, github page friendly)
this is the landing page where i give this high-level brief
we will point a link to writeup (however, your writeup still needs to have my name because we ride together right? but you will be the lead author)

this exercise was from THCTT25-open (https://ctf.in.th/news/4019/), programming 2.
ZIP file for this contains:
- [create.py](create.py) -- script to encrypt(flag) >> output.txt
- [output.txt](output.txt) -- created by create.py given flag

ideas:
- bf -- cons: flag{xxx} pattern known, xxx unknown-length unknown-character, blind-test ... we can bf incrementing digits ... if assuming alphanumber+special (including empty, space) characters such as sleet language, this will have totally N_alpnumspec characters ... if assuming average length of CTF message ~ N_ctfmsg digits ... the bf-space size is ??? test cases, which should take ~ ??? hours for ??? computing specs.
- re -- understand how encrypt(flag) >> output.txt

SOLUTION -- when size matters!
1. **Output.txt contains shapes (in asterisks `*`) and #0# markers**
2. **flag is hidden in the 'size' not the 'shape'
3. **Each block shape <<< (size, shape) where size = {0,1,2,3,4,5,6,7} for octal (oct_N) and shape = {#0#, triangle, square, circle} with size depending on the encrypted flag** 
4. **Separate each block and [decode](decode-output.md)**
5. **reconstruct oct_N from collecting the integers and add the octal starting sequence '0o'**
6. one octal digit (0-7)**
7. **Digit 0 = #0#**
8. **Digits 1-7 = shape size (signal is line with maximum asterisks in a block shape)**
9. **Shape type (triangle/square/circle) is determines**
```
Output blocks → Octal digits → Octal string → Integer → Bytes → Flag
```
 **THE RESULT:**
`flag{4_3nc0d1n6_5ch3m3}`
