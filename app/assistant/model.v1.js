import fs from "fs";
import { createFile, deleteFile, readFile } from "../utils/fileManagement";
import { createVariables } from "../utils/regex";
import { initOpenAI } from "../openai";

const pathToFilesDir = (pathToFile) => `${process.env.MODEL_FILES_PATH}${pathToFile}`;

export async function createModelV1({ assistantName, assistantInfo, products }) {
    try {
        const openai = initOpenAI();

        const fileInstructions = await readFile(pathToFilesDir("model.v1.txt"), "utf8");
        const instructions = createVariables({
            content: fileInstructions,
            variables: assistantInfo 
        });

        const productsFilePath = await createFile("products", "json", { products: products });
        const openaiProductsFile = await openai.files.create({
            file: fs.createReadStream(productsFilePath),
            purpose: "assistants"
        });

        const assistant = await openai.beta.assistants.create({
            name: assistantName,
            description: `This is a trained model for ${assistantName} shop.`,
            instructions: instructions,
            model: "gpt-4-0125-preview",
            tools: [{ type: "code_interpreter" }],
            file_ids: [openaiProductsFile.id]
        })

        await deleteFile(productsFilePath);

        return {
            assistantId: assistant.id,
            productsFileId: openaiProductsFile.id
        };
    }
    catch (error) {
        throw new Error("Error creating model: " + error.message);
    }
}

export async function updateModelV1(assistantId, assistantInfo) {
    try{
        const openai = initOpenAI();

        const fileInstructions = await readFile(pathToFilesDir("model.v1.txt"), "utf8");
        const instructions = createVariables({
            content: fileInstructions,
            variables: assistantInfo
        });

        await openai.beta.assistants.update(assistantId, {
            instructions: instructions
        });
    }
    catch (error) {
        throw new Error("Error updating model v1 file: " + error.message);
    }
}