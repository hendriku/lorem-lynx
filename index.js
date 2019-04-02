const express = require("express") 
const fs = require('fs')
const sharp = require('sharp')

const app = express()

app.get("/image", (req, res) => {
    try {
        const {
            width,
            height,
            type
        } = req.query

        let width_value, height_value
        if (width) width_value = parseInt(width)
        if (width) height_value = parseInt(height)

        res.contentType(`image/${type || "jpeg"}`)

        scale(getPathToLynx(), type, width_value, height_value).pipe(res)
    } catch (err) {
        console.error(err)
    }
})

app.listen(1231, () => {
    console.log("Server listening...");
})

function getPathToLynx() {
    const randomNumber = Math.floor(Math.random() * 20 + 1)
    return __dirname + `/img/${randomNumber}.jpg`
}

function scale(filePath, type, width, height) {
    let sharper = sharp()
    
    if (type) sharper = sharper.toFormat(type)
    if (width || height) sharper = sharper.resize(width, height)

    return fs.createReadStream(filePath).pipe(sharper)
}