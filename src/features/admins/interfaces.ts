export interface Admin {
  id: string;
  fname: string;
  lname: string;
  email: string;
}

export interface NewAdminFormData {
  fname: string;
  lname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface EditAdminFormData {
  fname?: string;
  lname?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}
