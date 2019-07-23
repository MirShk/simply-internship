**Simple promisifier**

```
const fs = require('fs');
const promisify = require('promisify-mirshk');

function asyncFunc(cb) {
    setTimeout(() => {
        cb(null, "success");
    }, 5000);
}

const someAsyncFunc = promisify(asyncFunc);
const fsWriteFileAsync = promisify(fs.writeFile);
const fsReadFileAsync = promisify(fs.readFile);

someAsyncFunc()
    .then(() => {
        fsWriteFileAsync("test.js", "console.log('Hello World!!!');")
            .then(() => {
                return fsReadFileAsync("test.js", "UTF-8");
            })
            .then(fileData => {
                console.log(fileData)
            })
            .catch(err => {
                console.log(err);
            });
    })
    .catch(err => {
        console.log(err);
    });
```
