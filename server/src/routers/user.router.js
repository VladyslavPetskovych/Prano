const {Router} = require("express");

const {userController} = require("../controllers");
const {commonMiddleware, userMiddleware, authMiddleware} = require("../middlewares");
const {UserValidator} = require("../validators");

const router = Router();

router.get(
    "/",
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserRights(),
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
    userController.deleteById
)
router.post(
    "/ban/:userId",
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserRights(),
    commonMiddleware.isIdValid("userId"),
    userMiddleware.isUserExistByReqParams("userId"),
    userController.banById
)
router.post(
    "/set-admin/:userId",
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserRights(),
    userController.setAdmin
)
router.get(
    "/cc/:customerId",
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserRights(),
    userController.findCcDataById
)

module.exports = router