import * as yup from "yup";

export const productSchema = yup
  .object({
    name: yup.string().required("Name is required"),
    slug: yup.string().required("Slug is required"),
    description: yup.string().required("Description is required"),
    short_description: yup.string().required("Short Description is required"),
    price: yup.number().required("Price is required"),
    old_price: yup.number().required("old_price is required"),
    page_title: yup.string().required("Page Title is required"),
    meta_description: yup.string().required("Meta Description is required"),
    category: yup.number().required("Category is required"),
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
