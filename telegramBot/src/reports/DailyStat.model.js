const { Schema, model } = require("mongoose");

// Головні показники Agbis за один день (з щовечірнього звіту)
const branchSchema = new Schema(
  {
    name: { type: String, required: true },
    received: { type: Number, default: 0 },
    refunded: { type: Number, default: 0 },
    newOrders: { type: Number, default: 0 },
    newOrdersSum: { type: Number, default: 0 },
  },
  { _id: false }
);

const countSumSchema = new Schema(
  {
    count: { type: Number, default: 0 },
    sum: { type: Number, default: 0 },
  },
  { _id: false }
);

const dailyStatSchema = new Schema(
  {
    // "ДД.ММ.РРРР" і та сама дата як Date (UTC-північ) — для сортування й вибірок
    date: { type: String, required: true, unique: true },
    day: { type: Date, required: true, index: true },

    // З "Анализ изменений заказов" — є за всю історію
    received: { type: Number, default: 0 },
    refunded: { type: Number, default: 0 },
    newOrders: { type: Number, default: 0 },
    newOrdersSum: { type: Number, default: 0 },
    branches: { type: [branchSchema], default: [] },
    employees: {
      type: [new Schema({ name: String, newOrders: Number }, { _id: false })],
      default: [],
    },
    biggestOrder: {
      type: new Schema({ order: String, amount: Number, branch: String }, { _id: false }),
      default: null,
    },

    // З "Журнал изменений в заказах" — лише за дні, коли журнал був у звіті
    operations: {
      type: new Schema(
        {
          readyForPickup: { type: Number, default: 0 },
          issueDateChanges: { type: Number, default: 0 },
          reworkReturns: { type: Number, default: 0 },
          cancelledOrders: { type: Number, default: 0 },
          cancelledServices: { type: countSumSchema, default: () => ({}) },
          priceReductions: { type: countSumSchema, default: () => ({}) },
        },
        { _id: false }
      ),
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: "agbisDailyStats",
  }
);

module.exports = model("agbisDailyStat", dailyStatSchema);
