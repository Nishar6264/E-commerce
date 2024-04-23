
import OrderAdmin from "../components/Admin/OrderAdmin";
import HomeAdmin from "../components/Admin/HomeAdmin";
import ProductsAdmin from "../components/Admin/ProductsAdmin";
import UsersAdmin from "../components/Admin/UsersAdmin";

const adminRoutes = [
  {
    path: "/admin",
    component: HomeAdmin,
  },
  {
    path: "/users",
    component: UsersAdmin,
  },
  {
    path: "/products",
    component: ProductsAdmin,
  },
  {
    path: "/order",
    component: OrderAdmin,
  },
];

export default adminRoutes;
