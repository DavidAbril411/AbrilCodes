import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Team from "@/components/sections/Team";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import Header from "@/components/Header";


export default function Home() {
  return (
    <div className="w-screen overflow-hidden">
      <Header/>
      <Hero/>
      <About/>
      <Services/>
      <Team></Team>
      <Projects/>
      <Contact/>
      <Footer/>
    </div>
  );
}
