import Header from "./Header";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
import { NavLink } from "react-router-dom";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>

      {/* Header Section */}
      <Header />

      {/* Main Content */}
      <main style={{ minHeight: "70vh" }}>
        <Toaster />
        {children}
        {/* <Footer /> */}
      </main>
    </>
  );
};

Layout.defaultProps = {
  title: "Blog App",
  description: "MERN stack project",
  keywords: "mern, react, node, mongodb",
  author: "JVKE",
};

export default Layout;
