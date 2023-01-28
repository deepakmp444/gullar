import { useEffect } from "react";
import { useDispatch } from "react-redux";
import CarouselComponent from "../components/Carousel";
import Footer from "../components/Footer";
import HomePageCard from "../components/HomePageCard/HomePageCard";
import { clearCreateAccountBtnClickForLogin } from "../store/features/userSlice";
function HomePage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearCreateAccountBtnClickForLogin());
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
