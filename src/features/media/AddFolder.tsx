import { useCreateFolderMutation } from "../../app/services/media.service";
import styles from "./styles/AddFolder.module.css";

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    folderName: yup.string().required(),
  })
  .required();

interface AddFolderFormData {
  folderName: string;
}

const AddFolder = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddFolderFormData>({
    defaultValues: {
      folderName: "",
    },
    resolver: yupResolver(schema),
  });

  const [createFolder, { isLoading, isError, error }] =
    useCreateFolderMutation();

  const onSubmit: SubmitHandler<AddFolderFormData> = async (data) => {
    try {
      await createFolder(data).unwrap();
      reset(); // Reset the form fields to default values
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.addFolder}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Add new folder..."
          autoFocus
          {...register("folderName", { required: true })}
        />
        <button type="submit">{isLoading ? "Loading..." : "New"}</button>
      </form>
      {errors.folderName && <p>{errors.folderName.message}</p>}
    </div>
  );
};

export default AddFolder;
