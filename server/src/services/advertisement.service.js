const fs = require("fs");

const {Advertisement} = require("../models");
const {ApiError} = require("../errors");
const path = require("path");
const axios = require("axios");

class AdvertisementService {
    async findAll() {
        return await Advertisement.find()
    }

    async create(data, file) {
        try {
            const oldAdvertisement = await Advertisement.findOne({});

            const createdAdvertisement = await Advertisement.findOneAndReplace({}, data, { upsert: true, returnNewDocument: true });

            if (!file) {
                return createdAdvertisement
            }

            if (oldAdvertisement && oldAdvertisement.image) {
                const oldFilePath = path.join(__dirname, `../../images/advertisementImages/${oldAdvertisement.image}`);
                if (fs.existsSync(oldFilePath)) {
                    fs.unlinkSync(oldFilePath);
                }
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

            const advertisement = await Advertisement.findById(id);
            if (advertisement.image && advertisement.image.length !== 0) {
                const imgPath = path.join(__dirname, `../../images/advertisementImages/${advertisement.image}`)
                fs.unlinkSync(imgPath)
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

    async sendMessage(id) {
        try {
            const advertisementToSend = await Advertisement.findById(id);

            await axios.post("http://tgbot:3333/send", advertisementToSend)
        } catch (e) {
            throw new ApiError(e.data.message, e.status)
        }
    }
}

module.exports = new AdvertisementService()