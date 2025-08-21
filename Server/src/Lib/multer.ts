import multer, { FileFilterCallback } from "multer";
import DatauriParser from "datauri/parser";
import path from "path";
import { AuthenticatedRequest } from "../Middleware/auth.middleware";
 
const audioFilter = (
  req: AuthenticatedRequest,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void => {
  const allowedMimeTypes = [
    "audio/mpeg",
    "audio/wav",
    "audio/x-wav",
    "audio/ogg",
    "audio/x-m4a",
    "audio/aac",
  ];


  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
 
const maxFileSize = 3 * 1024 * 1024;
 
const storage = multer.memoryStorage();
 
//.single("file") tells multer that the file from frontend we recive will come as file: file so that backend can get it as req.file
const uploadImage = multer({ storage });
const uploadAudio = multer({
  storage,
  limits: {
    fileSize: maxFileSize,
  },
  fileFilter: audioFilter,
});
 
const parser = new DatauriParser();
 
const dataUri = (req: AuthenticatedRequest) => {
  const file = req.file;
  if (!file) throw new Error("No file found in request");
  const ext = path.extname(file.originalname).toString();
  return parser.format(ext, file.buffer);
};
 
export { uploadAudio, uploadImage, dataUri };
 
 
 