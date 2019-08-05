const promisify = require('promisify-mirshk');
const fs = require('fs');

class FileSystem {
    constructor() {
        this.readdirSync = promisify(fs.readdir);
        this.decorator = "-------";
        this.mode = 'path';
    }

    async * readFiles(dirName, fileHierarchyDepth = 0) {
         const subFiles = await this.readdirSync(dirName, { withFileTypes: true });
         for (const subFile of subFiles) {
             const decoratorLength = this.decorator.repeat(fileHierarchyDepth);
             if (subFile.isDirectory()) {
                 yield this.mode === 'tree' ? `${decoratorLength}|__ ${subFile.name}` : `${dirName}/${subFile.name}`;
                 yield *this.readFiles(`${dirName}/${subFile.name}`, fileHierarchyDepth + 1);
             } else {
                 yield this.mode === 'tree' ? `${decoratorLength}|__/ ${subFile.name}` : `${dirName}/${subFile.name}`;
             }
         }
    }

    /**
     *
     * @param mode
     * @desc If the value of 'mode' param is 'tree',
     * the 'displayFileHierarchy' method will display file hierarchy tree,
     * If the value of 'mode' param is 'path'(optional), the 'displayFileHierarchy' method
     * will display  an array of file paths.
     * @returns {FileSystem}
     */
    setDisplayMode(mode) {
        if (typeof mode !== "string") {
            throw new Error("FileStructure::setMode method receives only @string type argument!");
        } else {
            this.mode = mode;
            return this;
        }
    }

    async displayFileHierarchy(iterable) {
        const paths = [];
        try {
            for await (const it of iterable) this.mode === 'tree' ? console.log(it) : paths.push(it);
            if (this.mode !== 'tree') console.log(paths)
        } catch (e) {
            console.log(e);
        }
    }
}

const fileSystem = new FileSystem();
fileSystem
        .setDisplayMode('tree')
        .displayFileHierarchy(
            fileSystem.readFiles(__dirname)
        );



