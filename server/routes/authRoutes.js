import express from 'express';
import { signup, login, getUser, logout } from '../controllers/authController.js';
import { verifyCookie, verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/user', verifyToken, getUser);
router.post('/logout', logout);
router.get('/verify-cookie', verifyCookie);
// router.post("/", verifyToken);
export default router;

