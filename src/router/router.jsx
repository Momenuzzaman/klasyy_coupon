import { createBrowserRouter } from "react-router-dom";
import Coupon from "../Page/Coupon";
import CreateCoupon from "../Page/CreateCoupon";
import AllCoupons from "../Page/AllCoupons";
import UpdateCoupon from "../Page/UpdateCoupon";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Coupon />,
    children: [
      {
        path: "/",
        element: <CreateCoupon />,
      },
      {
        path: "coupon",
        element: <AllCoupons />,
      },
      {
        path: "coupon/:id",
        element: <UpdateCoupon />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/coupons/${params.id}`),
      },
    ],
  },
]);
