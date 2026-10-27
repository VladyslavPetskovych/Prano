const {campaignService} = require("../services");

class CampaignController {
    async findAll(req, res, next) {
        try {
            const data = await campaignService.findAll();

            return res.json(data)
        } catch (e) {
            next(e)
        }
    }

    async create(req, res, next) {
        try {
            const createdCampaign = await campaignService.create(req.body);

            return res.status(201).json(createdCampaign)
        } catch (e) {
            next(e)
        }
    }

    async updateById(req, res, next) {
        try {
            const {campaignId} = req.params;
            const updatedCampaign = await campaignService.updateById(campaignId, req.body);

            return res.json(updatedCampaign)
        } catch (e) {
            next(e)
        }
    }

    async deleteById(req, res, next) {
        try {
            const {campaignId} = req.params;
            await campaignService.deleteById(campaignId)

            return res.sendStatus(200)
        } catch (e) {
            next(e)
        }
    }

    async getStats(req, res, next) {
        try {
            const {campaignId} = req.params;
            const days = Math.min(Math.max(parseInt(req.query.days, 10) || 30, 1), 365);
            const stats = await campaignService.getStats(campaignId, days);

            return res.json(stats)
        } catch (e) {
            next(e)
        }
    }

    async findLeads(req, res, next) {
        try {
            const {campaignId} = req.params;
            const leads = await campaignService.findLeads(campaignId);

            return res.json(leads)
        } catch (e) {
            next(e)
        }
    }

    async sendCode(req, res, next) {
        try {
            const ipKey = req.get("X-Real-IP") || req.ip;
            const data = await campaignService.sendCode(res.locals.campaign, req.body, ipKey);

            return res.json(data)
        } catch (e) {
            next(e)
        }
    }

    async verifyCode(req, res, next) {
        try {
            const data = await campaignService.verifyCode(res.locals.campaign, req.body);

            return res.json(data)
        } catch (e) {
            next(e)
        }
    }

    async getPage(req, res, next) {
        try {
            return res.json(campaignService.toPublic(res.locals.campaign))
        } catch (e) {
            next(e)
        }
    }

    async recordVisit(req, res, next) {
        try {
            const fallbackKey = `${req.get("X-Real-IP") || req.ip}|${req.get("User-Agent") || ""}`;
            await campaignService.recordVisit(res.locals.campaign, req.body, fallbackKey);

            return res.sendStatus(204)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new CampaignController()
