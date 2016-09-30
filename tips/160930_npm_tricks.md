# 10 Simple npm Tricks

### 1. Open a package’s homepage

Run: `npm home $package`

It will open the homepage of the package you're running it against.

### 2. Open package’s GitHub repo

Run: `npm repo $package`

It will open the GitHub repository of the package you're running it against.

### 3. Check a package for outdated dependencies

Run: `npm outdated`

It will check the npm registry to see if any of your packages are outdated.

### 4. Check for packages not declared in package.json

Run: `npm prune`

When you run prune, the npm CLI will run through your package.json and compare it to your project’s `/node_modules` directory. It will print a list of modules that aren’t in your `package.json`

The npm prune command then strips out those packages, and removes any you haven't manually added to `package.json` or that were npm installed without using the `--save` flag.

### 5. Lock down your dependencies versions

Run: `npm shrinkwrap`

Using `shrinkwrap` in your project generates an `npm-shrinkwrap.json` file. This allows you to pin the dependencies of your project to the specific version you’re currently using within your node_modules directory. When you run `npm install` and there is a `npm-shrinkwrap.json` present, it will override the listed dependencies and any semver ranges in `package.json`

### 6. Use npm v3 with Node.js v4 LTS

Run: `npm install -g npm@3`

Installing `npm@3` globally with npm will update your npm v2 to npm v3, including on the Node.js v4 LTS release (“Argon”) ships with the npm v2 LTS release. This will install the latest stable release of npm v3 within your v4 LTS runtime.

### 7. Allow `npm install -g` without needing `sudo`

Run: `npm config set prefix $dir`

After running the command, where `$dir` is the directory you want npm to install your global modules to, you won’t need to use sudo to install modules globally anymore. The directory you use in the command becomes your global bin directory.

The only caveat: you will need to make sure you adjust your user permissions for that directory with `chown -R $USER $dir` and you add `$dir/bin` to your PATH.

### 8. Change the default save prefix for all your projects

Run: `npm config set save-prefix="~"`

The tilde (`~`) is more conservative than what npm defaults to, the caret (`^`), when installing a new package with the `--save` or `--save-dev` flags. The tilde pins the dependency to the minor version, allowing patch releases to be installed with `npm update`. The caret pins the dependency to the major version, allowing minor releases to be installed with `npm update`.

### 9. Strip your project's `devDependencies` for a production environment

When your project is ready for production, make sure you install your packages with the added `--production` flag. The `--production` flag installs your `dependencies`, ignoring your `devDependencies`. This ensures that your development tooling and packages won’t go into the production environment.

Additionally, you can set your `NODE_ENV` environment variable to `production` to ensure that your project’s `devDependencies` are never installed.

### 10. Be careful when using `.npmignore`

If you haven't been using `.npmignore`, it defaults to `.gitignore` with a few additional sane defaults.

What many don't realize that once you add a `.npmignore` file to your project the `.gitignore` rules are (ironically) ignored. The result is you will need to audit the two ignore files in sync to prevent sensitive leaks when publishing.
