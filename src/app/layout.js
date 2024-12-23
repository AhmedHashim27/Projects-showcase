
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";


import 'bootstrap/dist/css/bootstrap.min.css';
import "./style/globals.css";

export const metadata = {
  title: "Dev Ahmed - Portfolio",
  description: "Portfolio of Dev Ahmed - frontend developer ",
  icons :{
    icon : "/assets/images/header/hero-avatar.jpg"
  }
};


export default function RootLayout({ children }) {
  return (
    <html lang="en"> 
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
