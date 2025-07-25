import Footer from "./Footer";
import Navbar from "./Navbar";
import ScrollToTop from "./ScrollToTop";
import AssistantAvatar from "./AssistantAvatar";

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <div id="main">
                {children}
            </div>
            {/* <header id="home">
                <main>
                    {children}
                </main>
            </header> */}
            <Footer />
            <ScrollToTop />
            <AssistantAvatar />
        </>
    );
}
 
export default Layout;