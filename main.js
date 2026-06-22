import express from "express";

const app = express()
const PORT = 6565;

app.get('',(req,res) => {
    res.json({msg:'Hello Karthick'})
})

app.listen(PORT, () => {
    console.log(`The app is running at http://localhost:${PORT}`)
})