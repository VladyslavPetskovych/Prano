import {Header} from "./components/index.js";
import {Home} from "./pages/index.js";

const App = () => {
    return (
        <>
            <div>
                <Header/>
                <Home/>
            </div>
        </>
    );
};

export {
    App
}