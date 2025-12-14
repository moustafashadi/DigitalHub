import React, { useEffect, useState } from "react";
import { productsData } from "../mockData";

function useDebounce() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    if (debouncedQuery) {
      fetchResults(debouncedQuery);
    }
  }, [debouncedQuery]);

  const fetchResults = (searchTerm, productsData) => {
    if (!searchTerm) return productsData;

    let result = productsData.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.supplier.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return result;
  }
}

export default useDebounce;
