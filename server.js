// declare variables
const express = require('express')
const app = express()
const puppeteer = require('puppeteer')
const port = 8081

// main web scrapper function
async function webScraper(url) {
    // boring puppeteer stuff
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url) // go to url (windsorite.ca/gas)
    
    let stores = [] // empty array of stores

    // interate through windsorite gas table and store in object with id, station name, and current price
    for(let i = 0; i < 10; i++) {
        const store = {}

        const name = await page.$eval(`#spnGB27562StationNm${i}`, element => element.textContent)
        const price = await page.$eval(`#spnGB27562Price${i}`, element => element.textContent)

        store.id = i+1
        store.name = name
        store.price = parseFloat(price)

        stores.push(store)
    }
    browser.close() // close puppeteer browser

    // average prices of the gas stations
    function averageData(stores) {
        let average = 0
        stores.forEach((store, idx) => {
            average += store.price
        })
        average /= 10
        return Math.round((average + Number.EPSILON) * 10) / 10 // return average rounded to 1 decimal point
    }

    // return stores array and average of the stores in array
    return [stores, averageData(stores)]
}
// main api endpoint
app.get('/', async (req,res) => {
    // run web scrapping function, store returned data (asynchronously)
    const results = await webScraper('https://windsorite.ca/gas')
    // serve data to user, json format
    res.json({
        "stores": results[0],
        "average": results[1]
    })
})

app.listen(port, () => console.log(`listening on port: ${port}`)) // listen on specified port