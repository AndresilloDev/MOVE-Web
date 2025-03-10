import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const MainLayout = () => {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
        <Header isLoggedIn={true}/>
        <div className="flex h-full">
            <div className="w-16">
                <Sidebar />
            </div>
            <main className="flex-1 px-10">
                <Outlet />
            </main>
        </div>
    </div>
  );
};

export default MainLayout;