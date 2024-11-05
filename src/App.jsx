
import { useState } from "react"

const PRODUCTS = [
    { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
    { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
    { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
    { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
    { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
    { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
]

function App() {
    const [filterProductsWithoutStock, setFilterProductsWithoutStock] = useState(false)
    const [productSearched, setProductSearched] = useState('')

    return <div style={{ width: '30vw', backgroundColor: '#E0E0E0', justifySelf: 'center' }}>
        <SearchBar
            checked={filterProductsWithoutStock} onCheck={setFilterProductsWithoutStock}
            productSearched={productSearched} onProductSearched={setProductSearched} />
        <ProductTable
            checked={filterProductsWithoutStock}
            productSearched={productSearched} />
    </div>
}

///////////////////////////
/////// SearchBar ////////
/////////////////////////
function SearchBar({ checked, onCheck, productSearched, onProductSearched }) {
    return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <SearchInput productSearched={productSearched} onProductSearched={onProductSearched} />
        <StockFilterCheckBox checked={checked} onCheck={onCheck} />
    </div>
}

function StockFilterCheckBox({ checked, onCheck }) {
    return <div style={{ display: 'flex', flexDirection: 'row', margin: '1vw' }}>
        <input type="checkbox" checked={checked} onChange={(e) => onCheck(e.target.checked)} />
        <p>N'afficher que les produits en stock</p>
    </div>
}

function SearchInput({ productSearched, onProductSearched }) {
    return <input type="text" placeholder="Recherche"
        value={productSearched} onChange={(e) => onProductSearched(e.target.value)}
        style={{width: '20vw', margin: '1vw'}} />
}


//////////////////////////////
/////// ProductTable ////////
////////////////////////////
function ProductTable({ checked, productSearched }) {
    const uniqueProductsTypeKeys = [...new Set(PRODUCTS.map(product => product.category))]

    return <div>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', textAlign: 'center'}}>
            <h4 style={{ width: '15vw', justifySelf: 'center', margin: 0 }}>Nom</h4>
            <h4 style={{ width: '15vw', justifySelf: 'center', margin: 0 }}>Prix</h4>
        </div>
        <ul style={{ padding: 0, margin: 0 }}>
            {uniqueProductsTypeKeys.map(key =>
                <ProductCategoryRow key={key} checked={checked} title={key} productSearched={productSearched} />
            )}
        </ul>
    </div>
}

function ProductCategoryRow({ checked, productSearched, title }) {
    const productsToDisplay = PRODUCTS.filter((product) => product.category === title)

    return <div>
        <hr />
        <h5 style={{justifySelf: 'center', margin: 0}}>{title}</h5>
        <hr />
        <ul style={{ padding: 0 }}>
            {productsToDisplay.map(product =>
                <ProductRow checked={checked} key={product.name} product={product} productSearched={productSearched} />
            )}
        </ul>
    </div>
}

function ProductRow({ checked, product, productSearched }) {
    const notInStockStyle = { width: '15vw', color: 'red' }
    const inStockStyle = { width: '15vw', color: 'black' }

    if (!product || (checked && !product.stocked) || (productSearched && !product.name.toLowerCase().startsWith(productSearched))) return null
    return <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'center' }}>
        <p style={product.stocked ? inStockStyle : notInStockStyle}>{product.name}</p>
        <p style={product.stocked ? inStockStyle : notInStockStyle}>{product.price}</p>
    </div>
}


export default App