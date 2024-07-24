import styles from "./styles/AddNewAdmin.module.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useGetAdminByIdQuery,
  useUpdateAdminMutation,
} from "../../app/services/adminsService";
import { EditAdminFormData } from "./interfaces";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditAdminSchema } from "./utils";

const EditAdmin = () => {
  const { adminId } = useParams();

  const { data: admin, isLoading, isError } = useGetAdminByIdQuery(adminId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditAdminFormData>({
    resolver: yupResolver(EditAdminSchema),
  });

  useEffect(() => {
    if (admin) {
      reset({ ...admin, password: "", confirmPassword: "" });
    }
  }, [admin, reset]);

  const [updateAdmin, { isLoading: isLoadingUpdate }] =
    useUpdateAdminMutation();

  const onSubmit: SubmitHandler<EditAdminFormData> = async (data) => {
    try {
      await updateAdmin({ ...data, id: adminId }).unwrap();
      reset();
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{`Error fetching user, id: ${adminId}`}</p>;
  }

  return (
    <div className={styles.addNewAdmin}>
      <form
        className={styles.addNewAdmin_form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.addNewAdmin_header}>
          <p>Edit admin</p>
          <button>{isLoadingUpdate ? "Updating" : "Update"}</button>
        </div>
        <div className={styles.content}>
          <div className={styles.formControl}>
            <label htmlFor="fname">First Name</label>
            <input type="text" id="fname" {...register("fname")} />
            <p className={styles.error_msg}>{errors.fname?.message}</p>
          </div>
          <div className={styles.formControl}>
            <label htmlFor="lname">Last Name</label>
            <input type="text" id="lname" {...register("lname")} />
            <p className={styles.error_msg}>{errors.lname?.message}</p>
          </div>
          <div className={styles.formControl}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" {...register("email")} />
            <p className={styles.error_msg}>{errors.email?.message}</p>
          </div>
          <div className={styles.formControl}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" {...register("password")} />
            <p className={styles.error_msg}>{errors.password?.message}</p>
          </div>
          <div className={styles.formControl}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword")}
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

export default EditAdmin;
