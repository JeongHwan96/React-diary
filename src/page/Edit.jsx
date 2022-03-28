import React from "react";
import { useSearchParams } from "react-router-dom";

const Edit = () => {
  const [searchParam, setSearchParams] = useSearchParams();
  const id = searchParam.get("id");
  console.log("id : ", id);

  return <div>Edit</div>;
};

export default Edit;
