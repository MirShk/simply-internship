**Basic app for getting the list of current directory's files and sub directories**

**USAGE**

In this example the 'print' method prints file structure as a tree(`fileStr.setPrintMode(true)`)

Just set `fileStr.setPrintMode(false)` and the output will be an array, containing paths of the specified directory's files
and subdirectories.

```
const fileStr = new FileStructure();
const dirs = fileStr.setPrintMode(true).readDir(__dirname);
fileStr.print(dirs);
```