import React, { useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);

  const addProduct = async () => {
    if (!name || !price | !company || !category) {
      setError(true);
      return false;
    }

    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch("http://localhost:5000/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "Content-type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    result = await result.json();
    console.warn(result);
  };

  return (
    <div className="product">
      <h1>Add psroduct</h1>
      <input
        className="inputBox"
        type="text"
        placeholder="Enter Product name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      ></input>
      {error && !name && (
        <span className="invalid-input">Enter valid name</span>
      )}
      <input
        className="inputBox"
        type="text"
        placeholder="Enter Product Price"
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      ></input>
      {error && !price && (
        <span className="invalid-input">Enter valid price</span>
      )}
      <input
        className="inputBox"
        type="text"
        placeholder="Enter Product Category"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      ></input>
      {error && !category && (
        <span className="invalid-input">Enter valid category</span>
      )}
      <input
        className="inputBox"
        type="text"
        placeholder="Enter Product Company"
        onChange={(e) => {
          setCompany(e.target.value);
        }}
      ></input>
      {error && !company && (
        <span className="invalid-input">Enter valid company</span>
      )}
      <button onClick={addProduct} className="appButton">
        Add product
      </button>
    </div>
  );
};

export default AddProduct;
