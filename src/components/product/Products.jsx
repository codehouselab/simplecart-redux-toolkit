import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {get_products} from '../../../features/productSlice'
import ProductItem from './ProductItem'

function Products() {
  const dispatch = useDispatch()

  let { products } = useSelector(state => state.product)
  useEffect(() => {
    dispatch(get_products())
  }, [])
  return (
    <div className="mt-8 mr-8">
      {products?.length > 0 ? (
        <>
          {products.map((product) => (
            <ProductItem key={product?.id} product={product} />
          ))}

        </>
      ) : (
        <p>No product available</p>
      )}
    </div>
  )
}

export default Products