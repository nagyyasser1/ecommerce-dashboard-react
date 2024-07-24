import styles from "./styles/AddNewAdmin.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { NewAdminFormData } from "./interfaces";
import { CreateAdminSchema } from "./utils";
import { useCreateAdminMutation } from "../../app/services/adminsService";

const AddNewAdmin = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewAdminFormData>({
    defaultValues: {
      fname: "",
      lname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(CreateAdminSchema),
  });

  const [createAdmin, { isLoading }] = useCreateAdminMutation();

  const onSubmit: SubmitHandler<NewAdminFormData> = async (data) => {
    try {
      await createAdmin(data).unwrap();
      reset();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.addNewAdmin}>
      <form
        className={styles.addNewAdmin_form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.addNewAdmin_header}>
          <p>Create new admin</p>
          <button>{isLoading ? "Publishing" : "Publish"}</button>
        </div>
        <div className={styles.content}>
          <div className={styles.fromControl}>
            <label htmlFor="fname">First Name</label>
            <input
              type="text"
              id="fname"
              {...register("fname", { required: true })}
            />
            <p className={styles.error_msg}>{errors.fname?.message}</p>
          </div>
          <div className={styles.fromControl}>
            <label htmlFor="lname">Last Name</label>
            <input
              type="text"
              id="lname"
              {...register("lname", { required: true })}
            />
            <p className={styles.error_msg}>{errors.lname?.message}</p>
          </div>
          <div className={styles.fromControl}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              {...register("email", { required: true })}
            />
            <p className={styles.error_msg}>{errors.email?.message}</p>
          </div>
          <div className={styles.fromControl}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              {...register("password", {
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                required: "this is required",
                minLength: {
                  value: 8,
                  message: "min lenght is 8",
                },
              })}
            />
            <p className={styles.error_msg}>{errors.password?.message}</p>
          </div>
          <div className={styles.fromControl}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                required: "this is required",
                minLength: {
                  value: 8,
                  message: "min lenght is 8",
                },
              })}
            />
            <p className={styles.error_msg}>
              {errors.confirmPassword?.message}
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNewAdmin;
