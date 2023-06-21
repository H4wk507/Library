import * as yup from "yup";
import { Library } from "../helpers/types";
import { alreadyExists } from "../helpers/utils";

export const bookSchemaWrapper = (library: Library) =>
  yup
    .object({
      title: yup.string().required(),
      author: yup.string().required(),
      pages: yup
        .number()
        .typeError("pages must be a number")
        .positive("pages must be a positive number")
        .integer("pages must be an integer")
        .required(),
      read: yup.boolean().required(),
    })
    .test({
      test: (value, ctx) =>
        alreadyExists(library, value)
          ? ctx.createError({ path: "exists", message: "Book already exists" })
          : true,
    });
