import axios from "axios";
import { prisma } from "../lib/prisma";
import { reqHandler } from "../lib/requestHandler";
import formData from "form-data";
import fs from "fs";
import { assetbuildercategories, PrismaClient } from "@prisma/client";
import { AssPayload } from "../../types/AssetsRule";
import { addAssetRule } from "../rules/AssetsRules";

export const AssetsList = reqHandler<any>(async (req, res) => {
  return await prisma.assetbuildercategories.findMany({});
});

export const GetAssets = reqHandler<{ id: string }>(async (req, res) => {
  return prisma.assetbuildercategories.findFirst({
    where: {
      id: req.query.id as string,
    },
  });
});

export const addAssets = reqHandler<any>(async (req, res) => {
  return await prisma.assetbuildercategories.create({ data: req.body });
}, addAssetRule);

export const UpdateAssets = reqHandler<AssPayload>(async (req, res) => {
  //@ts-ignore
  let id = req.body.id;
  //@ts-ignore
  delete req.body.id;
  return await prisma.assetbuildercategories.update({
    where: {
      id: id,
    },
    data: req.body,
  });
}, addAssetRule);
