# spyOn with jasmine 2

## Mock a method from an instance
if your implementation looks like this
```js
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const upload = function(filename, content, bucket) {

  const params = {
    Bucket: bucket,
    Key: fileName,
    Body: content
  };
  
  s3.upload(params, (errUpload, data) => {
    // more validation logic
  });
}:
```
To mock a method from an instance, you need to retrieve it through the prototype
```js
const s3Service = require('./s3-service');
const AWS = require('aws-sdk');
const S3 = new AWS.S3();

describe('s3-service unit tests', () => {
  it('uploadZip calls s3.upload with correct params', (done) => {
  
    const filename = 'filename.txt';
    const content = 'dsadakdsakdasd';
    const bucket = config.s3.buckets.dev;
    const expectedParams = {
      Bucket: bucket,
      Key: 'filename.txt',
      ACL: 'public-read',
      ContentEncoding: 'gzip',
      ContentType: 'application/json; charset=utf-8',
      CacheControl: 'public, max-age=600'
    };
    
    // Mock AWS-SDK
    spyOn(AWS.S3.prototype, 'upload').and.returnValue({ end: noop });
    
    // Call function under test
    s3Service.uploadZip(filename, content, bucket, noop);
    
    // Define our expectations
    expect(S3.upload).toHaveBeenCalledWith(
        jasmine.objectContaining(expectedParams),
        jasmine.any(Function)
      );
    });
});
```

## Mock a method but trigger the callback passed as argument
Sometimes, you need to test your logic contained inside a callback.
To access this logic, you need to mock the method, but run the callback.
Jasmine has an easy way to do it
Our implementation:

```js
const contentfulService = require('../shared/contentful-service');
const main = function() {
  contentfulService.getTranslations(locale, (err, data) => {
    // do manipulation on the data
    s3Service.uploadZip(data, filename, (errUpload, response) => {
      console.log(response);
    };
  }
};
```

Our test:
```js
/* Module under test */
const methodUnderTest = require('./methodUnderTest');

/* Import services to mock */
const contentfulService = require('../shared/contentful-service');
const s3Service = require('../shared/s3-service');

/*
 * Tests
 */
describe('translation handler unit tests', () => {
  it('main method should upload the zip', () => {
  
    // Mocks the different services and run the callbacks
    spyOn(contentfulService, 'getTranslations').and.callFake((locale, callback) => {
      callback(undefined, data);
    });

    spyOn(s3Service, 'uploadZip').and.callFake((content, filename, callback) => {
      callback(undefined);
    });

    // Run the tested function
    methodUnderTest.main();
    
    // Expectation
    expect(s3Service.uploadZip)
      .toHaveBeenCalledWith(
        expectedContent,
        expectedFilename,
        jasmine.any(Function)
    );
  });
});
```
