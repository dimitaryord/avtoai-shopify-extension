import prisma from "../db.server";

async function findUserByShop(shop){
    try{
        const user = await prisma.user.findUnique({
            where: {
                shop: shop
            }
        });

        return user;
    }
    catch(error){
        throw new Error("Error finding user: " + error.message);
    }
}

async function createUser(userData){
    try{
        const newUser = await prisma.user.create({ data: userData });
        return newUser;
    }
    catch(error){
        throw new Error("Error creating user: " + error.message);
    }
}

async function updateUser(userId, updateData){
    try{
        const updatedUser = await prisma.user.update({ 
            where: {
                id: userId
            },
            data: updateData
        });

        return updatedUser;
    }
    catch(error){
        throw new Error("Error updating user: " + error.message);
    }
}

async function createThread(userId, threadId) {
    try{
        await prisma.thread.create({
            data: {
                id: threadId,
                userId: userId
            }
        })
    }
    catch(error){
        throw new Error("Error creating thread: " + error.message);
    }
}

export default {
    findUserByShop,
    createUser,
    updateUser,
    createThread
}