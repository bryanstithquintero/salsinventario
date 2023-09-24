import React from "react";
import { RiMarkdownLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import "./Home.scss";

const Home = () => {
    return (
        <div className="home">
            <nav className="container --flex-between ">
                <div className="logo">
                    <RiMarkdownLine size={45} />
                </div>

                <ul className="home-links">
                    <li>
                        <button className="--btn --btn-primary">
                            <Link to="/dashboard">Dashboard</Link>
                        </button>
                    </li>
                </ul>
            </nav>
            {/* HERO SECTION */}
            <section className="container hero">
                <div className="hero-text">
                    <h2>Inventario {"&"} facil uso</h2>
                    <p>
                        Sistema de inventario para controlar y gestionar productos en su tienda en
                        tiempo real integrado para facilitar el desarrollo de su negocio.
                    </p>
                    <div className="hero-buttons">
                        <button className="--btn --btn-secondary">
                            <Link to="/dashboard">entra aqui</Link>
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;