"use client";

import SectionWrapper from "@/components/SectionWrapper";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const newProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const router = useRouter();

  const createProduct = async (e) => {
    e.preventDefault();
    console.log(title, description, price);

    await axios.post("/api/products/add-product", {
      title,
      description,
      price,
    });

    router.push("/products");
  };

  const uploadImages = (ev) => {
    const files = ev.target?.files;

    if (files?.length > 0) {
      // convert it into form data so that it will be easier to parse in the backend
      const data = new FormData();

      files.forEach((file) => data.append("file", file));
    }
  };

  return (
    <SectionWrapper>
      <form onSubmit={createProduct}>
        <h1>New Product</h1>
        <label>Product Name</label>
        <input
          placeholder="product name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Photos</label>
        <div className="mb-2">
          <label className="w-24 h-24 border flex items-center justify-center text-sm gap-1 text-gray-500 rounded-md bg-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            <span>upload</span>
            <input type="file" onChange={uploadImages} className="hidden" />
          </label>
        </div>
        <label>Description</label>
        <textarea
          placeholder="description"
          rows={10}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Price in (Rs.)</label>
        <input
          type="number"
          placeholder="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit" className="btn-primary">
          Save
        </button>
      </form>
    </SectionWrapper>
  );
};

export default newProduct;
