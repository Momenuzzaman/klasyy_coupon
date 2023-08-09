import { useQuery } from "@tanstack/react-query";
import React from "react";
import "./AllCopons.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const AllCoupons = () => {
  const navigate = useNavigate();
  const time = { year: "numeric", month: "short", day: "numeric" };
  const { data: coupons = [], refetch } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/coupons");
      return res.json();
    },
  });
  // navigate update coupon
  const handleUpdateCoupon = (id) => {
    navigate(`/coupon/${id}`);
  };
  // delete coupon
  const handleDeleteButton = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/coupons/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "Your coupon has been deleted.", "success");
            }
          });
      }
    });
  };
  console.log(coupons);
  return (
    <div className=" max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 ">
      {coupons &&
        coupons.map((coupon) => (
          <div className="m-1 coupon " key={coupon._id}>
            <div className=" flex basis-2/3 flex-col justify-center items-center">
              <div>
                <p className="mb-2 line-clamp-1 max-w-[25ch] text-[15px] font-light	">
                  {coupon.title}
                </p>
                <p className="text-xs font-light line-clamp-2 max-w-[28ch] leading-4">
                  {coupon.description}
                </p>
                <p className="mt-1 text-[13px] font-bold">
                  Code: {coupon.couponCode}
                </p>
                <div className="space-x-2 mt-2">
                  <button
                    onClick={() => handleUpdateCoupon(coupon._id)}
                    className="btn btn-xs"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteButton(coupon._id)}
                    className="btn btn-xs"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>

            <div className=" flex flex-col justify-center items-center basis-1/3 border-l-4 border-dashed border-white">
              <p className="mb-2 font-light ">
                Spend: {coupon.minimumAmount}TK
              </p>
              <p className="text-2xl font-light ">{coupon.couponAmount}TK</p>
              <p className="font-light ">Max Discount</p>
              <p className="mt-3 text-[10px] font-thin">
                <span className="mr-1"> Valid Until</span>
                {new Date().toLocaleDateString("en-US", time)}
              </p>
            </div>

            <div className="md:circle left-[-25px] "></div>
            <div className="md:circle right-[-25px]"></div>
          </div>
        ))}
    </div>
  );
};

export default AllCoupons;
