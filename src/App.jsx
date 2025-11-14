import { useState } from "react";
import { useEffect } from "react";
import Header from "./components/Header";
import Juego from "./components/Juego";
import {db} from "./data/db";

function App() {
    
    //Comprueba si hay algun carrito anterior guardado en localstorage (si[initialCart/No [])
    const initialCart = () => {
      const localStoregeCart = localStorage.getItem('cart')
      return localStoregeCart ? JSON.parse(localStoregeCart) : []
    }

    //Definimos el estado como un arreglo de covers db
    const [data] = useState(db)

    //Definimos un estado para el carrito (si esta en localStorage coge su valor, sino [])
    const [cart, setCart] = useState(initialCart)

    //Numero maximo/ minimo de un elemento que se pueden añadir al carrito
    const MAX_ITEMS = 5
    const MIN_ITEMS = 1

    //Guardar el carrito en local storage -carrito persistente-
    // solo se pueden guardar strings setItem(key,value)
    useEffect(()=> {
        localStorage.setItem('cart', JSON.stringify(cart))

    },[cart])

    
    //Agrega elementos al carrito 
    function addToCart(item){

        //Comprobamos si el elemento existe (guardamos indice) en el carrito (no existe:-1)
        const itemExists = cart.findIndex((game => game.id === item.id))

        //Si existe, realizamos una copia (el state no se puede mutar), incrementamos la cantidad
        // y lo añadimos al state (cart) original del carro
        if (itemExists >=0) {
          if (cart[itemExists].quantity >= MAX_ITEMS) return //Si hay MAX_ITEMS no agregamos         
           const updatedCart = [...cart]
           updatedCart[itemExists] = {
             ...updatedCart[itemExists],
            quantity: updatedCart[itemExists].quantity +1
        };
          //Fijamos el estado
        setCart(updatedCart);     
          }else{
            const newItem = { ...item, quantity: 1 };
            setCart([...cart, newItem]);
          }
        
    }

    //Incrementar la cantidad de un item en el carrito (limite MAX_ITEMS)
    function increaseQuantity(id){
      const updatedCart = cart.map(item=>{
        if(item.id === id && item.quantity < MAX_ITEMS) {
          return {
            ...item,
            quantity: item.quantity + 1
          }
        }
        return item
      })
      
      setCart(updatedCart)
    }

    //Reducir la cantidad de un item en el carrito
   function decreaseQuantity(id) {
        const updatedCart = cart.map(item => {
  
          if(item.id === id && item.quantity > MIN_ITEMS){
          return {
             ...item,
             quantity: item.quantity - 1 
          }
        }
        return item
        })     
        setCart(updatedCart);
      }
  

    //Eliminar elemmentos del carrito
    function removeFromCart(id){
     setCart(prevCart => prevCart.filter(item => item.id !== id))
      
    }

    // vaciar el carrito
    function clearCart() {
      setCart([])
    }

    //Pagar carrito
    function payCart(){
      alert("Comprado")
    }
   

  return (
    <>

    <Header 
        cart = {cart}
        addToCart = {addToCart}
        removeFromCart = {removeFromCart}
        increaseQuantity = {increaseQuantity}
        decreaseQuantity = {decreaseQuantity}
        clearCart={clearCart}
        payCart = {payCart}

    />
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((game)=> {
            return (
                <Juego
                    key = {game.id}
                    game = {game} 
                    cart = {cart}
                    setCart= {setCart}
                    addToCart = {addToCart}
                />
            )
          })}
          
          
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GamePassion - Tu tienda de Videojuegos retro- Todos los derechos Reservados</p>
        </div>
    </footer>

    </>
  )
}

export default App
