export type Gurdian = {
  name: string;
  phone: string;
  occupation: string;
};

export type Student = {
  id: string;
  name: {
    firstName: string;
    lastName: string;
  };
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  address: string;
  gurdian: Gurdian;
  profileImg?: string;
  isActive: 'active' | 'inactive';
};
