import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Nav/Navbar";
import SignIn from "./components/login/SignIn";
import Home from "./components/HomePage/Home";
import SignUp from "./components/signUp/SignUp";
import Footer from "./components/footer/Footer";
import ScrollToTop from "./ScrollToTop";
import ContactUs from "./components/contact/ContactUs";
import SingleProduct from "./components/singleProduct/SingleProduct";
import Tops from "./components/pages/women/Tops";
import Dresses from "./components/pages/women/Dresses";
import Bags from "./components/pages/women/Bags";
import WShoes from "./components/pages/women/wShoes";
import Jewellery from "./components/pages/women/Jewellery";
import Wwatches from "./components/pages/women/Wwatches";
import Shirts from "./components/pages/men/Shirts";
import MShoes from "./components/pages/men/MShoes";
import Mwatches from "./components/pages/men/Mwatches";
import Glasses from "./components/pages/men/Glasses";
import Sport from "./components/pages/men/Sport";
import MakeUp from "./components/pages/beauty/Beauty";
import Fragrances from "./components/pages/beauty/Fragrances";
import Skincare from "./components/pages/beauty/Skincare";
import Groceries from "./components/pages/homeNeeds/Groceries";
import Furniture from "./components/pages/homeNeeds/Furniture";
import Decoration from "./components/pages/homeNeeds/Decoration";
import KitAccessories from "./components/pages/homeNeeds/KitAccessories";
import Smartphones from "./components/pages/electronics/Smartphones";
import Tablets from "./components/pages/electronics/Tablets";
import Labtops from "./components/pages/electronics/Labtops";
import MobAccessories from "./components/pages/electronics/MobAccessories";
import Cars from "./components/pages/vehicles/Cars";
import Motorcycles from "./components/pages/vehicles/Motorcycles";
import Cart from "./components/Cart/Cart";
import Profile from "./components/profile/Profile";
import ProfileEdit from "./components/profile/Edit/ProfileEdit";
import UserInfo from "./components/profile/UserInfo/UserInfo";
import PrevOrders from "./components/profile/PrevOrders/PrevOrders";
import AdminPanel from "./components/Admin/AdminPanel";
import Product from "./components/Admin/Products/Product";
import User from "./components/Admin/Users/User";
import ProductPlaceholder from "./components/Admin/Products/ProductPlaceholder";
import ProductConfig from "./components/Admin/Products/ProductConfig";
import ProductCreation from "./components/Admin/Products/ProductCreation";
import UserPlaceholder from "./components/Admin/Users/UserPlaceholder";
import UserConfig from "./components/Admin/Users/UserConfig";
import UserCreation from "./components/Admin/Users/UserCreation";
import AdminPalceholder from "./components/Admin/AdminPalceholder";
import Orders from "./components/Admin/Orders/Orders";
import CheckOut from "./components/checkOut/CheckOut";
import EditProduct from "./components/Admin/Products/EditProduct";
import { useEffect, useState } from "react";
import ContactMessages from "./components/Admin/ContactUsMessages/ContactMessages";
import SingleContactMessage from "./components/Admin/ContactUsMessages/SingleContactMessage";
import UserSingleOrder from "./components/Admin/Orders/UserSingleOrder";
import SingleUser from "./components/Admin/Users/SingleUser";
import EditUser from "./components/Admin/Users/EditUser";
import ProductReview from "./components/profile/PrevOrders/ProductReview";
import UpdateReview from "./components/profile/PrevOrders/UpdateReview";
import ExpiredTokenModal from "./components/ExpiredTokenModal";
import { jwtDecode } from "jwt-decode";

const publicRoutes = [
  /^\/$/,
  /^\/SignIn$/,
  /^\/SignUp$/,
  /^\/[a-fA-F0-9]{24}$/,
  /^\/contact$/,
];

function App() {
  const [openModal, setOpenModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    let timer;

    try {
      const tokenData = jwtDecode(token);
      const remainingTime = tokenData.exp*1000 - Date.now();
      const handler = () => {
        const isPublicRoute = publicRoutes.some((route) =>
          route.test(location.pathname)
        );

        if (!isPublicRoute) {
          setOpenModal(true);
        }
      };

      if (remainingTime <= 0) {
        handler();
        return;
      }

      timer = setTimeout(() => {
        handler();
      }, remainingTime);
    } catch (error) {
      console.error("invalid token");
    }

    return () => clearTimeout(timer);
  }, [location.pathname]);
  return (
    <>
      {openModal && <ExpiredTokenModal setOpenModal={setOpenModal} />}
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/:x" element={<SingleProduct />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/checkOut" element={<CheckOut />} />
        <Route path="/" element={<Home />} />

        <Route path="/profile" element={<Profile />}>
          <Route index element={<UserInfo />} />
          <Route path="" element={<UserInfo />} />
          <Route path="prevOrders/:order_id" element={<PrevOrders />} />
          <Route
            path="prevOrders/:order_id/review/:prod_id"
            element={<ProductReview />}
          />
          <Route
            path="Reviews/:prod_id/updateReview/:rev_id"
            element={<UpdateReview />}
          />
          <Route path="edit" element={<ProfileEdit />} />
        </Route>

        <Route path="/adminDashboard" element={<AdminPanel />}>
          <Route index element={<AdminPalceholder />} />
          <Route path="products" element={<Product />}>
            <Route index element={<ProductPlaceholder />} />
            <Route path="productConfig" element={<ProductConfig />} />
            <Route path="productConfig/:x" element={<SingleProduct />} />
            <Route path="productConfig/EditProd/:y" element={<EditProduct />} />
            <Route path="productCreation" element={<ProductCreation />} />
          </Route>
          <Route path="users" element={<User />}>
            <Route index element={<UserPlaceholder />} />
            <Route path="userConfig" element={<UserConfig />} />
            <Route path="userConfig/:user_id" element={<SingleUser />} />
            <Route path="userConfig/EditUser/:user_id" element={<EditUser />} />
            <Route path="userCreation" element={<UserCreation />} />
          </Route>
          <Route path="messages" element={<ContactMessages />} />
          <Route path="messages/:m" element={<SingleContactMessage />} />

          <Route path="orders" element={<Orders />} />
          <Route path="orders/:o" element={<UserSingleOrder />} />
        </Route>

        <Route path="/Tops" element={<Tops />} />
        <Route path="/Tops/:x" element={<SingleProduct />} />
        <Route path="/Dresses" element={<Dresses />} />
        <Route path="/Dresses/:x" element={<SingleProduct />} />
        <Route path="/Bags" element={<Bags />} />
        <Route path="/Bags/:x" element={<SingleProduct />} />
        <Route path="WShoes" element={<WShoes />} />
        <Route path="/WShoes/:x" element={<SingleProduct />} />
        <Route path="/Jewellery" element={<Jewellery />} />
        <Route path="/Jewellery/:x" element={<SingleProduct />} />
        <Route path="/Wwatches" element={<Wwatches />} />
        <Route path="/Wwatches/:x" element={<SingleProduct />} />
        <Route path="/Shirts" element={<Shirts />} />
        <Route path="/Shirts/:x" element={<SingleProduct />} />
        <Route path="/MShoes" element={<MShoes />} />
        <Route path="/MShoes/:x" element={<SingleProduct />} />
        <Route path="/Mwatches" element={<Mwatches />} />
        <Route path="/Mwatches/:x" element={<SingleProduct />} />
        <Route path="/Glasses" element={<Glasses />} />
        <Route path="/Glasses/:x" element={<SingleProduct />} />
        <Route path="/Sport" element={<Sport />} />
        <Route path="/Sport/:x" element={<SingleProduct />} />
        <Route path="/MakeUp" element={<MakeUp />} />
        <Route path="/MakeUp/:x" element={<SingleProduct />} />
        <Route path="/Fragrances" element={<Fragrances />} />
        <Route path="/Fragrances/:x" element={<SingleProduct />} />
        <Route path="/Skincare" element={<Skincare />} />
        <Route path="/Skincare/:x" element={<SingleProduct />} />
        <Route path="/Groceries" element={<Groceries />} />
        <Route path="/Groceries/:x" element={<SingleProduct />} />
        <Route path="/Furniture" element={<Furniture />} />
        <Route path="/Furniture/:x" element={<SingleProduct />} />
        <Route path="/Decoration" element={<Decoration />} />
        <Route path="/Decoration/:x" element={<SingleProduct />} />
        <Route path="/KitAccessories" element={<KitAccessories />} />
        <Route path="/KitAccessories/:x" element={<SingleProduct />} />
        <Route path="/Smartphones" element={<Smartphones />} />
        <Route path="/Smartphones/:x" element={<SingleProduct />} />
        <Route path="/Tablets" element={<Tablets />} />
        <Route path="/Tablets/:x" element={<SingleProduct />} />
        <Route path="/Labtops" element={<Labtops />} />
        <Route path="/Labtops/:x" element={<SingleProduct />} />
        <Route path="/MobAccessories" element={<MobAccessories />} />
        <Route path="/MobAccessories/:x" element={<SingleProduct />} />
        <Route path="/Cars" element={<Cars />} />
        <Route path="/Cars/:x" element={<SingleProduct />} />
        <Route path="/Motorcycles" element={<Motorcycles />} />
        <Route path="/Motorcycles/:x" element={<SingleProduct />} />
        <Route path="/Cart" element={<Cart />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
