const fs = require("fs");

const {Advertisement} = require("../models");
const {ApiError} = require("../errors");
const path = require("path");

class AdvertisementService {
    async findAll() {
        return await Advertisement.find()
    }

    async create(data, file) {
        try {
            const createdAdvertisement = await Advertisement.create(data)

            if (!file) {
                return createdAdvertisement
            }

            const directoryPath = path.join(__dirname, `../../images/advertisementImages/${createdAdvertisement._id}`)
            fs.mkdirSync(directoryPath, {recursive: true})

            const newFilePath = path.join(directoryPath, file.filename)
            fs.renameSync(file.path, newFilePath)
            const imgPath = `${createdAdvertisement._id}/${file.filename}`

            return await Advertisement.findOneAndUpdate({_id: createdAdvertisement._id}, {image: imgPath}, {returnDocument: "after"})
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    async findById(id) {
        return await Advertisement.findById(id)
    }

    async updateById(id, data) {
        return await Advertisement.findOneAndUpdate({_id: id}, {...data}, {returnDocument: "after"})
    }

    async deleteById(id) {
        try {
            const imgPath = path.join(__dirname, `../../images/advertisementImages/${id}`)
            fs.rmSync(imgPath, {recursive: true, force: true})

            await Advertisement.deleteOne({_id: id})
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    async addImageToAdvertisement(id, file) {
        try {
            if (!file) {
                throw new ApiError("No images provided", 400)
            }

            const directoryPath = path.join(__dirname, `../../images/advertisementImages/${id}`)
            fs.mkdirSync(directoryPath, {recursive: true})

            const newFilePath = path.join(directoryPath, file.filename)
            fs.renameSync(file.path, newFilePath)
            const imgPath = `${id}/${file.filename}`

            return await Advertisement.findOneAndUpdate({_id: id}, {image: imgPath}, {returnDocument: "after"});
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }

    async deleteImageFromAdvertisement(id) {
        try {
            const imgPath = path.join(__dirname, `../../images/advertisementImages/${id}`)
            fs.rmSync(imgPath, {recursive: true, force: true})

            return await Advertisement.findOneAndUpdate({_id: id}, {image: ""}, {returnDocument: "after"});
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }
}

module.exports = new AdvertisementService()