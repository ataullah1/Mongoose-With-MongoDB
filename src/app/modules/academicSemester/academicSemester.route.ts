import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../utils/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';
const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(AcademicSemesterValidation.createAcademicValidationSchema),
  AcademicSemesterControllers.createAcademicSemester,
);
// router.get('/', StudentControllers.getAllStudent);
// router.get('/:studentId', StudentControllers.getSingleStudent);
// router.delete('/:studentId', StudentControllers.getDeleteStudent);

export const AcademicSemesterRoutes = router;
