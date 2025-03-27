const multer = require("multer");
const path = require("path");
const fs = require("fs");

const {ApiError} = require("../errors");

class ImageMiddleware {
    upload = multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                const imgPath = path.join(__dirname, `../../temp/`);
                fs.mkdirSync(imgPath, {recursive: true})
                cb(null, imgPath)
            },
            filename: (req, file, cb) => {
                cb(null, Date.now() + "_" + file.originalname)
            }
        }),
        fileFilter: (req, file, cb) => {
            if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.mimetype)) {
                return cb(new ApiError(`Files type of ${file.mimetype} is not allowed`, 400))
            }

            cb(null, true)
        }
    });
}

module.exports = new ImageMiddleware()