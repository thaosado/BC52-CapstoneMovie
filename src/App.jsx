import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./modules/Home";
import Details from "./modules/Details/Details";
import NotFound from "./components/NotFound/NotFound";
import MainLayout from "./components/layouts/MainLayout/MainLayout";
import Signin from "./modules/Auth/pages/Signin/Signin";
import Signup from "./modules/Auth/pages/Signup/Signup";
import UserProvider from "./contexts/UserContext/UserContext";
import ProtectedRoute from "./routers/ProtectedRoute/ProtectedRoute";
import AdminMovie from "./modules/AdminMovie/AdminMovie";
import Purchase from "./modules/Purchase/Purchase";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="movies/:movieId" element={<Details />} />

            <Route element={<ProtectedRoute />}>
              <Route path="purchase/:showtimeId"
                element={<Purchase />} />
            </Route>

            <Route path="/sign-in" element={<Signin />} />
            <Route path="/sign-up" element={<Signup />} />
          </Route>


          {/* <Route element={<AdminProtectedRoute />}> */}
          {/* <Route path="/admin" element={<div>Admin Layout</div>}> */}
          <Route path="/admin/movies" element={<AdminMovie />} />
          {/* </Route> */}
          {/* </Route> */}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserProvider >

  );
}

export default App;
