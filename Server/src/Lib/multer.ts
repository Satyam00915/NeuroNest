import multer from "multer";
import DatauriParser from "datauri/parser";
import path from "path";
import { Request } from "express";
import { AuthenticatedRequest } from "../Middleware/auth.middleware";

const storage = multer.memoryStorage();

//.single("file") tells multer that the file from frontend we recive will come as file: file so that backend can get it as req.file
const multerUploads = multer({ storage }).single("file");

const parser = new DatauriParser();

const dataUri = (req: AuthenticatedRequest) => {
  const file = req.file;
  if (!file) throw new Error("No file found in request");
  const ext = path.extname(file.originalname).toString();
  return parser.format(ext, file.buffer);
};

export { multerUploads, dataUri };
