# Angular 2: Testing services with http requests

## What to test?
- Service with a http call
- Example: **ElementsService** with a methode
  - getAll(): Observable\<Array\<Any\>\>

## Writing a test module

- Tests are written using the Jasmine Test Framework
- To configure a testing module we can use the **TestBed** API provided by Angular 2
  - configures and initializes an environment for unit testing
  - provides methods for creating components and services in unit tests
- We want to create an injector that knows how to create the **ElementsService** and the **Http** service, that is injected
  - But we actually want a **Http** service that does not perform a real http request

#### Overriding the Http Backend

- **Http** service uses a **ConnectionBackend** to perform requests, this is the part we want to change
- We will try to use the **MockBackend** class which comes with Angular's http module
- We can override providers that have been introduced by other imported modules, by using the providers property

Instead of

```
beforeEach(() => {
    TestBed.configureTestingModule({
        /*
         * 1. Make the HTTP Request
         */
        providers: [
            ElementsService,
            Http
        ]
    });
});
```

We do
```
beforeEach(() => {
    TestBed.configureTestingModule({
        /*
         * 2.1 Mock the HTTP
         */request
        providers: [
            {
                provide: Http,
                useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
                    return new Http(backend, defaultOptions);
                },
                deps: [ MockBackend, BaseRequestOptions ]
            },
            ElementsService,
            MockBackend,
            BaseRequestOptions
        ]
    });
});
```

The test will look like the following

```
it('should return an Observable<Array<Any>> with all Elements',
    /*
     * 2.2 Mock the HTTP request
     */
    inject([ElementsService, MockBackend], (elementsService, mockBackend) => {
        const mockResponse = {
            data: [
                {
                    "sku": "101.110.17",
                    "furniture_type": "shelf",
                    ...
                }, {
                    "sku": "101.110.18",
                    "furniture_type": "shelf",
                    ...
                }, {
                    "sku": "101.110.19",
                    "furniture_type": "shelf",
                    ...
                }
            ]
        };

        /*
         * Mock the actual Response
         */
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(
                new Response(
                    new ResponseOptions({
                        body: JSON.stringify(mockResponse)
                    })
                )
            );
        });
        /*
         * Run the test
         */
        elementsService.getAll().subscribe((elements) => {
            expect(elements.length).toBe(3);
            expect(elements[0].sku).toEqual('101.110.17');
            expect(elements[0].sku).toEqual('101.110.18');
            expect(elements[0].sku).toEqual('101.110.19');
        });

    });
);
```

**Note**: ```MockConnection.mockRespond()``` emits synchronously, no need to call ```done()```

Links:
- [thoughtram](http://blog.thoughtram.io/angular/2016/11/28/testing-services-with-http-in-angular-2.html)
- [raibledesigns](https://raibledesigns.com/rd/entry/getting_started_with_angular_cli#_unit_test_the_searchservice)





