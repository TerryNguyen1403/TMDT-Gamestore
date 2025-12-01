import CarouselComponent from "../Components/Carousel/CarouselComponent";
import ProductSection from "../Components/ProductSection";

const Home = () => {
  return (
    <div>
      <CarouselComponent />
      {/* New games */}
      <ProductSection
        title="mới"
        apiEndpoint="http://localhost:3000/api/game/new"
        navigateTo="/new"
      />

      {/* Windows platform */}
      <ProductSection
        title="windows"
        apiEndpoint="http://localhost:3000/api/game/platform/Windows"
        navigateTo="/Windows"
      />

      {/* Playstation platform */}
      <ProductSection
        title="playstation"
        apiEndpoint="http://localhost:3000/api/game/platform/Playstation"
        navigateTo="/Playstation"
      />
    </div>
  );
};

export default Home;
