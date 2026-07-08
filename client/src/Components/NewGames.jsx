import ProductSection from "./ProductSection";

const NewGames = () => {
  return (
    <ProductSection
      title="mới"
      apiEndpoint="http://localhost:3000/api/game/new"
      navigateTo="/new"
      maxItems={4}
    />
  );
};

export default NewGames;
