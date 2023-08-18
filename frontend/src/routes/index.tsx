import { Route, Routes as Switch, BrowserRouter, Navigate } from "react-router-dom";
import { EditProfile } from "../pages/EditProfile";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { NewProfile } from "../pages/NewProfile";

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/home" element={ <Home /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/new-profile" element={ <NewProfile /> } />
      <Route path="/edit-profile" element={ <EditProfile /> } />
      <Route path="*" element={ <Navigate to="/login" /> } />  
    </Switch>
  </BrowserRouter>
)