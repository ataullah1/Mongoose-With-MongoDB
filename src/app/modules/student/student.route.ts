import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../utils/validateRequest';
import { updateStudentValidationSchema } from './student.validation';
const router = express.Router();

// Will call controller func
// router.post('/create-student', StudentControllers.createStudent);
router.get('/', StudentControllers.getAllStudent);
router.get('/:studentId', StudentControllers.getSingleStudent);
router.patch(
  '/:studentId',
  validateRequest(updateStudentValidationSchema),
  StudentControllers.updateStudent,
);
router.delete('/:studentId', StudentControllers.getDeleteStudent);

export const StudentRoutes = router;
