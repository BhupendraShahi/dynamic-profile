import express from 'express';
import { addConnection, removeConnection, getAllConnections } from '../controllers/connectionController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/add-connection', verifyToken, addConnection);
router.put('/remove-connection', verifyToken, removeConnection);
router.get('/get-connections', verifyToken, getAllConnections);

export default router;

