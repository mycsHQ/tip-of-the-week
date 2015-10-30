"use strict";

(function () {

  var uploadInput = document.getElementById('upload'),
      uploadsDiv = document.getElementById('uploads');

  uploadInput.multiple = true; // set here if not in html

  // Event listener
  uploadInput.addEventListener('change', function() {
    // clear the div
    uploadsDiv.innerHTML = '';

    var file, fileInfoElem;

    // Looping in case they uploaded multiple files - "this" is the input element
  	for (var i = 0, len = this.files.length; i < len; i++) {
  	  file = this.files[i]; // http://www.w3schools.com/jsref/prop_fileupload_files.asp

      fileInfoElem = document.createElement("div");
      fileInfoElem.className = 'file-info';
      fileInfoElem.innerHTML = '<p><b>' + file.name + '</b> (type: ' + file.type + ' | size: ' + (file.size / 1024).toFixed(2) + ' KB)</p>';

      // Image Preview
      if (file.type.indexOf('image') != -1) { // very simple
        var fileReader = new FileReader();

        // Event handler when image is loaded
  			fileReader.onload = function(event) {
          var image = new Image();
  				image.src = event.target.result; // base64 image here
  				this.appendChild(image);
  			}.bind(fileInfoElem);

  			fileReader.readAsDataURL(file); // start reading the file contents - will trigger 'onload'
      }

      uploadsDiv.appendChild(fileInfoElem);
  	}
  });


}());
