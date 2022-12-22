import fs from 'fs'

class ProductManager {
    constructor(path) {
    this.path = path
    fs.existsSync(this.path) ? this.products = JSON.parse(fs.readFileSync(this.path, 'utf-8')) : this.products = [];
    }

    async addProduct (title, description, price, thumbnail, code, stock) {
        let producto = {
            'title': title,
            'description': description,
            'price': price,
            'thumbnail': thumbnail,
            'code': code,
            'stock': stock,
    }

    this.products.length === 0 ? producto["id"] = 1 : producto["id"] = this.products[this.products.length - 1]["id"] + 1
    let encontrado = this.products.some(elemento => elemento.code === code)

    if (encontrado) console.warn('Error: El Producto Ya Existe \n')
    else {
        this.products.push(producto)
        await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'))
    }
}

    getProducts = () => {
        return this.products
    }

    getElementById = (id) => {
        let producto = this.products.find(el => el.id === id)
        return producto 
    }

    async updateProduct(id, campo, valorNuevo) {

    let index = this.products.findIndex(element => element.id === id)
    let campoValido = Object.keys(this.products[index]).some(el => el === campo)
    if (campo === 'id') {
        console.error('Error: El ID No Se Puede Modificar \n')
    } else if (!campoValido) {
        console.error('Error: Seleccione Un Campo Valido\n')
    } else {
        this.products[index][campo] = valorNuevo;
        await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'))
    }
}

    async deleteProduct(id) {
        let encontrado = this.products.some(el => el.id === id)
        if (encontrado) {
        this.products = this.products.filter(el => el.id !== id)
        await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'))
        console.log('El Producto se Elimino \n')
    } else {
        console.error('El Producto no se encontro')
    }
}
}

// Pruebas de uso

const manager = new ProductManager('./Produts.json')
// manager.addProduct('5',Gafas Acetato Gris', 'Gafas', 500000, 'no image', 'CC5')
// manager.addProduct('6','Gafas Metalicas Rojas', 'Gafas', 250000, 'no image', 'CC7')
// manager.addProduct('7','Gafas Titanio Gris', 'Fruta', 155000, 'no image', 'AC20')
// manager.addProduct('8','Gafas de Sol Cafe', 'Gafas de Sol', 350000, 'no image', 'AA1')

export default new ProductManager('./Products.json')