const express = require("express");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(express.json());

app.post(
    "/send",
    (req, res) => {
        try {
            const {title, description, image} = req.body;

            // send some message method...
            console.log(`${title} - ${description}`)

            return res.sendStatus(200)
        } catch (e) {
            return res.json({message: e.message, status: e.status})
        }
    }
)

const PORT = 3333;
app.listen(PORT, () => {
    console.log(`🚀 Сервер зі сторони телеграм боту ${PORT}`);
});


