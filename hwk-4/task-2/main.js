const promisify = require('promisify-mirshk');
const fs = require('fs');

class FileSystem {
    constructor() {
        this.readdirSync = promisify(fs.readdir);
        this.decorator = "-------";
        this.modeIsTree = false;
    }

    async * readFiles(dirName, fileHierarchyDepth = 0) {
         const subFiles = await this.readdirSync(dirName, { withFileTypes: true });
         for (const subFile of subFiles) {
             const decoratorLength = this.decorator.repeat(fileHierarchyDepth);
             if (subFile.isDirectory()) {
                 yield this.modeIsTree ? `${decoratorLength}|__ ${subFile.name}` : `${dirName}/${subFile.name}`;
                 yield *this.readFiles(`${dirName}/${subFile.name}`, fileHierarchyDepth + 1);
             } else {
                 yield this.modeIsTree ? `${decoratorLength}|__/ ${subFile.name}` : `${dirName}/${subFile.name}`;
             }
         }
    }

    /**
     *
     * @param mode
     * @desc If the value of 'mode' param is true,
     * the 'displayFileHierarchy' method will display file hierarchy tree,
     * else will display an array of file paths.
     * @returns {FileSystem}
     */
    setDisplayMode(mode) {
        if (typeof mode !== "boolean") {
            throw new Error("FileStructure::setMode method receives only @boolean type argument!");
        } else {
            this.modeIsTree = mode;
            return this;
        }
    }

    async displayFileHierarchy(iterable) {
        const paths = [];
        try {
            for await (const it of iterable) this.modeIsTree ? console.log(it) : paths.push(it);
            if (!this.modeIsTree) console.log(paths)
        } catch (e) {
            console.log(e);
        }
    }
}

const fileSystem = new FileSystem();
fileSystem
        .setDisplayMode(true)
        .displayFileHierarchy(
            fileSystem.readFiles(__dirname)
        );



