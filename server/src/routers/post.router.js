const {Router} = require("express");

const {postController} = require("../controllers");
const {commonMiddleware, postMiddleware, authMiddleware, userMiddleware} = require("../middlewares");
const {PostValidator} = require("../validators");

const router = Router();

router.get("/", postController.findAll)
router.post(
    "/",
    authMiddleware.checkActionToken,
    userMiddleware.checkUserRights(),
    commonMiddleware.isBodyValid(PostValidator.create),
    postController.create
)
router.get(
    "/:postId",
    commonMiddleware.isIdValid("postId"),
    postMiddleware.isPostExist("postId"),
    postController.findById
)

module.exports = router