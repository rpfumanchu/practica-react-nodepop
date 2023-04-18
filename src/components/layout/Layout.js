import Header from "./Header";

import Footer from "./Footer";
import "./Layout.css";

const Layout = ({ title, children, ...rest }) => {
  return (
    <div className="layout">
      <Header className="layout-header" {...rest} />
      <main className="layout-main">
        <h2 className="layout-title">{title}</h2>
        {children}
      </main>
      <Footer className="layout-footer" />
    </div>
  );
};

export default Layout;
