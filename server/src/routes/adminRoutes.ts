import { Router } from 'express';
import { createSubject, updateSubject, deleteSubject, createGrade, updateGrade, deleteGrade, createClass, updateClass, deleteClass } from '../controllers/adminController';
import { authenticateToken, authorizeRole } from '../middleware/auth';

const router = Router();

const adminAuth = [authenticateToken, authorizeRole(['admin'])];

router.post('/subjects', ...adminAuth, createSubject);
router.put('/subjects/:id', ...adminAuth, updateSubject);
router.delete('/subjects/:id', ...adminAuth, deleteSubject);

router.post('/grades', ...adminAuth, createGrade);
router.put('/grades/:id', ...adminAuth, updateGrade);
router.delete('/grades/:id', ...adminAuth, deleteGrade);

router.post('/classes', ...adminAuth, createClass);
router.put('/classes/:id', ...adminAuth, updateClass);
router.delete('/classes/:id', ...adminAuth, deleteClass);

export const adminRoutes = router;