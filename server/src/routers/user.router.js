const {Router} = require("express");

const {userController} = require("../controllers");
const {commonMiddleware, userMiddleware, authMiddleware} = require("../middlewares");
const {UserValidator} = require("../validators");

const router = Router();

router.get(
    "/",
    // TODO В майбутньому треба буде розкоментувати
    // authMiddleware.checkAccessToken,
    // userMiddleware.checkUserRights(),
    userController.findAll
)
router.get(
    "/:userId",
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserRights("userId"),
    commonMiddleware.isIdValid("userId"),
    userMiddleware.isUserExistByReqParams("userId"),
    userController.findById
)
router.patch(
    "/:userId",
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserRights("userId"),
    commonMiddleware.isIdValid("userId"),
    userMiddleware.isUserExistByReqParams("userId"),
    commonMiddleware.isBodyValid(UserValidator.update),
    userController.updateById
)
router.delete(
    "/:userId",
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserRights(),
    commonMiddleware.isIdValid("userId"),
    userMiddleware.isUserExistByReqParams("userId"),
    userController.banById
)

router.post(
    "/set-admin/:userId",
    // TODO В майбутньому треба буде розкоментувати
    // authMiddleware.checkAccessToken,
    // userMiddleware.checkUserRights(),
    userController.setAdmin
)

module.exports = router