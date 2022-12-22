import express from 'express'
import ProductManager from './ProductManager.js'

const app = express()

app.use(express.urlencoded({extended:true}))

app.get('/', (req,res) => {
    res.send('Te damos la Bienvenida al E-Commerce de Gafas')
})

app.get('/products',  (req,res) => {
    let limit = parseInt(req.query.limit)
    try {
        if (limit === 0 || !limit) {
        res.json(ProductManager.getProducts())
    } else {
        const arrayOriginal = ProductManager.getProducts()
        let arrayConLimite = arrayOriginal.slice(0,limit) 
        res.json(arrayConLimite)
    }
    } catch (error) {
        console.log("Se producjo un error:", error)
        res.send("Se producjo un error")
    }  
})

app.get('/products/:pid',  async (req,res) => {
    let pid =   parseInt(req.params.pid); 
    let response =  await ProductManager.getElementById(pid)
    console.log(response)
    res.json(response || {"Error" : "Producto no se encontro"})
})

app.get('*', (req,res) => {
    res.send("La pagina buscada no existe")
})

app.listen(8080, () => {
    console.log("Listening on port 8080")
})