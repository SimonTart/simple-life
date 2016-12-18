### svn-auto
基于node实现的快速提交svn脚本。通过脚本可以快速提交代码，但是提交之前会自动根据`svn status`进行`svn add`,`svn delete`命令，把新增文件或文件夹添加到版本控制中，把删除的文件或文件夹移除。
### 使用
使用之前你需要已经安装[node](https://nodejs.org/en/)。然后下载svn-auto.js到本地。因为有些公司提交代码是需要一定的后缀hook的，所以我在文件中已经预留。
```javascript
let message = `"hook"`;
if (argv[2]) {
    message = `"${argv[2]} hook"`;
}
```
在文件中修改上面代码中的两个hook的地方为自己的格式即可，如果不需要删除上面两个hook即可。

直接使用：在项目文件夹下执行`node filepath/svn-auto.js commit-message`即可提交，commit-message是提交时想要带上的信息。


通过bash简化使用
在.bashrc文件中添加如下代码，然后执行`source .bashrc`。之后在项目文件夹下通过`svncm “commit-message”`命令就可以提交了，commit-message是提交时想要带上的信息
```bash
# svn commit with hook
 function svncm(){
     node ~/.svnc-auto $1
 }
```
