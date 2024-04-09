import { ToastContainer } from "react-toastify"
import Layout from "./components/Layout"
import Cart from "./components/cart/Cart"
import Products from "./components/product/Products"
import { Provider } from "react-redux"
import { store } from "../store/store"


function App() {

  return (
    <Provider store={store}>
      <div className="h-screen flex justify-center">
        <Layout>
          <div className="grid grid-cols-2">
            <Products />
            <Cart />
          </div>
        </Layout>
        <ToastContainer />
      </div>
    </Provider>
  )
}

export default App
