import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import api from "../../Helpers/api-endpoint";

import { Navbar, Footer, ProductCard } from "../../Component";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import SearchIcon from "@material-ui/icons/Search";

import "./style.css";

function Productpage() {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [stateNumber, setStateNumber] = useState(5);
  const [searchProduct, setSearchProduct] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      let products = await api.post("/api/search", {
        amount: stateNumber,
      });
      setProduct(products.data);
    };

    fetchProduct();
  }, [stateNumber]);

  useEffect(() => {
    const fetchCategory = async () => {
      let categories = await api.get("/api/category");
      setCategory(categories.data);
    };

    fetchCategory();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (searchProduct.length > 0) {
        setIsLoading(true);
        let theData = await api.post("/api/search", {
          title: searchProduct,
        });
        setProduct(theData.data);
        setIsLoading(false);
      } else {
        api.get("/api/product").then((res) => setProduct(res.data));
      }
    };
    fetchData();
  }, [searchProduct]);

  const filterByCategory = async (category) => {
    try {
      if (category === "semua") {
        let theData = await api.get("/api/product");
        setProduct(theData.data);
        window.scrollTo(0, 0);
      } else {
        let theData = await api.post("/api/search", {
          category,
        });
        setProduct(theData.data);
        window.scrollTo(0, 0);
      }
    } catch (err) {}
  };

  return (
    <div className="__productPage">
      <Navbar />
      <div className="container">
        {/* Main */}
        <div className="__searchProductWrapper">
          <input
            autoComplete="off"
            type="text"
            placeholder="Cari Product.."
            value={searchProduct}
            onChange={(e) => setSearchProduct(e.target.value)}
          />
          <SearchIcon />
        </div>
        <div className="__product">
          {isLoading ? (
            <div className="__loadingSpinnerProduct">
              <Spinner
                animation="border"
                className="custom"
                size="lg"
                variant="primary"
              />
            </div>
          ) : (
            <div className="row col-product">
              {product.map((data) => (
                <div
                  className="col-lg-4 col-md-6 col-sm-6 col-12"
                  key={data.id}
                >
                  <ProductCard
                    img={data.image}
                    name={data.title}
                    // bestSeller={data.bestSeller}
                  />
                </div>
              ))}
              <button
                className="btn btn-primary load_more_lg"
                onClick={() => setStateNumber(stateNumber + 2)}
              >
                Load More
              </button>
            </div>
          )}
          <button
            className="btn btn-primary load_more_sm"
            onClick={() => setStateNumber(stateNumber + 2)}
          >
            Load More
          </button>

          <div className="__productCategory">
            <h1>Categories</h1>
            <div className="__listProductCategory">
              <ul>
                <li onClick={() => filterByCategory("semua")}>
                  <ArrowForwardIosIcon className="arrowIcon" /> Semua
                </li>
                {category.map((x) => (
                  <li key={x.id} onClick={() => filterByCategory(x.category)}>
                    <ArrowForwardIosIcon className="arrowIcon" />
                    {x.category}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* End Main */}
      </div>
      <Footer />
    </div>
  );
}

export default Productpage;
