import React from "react";
import { DualRing } from "react-loading-io"

const Loader = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
     <DualRing className="text-blue-800" size={64} />
    </div>
  );
};

export default Loader;
