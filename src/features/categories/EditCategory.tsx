import styles from "./styles/EditCategory.module.css";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoIosClose } from "react-icons/io";
import { Category, SubCategory } from "../../interfaces/category";
import { useState } from "react";

const schema = yup
  .object({
    name: yup.string().required(),
    slug: yup.string().required(),
    pageTitle: yup.string().required(),
    metaDescription: yup.string().required(),
    picUrl: yup.string().required(),
    description: yup.string().required(),
    subCategories: yup
      .array(
        yup.object().shape({
          name: yup.string().required("name color is required"),
        })
      )
      .optional(),
  })
  .required();

interface UpdateCategoryData {
  id: string;
  name: string;
  slug: string;
  pageTitle: string;
  metaDescription: string;
  picUrl: string;
  description: string;
  subCategories: SubCategory[];
}

interface EditCategoryProp {
  category: Category;
  toggleEditMenu: () => void;
}

const EditCategory = ({ toggleEditMenu, category }: EditCategoryProp) => {
  const [loading, setLoading] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UpdateCategoryData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: category.name,
      slug: category.slug,
      pageTitle: category.pageTitle,
      metaDescription: category.metaDescription,
      picUrl: category.picUrl,
      description: category.description,
      subCategories: category.subCategories,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subCategories",
  });

  const onSubmit: SubmitHandler<UpdateCategoryData> = async (data) => {
    setLoading(true);
    try {
      // Add your update logic here
      console.log(data);
    } catch (err) {
      console.error("Failed to update the category: ", err);
    } finally {
      setLoading(false);
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
            {fields.map((field, index) => (
              <div key={field.id}>
                <input
                  {...register(`subCategories.${index}.name`)}
                  defaultValue={field.name}
                  placeholder="name"
                />

                <button
                  type="button"
                  onClick={() => remove(index)}
                  className={styles.remove_variant_button}
                >
                  Remove
                </button>
                <br />
              </div>
            ))}
          </div>
          <div className={styles.formActions}>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
