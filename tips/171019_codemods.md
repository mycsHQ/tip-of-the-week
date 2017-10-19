# Codemods
How to make changes across the whole code base (e. g. changing name of function)?
With regex its difficult to know if we're inside of a string or comment, get all the possible formattings right etc.
  Use a parser instead of regex. Parser converts source code into an abstract syntax tree [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree).
https://astexplorer.net/#/gist/a49ad736a64500308745fadc61bcc0d1/37a5cea1bbaf83fab7fc560cb3c23487e734c670


Facebook provides a library which makes working with ASTs easier: https://github.com/facebook/jscodeshift

simple example we used to add lodash imports (to remove global variable):
```JS
// → jscodeshift app/src/**/*.js -t ../mod-lodash/lodash-global-mod.js

module.exports = function(fileInfo, api) {
  const j = api.jscodeshift
  const source = j(fileInfo.source)
  
  const hasGlobalImport = () => source.find(j.ImportDefaultSpecifier).find(j.Identifier, {name: '_'}).length > 0
  const hasGlobalVariable = () => source.find(j.MemberExpression, {object: {name: '_'}}).length > 0 || source.find(j.CallExpression).find(j.Identifier, {name: '_'}).length > 0

  if (!hasGlobalImport() && hasGlobalVariable())
    return `import _ from 'lodash';\n` + source.toSource()
}

```

Find all calls to `I18nUtils.localize` inside JSX
```JS
export default function transformer(file, api) {
  const j = api.jscodeshift;

  const hasLocalize = path => j(path).find(j.MemberExpression, n => n.object.name === 'I18nUtils' && n.property.name === 'localize').length > 0

  return j(file.source)
    .find(j.JSXElement)
  	.filter(path => path.node.children)
  	.filter(path => path.node.children.length === 1)
    .filter(path => j(path.node.children[0]).filter(hasLocalize).length > 0)
  	.forEach(x => {
    	console.log(x)
    })
    //.toSource();
}
```

## Other links
A collection of community code transformations https://github.com/cpojer/js-codemod/tree/master/transforms
Tool to parse code, visualize AST and test transforms: https://astexplorer.net
