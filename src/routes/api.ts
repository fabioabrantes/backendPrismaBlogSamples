import { Router } from 'express';

import * as PostController from '../controllers/postController';
import * as UserController from '../controllers/userController';

const router = Router();

router.get('/posts', PostController.all);
router.get('/posts/:id', PostController.one);
router.get('/users/:id/posts', PostController.allPostsUser);
router.post('/post', PostController.create);
router.put('/posts/:id', PostController.togglePost);
router.delete('/posts/:id', PostController.deletePost);

router.get('/users', UserController.all);
router.get('/users/:id', UserController.one);
router.post('/user', UserController.create);



export default router;