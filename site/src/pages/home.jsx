import EndlessPossibilities from "../components/homePage/PremiumService.jsx";
import { TopBlock } from "../components/homePage/topBlock.jsx";
import About from "../components/homePage/about.jsx";
import CareArtBlock from "../components/homePage/CareArtBlock.jsx";
import Shoe from "../components/homePage/shoe.jsx";
import HowItWorks from "../components/homePage/howItWorks.jsx";
import ReviewsSlider from "../components/homePage/reviewsSlider.jsx";
import SaleButton from "../components/homePage/sale/saleButton.jsx";
import TelegramBlock from "../components/homePage/telegramBlock.jsx";
import DryCleaning from "../components/homePage/dryCleaning.jsx";
import OurPartners from "../components/homePage/ourPartners.jsx"
const Home = () => {
  return (
    <div>
      <TopBlock />
      <HowItWorks />
      <div className="bg-black">
        <CareArtBlock />
        <Shoe />
        <DryCleaning />
      </div>
      <TelegramBlock />
      <SaleButton />
      <EndlessPossibilities />
      <ReviewsSlider />
    
      <About />
      <OurPartners/>
    </div>
  );
};

export default Home;
