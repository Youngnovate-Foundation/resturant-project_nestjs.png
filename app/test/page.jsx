"use client";
import React, { useEffect, useState } from "react";

const page = () => {
  const [food, setFoods] = useState("");
  useEffect(() => {
    const fetchfoods = async () => {
      const res = await fetch("/api/food/");
      const data = await res.json();
      setFoods(data);
    };

    fetchfoods();
  }, []);

  console.log(food);
  return <div>test page</div>;
};

export default page;
