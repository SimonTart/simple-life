const fs = require("fs");
const path = require("path");
const snippetFiles = fs.readdirSync(path.resolve("../sublime"));

let atomSnippet = "";
snippetFiles.forEach((fileName)=>{
  let content = fs.readFileSync(path.join("../sublime",fileName),"UTF-8");
  atomSnippet += filterSnippet(content) + "\n\n";
});
console.log(atomSnippet);
fs.writeFile("./test.cson",atomSnippet,"utf8");

function filterSnippet(content) {
  let body = content.match(/<content><!\[CDATA\[\n([\s\S]*)\n]]><\/content>/)[1];
  let prefix = content.match(/<tabTrigger>([\s\S]*)<\/tabTrigger>/)[1];
  let key = content.match(/<description>([\s\S]*)<\/description/)[1];

  return`  '${key}':
    'prefix':'${prefix}'
    'body':"""
    ${body}
    """`
};
