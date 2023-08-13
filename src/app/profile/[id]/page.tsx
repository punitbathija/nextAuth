import React from "react";

const page = ({ params }: any) => {
  return (
    <div className="flex flex-col justify-center align-middle items-center min-h-screen m-auto border-2 border-dotted">
      <h1 className="text-4xl my-4">Profile {params.id}</h1>
      <br />
    </div>
  );
};

export default page;
