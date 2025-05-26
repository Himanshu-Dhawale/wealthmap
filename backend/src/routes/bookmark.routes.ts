import { Hono } from 'hono';
import { verifyToken } from '../middleware/auth.middleware';
import { bookmarkProperty, removeBookmark, getBookmarks } from '../controllers/bookmark.controller';

const bookmarkRouter = new Hono();

bookmarkRouter.post('/:id/bookmark', verifyToken, bookmarkProperty);
bookmarkRouter.delete('/:id/bookmark', verifyToken, removeBookmark);
bookmarkRouter.get('/bookmarks', verifyToken, getBookmarks);

export default bookmarkRouter;
