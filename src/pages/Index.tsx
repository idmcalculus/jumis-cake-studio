
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <FeaturedCategories />
      <Testimonials />
      <CTASection />
    </Layout>
  );
};

export default Index;
