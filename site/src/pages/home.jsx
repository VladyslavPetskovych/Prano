import EndlessPossibilities from "../components/homePage/EndlessPossibilities.jsx";
import { TopBlock } from "../components/homePage/topBlock.jsx";
import About from "../components/homePage/about.jsx";
import CareArtBlock from "../components/homePage/CareArtBlock.jsx";
import Shoe from "../components/homePage/shoe.jsx";
import HowItWorks from "../components/homePage/howItWorks.jsx";

const Home = () => {
  return (
    <div>
      <TopBlock />
      <div className="bg-black">
        <CareArtBlock />
        <Shoe />
      </div>
      <HowItWorks/>
      <EndlessPossibilities />
      <About />
    </div>
  );
};

export default Home;
