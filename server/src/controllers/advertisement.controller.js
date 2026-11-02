const {advertisementService} = require("../services");

class AdvertisementController {
    async findAll(req, res, next){
        try {
            const data = await advertisementService.findAll();

            return res.json(data)
        } catch (e) {
            next(e)
        }
    }
    
    async create(req, res, next) {
        try {
            const createdAdvertisement = await advertisementService.create(req.body, req.file);
            
            return res.json(createdAdvertisement)
        } catch (e) {
            next(e)
        }
    }

    async findById(req, res, next) {
        try {
            const {advertisementId} = req.params;
            const advertisement = await advertisementService.findById(advertisementId);

            return res.json(advertisement)
        } catch (e) {
            next(e)
        }
    }

    async updateById(req, res, next) {
        try {
            const {advertisementId} = req.params;
            const updatedAdvertisement = await advertisementService.updateById(advertisementId, req.body);

            return res.json(updatedAdvertisement)
        } catch (e) {
            next(e)
        }
    }

    async deleteById(req, res, next) {
        try {
            const {advertisementId} = req.params;
            await advertisementService.deleteById(advertisementId)

            return res.sendStatus(200)
        } catch (e) {
            next(e)
        }
    }

    async addImage(req, res, next) {
        try {
            const {advertisementId} = req.params;
            const updatedAdvertisement = await advertisementService.addImageToAdvertisement(advertisementId, req.file);

            return res.json(updatedAdvertisement)
        } catch (e) {
            next(e)
        }
    }

    async deleteImage(req, res, next) {
        try {
            const {advertisementId} = req.params;
            const updatedAdvertisement = await advertisementService.deleteImageFromAdvertisement(advertisementId);

            return res.json(updatedAdvertisement)
        } catch (e) {
            next(e)
        }
    }

    async sendMessage(req, res, next) {
        try {
            const {advertisementId} = req.params;
            const broadcast = await advertisementService.sendMessage(advertisementId, res.locals.tokenPayload?.id);

            return res.json(broadcast)
        } catch (e) {
            next(e)
        }
    }

    async recordView(req, res, next) {
        try {
            const {advertisementId} = req.params;
            await advertisementService.recordView(advertisementId, req.body, `${req.get("X-Real-IP") || req.ip}|${req.get("User-Agent") || ""}`);

            return res.sendStatus(204)
        } catch (e) {
            next(e)
        }
    }

    async getStats(req, res, next) {
        try {
            const stats = await advertisementService.getStats();

            return res.json(stats)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new AdvertisementController()