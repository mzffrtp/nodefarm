const fs = require("fs");
const http = require("http")

const data = fs.readFileSync(`${__dirname}/dev_data/data.json`, "utf-8")
let tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8")
let tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8")
let tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8")



const dataObj = JSON.parse(data)
const server = http.createServer((req, res) => {
    if (req.url === "/" || req.url === "/overview") {
        res.writeHead(200, {
            "Context-Type": "text/html"
        })
        const cardHtml = dataObj.map(() => tempCard).join("")
        const cardOutput = tempOverview.replace("{%PRODUCT_CARDS%}", cardHtml)
        res.end(cardOutput)

    } else if (req.url === "/product") {
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        res.end("You are at the products page now! ")
    }
    else if (req.url === "/api") {
        res.writeHead(200, {
            "Content-type": "application/json"
        })
        res.end(data)
    } else {
        res.writeHead(404, {
            "Content-Type": "text/html",
            "Date": Date.now()
        })
        res.end("apide degilsin")
    }
})

server.listen(5500, "127.0.01", () => {
    console.log("listening at port 5500...");
})
