import './App.css'
import { useState, useEffect } from 'react'

// 4 - custom hook
import { useFetch } from "./hooks/useFetch"

const url = "http://localhost:3000/products"

function App() {
  const [product, setProduct] = useState([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')

  // 4 - custom hook
  const { data: items, httpConfig } = useFetch(url)

  // 1 - resgatando dados
  // useEffect(() => {
  //     const fetchData = async() => {
  //     const res = await fetch(url)
  //     const data = await res.json()

  //     setProduct(data)
  //   }
  //   fetchData()

  // }, [])

  // 2 - adicionando produtos
  const handleSubmit = async (e) => {
    e.preventDefault()

    const product = {
      name,
      price
    }

    // const res = await fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(product),
    // })

    // // 3 - carregamento dinâmico
    // const addedProduct = await res.json()

    // setProduct((prevProduct) => [...prevProduct, addedProduct])

    // 5 - refatorando o POST
    httpConfig(product, 'POST')
    setName('')
    setPrice('')
  }

  return (
    <div className='App'>
      <h1>Lista de Produtos</h1>
      <ul>
        {items && items.map((product) => (
          <li key={product.id}>
            {product.name} - R$: {product.price}
          </li>
        ))}
      </ul>
      <div className='add-product'>
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input type="text"
                    value={name}
                    name='name'
                    onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Preço:
            <input type="number"
                    value={price}
                    name='price'
                    onChange={(e) => setPrice(e.target.value)} />
          </label>
          <input type="submit" value='Criar' />
        </form>
      </div>
    </div>
  )
}

export default App
