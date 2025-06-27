import React from "react";
import Navbar from "../Components/Navbar";
import Header from "../Components/Header";
import BlogList from "../Components/BlogList";
import NewsLetter from "../Components/NewsLetter";
import Footer from "../Components/Footer";

function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      <BlogList />
      <NewsLetter />
      <Footer />
    </div>
  );
}

export default Home;
