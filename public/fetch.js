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
        // insert cells for current row
        let cell1 = row.insertCell(0)
        let cell2 = row.insertCell(1)
        let cell3 = row.insertCell(2)
        let cell4 = row.insertCell(3)
        let cell5 = row.insertCell(4)
        // populate cells with data from api
        cell1.innerText = store.name
        cell2.innerText = store.price
        cell3.innerText = store.address
        cell4.innerText = store.location
        cell5.innerText = store.time
    }
})