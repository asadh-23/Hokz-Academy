// App.jsx
import React from "react";
import Header from "../../components/Header";
import HeroBlock from "../../components/HeroBlock";
import AboutUsPage from "../../components/AboutSection";
import StatsRow from "../../components/StatsRow";
import TopCategories from "../../components/TopCategoryCards";
import TopSellingCourses from "../../components/TopSellingCourses";
import Testimonials from "../../components/Testimonials";
import JoinUsSection from "../../components/JoinUsSection";
import Footer from "../../components/Footer";
export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-teal-100">
      {/* HEADER */}
      <Header user={false}/>  
      {/* HERO SECTION */}
      <HeroBlock user={false}/>
      {/*ABOUT US SECTION*/}
      <AboutUsPage/>
      {/*STATS ROW*/}
      <StatsRow/>
      {/*TOP CATEGORIES*/}
      <TopCategories/>
      {/*TOP SELLING COURSES*/}
      <TopSellingCourses/>
      {/*TESTIMONIALS*/}
      <Testimonials/>
      {/*JOIN US SECTION*/}
      <JoinUsSection/>
      {/*FOOTER*/}
      <Footer/>

    </div>
  );
}