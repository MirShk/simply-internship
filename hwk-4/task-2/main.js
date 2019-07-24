const promisify = require('promisify-mirshk');
const fs = require('fs');
//const readdirSync = promisify(fs.readdirSync);

class FileTree {
    constructor() {
        this.threeDecorateDepth = 1;
        this.flag = false;
        this.ttt = new Set();
    }

    readTree(dnm) {
        return new Promise((rs, rej) => {
            const dirs =  fs.readdirSync(dnm, { withFileTypes: true });
            const files = dirs.filter(dir => !dir.isDirectory()).map(file => file.name);
            const subDirs = dirs.filter(dir => dir.isDirectory()).map(subDir => subDir.name);

            files.map(file => {
                const splitter = this.threeDecorateDepth === 1 ? "" :  " ".repeat(this.threeDecorateDepth);
                //console.log(`${splitter} ${file}`);
            });

            //console.log(subDirs);
            if (subDirs.length) {
                this.ttt.add({[dnm] : subDirs});
            }

            if (subDirs.length) {
                subDirs.map(subDir => {
                    //let splitter = "-".repeat(this.threeDecorateDepth);
                    this.readTree(`${dnm}/${subDir}`);
                });

                ++this.threeDecorateDepth;
            }

            if (!subDirs.length) {
                return rs(this.ttt);
            }
        });

    }


    generateTree() {
        this.readTree(__dirname)
            .then(d => {
                console.log(d)
            })
            .catch(err => {
                console.log(err);
            })

    }
}

const ft = new FileTree();
ft.generateTree();