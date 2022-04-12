// fetch api data and map to a dynamic table

fetch('/api').then(response => response.json()).then(data => {
    console.log(data)

    // html element constants
    const averagePriceHeader = document.getElementById('averagePrice')
    const priceTable = document.getElementById('dataTable')

    // display average price of gas stations from api
    averagePriceHeader.innerText = `average price: ${data.average}`

    // dynamicly store api data in table
    for (var i = 0; i < data.stores.length; i++) {
        let store = data.stores[i] // get single store
        let row = priceTable.insertRow(-1) // insert row at bottom of table
        let cell1 = row.insertCell(0) // insert first cell
        let cell2 = row.insertCell(1) // insert second cell
        cell1.innerText = store.name // set cell 1 to gas station name from api
        cell2.innerText = store.price // set cell 2 to gas station price from api
    }
})