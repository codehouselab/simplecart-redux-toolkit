import { useSelector } from "react-redux"
import CartItem from './CartItem'

function Cart() {
  const { items, total_price, totalItemsQuantity } = useSelector(state => state.cart)
  return (
    <div className="p-5">
      <div>
        {items.length > 0 ?
          <div>
            <p className="text-xl p-2 text-center border-b-2">
              Your Cart Details
            </p>
            {items?.map(item => <CartItem key={item.productId} item={item} />)}
          </div> : <p>Your Cart is Empty</p>
        }
      </div>
      <div>
        {items?.length > 0 && (
          <div className="border-t-2">
            <div className="flex justify-between">
              <p>Total Quantity:</p>
              <p>{totalItemsQuantity}</p>
            </div>
            <div className="flex justify-between">
              <p>Grand Total:</p>
              <p>{total_price.toLocaleString('en-US', {
                style: 'currency',
                currency: 'CAD',
              })}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart