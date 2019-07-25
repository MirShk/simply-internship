const promisify = require('promisify-mirshk');
const fs = require('fs');

class FileTree {
    constructor() {
        this.readdirSync = promisify(fs.readdir);
    }

     async * readDirSync(dir) {
         const subFiles = await this.readdirSync(dir, { withFileTypes: true });
         for (const sf of subFiles) {
             if (sf.isDirectory()) {
                 yield `${dir}/${sf.name}`;
                 yield *this.readDirSync(`${dir}/${sf.name}`);
             } else {
                 yield `${dir}/${sf.name}`;
             }
         }
    }

    printDirAsync(iterable) {
        const paths = [];
        (async () => {
            for await (const i of iterable) {
                paths.push(i);
            }

            paths.sort((a, b) => {
               return a.length - b.length;
            });
            console.log(paths);
            return paths;
        })();
    }


}

const ft = new FileTree();
const dirs = ft.readDirSync(__dirname);
ft.printDirAsync(dirs);


