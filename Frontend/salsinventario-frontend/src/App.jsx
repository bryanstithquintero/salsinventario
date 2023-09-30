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
import Home from "./pages/home/Home";
import Provider from "./pages/providers/Providers";
import ProviderDetail from "./components/provider/providerDetail/ProviderDetail";
import EditProvider from "./pages/editProvider/EditProvider";
import AddProvider from "./pages/addProvider/AddProvider";
import Client from "./pages/clients/Clients";
import AddClient from "./pages/addClient/AddClient";
import EditClient from "./pages/editClient/EditClient";
import ClientDetail from "./components/client/clientDetail/ClientDetail";


axios.defaults.withCredentials = true;

function App() {
    return (
        <BrowserRouter>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<Home />} />

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
                    path="/add-provider"
                    element={
                        <Sidebar>
                            <Layout>
                                <AddProvider />
                            </Layout>
                        </Sidebar>
                    }
                />
                <Route
                    path="/add-client"
                    element={
                        <Sidebar>
                            <Layout>
                                <AddClient />
                            </Layout>
                        </Sidebar>
                    }
                />
                <Route
                    path="/edit-client/:id"
                    element={
                        <Sidebar>
                            <Layout>
                                <EditClient />
                            </Layout>
                        </Sidebar>
                    }
                />
                <Route
                    path="/clients"
                    element={
                        <Sidebar>
                            <Layout>
                                <Client />
                            </Layout>
                        </Sidebar>
                    }
                />
                <Route
                    path="/client-detail/:id"
                    element={
                        <Sidebar>
                            <Layout>
                                <ClientDetail />
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
                    path="/provider-detail/:id"
                    element={
                        <Sidebar>
                            <Layout>
                                <ProviderDetail />
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
                <Route
                    path="/edit-provider/:id"
                    element={
                        <Sidebar>
                            <Layout>
                                <EditProvider />
                            </Layout>
                        </Sidebar>
                    }
                />
                <Route
                    path="/providers"
                    element={
                        <Sidebar>
                            <Layout>
                                <Provider />
                            </Layout>
                        </Sidebar>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;