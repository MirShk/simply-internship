const promisify = require('promisify-mirshk');
const fs = require('fs');

class FileStructure {
    constructor() {
        this.readdirSync = promisify(fs.readdir);
        this.splitter = "-------";
        this.modeIsTree = false;
    }

    async * readDir(dir, depth = 0) {
         const subFiles = await this.readdirSync(dir, { withFileTypes: true });
         for (const sf of subFiles) {
             if (sf.isDirectory()) {
                 yield this.modeIsTree ? `${this.splitter.repeat(depth)}|__ ${sf.name}` : `${dir}/${sf.name}`;
                 yield *this.readDir(`${dir}/${sf.name}`, depth+1);
             } else {
                 yield this.modeIsTree ? `${this.splitter.repeat(depth)}|__/ ${sf.name}` : `${dir}/${sf.name}`;
             }
         }
    }

    async print(iterable) {
        const paths = [];
        for await (const i of iterable) {
            this.modeIsTree ? console.log(i) : paths.push(i);
        }

        if (!this.modeIsTree) {
            console.log(paths);
            return paths;
        }
    }

    /**
     *
     * @param mode
     * @desc
     * if the value of 'mode' param is true,
     * the 'print' method will print file structure as a tree,
     * else will print array of file paths
     * @returns {FileStructure}
     */
    setPrintMode(mode) {
        if (typeof mode !== "boolean") {
            throw new Error("FileStructure::setMode method receives only @boolean type argument!");
        } else {
            this.modeIsTree = mode;
            return this;
        }
    }
}

const fstr = new FileStructure();
fstr.setPrintMode(true);
fstr.print(fstr.readDir(__dirname));

module.exports = new FileStructure();




