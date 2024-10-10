import { Router } from 'express';
import { getSubjects, getGrades, getTeachers, getClasses, enrollInClass } from '../controllers/courseController';
import { authenticateToken, authorizeRole } from '../middleware/auth';

const router = Router();

router.get('/subjects', getSubjects);
router.get('/grades', getGrades);
router.get('/teachers', getTeachers);
router.get('/classes', getClasses);
router.post('/enroll', authenticateToken, authorizeRole(['student']), enrollInClass);

export const courseRoutes = router;