 import Navbar from "@/app/components/Navbar"
 import Hero from "@/app/components/Hero"
 import About from "@/app/components/About"
// import Products from "@/app/components/Products"
 import Services from "@/app/components/Services"
 import ProductsSection from "./components/ProductsSection"
 import Gallery from "@/app/components/Gallery"
// import Testimonials from "@/app/components/Testimonials"
 import Abonements from "@/app/components/Abonements"
 import Contact from "@/app/components/Contact"
 import Footer from "@/app/components/Footer"

export default function Home() {
  return (
    <main className="bg-dark text-spa overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />

      <Services />
      <ProductsSection />
      <Gallery />
      <Abonements />
      <Contact />
        <Footer />

         {/*<Products />
      
      
      <Testimonials />
       
      
        */}
    </main>
  )
}