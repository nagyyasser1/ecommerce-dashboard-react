import { lazy, Suspense, useRef } from "react";
import styles from "./styles/AddNewCatForm.module.css";
import "react-quill/dist/quill.snow.css";
const ReactQuill = lazy(() => import("react-quill"));
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCreateCategoryMutation } from "../../app/services/category.service";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    name: yup.string().required(),
    slug: yup.string().required(),
    pageTitle: yup.string().required(),
    metaDescription: yup.string().required(),
    picUrl: yup.string().required(),
  })
  .required();

interface CreateCategoryData {
  name: string;
  slug: string;
  pageTitle: string;
  metaDescription: string;
  picUrl: string;
}

const AddNewCatForm = () => {
  const navigate = useNavigate();
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCategoryData>({
    defaultValues: {
      name: "",
      slug: "",
      pageTitle: "",
      metaDescription: "",
      picUrl: "",
    },
    resolver: yupResolver(schema),
  });

  const descriptionRef = useRef("");

  const handleDescriptionChange = (value: string) => {
    descriptionRef.current = value;
  };

  const onSubmit: SubmitHandler<CreateCategoryData> = async (data) => {
    try {
      const formData = {
        ...data,
        description: descriptionRef.current,
      };
      await createCategory(formData).unwrap();
      navigate("/categories");
    } catch (err) {
      console.error("Failed to create the category: ", err);
    }
  };

  return (
    <div className={styles.addNewCatForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.addNewCatForm_header}>
          <p>Create New Category</p>
          <button>{isLoading ? "loading..." : "Publish"}</button>
        </div>
        <div className={styles.form}>
          <div className={styles.basicInfo_section}>
            <p className={styles.formSection_header}>Basic information</p>
            <div className={styles.formControl}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="Men's"
                id="name"
                {...register("name", { required: true })}
              />
            </div>
            <div className={styles.formControl}>
              <label htmlFor="slug">Slug</label>
              <input
                type="text"
                placeholder="https://example.com/categories/slug"
                id="name"
                {...register("slug", { required: true })}
              />
            </div>
            <div className={styles.formControl}>
              <label htmlFor="description">Description</label>
              <Suspense fallback={<div>Loading editor...</div>}>
                <ReactQuill
                  placeholder="All About Men's Clothing."
                  id="description"
                  onChange={handleDescriptionChange}
                />
              </Suspense>
            </div>
          </div>
          <div className={styles.seo_section}>
            <p className={styles.formSection_header}>
              Search engine optimization
            </p>
            <div className={styles.formControl}>
              <label htmlFor="Pagetitle">Page title</label>
              <input
                type="text"
                id="Pagetitle"
                {...register("pageTitle", { required: true })}
              />
            </div>
            <div className={styles.formControl}>
              <label htmlFor="metadescription">Meta description</label>
              <input
                type="text"
                id="metadescription"
                {...register("metaDescription", { required: true })}
              />
            </div>
          </div>
          <div className={styles.catImage_section}>
            <p className={styles.formSection_header}>Category Base Image</p>
            <div className={styles.formControl}>
              <label htmlFor="imageurl">Image Url</label>
              <input
                type="text"
                id="imageurl"
                placeholder="https://"
                {...register("picUrl", { required: true })}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNewCatForm;
