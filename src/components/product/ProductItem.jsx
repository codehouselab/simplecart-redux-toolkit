import { useDispatch } from "react-redux"
import { addToCart } from "../../../features/cartSlice"

function ProductItem({ product }) {
    const dispatch = useDispatch()
    const handleOnClick = (lineItem) => {
        const line = {
            productId: lineItem.id,
            productName: lineItem.productName,
            price: lineItem.price,
            quantity: 1
        }
        dispatch(addToCart(line))
    }

    return (
        <div className="p-2 border-2 bg-slate-200 border-gray-300 rounded-lg m-2">
            <p className=""> {product?.productName + " (" + (product?.quantity === 0 ? "Out of Stock" : product?.quantity) + ")"}</p>
            <p className="text-gray-400 text-left">
                {product?.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "CAD",
                })}
            </p>
            <div className='semi-bold'>
                <button type='button' className={`focus:outline-none bg-yellow-600 text-white py-1 px-1 rounded-lg ${product?.quantity === 0 ? 'disabled:opacity-25 cursor-not-allowed' : 'hover:bg-yellow-800'}`}
                    disabled={product?.quantity === 0 ? true : false}
                    onClick={() => handleOnClick(product)}>
                    Add to Cart
                </button>
            </div>
        </div>)
}
export default ProductItem