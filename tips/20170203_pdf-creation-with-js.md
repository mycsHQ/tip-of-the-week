# PDF creation with JS Frameworks (client and server side)

There are a few JS-Frameworks for generating PDFs. Some are more mature than others so a took a look and want to share my results. Below are three of the more feature rich and advanced JS-Frameworks. 

You should note that the first two are close to each other (`pdfmake` is actualy using `pdfkit` internally) and their approach is to generate the pdf from an object which contains the content and styling, while `node-html-pdf` is, as the name suggests, generating the pdf from a provided html file. 

I find both solutions do have their use cases so I did a short comparison to show the features. Of course I listed only what I found interesting and there are a lot more possibilities to layout and configure the pdf.

## Frameworks
- https://github.com/bpampuch/pdfmake
- https://github.com/devongovett/pdfkit
- https://github.com/marcbachmann/node-html-pdf

|Framework    |Serverside|Clientside|Vector graphics|jpeg|png|css styling |html2pdf conversion|font embedding|create from js-object|
|:------------|:--------:|:--------:|:-------------:|:--:|:-:|:----------:|:-----------------:|:------------:|:----------------:|
|pdfmake      | yes      | yes      |yes            |yes |yes|yes (object)|no                 |yes           |yes               |
|pdfkit       | yes      | yes      |yes            |yes |yes|yes (object)|no                 |yes           |yes               |
|node-html-pdf| yes      | no       |?              |yes |yes|yes         |yes                |yes           |no                |
