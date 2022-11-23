import { Auth } from "../../backend/Controllers/AuthController";
import { HomePage } from "../../backend/Controllers/HomeController";
import {
  Users,
  ActiveInactive,
} from "../../backend/Controllers/UserController";
import {
  addAssets,
  AssetsList,
  GetAssets,
  UpdateAssets,
} from "../../backend/Controllers/AssetController";

import {
  AvatarCategory,
  GetAvatarCategory,
  uploadImage,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../../backend/Controllers/AvatarCategory";

import cors from "cors";
import { authMiddleware } from "../../backend/Middleware/authMiddleware";
import Multer from "multer";
import {
  addFaqs,
  getFaqs,
  deleteFaqs,
  CmsController,
  updateFaqs,
  getFaqsById,
  getPage,
} from "../Controllers/CmsController";
const memoryStorage = Multer.memoryStorage();
const upload = Multer({ storage: memoryStorage });

export const CustomRoutes = (http, express) => {
  const corsOptions = {
    origin: [
      "http://localhost:5173",
      "http://dominosstaging.cubestagearea.xyz:4000",
      "http://dominosstaging.cubestagearea.xyz:5173",
    ],
  };
  http.use(cors());
  http.use(express.static("dist"));
  http.use(express.urlencoded({ extended: true }));
  http.use(express.json());
  http.get("/test", HomePage);
  http.post("/api/login", Auth);
  http.get("/api/getUsers", authMiddleware, Users);
  http.get("/api/getAvatar", authMiddleware, AvatarCategory);
  http.get("/api/getCategory", authMiddleware, GetAvatarCategory);
  http.post("/api/cms", authMiddleware, CmsController);
  http.post("/api/addFaqs", authMiddleware, addFaqs);
  http.get("/api/getFaqs", authMiddleware, getFaqs);
  http.post("/api/updateFaqs", authMiddleware, updateFaqs);
  http.delete("/api/deleteFaqs/:id", authMiddleware, deleteFaqs);
  http.get("/api/getFaqsById/:id", authMiddleware, getFaqsById);
  http.get("/api/getPage/:slug", authMiddleware, getPage);
  http.post("/api/activeInactive", authMiddleware, ActiveInactive);
  http.post("/api/uploadImage", upload.single("file"), uploadImage);
  http.post("/api/addCategory", authMiddleware, addCategory);
  http.post("/api/updateCategory", authMiddleware, updateCategory);
  http.delete("/api/deleteCategory/:id", authMiddleware, deleteCategory);
  http.get("/api/AssetsList", authMiddleware, AssetsList);
  http.post("/api/addAssets", authMiddleware, addAssets);
  http.get("/api/getAssets", authMiddleware, GetAssets);
  http.post("/api/updateAssets", authMiddleware, UpdateAssets);
  http.listen(4000);
};
