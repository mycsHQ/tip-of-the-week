# CSS shapes: Wrapping content around custom paths

CSS Shapes allows to wrap content around custom paths, like circles, ellipses and polygons. They can be defined manually or inferred from images thanks to the the CSS property **shape-outside**. It uses shape values to define the float area for a float and will allow inline content to wrap around the shape instead of the float's bounding box. The **shape-margin** property can be used to add a margin to shape-outside. Another cool property is **shape-image-threshold** which defines the alpha channel threshold used to extract the shape using an image as the value for shape-outside. A value of 0.5 means that the shape will enclose all the pixels that are more than 50% opaque.

But there are 2 conditions that need to be met in order for shape-outside to work:
- The element must have dimensions, since the width and height set on this element will be used to establish a coordinate system.
- The element must be floated.

Here is a simple example of some text nicely curved over some image:

**HTML**

```
<img src="cheesecake.jpg"/>
<p>Chocolate bar chocolate cake bear claw chocolate bar fruitcake fruitcake cupcake gummies halvah. Soufflé caramels lollipop sweet roll liquorice marzipan. Chocolate cake chupa chups cupcake.</p>
```

**CSS**

```
img {
    width: 250px;
    height: 250px;
    float: left;
    shape-outside: circle();
    -webkit-clip-path: circle();
}
```

You can checkout this [fiddle](http://jsfiddle.net/44o0mfLu/1/) for more examples!