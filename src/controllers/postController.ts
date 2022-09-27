import { Request, Response } from 'express';
import { PostService } from '../services/PostService';
import { UserService } from '../services/UserService';

// retorna todos os posts
export const all = async (req: Request, res: Response) => {
    const posts = await PostService.findAll();
    return res.json({ posts });
}

export const one = async (req: Request, res: Response) => {
    const { id } = req.params;
    const post = await PostService.findOne( parseInt(id) );
    if(post) {
        return res.json({ post });
    } else {
        return res.json({ error: 'Post não encontrado.' });
    }
}

export const allPostsUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const posts = await PostService.findAllPostsByUser(parseInt(id));
    if(posts){
        return res.json({ posts });
    }else{
        return res.json({ error: 'Autor não existe.' });
    }

}
export const create = async (req: Request, res: Response) => {
    const { title, body, author } = req.body;

    if(title && body && author) {
        const user = await UserService.findOne({
            id: parseInt(author)
        });
        if(user) {
            const post = await PostService.create({
                title, body, authorId: user.id
            });
            res.status(201).json({ post });
        } else {
            res.json({ error: 'Autor não existe.' });
        }
    } else {
        res.json({ error: 'Dados não preenchidos.' });
    }
}

export const togglePost = async (req: Request, res: Response) => {
    const { id } = req.params;

    const post = await PostService.findOne( parseInt(id) );
    if(post) {
        const postUpdated = await PostService.update(
            post.id,
            { published: !post.published }
        );
        res.json({ post: postUpdated });
    } else {
        res.json({ error: 'Post não existe.' });
    }
}

export const deletePost = async (req: Request, res: Response) => {
    const { id } = req.params;

    const post = await PostService.findOne( parseInt(id) );
    if(post) {
        await PostService.delete( parseInt(id) );

        res.json({ status: true });
    } else {
        res.json({ error: 'Post não existe.' });
    }
}