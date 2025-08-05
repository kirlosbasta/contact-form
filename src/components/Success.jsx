import React from "react";
import success from "../assets/images/icon-success-check.svg";

function Success({ isSuccess }) {
  return (
    <div
      className={`absolute -top-50 p-5 rounded-xl bg-grey-900 text-white transtion duration-200 ${
        isSuccess && "top-5"
      }`}
    >
      <div className="flex">
        <img src={success} alt="success icon" className=" mr-2 w-4" />
        <p className="inline-block ">Message Sent!</p>
      </div>
      <p className="text-grey-500 text-sm my-2">
        Thanks for completing the form. We'll be in touch soon!
      </p>
    </div>
  );
}

export default Success;
