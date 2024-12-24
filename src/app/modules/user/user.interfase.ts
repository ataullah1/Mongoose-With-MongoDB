export type Tuser = {
  id: string;
  password: string;
  needChangePassword: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};
