import axios from "axios";
import { prisma } from "../lib/prisma";
import { reqHandler } from "../lib/requestHandler";
import formData from "form-data";
import fs from "fs";
import { AvatarPayload } from "../../types/AvatarRule";
import { addAvatarRule } from "../rules/AvatarRules";

export const AvatarCategory = reqHandler<any>(async (req, res) => {
  return await prisma.avatarbuildercategories.findMany({});
});

export const GetAvatarCategory = reqHandler<{ id: string }>(
  async (req, res) => {
    return prisma.avatarbuildercategories.findFirst({
      where: {
        id: req.query.id as string,
      },
    });
  }
);

export const uploadImage = reqHandler<any>(async (req, res) => {
  var formdata = new formData();
  formdata.append("file", req.file!.buffer, {
    filename: req.file?.originalname ?? "file.jpg",
  });
  var config = {
    method: "post",
    url: "http://node.cubix.co:3341/Storage",
    headers: {
      "X-Access-Token": "prcuxue9bjjhvvfwe1prcuxue9bjjhvvfwe2",
    },
    data: formdata,
  };

  let response = await axios(config);
  return response.data.data;
});

export const addCategory = reqHandler<any>(async (req, res) => {
  req.body.uid = parseInt(req.body.uid);
  return await prisma.avatarbuildercategories.create({ data: req.body });
});

export const deleteCategory = reqHandler<any>(async (req, res) => {
  let id = req.params.id as string;
  return await prisma.avatarbuildercategories.delete({
    where: { id: id },
  });
});

export const updateCategory = reqHandler<any>(async (req, res) => {
  let id = req.body.id;
  delete req.body.id;
  req.body.uid = parseInt(req.body.uid);
  return await prisma.avatarbuildercategories.update({
    where: {
      id: id,
    },
    data: req.body,
  });
});
