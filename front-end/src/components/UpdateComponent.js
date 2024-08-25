import React, { useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateComponent = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async (id) => {
    console.warn(params);
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      headers: {
        "Content-type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    result = await result.json();
    console.log(result);
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };

  const updateProduct = async () => {
    console.warn(name, price, category, company);
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: "Put",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "Content-type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });

    result = await result.json();
    navigate("/");
  };

  return (
    <div className="product">
      <h1>Update product</h1>
      <input
        className="inputBox"
        type="text"
        value={name}
        placeholder="Enter Product name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      ></input>

      <input
        value={price}
        className="inputBox"
        type="text"
        placeholder="Enter Product Price"
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      ></input>

      <input
        value={category}
        className="inputBox"
        type="text"
        placeholder="Enter Product Category"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      ></input>

      <input
        value={company}
        className="inputBox"
        type="text"
        placeholder="Enter Product Company"
        onChange={(e) => {
          setCompany(e.target.value);
        }}
      ></input>

      <button onClick={updateProduct} className="appButton">
        Update product
      </button>
    </div>
  );
};

export default UpdateComponent;
