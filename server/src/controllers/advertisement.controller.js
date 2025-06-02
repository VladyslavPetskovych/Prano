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
            await advertisementService.sendMessage(advertisementId);

            return res.sendStatus(200)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new AdvertisementController()