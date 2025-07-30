import './App.css'
import { useState, useEffect } from 'react'

function App() {
  const [product, setProduct] = useState([])

  const url = "http://localhost:3000/products"

  // 1 - resgatando dados
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(url)
      const data = await res.json()

      setProduct(data)
    }
    fetchData()

  }, [])

  return (
    <div className='App'>
      <h1>Lista de Produtos</h1>
      <ul>
        {product.map((product) => (
          <li key={product.id}>
            {product.name} - R$: {product.price}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
