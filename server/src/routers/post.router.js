const {Router} = require("express");

const {postController} = require("../controllers");
const {commonMiddleware, postMiddleware, authMiddleware, userMiddleware, imageMiddleware} = require("../middlewares");
const {PostValidator} = require("../validators");

const router = Router();

router.get("/", postController.findAll)
router.post(
    "/",
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserRights(),
    imageMiddleware.upload.array("images"),
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
    imageMiddleware.upload.array("images"),
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