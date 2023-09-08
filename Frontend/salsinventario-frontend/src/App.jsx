import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Sidebar from "./components/sidebar/Sidebar";
import Layout from "./components/layout/Layout";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddProduct from "./pages/addProduct/AddProduct";
import ProductDetail from "./components/product/productDetail/ProductDetail";
import EditProduct from "./pages/editProduct/EditProduct";

axios.defaults.withCredentials = true;

function App() {
    return (
        <BrowserRouter>
            <ToastContainer />
            <Routes>

                <Route
                    path="/dashboard"
                    element={
                        <Sidebar>
                            <Layout>
                                <Dashboard />
                            </Layout>
                        </Sidebar>
                    }
                />
                <Route
                    path="/add-product"
                    element={
                        <Sidebar>
                            <Layout>
                                <AddProduct />
                            </Layout>
                        </Sidebar>
                    }
                />
                <Route
                    path="/product-detail/:id"
                    element={
                        <Sidebar>
                            <Layout>
                                <ProductDetail />
                            </Layout>
                        </Sidebar>
                    }
                />
                <Route
                    path="/edit-product/:id"
                    element={
                        <Sidebar>
                            <Layout>
                                <EditProduct />
                            </Layout>
                        </Sidebar>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;