import * as yup from "yup";

export const CreateAdminSchema = yup
  .object({
    fname: yup.string().required("first name required"),
    lname: yup.string().required("last name required"),
    email: yup.string().email("Invalid email format").required(),
    password: yup
      .string()
      .required()
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password")], "Passwords must match"),
  })
  .required();

export const EditAdminSchema = yup
  .object({
    fname: yup.string().optional(),
    lname: yup.string().optional(),
    email: yup.string().email("Invalid email format").optional(),
    password: yup
      .string()
      .optional()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must contain uppercase, lowercase, number, and special character"
      ),
    confirmPassword: yup
      .string()
      .optional()
      .oneOf([yup.ref("password")], "Passwords must match"),
  })
  .required();
