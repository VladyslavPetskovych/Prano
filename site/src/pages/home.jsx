import EndlessPossibilities from "../components/homePage/EndlessPossibilities.jsx";
import { TopBlock } from "../components/homePage/topBlock.jsx";
import About from "../components/homePage/about.jsx";

const Home = () => {
  return (
    <div>
      <TopBlock />
      <EndlessPossibilities />
      <About/>
    </div>
  );
};

export default Home;
