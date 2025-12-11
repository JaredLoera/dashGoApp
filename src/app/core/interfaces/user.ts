export interface user {
  id: number;
  fullName: string | null;
  email: string;
  age: string | null;
  curp: string | null;
  roleId: number;
  createdAt?: string;
  updatedAt?: string;
}
