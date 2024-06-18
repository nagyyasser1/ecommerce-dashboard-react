import { Suspense, useEffect } from "react";
import styles from "./styles/AddProduct.module.css";
import ReactQuill from "react-quill";
import {
  useForm,
  useFieldArray,
  FormProvider,
  SubmitHandler,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FolderListOverlay from "./FolderListOverlay";
import { selectIsAssestsOpend, toggleAssestOverlay } from "../appSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    slug: yup.string().required("Slug is required"),
    description: yup.string().required("Description is required"),
    short_description: yup.string().required("Short Description is required"),
    price: yup
      .object({
        new: yup.number().required("New price is required"),
        old: yup.number().optional(),
      })
      .required(),
    page_title: yup.string().required("Page Title is required"),
    meta_description: yup.string().required("Meta Description is required"),
    category: yup.string().required("Category is required"),
    tags: yup
      .array()
      .of(yup.string().required("Each tag must be a string"))
      .min(1, "At least one tag is required"),
    images: yup
      .array()
      .of(yup.string().required())
      .min(1, "At least one image is required"),
    visible: yup.boolean().required(),
    variants: yup
      .array(
        yup.object().shape({
          count: yup.number().required("Variant count is required"),
          color: yup.string().required("Variant color is required"),
          size: yup.number().required("Variant size is required"),
        })
      )
      .optional(),
  })
  .required();

// Define the TypeScript interface
interface CreateProductData {
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: {
    new: number;
    old?: number;
  };
  page_title: string;
  meta_description: string;
  category: string;
  tags?: string[];
  images?: string[];
  visible: boolean;
  variants?: Array<{
    count: number;
    color: string;
    size: number;
  }>;
}

// Define initial values
const initialValues: CreateProductData = {
  name: "",
  slug: "",
  description: "",
  short_description: "",
  price: {
    new: 0,
    old: undefined,
  },
  page_title: "",
  meta_description: "",
  category: "",
  tags: [""],
  images: [""],
  visible: true,
  variants: [],
};

const AddProduct = () => {
  const isAssestsOverlayOpend = useAppSelector(selectIsAssestsOpend);
  const dispatch = useAppDispatch();

  const handleOverLayClicked = () => {
    dispatch(toggleAssestOverlay());
  };

  const methods = useForm<CreateProductData>({
    defaultValues: initialValues,
    resolver: yupResolver<CreateProductData>(schema),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const setImages = (images: string[]) => {
    methods.setValue("images", images);
  };

  const handleTagInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tags = event.target.value.split(",").map((tag) => tag.trim());
    methods.setValue("tags", tags);
  };

  const onSubmit: SubmitHandler<CreateProductData> = async (data) => {
    try {
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    methods.setValue("tags", initialValues.tags);
  }, [methods.setValue]);

  return (
    <FormProvider {...methods}>
      <div className={styles.addProduct}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.addNewCatForm_header}>
            <p>New Product</p>
            <button type="submit">Publish</button>
          </div>
          <div className={styles.form}>
            <div className={styles.basicInfo_section}>
              <p className={styles.formSection_header}>Basic information</p>
              <div className={styles.formControl}>
                <label htmlFor="name">Name</label>
                <input
                  {...register("name")}
                  type="text"
                  placeholder="Men's"
                  id="name"
                />
                {errors.name && <p>{errors.name.message}</p>}
              </div>
              <div className={styles.formControl}>
                <label htmlFor="slug">Slug</label>
                <input
                  {...register("slug")}
                  type="text"
                  placeholder="https://example.com/categories/slug"
                  id="slug"
                />
                {errors.slug && <p>{errors.slug.message}</p>}
              </div>
              <div className={styles.formControl}>
                <label htmlFor="description">Description</label>
                <textarea
                  {...register("description")}
                  id="description"
                  className={styles.textarea}
                ></textarea>
                {errors.description && <p>{errors.description.message}</p>}
              </div>
              <div className={styles.formControl}>
                <label htmlFor="short_description">Short description</label>
                <textarea
                  {...register("short_description")}
                  id="short_description"
                  className={styles.textarea}
                />
                {errors.short_description && (
                  <p>{errors.short_description.message}</p>
                )}
              </div>
            </div>
            <div className={styles.price_section}>
              <p className={styles.formSection_header}>$ Price</p>
              <div className={styles.formControl}>
                <label htmlFor="price">Price</label>
                <input {...register("price.new")} type="number" id="price" />
                {errors.price?.new && <p>{errors.price.new.message}</p>}
              </div>
              <div className={styles.formControl}>
                <label htmlFor="oldprice">Old price</label>
                <input {...register("price.old")} type="number" id="oldprice" />
                {errors.price?.old && <p>{errors.price.old.message}</p>}
              </div>
            </div>
            <div className={styles.seo_section}>
              <p className={styles.formSection_header}>
                Search engine optimization
              </p>
              <div className={styles.formControl}>
                <label htmlFor="page_title">Page title</label>
                <input
                  {...register("page_title")}
                  type="text"
                  id="page_title"
                />
                {errors.page_title && <p>{errors.page_title.message}</p>}
              </div>
              <div className={styles.formControl}>
                <label htmlFor="meta_description">Meta description</label>
                <input
                  {...register("meta_description")}
                  type="text"
                  id="meta_description"
                />
                {errors.meta_description && (
                  <p>{errors.meta_description.message}</p>
                )}
              </div>
            </div>
            <div className={styles.category_section}>
              <p className={styles.formSection_header}>Category</p>
              <div className={styles.formControl}>
                <input {...register("category")} type="text" id="category" />
                {errors.category && <p>{errors.category.message}</p>}
              </div>
            </div>
            <div className={styles.tags_section}>
              <p className={styles.formSection_header}>Tags</p>
              <div className={styles.formControl}>
                <input
                  type="text"
                  id="tags"
                  placeholder="Comma-separated tags"
                  onChange={handleTagInputChange}
                />
                {errors.tags && <p>{errors.tags.message}</p>}
              </div>
            </div>
            <div className={styles.visibility_section}>
              <p className={styles.formSection_header}>Visibility</p>
              <div className={styles.formControl}>
                <select {...register("visible")}>
                  <option value="true">visible</option>
                  <option value="false">hidden</option>
                </select>
                {errors.visible && <p>{errors.visible.message}</p>}
              </div>
            </div>
            <div className={styles.variants_section}>
              <div className={styles.variants_header}>
                <p>Variants</p>
                <button
                  type="button"
                  onClick={() => append({ count: 0, color: "", size: 0 })}
                >
                  +
                </button>
              </div>
              {fields.map((field, index) => (
                <div key={field.id}>
                  <input
                    {...register(`variants.${index}.color`)}
                    defaultValue={field.color}
                    placeholder="color"
                  />
                  <input
                    {...register(`variants.${index}.count`)}
                    defaultValue={field.count}
                    placeholder="stock quantity"
                    type="number"
                  />
                  <input
                    {...register(`variants.${index}.size`)}
                    defaultValue={field.size}
                    placeholder="size"
                    type="number"
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
            <div className={styles.assets_section}>
              <div className={styles.assets_section_header}>
                <p className={styles.formSection_header}>Assets</p>
                <button type="button" onClick={handleOverLayClicked}>
                  +
                </button>
              </div>
              {isAssestsOverlayOpend && (
                <FolderListOverlay setImages={setImages} />
              )}
            </div>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default AddProduct;
