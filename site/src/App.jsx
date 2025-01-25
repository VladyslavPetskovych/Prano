import {Header} from "./components/utils/header.jsx";
import {Home} from "./pages/home.jsx";
import {Footer} from "./components/utils/footer.jsx";

const App = () => {
    return (
        <>
            <div>
                <Header/>
                <Home/>
                <Footer/>
            </div>
        </>
    );
};

export {App};
