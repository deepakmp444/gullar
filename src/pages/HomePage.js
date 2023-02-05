import { useEffect } from "react";
import { useDispatch } from "react-redux";
import CarouselComponent from "../components/Carousel";
import Footer from "../components/Footer";
import HomePageCard from "../components/HomePageCard/HomePageCard";
import { clearSingleProductErrorStatus } from "../store/features/productSlice";
import { clearCreateAccountBtnClickForLogin } from "../store/features/userSlice";
function HomePage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearCreateAccountBtnClickForLogin());
    dispatch(clearSingleProductErrorStatus());
  }, [dispatch]);
  return (
    <div>
      <CarouselComponent />
      <HomePageCard />
      <Footer />
    </div>
  );
}

export default HomePage;
