import Navbar from "./Navigation/NavBar";

const Layout = ({ children }) => {
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