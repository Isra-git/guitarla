// Importaciones
import { useMemo } from "react";

// Componente de encabezdo
export default function Header ({cart,addToCart,removeFromCart, increaseQuantity,
     decreaseQuantity, clearCart, payCart}){

        //State derivado
    //Carrito vacio?
    const isEmpty = useMemo(()=> cart.length === 0,[cart])
    // Calcula el total del carrito
   const carTotal = useMemo(() =>
    cart.reduce((acc, game) => acc + game.price * game.quantity, 0)
    .toFixed(2),[cart]);

return(
             
    <header className="py-5 header">
        <div className="container-xl">
            <div className="row justify-content-center justify-content-md-between">
                <div className="col-8 col-md-3">
                    <a href="index.html">
                        <img className="logotipo" src="./img/logo.png" alt="imagen logo" />
                    </a>
                </div>
                <nav className="col-4 col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                    <div className="carrito">
                        <img className="img-fluid" src="./img/carrito.png" alt="imagen carrito" />

                        <div id="carrito" className="bg-white p-3">
                            {isEmpty ?(
                                 <p className="text-center">El carrito esta vacio</p>
                            ):( 
                                <>                                                  
                                <table className="w-100 table">
                                    <thead>
                                        <tr>
                                            <th>Imagen</th>
                                            <th>Nombre</th>
                                            <th>Precio</th>
                                            <th>Cantidad</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart.map(game => (                                 
                                            <tr key={game.id}>
                                                <td>
                                                    <img className="img-fluid"  
                                                    src={`./img/covers/${game.image}`} 
                                                    alt="imagen del juego" />
                                                </td>
                                                <td>{game.name}</td>
                                                <td className="fw-bold">
                                                        ${game.price}
                                                </td>
                                                <td className="flex align-items-start gap-4">
                                                    <button
                                                        type="button"
                                                        className="btn btn-dark"
                                                        onClick={() => decreaseQuantity(game.id)}
                                                    >
                                                        -
                                                    </button>

                                                        {game.quantity}
                                                    <button
                                                        type="button"
                                                        className="btn btn-dark"
                                                        onClick={() => increaseQuantity(game.id)}

                                                    >
                                                        +
                                                    </button>
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-danger"
                                                        type="button"
                                                        onClick={()=>removeFromCart(game.id)}
                                                    >
                                                        X
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            
                                <p className="text-end">Total pagar: 
                                <span className="fw-bold">{carTotal} €
                                </span>
                                </p>
                            
                            </>
                            )}
                            <div className="d-flex justify-content-center gap-3 mt-3"> 

                            <button
                            className = "btn btn-dark flex-fill p-2"//"btn btn-dark w-100 mt-3 p-2"
                            onClick = {clearCart}>
                                Vaciar 
                                </button>
                            <button 
                            className="btn btn-dark flex-fill p-2"//"btn btn-dark w-100 mt-3 p-2"
                            onClick={payCart}
                            >Pagar
                            </button></div>
                       
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </header>

    )
}

