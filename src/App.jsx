import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./modules/Home";
import Details from "./modules/Details/Details";
import NotFound from "./components/NotFound/NotFound";
import MainLayout from "./components/layouts/MainLayout/MainLayout";
import Signin from "./modules/Auth/pages/Signin/Signin";
import Signup from "./modules/Auth/pages/Signup/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="movies/:movieId" element={<Details />} />

          <Route path="/sign-in" element={<Signin />}/>
          <Route path="/sign-up" element={<Signup />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
