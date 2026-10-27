import React , {useState } from "react"
import "./App.css"

// api url: "https://fakestoreapi.com/products"


function App(){

const [produto , setProduto] = useState('')
const [preco , setPreco] = useState('')
const [categoria , setCategoria] = useState('')
const [carregando , setCarregando] = useState(false)
const [erro , setErro] = useState(false)
const [erro2 , setErro2] = useState(false)
const [erro3 , setErro3] = useState(false)
const [resultado , setResultado] = useState(null)

function handleCadastro(e){

  // Prevenção de refres
  e.preventDefault()

  // Limpar mensagens anteriores

  setErro('')
  setErro2('')
  setErro3('')

  // Prevenção de toque duplo 

  if(carregando) return; 

  // prevenção de espaços em branco nos inputs 

  if(produto.trim() === '' || categoria.trim() === '' || preco.trim() === ''){
     
     setErro(true)
     return; 
  }

  // Prevenção de envios de espaços em branco !

    if(produto === '' || categoria === '' || preco === ''){

      setErro2(true)
      return;
    }

    // Campos obrigatórios 

    if(!produto || !categoria || !preco ){

      setErro3(true)
      return;
    }

    setCarregando(true)
    setResultado(null)

    let url = "https://fakestoreapi.com/products"

    fetch(url , {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json' //informa que o envio é em formato json
      },
      body: JSON.stringify({
        title: produto,
        price: Number(preco),
        description: "Produto Cadastrado via formulário React",
        image: "https://i.pravatar.cc",
        category: categoria
      })
    })
    .then((r)=> r.json())
    .then((json)=>{
      console.log("Resposta exata do servidor" ,json)
      setResultado(json)
      setCarregando(false)
    })
    .catch((error)=>{
      console.log("Erro ao carregar o Endpoint")
      setCarregando(false)
    })
    

}

  return(
    <div className="container">

      <header>
         <h1>Cadastrando novo Produto (POST)</h1>

         <div className="nav">
         <a>Home</a>
         <a>Favoritos</a>
         <a>Produtos</a>
         </div>

      </header>

      <div className="Card-form">
        <h1>Novo Produto</h1>
        {erro && <p>Preencha corretamente os campos!</p>}
        {erro2 && <p>Preencha todos os campos !</p>}
        {erro3 && <p>Prrencha todos os campos obrigatórios</p>}
        <form onSubmit = {handleCadastro}>
        <label>*Produto: </label>
        <input type="text" placeholder="Digite o novo produto" value = {produto} onChange = {(e)=> setProduto(e.target.value)}/>
        <label>*Categoria: </label>
        <input type="text" placeholder="Digite uma categoria" value = {categoria} onChange = {(e)=> setCategoria(e.target.value)}/>
        <label>*Preço: </label>
        <input type = "text" placeholder="Ex : 300" value = {preco} onChange={(e)=> setPreco(e.target.value)}/>

        <button type="submit">{carregando ? "Carregando" : "Cadastrar"}</button>

        </form>
      </div>

      {resultado && (
         <div className="container-resultado">
             <h2>Sucesso ! Produto cadastrado !</h2>         
             <img src = {resultado.image}/>
             <p><strong>Id gerado pelo back-end</strong>{resultado.id}</p>
             <p><strong>Título:</strong> {resultado.title}</p>
             <p><strong>Preço:</strong> R$ {resultado.price}</p>
             <p><strong>Categoria:</strong> {resultado.category}</p>

          </div>
      )}


    </div>
  )
}


export default App; 