const {Router, raw} = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs")

const {postController} = require("../controllers");
const {commonMiddleware, postMiddleware, authMiddleware, userMiddleware} = require("../middlewares");
const {PostValidator} = require("../validators");
const {ApiError} = require("../errors");

const router = Router();

const upload = multer({
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
            return cb(new ApiError("File is not allowed", 400))
        }

        cb(null, true)
    }
});

router.get("/", postController.findAll)
router.post(
    "/",
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserRights(),
    upload.array("images"),
    commonMiddleware.isBodyValid(PostValidator.create),
    postController.create
)
router.get(
    "/:postId",
    commonMiddleware.isIdValid("postId"),
    postMiddleware.isPostExist("postId"),
    postController.findById
)
router.patch(
    "/:postId",
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserRights(),
    commonMiddleware.isIdValid("postId"),
    postMiddleware.isPostExist("postId"),
    commonMiddleware.isBodyValid(PostValidator.update),
    postController.updateById
)
router.delete(
    "/:postId",
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserRights(),
    commonMiddleware.isIdValid("postId"),
    postMiddleware.isPostExist("postId"),
    postController.deleteById
)
router.post(
    "/:postId/images",
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserRights(),
    commonMiddleware.isIdValid("postId"),
    postMiddleware.isPostExist("postId"),
    upload.array("images"),
    postController.addImages
)
router.delete(
    "/:postId/images",
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserRights(),
    commonMiddleware.isIdValid("postId"),
    postMiddleware.isPostExist("postId"),
    commonMiddleware.isBodyValid(PostValidator.deleteImage),
    postController.deleteImage
)

module.exports = router