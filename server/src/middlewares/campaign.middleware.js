const {Campaign} = require("../models");
const {ApiError} = require("../errors");

class CampaignMiddleware {
    isCampaignExist(idField) {
        return async (req, res, next) => {
            try {
                const campaign = await Campaign.findById(req.params[idField]);
                if (!campaign) {
                    throw new ApiError("Campaign not found", 404)
                }

                next()
            } catch (e) {
                next(e)
            }
        }
    }

    isActiveCampaignExistBySlug(slugField) {
        return async (req, res, next) => {
            try {
                const campaign = await Campaign.findOne({slug: req.params[slugField], isActive: true});
                if (!campaign) {
                    throw new ApiError("Campaign not found", 404)
                }

                res.locals.campaign = campaign
                next()
            } catch (e) {
                next(e)
            }
        }
    }
}

module.exports = new CampaignMiddleware()
