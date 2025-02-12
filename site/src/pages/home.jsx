import EndlessPossibilities from "../components/homePage/EndlessPossibilities.jsx";
import { TopBlock } from "../components/homePage/topBlock.jsx";
import About from "../components/homePage/about.jsx";
import CareArtBlock from "../components/homePage/CareArtBlock.jsx";

const Home = () => {
  return (
    <div>
      <TopBlock />
      <CareArtBlock/>
      <EndlessPossibilities />
      <About/>
    </div>
  );
};

export default Home;
