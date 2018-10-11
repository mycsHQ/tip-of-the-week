# Layout, Paint, Composite

<img width="540"  src="https://developers.google.com/web/fundamentals/performance/rendering/images/simplify-paint-complexity-and-reduce-paint-areas/frame.jpg" />

## Layout

... figures out positions of all rendered elements

- happens when geometric properties of an element are changed
- scope is generally whole document

### perf demo: forced synchronous layout


## Paint

￼... fills in the pixels

- triggering Layout always triggers Paint
- changing styles may trigger Paint without layout (background, shadow, colors)

<img width="540" src="https://developers.google.com/web/fundamentals/performance/rendering/images/simplify-paint-complexity-and-reduce-paint-areas/frame-no-layout.jpg" />


### perf demo: devtools / rendering / show paint rectangles




## Composite

... all the layers are combined into the final image
￼

- promote elements to their own layers: `will-change: transform` vs `transform: translateZ(0)`

- only 2 properties are handled by compositor: transform and opacity

<img width="540" src="https://developers.google.com/web/fundamentals/performance/rendering/images/stick-to-compositor-only-properties-and-manage-layer-count/frame-no-layout-paint.jpg" />

### perf demo: layers in devtools

## Links

[developers.google.com/web/fundamentals/performance/rendering/](https://developers.google.com/web/fundamentals/performance/rendering/)

[csstriggers.com](https://csstriggers.com/)
