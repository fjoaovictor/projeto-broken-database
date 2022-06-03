


const fs = require('fs')
const filePath = './broken-database.json'

// Funções para ler e gravar arquivos  / Refenrencia (https://www.youtube.com/watch?v=TZRMh4BZTS0)
function save(data) {
    const dataString = JSON.stringify(data, null, 2)
    return fs.writeFileSync('./saida.json', dataString)
}

function load() {
    const dataBuffer = fs.readFileSync(filePath, 'utf-8')
    const dataJson = JSON.parse(dataBuffer)
    return dataJson
}
// Variavel para função load 
const data = load()

// Função para adicionar a quantidade e converter preço para float / Referencia (https://pt.stackoverflow.com/questions/292665/json-inserir-um-elemento-em-um-determinado-index-ou-key)
addQuantity()
function addQuantity() {

    for (let i = 0; i < data.length; i++) {

        if (!data[i].quantity) {
            const addQuantity = {
                "id": data[i].id,
                "name": data[i].name,
                "quantity": 0,
                "price": data[i].price,
                "category": data[i].category
            }

            const add = data.splice(i, 1, addQuantity)
            save(data)
        }
    }
}

// Função converter preço em float / Referencia (https://pt.stackoverflow.com/questions/292665/json-inserir-um-elemento-em-um-determinado-index-ou-key)
convertPrice()
function convertPrice() {

    for (let i = 0; i < data.length; i++) {
        const convertFloat = {
            "id": data[i].id,
            "name": data[i].name,
            "quantity": data[i].quantity,
            "price": parseFloat(data[i].price),
            "category": data[i].category
        }

        const add = data.splice(i, 1, convertFloat)
        save(data)
    }
}


// Função para corrigir as letras do database / Referencia (https://stackoverflow.com/questions/15604140/replace-multiple-strings-with-multiple-other-strings)

letters()
function letters() {

    const data = load()

    const strObj = {
        ø: "o",
        æ: "a",
        ß: "b",
        "¢": "c"
    }

    const str = JSON.parse(JSON.stringify(data).replace(/ø|æ|ß|¢/gi, function (matched) {
        return strObj[matched]
    }))

    save(str)
}



// Funções de validação / referencia (https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

// Função para ordenar pela categoria em ordem alfabetica
orderbyCategory()
function orderbyCategory() {

    data.sort(function (a, b) {
        if (a.category > b.category) {
            return 1
        }
        if (a.category < b.category) {
            return -1
        }
        return 0
    });
     
    console.log("////////////////////////////////////////////////////////////// \n\n")
    console.log("Ordernado por categoria em ordem alfatica \n\n", data)
}



// Função para ordenar pelo ID 
orderbyId()
function orderbyId() {
    data.sort(function (a, b) {
        return a.id - b.id
    })
    console.log("////////////////////////////////////////////////////////////// \n\n")
    console.log(" Ordernado por ID \n\n", data, "\n \n")
}


// Funções para calcular o estoque de acordo com a categoria / referencia (https://raullesteves.medium.com/javascript-entendendo-o-reduce-de-uma-vez-por-todas-c4cbaa16e380)

function calculateStok(p){
    const sum = data.filter((database) => database.category === p)
    .map((category) => category.quantity)
    .reduce((total, category) => total += category)
}

console.log("Existem",calculateStok('Panelas'), "Panelas no estoque \n\n")
console.log("Existem",calculateStok('Eletrodomésticos'), "Eletrodomésticos no estoque \n\n")
console.log("Existem",calculateStok('Eletrônicos'), "Eletrônicos no estoque \n\n")
console.log("Existem",calculateStok('Acessórios'), "PaneAcessórioslas no estoque \n\n")






