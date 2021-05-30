const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/resources/static/assets/uploads/img/profil");
  },
  filename: (req, file, cb) => {
   /*  console.log("__basedir");
    console.log(__basedir);
    console.log("file");
    console.log(file); */
    const id = req.params.id;
    const chars = file.originalname.split('.');
    cb(null, "img"+id+"."+chars[1]);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
