import axios from "axios";
import { createContext, useContext, useState } from "react";
import { UserContext } from "./User.context";
import toast from "react-hot-toast";

export const CartContext = createContext(null)
export default function CartProvider({ children }) {
    const { token } = useContext(UserContext)
    const [cartInfo, setCartInfo] = useState(null)

    // ^ Add Product
    async function addProductToCart(productId) {
        let toastId = toast.loading("Adding Product ...")
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/cart",
                method: "POST",
                headers: {
                    token
                },
                data: {
                    productId
                }
            }
            let { data } = await axios.request(options)
            if (data.status == "success") {
                toast.success(data.message)
                getCartProducts()
            }

        } catch (error) {
            toast.error("Something went wrong. Please try again.");

        } finally {
            toast.dismiss(toastId)
        }

    }

    // ^ Get Product
    async function getCartProducts() {
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/cart",
                method: "GET",
                headers: {
                    token
                },
            }
            let { data } = await axios.request(options)
            setCartInfo(data)

        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        }
    }

    // ^ Remove Product
    async function removeProductFromCart({ productId }) {
        let toastId = toast.loading("Removing Product ...")
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                method: "DELETE",
                headers: {
                    token
                },
            }
            let { data } = await axios.request(options);
            if (data.status === "success") {
                toast.success("Product Has been Removed from The Cart")
                setCartInfo(data)
            }

        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        }
        finally {
            toast.dismiss(toastId)
        }

    }

    // ^ Clear Cart
    async function clearCart() {
        let toastId = toast.loading("Clearing Cart ...")
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/cart",
                method: "DELETE",
                headers: {
                    token
                },
            }
            let { data } = await axios.request(options)
            if (data.message === "success") {
                toast.success("Cart Has been Cleared")
                setCartInfo({
                    numOfCartItems: 0
                });
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        }
        finally {
            toast.dismiss(toastId)
        }

    }

    // ^ Update Count
    async function updateProductCount({ productId, count }) {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                method: "PUT",
                headers: {
                    token
                },
                data: {
                    count
                }
            }
            let { data } = await axios.request(options)
            if (data.status === "success") {
                setCartInfo(data)
            }

        } catch (error) {
            toast.error("Something went wrong. Please try again.");

        }
    }


    return <CartContext.Provider
        value={{
            cartInfo,
            addProductToCart,
            getCartProducts,
            removeProductFromCart,
            clearCart,
            updateProductCount,
        }}>
        {children}
    </CartContext.Provider>

}