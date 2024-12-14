import { model, Schema } from 'mongoose';
import { Gurdian, Student } from './student/student.interface';

const gurdianSchema = new Schema<Gurdian>({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  occupation: { type: String, required: true },
});
const studentSchema = new Schema<Student>({
  id: { type: String },
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  gender: ['male', 'female'],

  dateOfBirth: { type: String, required: true },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  address: { type: String, required: true },
  gurdian: gurdianSchema,
  profileImg: { type: String, required: true },
  isActive: ['active', 'inactive'],
});

//  Create a Model.
const Student = model<Student>('Student', studentSchema);
