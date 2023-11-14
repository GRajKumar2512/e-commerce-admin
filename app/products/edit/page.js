"use client";

import SectionWrapper from "@/components/SectionWrapper";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // this useeffect finds product details for that id to update in
  useEffect(() => {
    const getUpdateDetails = async () => {
      const { data } = await axios.get(`/api/products/${productId}`);

      setTitle(data.title);
      setDescription(data.description);
      setPrice(data.price);
    };

    if (productId) getUpdateDetails();
  }, [productId]);

  const updateProduct = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!productId) return alert("product not found");

    try {
      const response = await axios.patch(`/api/products/${productId}`, {
        title,
        description,
        price,
      });

      if (response.status === 200) {
        router.push("/products");
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SectionWrapper>
      <form onSubmit={updateProduct}>
        <h1>Edit Product</h1>
        <label>Product Name</label>
        <input
          placeholder="product name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
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
        <button type="submit" disabled={submitting} className="btn-primary">
          Update
        </button>
      </form>
    </SectionWrapper>
  );
};

export default page;
