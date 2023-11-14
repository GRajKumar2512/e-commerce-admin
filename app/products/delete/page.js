"use client";

import SectionWrapper from "@/components/SectionWrapper";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";

const page = () => {
  const router = useRouter();
  const SearchParams = useSearchParams();
  const productID = SearchParams.get("id");
  const [title, setTitle] = useState("");

  useEffect(() => {
    const getUpdateDetails = async () => {
      const { data } = await axios.get(`/api/products/${productID}`);

      setTitle(data.title);
    };

    if (productID) getUpdateDetails();
  }, [productID]);

  const goBack = () => {
    router.push("/products");
  };

  const handleDelete = async () => {
    await axios.delete(`/api/products/${productID}`);
    goBack();
  };

  return (
    <SectionWrapper>
      <div>
        <h1 className="text-center">
          Do you really want to delete "{title}" ?
        </h1>
        <div className="flex justify-center gap-5">
          <button
            className="bg-red-500 text-white px-4 py-1 rounded-md"
            onClick={handleDelete}
          >
            Yes
          </button>
          <button
            className="bg-gray-600 text-white px-4 py-1 rounded-md"
            onClick={goBack}
          >
            No
          </button>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default page;
