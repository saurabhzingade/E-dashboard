import React from "react";
import { useState } from "react";

const UpdateComponent = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);

  const updateProduct = async () => {
    console.warn(name, price, category, company);
  };

  return (
    <div className="product">
      <h1>Update product</h1>
      <input
        className="inputBox"
        type="text"
        placeholder="Enter Product name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      ></input>

      <input
        className="inputBox"
        type="text"
        placeholder="Enter Product Price"
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      ></input>

      <input
        className="inputBox"
        type="text"
        placeholder="Enter Product Category"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      ></input>

      <input
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
