const {Router} = require("express");

const {campaignController} = require("../controllers");
const {authMiddleware, userMiddleware, commonMiddleware, campaignMiddleware} = require("../middlewares");
const {CampaignValidator} = require("../validators");

const router = Router()

// Публічна частина: сторінка кампанії та облік переходів
router.get(
    "/page/:slug",
    campaignMiddleware.isActiveCampaignExistBySlug("slug"),
    campaignController.getPage
)
router.post(
    "/page/:slug/visit",
    campaignMiddleware.isActiveCampaignExistBySlug("slug"),
    commonMiddleware.isBodyValid(CampaignValidator.visit),
    campaignController.recordVisit
)

router.get(
    "/",
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserRights(),
    campaignController.findAll
)
router.post(
    "/",
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserRights(),
    commonMiddleware.isBodyValid(CampaignValidator.create),
    campaignController.create
)
router.patch(
    "/:campaignId",
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserRights(),
    commonMiddleware.isIdValid("campaignId"),
    campaignMiddleware.isCampaignExist("campaignId"),
    commonMiddleware.isBodyValid(CampaignValidator.update),
    campaignController.updateById
)
router.delete(
    "/:campaignId",
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserRights(),
    commonMiddleware.isIdValid("campaignId"),
    campaignMiddleware.isCampaignExist("campaignId"),
    campaignController.deleteById
)
router.get(
    "/:campaignId/stats",
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserRights(),
    commonMiddleware.isIdValid("campaignId"),
    campaignMiddleware.isCampaignExist("campaignId"),
    campaignController.getStats
)

module.exports = router
