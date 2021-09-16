import React from "react";
import { NavLink } from "react-router-dom";

import { Navbar, Jumbotron, Footer } from "../../Component";
import dataProduct from "../../dataProduct";

import "./style.css";

function HomePage() {
  return (
    <div className="__homePage">
      <Navbar />
      <Jumbotron />
      <div className="container">
        {/* Main */}
        <div className="__homeSection">
          <h1>Klabber.ID</h1>
          <blockquote>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Accusantium id libero eveniet vitae, iusto fuga aut cum tenetur
              dolores, saepe, aliquam harum. Rerum cumque explicabo odit
              praesentium voluptatem laboriosam esse dolore sed! Delectus odit
              autem harum, doloribus numquam iste? Autem?
            </p>
          </blockquote>
        </div>
        {/* End Main */}
        {/* Product */}
        <div className="__homeProduct">
          <h1>Our Product</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum
            repudiandae veritatis eos nostrum quibusdam ullam!
          </p>
          <div className="__homeProductList">
            <div className="row">
              {dataProduct.map((data) => (
                <div
                  className="col-lg-3 col-md-6"
                  key={data.id}
                  data-aos="fade-up"
                  data-aos-duration="700"
                >
                  <div className="__productCard">
                    <div className="__productCardBody">
                      <img src={data.img} alt="" />
                    </div>
                    <div className="__productCardRibbon">
                      <span>{data.name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <NavLink to="/products" className="btn btn-primary mt-5">
              More Product
            </NavLink>
          </div>
        </div>
        {/* End product */}
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
