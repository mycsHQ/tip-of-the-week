# The 10 Key Features in Node.js v6 LTS Boron After You Upgrade

### 1. DevTools Inspector Integration

Run it with the `--inspect` flag
```
node --inspect index.js
```

You can also break on the first statement of the script with --debug-brk
```
node --inspect --debug-brk index.js
```

Read [Paul Irish’s post](https://medium.com/@paul_irish/debugging-node-js-nightlies-with-chrome-devtools-7c4a1b95ae27#.wlhl2kkd3) for more details on the kinds of features available right now in Node.js v6 LTS.

### 2. Capture Names of Listeners on an EventEmitter

The [`eventNames()`](https://nodejs.org/dist/latest-v6.x/docs/api/events.html#events_emitter_eventnames) method - added in Node.js 6.0.0 - will return an array with the names of all the events that are being listened to by user callbacks on a given EventEmitter object
```node
const EventEmitter = require('events');
const myEE = new EventEmitter();
myEE.on('foo', () => {});
myEE.on('bar', () => {});

const sym = Symbol('symbol');
myEE.on(sym, () => {});

console.log(myEE.eventNames());
  // Prints [ 'foo', 'bar', Symbol(symbol) ]
```

### 3. Overhauled Buffers Constructor APIs

The [Buffer Constructor API](https://nodejs.org/dist/latest-v6.x/docs/api/buffer.html#buffer_buffer_from_buffer_alloc_and_buffer_allocunsafe) was overhauled, deprecating the old `new Buffer(...)` and adding `Buffer.from()` and `Buffer.alloc()` as the preferred replacements.

The APIs were added to Node core in v5.10.0, and allow two different uses: `Buffer.from()` creates a Buffer from an Array-like (such as an Array, String, or another Buffer), and `Buffer.alloc()` creates a zero-filled Buffer of a specified size.

Additionally, a the `--zero-fill-buffers` CLI flag was added in v5.10.0 to automatically force zero-filling of all newly created Buffers in a Node application.

### 4. Unhandled `Promise` rejection warnings

Since Node.js v6.6.0, the `unhandledRejection` event now also causes a warning to be printed to standard error.
```node
$ node
> new Promise((resolve, reject) => { setTimeout(() => { reject(new Error('Whoa!')) }, 100) })
Promise { <pending> }
> (node:35449) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): Error: Whoa!
```

Since a rejection handler could still be handled after Promise creation, via the `catch()` method, the warning is not emitted or printed until after the next tick of the event loop after the rejection.

This behavior can be turned off (at your peril!) with the `--no-warnings command` line argument or made more verbose to include stack traces with the `--trace-warnings` command line argument so you can track down the location of the errant code.

### 5. Quick and Safe Temporary Directory Creation

The [`fs.mkdtemp()`](https://nodejs.org/dist/latest-v6.x/docs/api/fs.html#fs_fs_mkdtemp_prefix_options_callback) API was added to Node core in v5.10.0 to provide a guaranteed way to create a unique temporary directory. The API generates six random characters to be appended behind a required directory `prefix` argument. This functionality was previously possible with user-created modules like `unique-temp-dir` although JavaScript implementations of this functionality all suffer from performance problems compared to using native system calls and not all are guaranteed safe.

### 6. Timing Attack Prevention

The [`crypto.timingSafeEqual()`](https://nodejs.org/dist/latest-v6.x/docs/api/crypto.html#crypto_crypto_timingsafeequal_a_b) API was added to Node core in v6.6.0 to help avoid timing attacks.

The API allows comparison without leaking timing information about the comparison, which could lead to a malicious party being able to infer values being compared. With the addition of this API to the crypto module allows it to be used outside of assert. As a rule of thumb, use this API if you need to compare values, where one is derived from user-input and another is a secret (or derived from a secret).

### 7. Process Warnings API

The new [Process Warning](https://nodejs.org/dist/latest-v6.x/docs/api/process.html#process_event_warning) API was added in v6.0.0 and adds the ability to listen to process warnings emitted by Node.js, and provides an API to override the default handler, to be used in custom logging system for instance. For example, if you are using a custom JSON logger you can now catch Node core warnings and also have them logged as JSON.

The API can also be used by non-core code to emit non-fatal warnings as appropriate. e.g. `process.emitWarning('Something Happened!', 'CustomWarning');` or `process.emitWarning('This API is deprecated', 'DeprecationWarning');`.

In addition, this API also brings some new command line arguments to adjust warning output:

- `--no-warnings` to disable printing to standard error (the internal `’warning’` event will still fire)
- `--no-deprecation` to disable printing deprecation warnings (only) to standard error (the internal ’warning’ event will still fire)
- `--trace-warnings` to have the stack trace printed to standard error, mirroring error output, useful for finding where a deprecated API is being used from in your own code or a dependency
- `--trace-deprecation` for stack traces just for deprecation warnings
- `--throw-deprecation` to treat a deprecation warning as a thrown error

### 8. Symlink Preservation

Instructs the module loader to preserve symbolic links when resolving and caching modules. When turned on, module paths are preserved when setting `__dirname` and `__filename` and also when using the location to resolve paths to other modules using `require()` instead of using the “realpath” of the linked file.

The [original discussion  for this feature](https://github.com/nodejs/node/issues/3402) used the following example of behavior that doesn’t work when symbolic links aren’t preserved:

Resolves properly:
```node
app
    index.js //require("dep1")
    node_modules
        dep1
            index.js //require("dep2")
        dep2
            index.js //console.log('fun!'):
```

Does not resolve, where the user expectation may be that it should since the link is in an appropriate location.
```
app
    index.js //require("dep1")
    node_modules
        dep1 -> ../../dep1
        dep2
            index.js
dep1
    index.js //require("dep2")
```

This kind of behavior is sought when developing using peer dependencies that could be linked together rather than manually copied.

Preserving symbolic links was enabled as the default behavior in Node.js v6.0.0, under a mistaken belief that the impact to the ecosystem would be mostly positive. Unfortunately a number of use-cases were discovered via bug reports where the new functionality was breaking applications or causing poor performance because of assumptions made based on how Node previously worked. You can read more about the problem in the [original thread](https://github.com/nodejs/node/issues/3402#issuecomment-202921652) which became very active after v6.0.0 was launched and was the focal point of discussion regarding how to approach the problems being reported.

The `--preserve-symlinks` command line argument was finally added and the default behavior restored in v6.2.0. While the core team have suggested that `--preserve-symlinks` is only a temporary solution until a better one can be found, so far there have not been proposals for a way forward.

### 9. V8 Performance Profiling Directly Through Node.js

The new `--prof-process` command line argument, added in Node.js v5.2.0, runs the built-in formatter for V8 performance profiles. These profiles have been possible with Node.js for some time by using the `--prof` command line argument that is passed straight to V8.

When an application is run with `--prof`, a file with a name such as `isolate-0x102004c00-v8.log` (where the octal number changes with each run) is created for each “isolate” (an isolated V8 VM instance with its own heap) within the application (child processes or use of the `vm` module may cause an application to use more than a single isolate).

Unfortunately, these profiling log output files are mostly not human-readable and are very verbose:
```node
$ node --prof ./map-bench.js
$ wc isolate-0x*.log
    3375    4571  419868 isolate-0x102004c00-v8.log
    3801    4968  514577 isolate-0x102801000-v8.log
    4319    5493  628883 isolate-0x103800a00-v8.log
   11495   15032 1563328 total
```

### 10. Process CPU usage

The [`process.cpuUsage()`](https://nodejs.org/dist/latest-v6.x/docs/api/process.html#process_process_cpuusage_previousvalue) API was added to Node core in v6.1.0, and returns an object that contains both user and system CPU time of the current process in microseconds.

```node
const startUsage = process.cpuUsage();
// { user: 38579, system: 6986 }

// spin the CPU for 500 milliseconds
const now = Date.now();
while (Date.now() - now < 500);

console.log(process.cpuUsage(startUsage));
// { user: 514883, system: 11226 }
```

### Source

© Tierney Coren's acticle [The 10 Key Features in Node.js v6 LTS Boron After You Upgrade](https://nodesource.com/blog/the-10-key-features-in-node-js-v6-lts-boron-after-you-upgrade)
