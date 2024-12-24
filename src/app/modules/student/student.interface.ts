import { Model } from 'mongoose';

export type TGurdian = {
  name: string;
  phone: string;
  occupation: string;
};
export type Name = {
  firstName: string;
  lastName: string;
};

export type TStudent = {
  id: string;
  password: string;
  name: Name;
  gender: 'male' | 'female' | 'others';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  address: string;
  gurdian: TGurdian;
  profileImg?: string;
  isActive: 'active' | 'inactive';
  isDeleted: boolean;
};

// For creating static
export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>;
}

//  For Creating instance

// export type StudentMethod = {
//   isUserExists(id: string): Promise<TStudent | null>;
// };

// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   StudentMethod
// >;
