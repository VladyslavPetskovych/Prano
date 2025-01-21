import { Header } from "./components/index.js";
import { Footer } from "./components/index.js";
import { Home } from "./pages/index.js";

const App = () => {
  return (
    <>
      <div>
        <Header />
        <Home />
        <Footer />
      </div>
    </>
  );
};

export { App };
