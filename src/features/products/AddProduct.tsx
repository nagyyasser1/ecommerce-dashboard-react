import { useEffect } from "react";
import styles from "./styles/AddProduct.module.css";
import {
  useForm,
  useFieldArray,
  FormProvider,
  SubmitHandler,
  Controller,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FolderListOverlay from "./FolderListOverlay";
import { selectIsAssestsOpend, toggleAssestOverlay } from "../appSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useCreateProductMutation } from "../../app/services/productsService";
import { productSchema } from "./utils";
import { CreateProductData } from "./interfaces";
import SelectCategory from "./SelectCategory";

const initialValues: CreateProductData = {
  name: "",
  slug: "",
  description: "",
  short_description: "",
  price: 0,
  old_price: 0,
  page_title: "",
  meta_description: "",
  category: 0,
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
    resolver: yupResolver<CreateProductData>(productSchema),
  });

  const {
    register,
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const removeImage = (index: number) => {
    const currentImages = getValues("images");
    if (currentImages) {
      const updatedImages = currentImages.filter((_, i) => i !== index);
      setValue("images", updatedImages);
    }
  };

  const handleTagInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tags = event.target.value.split(",").map((tag) => tag.trim());
    methods.setValue("tags", tags);
  };

  const [createProduct, { isLoading }] = useCreateProductMutation();

  const onSubmit: SubmitHandler<CreateProductData> = async (data) => {
    try {
      const payload = {
        ...data,
        price: parseFloat(data.price.toString()),
        old_price: data.old_price
          ? parseFloat(data.old_price.toString())
          : undefined,
        category: parseInt(data.category.toString()),
      };
      await createProduct(payload).unwrap();
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
            <button type="submit">
              {isLoading ? "Publishing" : "Publish"}
            </button>
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
                <input {...register("price")} type="number" id="price" />
                {errors.price && <p>{errors.price.message}</p>}
              </div>
              <div className={styles.formControl}>
                <label htmlFor="oldprice">Old price</label>
                <input {...register("old_price")} type="number" id="oldprice" />
                {errors.old_price && <p>{errors.old_price.message}</p>}
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
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <SelectCategory handleCategoryChange={field.onChange} />
                  )}
                />
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
                  onClick={() => append({ quantity: 0, color: "", size: 0 })}
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
                    {...register(`variants.${index}.quantity`)}
                    defaultValue={field.quantity}
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
              <Controller
                name="images"
                control={control}
                render={({ field }) => (
                  <div className={styles.imagesList}>
                    {(field.value || []).map((image: string, index: number) => {
                      return (
                        <div key={index}>
                          <img src={image} alt={`Image ${index}`} width={100} />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                          >
                            Remove
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              />
              {isAssestsOverlayOpend && (
                <FolderListOverlay
                  control={control}
                  setValue={setValue}
                  getValues={getValues}
                />
              )}
            </div>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default AddProduct;
