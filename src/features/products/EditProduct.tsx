import { useParams } from "react-router-dom";
import styles from "./styles/AddProduct.module.css";
import {
  useFindProductByIdQuery,
  useUpdateProductMutation,
} from "../../app/services/productsService";
import {
  useForm,
  useFieldArray,
  FormProvider,
  SubmitHandler,
  Controller,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateProductData } from "./interfaces";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectIsAssestsOpend, toggleAssestOverlay } from "../appSlice";
import { productSchema } from "./utils";
import FolderListOverlay from "./FolderListOverlay";
import SelectCategory from "./SelectCategory";

const EditProduct = () => {
  const { productId } = useParams();

  const { data, isLoading, isError } = useFindProductByIdQuery(productId);

  const isAssestsOverlayOpend = useAppSelector(selectIsAssestsOpend);
  const dispatch = useAppDispatch();

  const handleOverLayClicked = () => {
    dispatch(toggleAssestOverlay());
  };

  const methods = useForm<CreateProductData>({
    defaultValues: data,
    resolver: yupResolver(productSchema),
  });

  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = methods;

  const {
    fields: variantsFields,
    append: variantsAppend,
    remove: variantsRemove,
  } = useFieldArray({
    control,
    name: "variants",
  });

  const handleTagInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tags = event.target.value.split(",").map((tag) => tag.trim());
    methods.setValue("tags", tags);
  };

  const removeImage = (index: number) => {
    const currentImages = getValues("images");
    if (currentImages) {
      const updatedImages = currentImages.filter((_, i) => i !== index);
      setValue("images", updatedImages);
    }
  };

  const [updateProduct, { isLoading: updateLoading }] =
    useUpdateProductMutation();

  const onSubmit: SubmitHandler<CreateProductData> = async (data) => {
    try {
      const payload = {
        ...data,
        id: productId,
        price: parseFloat(data.price.toString()),
        old_price: data.old_price
          ? parseFloat(data.old_price.toString())
          : undefined,
        category: parseInt(data.category.toString()),
      };
      await updateProduct(payload).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (data) {
      methods.reset(data);
    }
  }, [data, methods.reset]);

  if (isLoading) {
    return <p>loading product</p>;
  }

  if (isError) {
    return <p>error fetching product</p>;
  }

  return (
    <FormProvider {...methods}>
      <div className={styles.addProduct}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.addNewCatForm_header}>
            <p>Edit Product</p>
            <button type="submit">
              {updateLoading ? "Updating" : "Update"}
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
                  onClick={() =>
                    variantsAppend({ count: 0, color: "", size: 0 })
                  }
                >
                  +
                </button>
              </div>
              {variantsFields.map((field, index) => (
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
                    onClick={() => variantsRemove(index)}
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

export default EditProduct;
