const {Category, PriceHistory} = require("../models");
const {ApiError} = require("../errors");

const TRACKED_FIELDS = ["title", "price", "secondPrice", "discountPercent", "quantity"];

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const isSame = (a, b) => String(a ?? "") === String(b ?? "");

class PriceHistoryService {
    // Не кидає помилок: збій журналу не має скасовувати зміну ціни, яка вже збережена
    async record({action, before, after, meta = {}}) {
        try {
            const item = after || before;
            // Назва при додаванні/видаленні й так є в записі — у змінах вона лише дублюється
            const fields = action === "update" ? TRACKED_FIELDS : TRACKED_FIELDS.filter((field) => field !== "title");
            const changes = fields
                .filter((field) => !isSame(before?.[field], after?.[field]))
                .map((field) => ({field, from: before?.[field] ?? null, to: after?.[field] ?? null}));

            if (action === "update" && changes.length === 0) {
                return
            }

            const category = await Category.findById(item.categoryId).select("title");

            await PriceHistory.create({
                _merchandiseId: item._id,
                categoryId: item.categoryId,
                category: category?.title || "",
                title: item.title,
                action,
                changes,
                source: meta.source || "admin",
                _userId: meta.userId || null,
            })
        } catch (e) {
            console.error("Price history record failed:", e.message)
        }
    }

    async findAll({merchandiseId, search, page = 1, limit = 50}) {
        try {
            const filter = {};
            if (merchandiseId) filter._merchandiseId = merchandiseId;
            if (search) {
                const regex = new RegExp(escapeRegex(search.trim()), "i");
                filter.$or = [{title: regex}, {category: regex}];
            }

            const pageNumber = Math.max(parseInt(page, 10) || 1, 1);
            const pageSize = Math.min(Math.max(parseInt(limit, 10) || 50, 1), 200);

            const [data, total] = await Promise.all([
                PriceHistory.find(filter)
                    .sort({createdAt: -1})
                    .skip((pageNumber - 1) * pageSize)
                    .limit(pageSize)
                    .populate("_userId", "name phone"),
                PriceHistory.countDocuments(filter),
            ]);

            return {data, total, page: pageNumber, limit: pageSize}
        } catch (e) {
            throw new ApiError(e.message, e.status)
        }
    }
}

module.exports = new PriceHistoryService()
