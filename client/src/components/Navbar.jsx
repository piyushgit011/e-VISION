import { HiMenuAlt1 } from "react-icons/hi";
import { BsArrowBarLeft, BsEye } from "react-icons/bs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-[100] bg-siteBg">
      <div className="box flex flex-row py-4 justify-between items-center px-5">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-white font-logo flex flex-row items-center justify-center cursor-pointer" onClick={() => navigate('/')}>
            <BsEye /> -VISION
          </h1>
        </div>
        <div
          className="block sm:hidden text-white text-3xl cursor-pointer"
          onClick={() => setMenu(!menu)}
        >
          <HiMenuAlt1 />
        </div>
        <div className="nav-links hidden sm:flex sm:flex-row items-center gap-5 sm:text-lg text-white font-medium">
            <p className="cursor-pointer" onClick={() => navigate('/login')}>Log In</p>
          <p className="cursor-pointer">Class</p>
          <p className="cursor-pointer">WorkPlace</p>
        </div>
        <div
          className={`sm:hidden flex flex-col ${
            menu ? "translate-y-0 opacity-100" : "translate-y-[100%] opacity-0"
          } bg-slate-700 text-white absolute top-0 left-0 w-[100%] duration-300 gap-4 p-3 py-10 items-center justify-center shadow-2xl text-sm`}
        >
          <div
            className="text-xl cursor-pointer"
            onClick={() => setMenu(!menu)}
          >
            <BsArrowBarLeft />
          </div>
          <p
            className="cursor-pointer"
            onClick={() => {
              setMenu(false);
            }}
          >
            Log In
          </p>
          <div
            className="cursor-pointer"
            onClick={() => {
              setMenu(false);
            }}
          >
            Class
          </div>
          <p
            className="cursor-pointer"
            onClick={() => {
              setMenu(false);
            }}
          >
            WorkPlace
          </p>
        </div>
      </div>
    </div>
  );
}
