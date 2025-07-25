const express = require("express")
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const {
    authRouter,
    userRouter,
    postRouter,
    productRouter,
    orderRouter,
    advertisementRouter,
    telegramRouter,
    merchandiseRouter,
    categoryRouter
} = require("./routers");
const {configs} = require("./configs");
const {cronRunner} = require("./crons");

const app = express();

// TODO В майбутньому можна прибрати, якшо не потрібно використовувати API ззовні
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/advertisementImages", express.static(path.join(__dirname, "../images/advertisementImages")))
app.use("/postImages", express.static(path.join(__dirname, "../images/postImages")))

app.use("/advertisement", advertisementRouter)
app.use("/auth", authRouter)
app.use("/categories", categoryRouter)
app.use("/merchandises", merchandiseRouter)
app.use("/orders", orderRouter)
app.use("/posts", postRouter)
app.use("/products", productRouter)
app.use("/telegram", telegramRouter)
app.use("/users", userRouter)
app.use((err, req, res, next) => {
    const status = err.status || 500;

    return res.status(status).json({
        message: err.message,
        status: status,
    });
});

const dbConnect = async () => {
    let dbCon = false;

    while (!dbCon) {
        console.log("Connecting to database")
        await mongoose
            .connect(configs.DB_URL)
            .then(() => {
                dbCon = true
                console.log("Successfully connected to database")
            })
            .catch(async (err) => {
                console.log(`Error connecting to database: ${err} \nWait 3 seconds`)
                await new Promise(resolve => setTimeout(resolve, 3000))
            })
    }
}

const PORT = 3000;

app.listen(PORT, async () => {
    await dbConnect()
    cronRunner()
    console.log(`Server has started on PORT ${PORT}`)
})
