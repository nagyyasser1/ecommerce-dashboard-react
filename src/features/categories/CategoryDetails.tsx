import { useParams } from "react-router-dom";
import {
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} from "../../app/services/category.service";
import styles from "./styles/AddNewCatForm.module.css";
import { Suspense, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    name: yup.string().required(),
    slug: yup.string().required(),
    pageTitle: yup.string().required(),
    metaDescription: yup.string().required(),
    picUrl: yup.string().required(),
  })
  .required();

interface UpdateCategoryData {
  name: string;
  slug: string;
  pageTitle: string;
  metaDescription: string;
  picUrl: string;
}

const CategoryDetails = () => {
  const { catId } = useParams();
  const descriptionRef = useRef("");

  const {
    data: category,
    error,
    isLoading,
  } = useGetCategoryByIdQuery(Number(catId || 0)); // Default to 0 if catId is undefined

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateCategoryData>({
    resolver: yupResolver(schema),
  });

  const [updateCategory, { isLoading: updateLoading }] =
    useUpdateCategoryMutation();

  useEffect(() => {
    if (category) {
      reset({
        name: category.name,
        slug: category.slug,
        pageTitle: category.pageTitle,
        metaDescription: category.metaDescription,
        picUrl: category.picUrl,
      });
      descriptionRef.current = category.description;
    }
  }, [category, reset]);

  const handleDescriptionChange = (value: string) => {
    descriptionRef.current = value;
  };

  const onSubmit: SubmitHandler<UpdateCategoryData> = async (data) => {
    try {
      const formData = {
        id: Number(catId),
        ...data,
        description: descriptionRef.current,
      };
      await updateCategory(formData).unwrap();
    } catch (err) {
      console.error("Failed to update the category: ", err);
    }
  };

  if (!catId) {
    return (
      <div>
        <p>Category id must be provided</p>
      </div>
    );
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading category.</div>;
  }

  return (
    <div className={styles.addNewCatForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.addNewCatForm_header}>
          <p>Update Category</p>
          <button>{updateLoading ? "Updating..." : "Update"}</button>
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
                {...register("name")}
              />
              {errors.name && <p>{errors.name.message}</p>}
            </div>
            <div className={styles.formControl}>
              <label htmlFor="slug">Slug</label>
              <input
                type="text"
                placeholder="https://example.com/categories/slug"
                id="slug"
                {...register("slug")}
              />
              {errors.slug && <p>{errors.slug.message}</p>}
            </div>
            <div className={styles.formControl}>
              <label htmlFor="description">Description</label>
              <Suspense fallback={<div>Loading editor...</div>}>
                <ReactQuill
                  placeholder="All About Men's Clothing."
                  id="description"
                  value={descriptionRef.current}
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
              <label htmlFor="pageTitle">Page title</label>
              <input type="text" id="pageTitle" {...register("pageTitle")} />
              {errors.pageTitle && <p>{errors.pageTitle.message}</p>}
            </div>
            <div className={styles.formControl}>
              <label htmlFor="metaDescription">Meta description</label>
              <input
                type="text"
                id="metaDescription"
                {...register("metaDescription")}
              />
              {errors.metaDescription && (
                <p>{errors.metaDescription.message}</p>
              )}
            </div>
          </div>
          <div className={styles.catImage_section}>
            <p className={styles.formSection_header}>Category Base Image</p>
            <div className={styles.formControl}>
              <label htmlFor="picUrl">Image Url</label>
              <input
                type="text"
                id="picUrl"
                placeholder="https://"
                {...register("picUrl")}
              />
              {errors.picUrl && <p>{errors.picUrl.message}</p>}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CategoryDetails;
