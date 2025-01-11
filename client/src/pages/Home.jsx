import React from "react";
import "./styles/Home.css";
const Home = () => {
  return (
    <div className="w-full h-fit">
      <div className="w-7/12 mx-auto my-[100px] block  text-center">
        <p className="text-5xl text-center leading-[55px] z-10 opacity-0 fadeInAnimation flex flex-col">
          &ldquo; Max out your productivity ! Keep everything in one place and
          never forget a thing – your brain’s new BFF is here! &rdquo;
        </p>
        <p className="my-10 text-[20px] opacity-0 fadeInAnimation" style={{
          animationDelay:"0.3s"
        }} >A new way to store and organise your work and notes</p>
        <img src="home_page_image.png" className="mx-auto h-[400px] opacity-0 fadeInAnimation" style={{
          animationDelay:"0.5s"
        }} alt="" />
      </div>
    </div>
  );
};

export default Home;
