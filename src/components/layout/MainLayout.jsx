import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";

const MainLayout = () => {

    const { user } = useContext(AuthContext);

  return (
    <div className="absolute inset-0 -z-10 min-h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
        <Header isLoggedIn={user !== null}/>
        <div className="flex flex-row flex-1">
            { user && (
                <div className="w-16">
                    <Sidebar/>
                </div>
            )}
            <main className="flex-1 px-10">
                <Outlet/>
            </main>
        </div>
    </div>
  );
};

export default MainLayout;