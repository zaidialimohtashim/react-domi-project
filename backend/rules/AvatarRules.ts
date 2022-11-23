import { JSONSchemaType } from "ajv";
import { AvatarPayload } from "../../types/AvatarRule";
import { ajv } from "../lib/validationAjv";

const addAvatarschema: JSONSchemaType<AvatarPayload> = {
  type: "object",
  properties: {
    id: {
      type: "string",
    },
    name: {
      type: "string",
    },
    shortCode: {
      type: "string",
    },
  },
  required: ["id", "name", "shortCode"],
  additionalProperties: false,
};

export const addAvatarRule = ajv.compile(addAvatarschema);
