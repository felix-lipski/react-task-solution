export const insertCommaInPrice = (str) => str.slice(0,-2) + "," + str.slice(-2)

export const sumPrices = (idArr, books) => idArr.map(id => books.find((item) => item.id === id).price).reduce((a, b) => a + b, 0)

export const idArrToList = (idArr, books) => {
    return [...new Set(idArr)].map((id) => {
        const book     = books.find(x => x.id === id);
        const quantity = idArr.filter(x => x === id).length
        return {...book, quantity}
    }).sort((a,b) => a.id - b.id)
}

export const currencyToSymbol = {
    "PLN": "zł"
}