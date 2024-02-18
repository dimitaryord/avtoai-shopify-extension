import fs from "fs";
import { createFile, deleteFile, readFile } from "../utils/fileManagement";
import { initOpenAI } from "../openai";

const pathToFilesDir = (pathToFile) => `${process.env.MODEL_FILES_PATH}${pathToFile}`;

export async function createModelV1({ assistantName, formData, products }) {
    try {
        const openai = initOpenAI();

        const fileInstructions = await readFile(pathToFilesDir("model.v1.txt"), "utf8");
        const formDataFilePath = await createFile("formData", "json", formData);
        const productsFilePath = await createFile("products", "json", products);

        const openaiFormDataFile = await openai.files.create({
            file: fs.createReadStream(formDataFilePath),
            purpose: "assistants"
        });
        const openaiProductsFile = await openai.files.create({
            file: fs.createReadStream(productsFilePath),
            purpose: "assistants"
        });

        const assistant = await openai.beta.assistants.create({
            name: assistantName,
            description: `This is a trained model for ${assistantName} shop.`,
            instructions: fileInstructions,
            model: "gpt-4-1106-preview",
            tools: [{ type: "retrieval"}],
            file_ids: [openaiFormDataFile.id, openaiProductsFile.id]
        })

        await deleteFile(formDataFilePath);
        await deleteFile(productsFilePath);

        return {
            assistantId: assistant.id,
            formDataFileId: openaiFormDataFile.id,
            productsFileId: openaiProductsFile.id
        };
    }
    catch (error) {
        throw new Error("Error creating model: " + error.message);
    }
}

export async function updateModelV1File(assistantId, staticFilesId, file) {
    try{
        const openai = initOpenAI();

        await openai.beta.assistants.files.del(assistantId, file.id);
        await openai.files.del(file.id);

        const createdFilePath = await createFile(file.name, "json", file.data);
        const openaiCreatedFile = await openai.files.create({
            file: fs.createReadStream(createdFilePath),
            purpose: "assistants"
        });
        await openai.beta.assistants.update(assistantId, {
            file_ids:[...staticFilesId, openaiCreatedFile.id]
        });

        return openaiCreatedFile.id;
    }
    catch (error) {
        throw new Error("Error updating model v1 file: " + error.message);
    }
}