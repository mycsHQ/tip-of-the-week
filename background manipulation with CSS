# Background chaining and background-blend-mode: use CSS background as photoshop
The element background CSS attribute is kinda magical and flexible.

You can apply several backgrounds for an element, set different positions for them:
```
.container {
  background: url('catpic.jpg') url('patternpic.jpg') pink;
  background-position: 0 0, 10px 10px 20px 20px;
}
```

With background-blend-mode it is possible to set the way those background will blend/interact between themselves, when the blend modes are applied by order, to the first pair of background, and then - to the previous result + the next background.

There are many blend types that define how the pixels of the images will be manipulated:

**Normal** - the standard, will display the first background; 
**Screen** - the images are inverted, multiplied and inverted again.
**Multiply** - the backgrounds are multiplied.
**Darken** - chooses the darker pixels from both images.
**Lighten** - chooses the lighter pixels from both images.
**Difference** - the diff between the pixels of both images.
and many more.

These background attributes can be played with in psychedelic animations!
For example, [checkout this fiddle](https://jsfiddle.net/qv2ftgc9/)
