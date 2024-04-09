import { useDispatch } from "react-redux"
import { decreaseCartQuantiy, increaseCartQuantity, removeItemFromCart } from "../../../features/cartSlice"
import { updateStock } from "../../../features/productSlice"
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify"
import { useEffect } from "react";

function CartItem({ item }) {
    const dispacth = useDispatch()

    useEffect(() => {
        if(item.quantity === 0) {
            handleRemoveItem(item)
        }
    }, [item])

    const handleRemoveItem = async (itemToBeRemoved) => {
        await Promise.all([
            dispacth(removeItemFromCart(itemToBeRemoved)),
            dispacth(updateStock({ ...itemToBeRemoved, quantity: -itemToBeRemoved.quantity })),
            toast.success('Item Removed')
        ])

    }

    const handleIncreaseQ = (lineItem) => {
        dispacth(increaseCartQuantity({ ...lineItem, quantity: 1 }))
    }

    const handleDecreaseQ = (lineItem) => {
        dispacth(decreaseCartQuantiy({ ...lineItem, quantity: 1 }))
    }

    return (
        <div className="py-3">
            <div className="flex justify-between">
                <p>{item.productName}</p>
                <button
                    className="focus:outline-none bg-red-700 hover:bg-red-800 text-white py-1 px-3 rounded-full inline-flex items-center"
                    onClick={() => handleRemoveItem(item)}
                >
                    Remove
                </button>
            </div>
            <div className="flex">
                <button
                    className="focus:outline-none bg-purple-700 hover:bg-purple-800 text-white font-bold py-1 px-1 rounded-full inline-flex items-center"
                    onClick={() => handleDecreaseQ(item)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M18 12H6"
                        />
                    </svg>
                </button>
                <p className="px-1">{`(${item?.quantity})`}</p>
                <button
                    className={`focus:outline-none bg-purple-700 hover:bg-purple-800 text-white font-bold py-1 px-1 rounded-full inline-flex items-center`}
                    onClick={() => handleIncreaseQ(item)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                    </svg>
                </button>
                <p className="ml-5">
                    {`Total: ${item?.total?.toLocaleString("en-US", {
                        style: "currency",
                        currency: "CAD",
                    })}`}
                </p>
            </div>

        </div>
    )
}

export default CartItem