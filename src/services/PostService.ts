import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type createDataProp = {
    title: string;
    body: string;
    authorId: number;
}
type updateDataProp = {
    title?: string;
    body?: string;
    authorId?: number;
    published?: boolean;
}

export const PostService = {

    findAll: async () => {
        return await prisma.post.findMany({
            where: {
                published: true
            },
            orderBy: {
                id: 'desc'
            }
        });
    },
    findAllPostsByUser: async (authorId: number) => {
        return await prisma.post.findMany({
            include:{
                author:true
            },
            where: {authorId}
        });
    },
    findOne: async (id: number) => {
        return await prisma.post.findUnique({
            where: { id }
        });
    },

    create: async (data: createDataProp) => {
        return await prisma.post.create({ data });
    },

    update: async (id: number, data: updateDataProp) => {
        return await prisma.post.update({ where: { id }, data });
    },

    delete: async (id: number) => {
        return await prisma.post.delete({ where: { id } });
    }

}