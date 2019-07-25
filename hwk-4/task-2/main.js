const promisify = require('promisify-mirshk');
const fs = require('fs');

class FileStructure {
    constructor() {
        this.readdirSync = promisify(fs.readdir);
        this.depth = 1;
        this.splitter = "-------";
        this.modeIsTree = false;
    }

    async * readDirSync(dir, depth = this.depth) {
         const subFiles = await this.readdirSync(dir, { withFileTypes: true });
         for (const sf of subFiles) {
             if (sf.isDirectory()) {
                 yield this.modeIsTree ? `${this.splitter.repeat(depth)}# ${sf.name}` : `${dir}/${sf.name}`;
                 yield *this.readDirSync(`${dir}/${sf.name}`, depth+1,);
             } else {
                 yield this.modeIsTree ? `${this.splitter.repeat(depth)}* ${sf.name}` : `${dir}/${sf.name}`;
             }
         }
    }

    print(iterable) {
        const paths = [];
        (async () => {
            for await (const i of iterable) {
                this.modeIsTree ? console.log(i) : paths.push(i);
            }

            if (!this.modeIsTree) {
                console.log(paths);
                return paths;
            }
        })();
    }

    setMode(mode) {
        if (typeof mode !== "boolean") {
            throw Error("File Structure mode must have @boolean type");
        } else {
            this.modeIsTree = mode;
            return this;
        }
    }
}

const fstr = new FileStructure();
const dirs = fstr.setMode(true).readDirSync(__dirname, true);
fstr.print(dirs);





