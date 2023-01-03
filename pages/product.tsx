import { NextPage } from "next";
import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import Loading from "./component/layouts/Loading";
import CreateProduct from "./component/product/CreateProduct";
import Button from "@mui/material/Button";

const Default = dynamic(() => import("./component/Default"), {
  suspense: true,
});

export const Product: NextPage = () => {
  const [open, setOpen] = useState(false);

  const handleChange = () => {
    setOpen(!open);
  };

  return (
    <Suspense fallback={<Loading />}>
      <Default title="product">
        <Button variant="outlined" onClick={handleChange}>
          Open form dialog
        </Button>
        <CreateProduct open={open} handleChange={handleChange} />
      </Default>
    </Suspense>
  );
};

export default Product;
