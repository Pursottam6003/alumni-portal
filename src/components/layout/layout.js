import Navbar from "./Navigation/NavBar";
import { useLocation } from "react-router";

const Layout = ({ children }) => {
  const location = useLocation();
  if ([ "/login", "/register" ].includes(location.pathname)) {
    return (
      <div className="__layout">
        <main className="__layout-main">
          {children}
        </main>
      </div>
    )
  
  }

  return (
    <div className="__layout">
      <Navbar />
      <main className="__layout-main">
        {children}
      </main>
      {/* footer (maybe not required) */}
    </div>
  )
}
export default Layout;