import styles from "./styles/EditCategory.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoIosClose } from "react-icons/io";
import { Category } from "../../interfaces/category";
import EditSubCat from "./EditSubCat";
import { useUpdateCategoryMutation } from "../../app/services/categoryService";

const schema = yup
  .object({
    name: yup.string().required(),
    slug: yup.string().required(),
    pageTitle: yup.string().required(),
    metaDescription: yup.string().required(),
    picUrl: yup.string().required(),
    description: yup.string().required(),
    active: yup.boolean().optional(),
  })
  .required();

interface UpdateCategoryData {
  name: string;
  slug: string;
  description: string;
  pageTitle: string;
  metaDescription: string;
  picUrl: string;
  active?: boolean;
}

interface EditCategoryProp {
  category: Category;
  toggleEditMenu: () => void;
}

const EditCategory = ({ toggleEditMenu, category }: EditCategoryProp) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateCategoryData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: category.name,
      slug: category.slug,
      pageTitle: category.pageTitle,
      metaDescription: category.metaDescription,
      picUrl: category.picUrl,
      description: category.description,
      active: category.active,
    },
  });

  const [updateCategory, { isLoading, isError, error }] =
    useUpdateCategoryMutation();

  const onSubmit: SubmitHandler<UpdateCategoryData> = async (data) => {
    try {
      await updateCategory({ ...data, id: category.id }).unwrap();
    } catch (err) {
      console.error("Failed to update the category: ", err);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.editCategory}>
        <IoIosClose className={styles.closeIcon} onClick={toggleEditMenu} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.form}>
            <div className={styles.basicInfo_section}>
              <p className={styles.formSection_header}>Basic Information</p>
              <div className={styles.formControl}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" {...register("name")} />
                {errors.name && (
                  <p className={styles.error}>{errors.name.message}</p>
                )}
              </div>
              <div className={styles.formControl}>
                <label htmlFor="slug">Slug</label>
                <input type="text" id="slug" {...register("slug")} />
                {errors.slug && (
                  <p className={styles.error}>{errors.slug.message}</p>
                )}
              </div>
              <div className={styles.formControl}>
                <label htmlFor="description">Description</label>
                <textarea id="description" {...register("description")} />
                {errors.description && (
                  <p className={styles.error}>{errors.description.message}</p>
                )}
              </div>
              <div className={styles.formControl}>
                <label htmlFor="active">Active</label>
                <select id="active" {...register("active")}>
                  <option value={1}>Active</option>
                  <option value={0}>Inactive</option>
                </select>
              </div>
            </div>
            <div className={styles.seo_section}>
              <p className={styles.formSection_header}>
                Search Engine Optimization
              </p>
              <div className={styles.formControl}>
                <label htmlFor="pageTitle">Page Title</label>
                <input type="text" id="pageTitle" {...register("pageTitle")} />
                {errors.pageTitle && (
                  <p className={styles.error}>{errors.pageTitle.message}</p>
                )}
              </div>
              <div className={styles.formControl}>
                <label htmlFor="metaDescription">Meta Description</label>
                <textarea
                  id="metaDescription"
                  {...register("metaDescription")}
                />
                {errors.metaDescription && (
                  <p className={styles.error}>
                    {errors.metaDescription.message}
                  </p>
                )}
              </div>
            </div>
            <div className={styles.catImage_section}>
              <p className={styles.formSection_header}>Category Base Image</p>
              <div className={styles.formControl}>
                <label htmlFor="picUrl">Image URL</label>
                <input type="text" id="picUrl" {...register("picUrl")} />
                {errors.picUrl && (
                  <p className={styles.error}>{errors.picUrl.message}</p>
                )}
              </div>
              <div className={styles.imagePreview}>
                <img src={category.picUrl} alt={category.name} />
              </div>
            </div>
          </div>
          <div>
            <p className={styles.formSection_header}>Sub-Categories</p>
            <EditSubCat
              subCategories={category.subCategories}
              categoryId={category.id}
            />
          </div>
          <div className={styles.formActions}>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
