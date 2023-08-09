import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateCoupon = () => {
  const coupon = useLoaderData();
  const navigate = useNavigate();
  console.log(coupon);
  const {
    _id,
    couponAmount,
    couponCode,
    date,
    description,
    minimumAmount,
    title,
  } = coupon;
  const handleUpdateCoupon = (event) => {
    event.preventDefault();
    const form = event.target;

    const title = form.title.value;
    const date = form.date.value;
    const minimumAmount = form.minimumAmount.value;
    const couponAmount = form.couponAmount.value;
    const couponCode = form.couponCode.value;
    const description = form.description.value;

    const updateCoupon = {
      title,
      date,
      minimumAmount,
      couponAmount,
      couponCode,
      description,
    };
    console.log(updateCoupon);

    // send data to the server
    fetch(`http://localhost:5000/coupons/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateCoupon),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          navigate("/coupon");
          Swal.fire({
            title: "Success!",
            text: "Coffee Updated Successfully",
            icon: "success",
            confirmButtonText: "Cool",
          });
        }
      });
  };
  return (
    <div>
      <p className="my-5 text-2xl text-center text-bold">UPDATE COUPON</p>
      <div className="px-3 lg:px-0">
        <div className="max-w-7xl mx-auto bg-[#F3F3F3] mb-[300px] ">
          <div className="w-10/12 mx-auto">
            <form onSubmit={handleUpdateCoupon}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-[90px]">
                <div className="mb-4">
                  <label htmlFor="name" className="block mb-2">
                    Title:
                  </label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={title}
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
                    defaultValue={date}
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
                    defaultValue={minimumAmount}
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
                    defaultValue={couponAmount}
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
                    defaultValue={couponCode}
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
                    defaultValue={description}
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
                  UPDATE
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCoupon;
