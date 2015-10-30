# HTML 5: FileAPI and FileReaderAPI

  * [Can I use it?](http://caniuse.com/#search=FileReader)

## FileAPI

Use input `type="file"` to get additional features for file-uploads like drag and drop, upload multiple files and get more JS functionality.

```html
<input type="file" id="upload" multiple />
```

Get a `FileList` object using `inputElement.files[i]`. It's not an array, so for example no `forEach` available!
([MDN - FileList Object](https://developer.mozilla.org/en-US/docs/Web/API/FileList))

```js
var uploadInput = document.getElementById('upload');

// Event listener
uploadInput.addEventListener('change', function() {
  // Looping in case they uploaded multiple files - "this" is the input element
  for (var i = 0, len = this.files.length; i < len; i++) {
    // do something with ... this.files[i];
    console.log( this.files[i].name );
    console.log( this.files[i].type );
    console.log( this.files[i].size );
  }
});
```

## FileReaderAPI

The `FileReader` object lets you asynchronously read the content of a file or data buffers stored on the clients computer.
(e.g. use for `FileList`, `DataTransfer Object`, `HTMLCanvasElement`)
Data will be available as a base64-encoded string.

Has events: `onabort`, `onerror`, `onload`, `onloadstart`, `onloadend`, `onprogress`
Properties like: `readyState` and `result` which represents the file contents after loading completed.

```js
var fileReader = new FileReader();

// Event handler when image is loaded
fileReader.onload = function(event) {
  var image = new Image();
  image.src = event.target.result; // base64 image here
  // or ... fileReader.result;

  someDOMElement.appendChild(image);
};

fileReader.readAsDataURL(file); // start reading the file contents - will trigger 'onload'
```

## Source
  * [File - David Walsh Blog](http://davidwalsh.name/file-api)
  * [FileReader - David Walsh Blog](http://davidwalsh.name/filereader)
  * [MDN - Using files](https://developer.mozilla.org/en-US/docs/Using_files_from_web_applications)
  * [MDN - FileReader](https://developer.mozilla.org/en/docs/Web/API/FileReader)
