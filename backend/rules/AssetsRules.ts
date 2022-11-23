import { JSONSchemaType } from "ajv";
import { AssPayload } from "../../types/AssetsRule";
import { ajv } from "../lib/validationAjv";

const addAssetschema: JSONSchemaType<AssPayload> = {
  type: "object",
  properties: {
    id: {
      type: "string",
    },
    title: {
      type: "string",
    },
    images: {
      type: "object",
      properties: {
        thumbnailURL: {
          type: "string",
        },
        url: {
          type: "string",
        },
      },
      required: [],
    },
  },
  required: ["title"],
  additionalProperties: false,
};

export const addAssetRule = ajv.compile(addAssetschema);
