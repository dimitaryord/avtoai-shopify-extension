import os from "os";
import fs from "fs";
import path from "path";

import { v4 as uuidv4 } from "uuid";

const pathToTempFiles = (pathToFile) => path.join(os.tmpdir(), pathToFile);

export async function createFile(fileName, format, data) {
    let filePath;
    do {
        const uniqueId = uuidv4();
        filePath = pathToTempFiles(`${fileName}-${uniqueId}.${format}`);
    } while (await fs.promises.access(filePath).then(() => true).catch(() => false));

    try {
        await fs.promises.writeFile(filePath, format == "json" ? JSON.stringify(data) : data);
        return filePath;
    }
    catch (error) {
        throw new Error(error.message);
    }
}

export async function deleteFile(filePath) {
    try {
        await fs.promises.unlink(filePath);
    }
    catch (error) {
        throw new Error("Error deleting file: " + error.message);
    }
}

export async function readFile(filePath, encoding) {
    try{
        const data = await fs.promises.readFile(filePath, { encoding: encoding });
        return data;
    }
    catch (error) {
        throw new Error("Error reading file: " + error.message);
    }
}
