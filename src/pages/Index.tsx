
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeatureSection from '@/components/FeatureSection';
import CourseSection from '@/components/CourseSection';
import TestimonialSection from '@/components/TestimonialSection';
import StatsSection from '@/components/StatsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  // Smooth scroll to top on page load
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-background"
      >
        <Navbar />
        <main>
          <Hero />
          <FeatureSection />
          <CourseSection />
          <StatsSection />
          <TestimonialSection />
          <CTASection />
        </main>
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
