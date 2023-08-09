import { Input, Button } from "@nextui-org/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const CreateCoupon = () => {
  const navigate = useNavigate();
  const handleCreateCoupon = (event) => {
    event.preventDefault();
    const form = event.target;
    const title = form.title.value;
    const date = form.date.value;
    const minimumAmount = form.minimumAmount.value;
    const couponAmount = form.couponAmount.value;
    const couponCode = form.couponCode.value;
    const description = form.description.value;

    const coupon = {
      title,
      date,
      minimumAmount,
      couponAmount,
      couponCode,
      description,
    };
    console.log(coupon);
    //   post data
    const postData = async () => {
      const response = await fetch("http://localhost:5000/coupons", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(coupon),
      });

      const result = await response.json();
      navigate("/coupon");
      console.log("Success:", result);
      form.reset();
    };
    postData();
  };
  return (
    <div>
      <p className="my-5 text-2xl text-center text-bold">CREATE COUPON</p>
      <div className="px-3 lg:px-0">
        <div className="max-w-7xl mx-auto bg-[#F3F3F3] mb-[300px] ">
          <div className="w-10/12 mx-auto">
            <form onSubmit={handleCreateCoupon}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-[90px]">
                <div className="mb-4">
                  <label htmlFor="name" className="block mb-2">
                    Title:
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter coupon title"
                    className="w-full border border-gray-300 p-2 rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block mb-2">
                    Validity
                  </label>
                  <input
                    type="date"
                    name="date"
                    className="w-full border border-gray-300 p-2 rounded-md"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
                <div className="mb-4">
                  <label htmlFor="name" className="block mb-2">
                    Minimum Spend (BDT)
                  </label>
                  <input
                    type="number"
                    name="minimumAmount"
                    placeholder="Enter minimum amount (BDT)"
                    className="w-full border border-gray-300 p-2 rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block mb-2">
                    Amount (BDT)
                  </label>
                  <input
                    type="number"
                    name="couponAmount"
                    placeholder="Enter coupon amount (BDT)"
                    className="w-full border border-gray-300 p-2 rounded-md"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="mb-4">
                  <label htmlFor="email" className="block mb-2">
                    Coupon Code
                  </label>
                  <input
                    type="text"
                    name="couponCode"
                    placeholder="Enter coupon code"
                    className="w-full border border-gray-300 p-2 rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block mb-2">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    name="description"
                    placeholder="Enter coupon description"
                    className="w-full border border-gray-300 p-2 rounded-md"
                    required
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-center py-[60px] text-white">
                <button
                  style={{
                    backgroundColor:
                      "rgba(131, 93, 35, 1), rgba(181, 129, 48, 1)",
                  }}
                  type="submit"
                  className=" font-bold py-2 px-20 rounded"
                >
                  Generate
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCoupon;
