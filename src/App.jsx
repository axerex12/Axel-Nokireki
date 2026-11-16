import "./styles/site.css";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import ClipForge from "./components/clipforge/ClipForge.jsx";
import Work from "./components/Work.jsx";
import Cv from "./components/Cv.jsx";
import Contact from "./components/Contact.jsx";

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="btn sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:px-6"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <ClipForge />
        <Work />
        <Cv />
      </main>
      <Contact />
    </>
  );
}
