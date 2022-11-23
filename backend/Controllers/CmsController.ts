import { cms, faq } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { reqHandler } from "../lib/requestHandler";

export const CmsController = reqHandler<cms>(async (req, res) => {
  return prisma.cms.upsert({
    where: {
      slug: req.body.slug,
    },
    create: req.body,
    update: req.body,
  });
});

export const getPage = reqHandler<cms>(async (req, res) => {
  return prisma.cms.findUnique({
    where: {
      slug: req.params.slug,
    },
  });
});

export const addFaqs = reqHandler<faq>(async (req, res) => {
  return prisma.faq.create({ data: req.body });
});

export const getFaqs = reqHandler<faq>(async (req) => {
  return prisma.faq.findMany({});
});

export const getFaqsById = reqHandler<faq>(async (req) => {
  return prisma.faq.findFirst({
    where: {
      id: req.query.id as string,
    },
  });
});

export const deleteFaqs = reqHandler<faq>(async (req) => {
  let id = req.params.id as string;
  return prisma.faq.delete({
    where: {
      id: id,
    },
  });
});

export const updateFaqs = reqHandler<any>(async (req, res) => {
  let id = req.body.id;
  delete req.body.id;
  return await prisma.faq.update({
    where: {
      id: id,
    },
    data: req.body,
  });
});
