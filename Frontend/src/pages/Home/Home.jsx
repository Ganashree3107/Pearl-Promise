import Hero from "../../components/home/Hero";
import WhyPearlPromise from "../../components/home/WhyPearlPromise";
import DiscoverCollection from "../../components/home/DiscoverCollection";
import ComboCollection from "../../components/home/ComboCollection";
import Testimonials from "../../components/home/Testimonials";

function Home() {
  return (
    <>
      <Hero />
      <WhyPearlPromise />
      <section className="bg-white py-8">
        <div className="mx-auto max-w-7xl">
          <div className="h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent" />
        </div>
      </section>
      <DiscoverCollection />
      <Testimonials />
      <ComboCollection />
    </>
  );
}

export default Home;
