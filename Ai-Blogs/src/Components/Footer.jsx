import React from "react";
import { assets, footer_data } from "../assets/QuickBlog-Assets/assets";

function Footer() {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32  mt-16 bg-primary/3">
      <div className="flex flex-col md:flex-row items-start justify-betweeen gap-10 py-10 border-b border-gray-500/30 text-gray-500">
        <div>
          <img src={assets.logo} alt="" />

          <p className="max-w[410px] mt-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo ducimus
            laudantium illum sit exercitationem accusamus nobis quos nulla
            veritatis aliquam, vel autem, voluptatem placeat doloribus
            perspiciatis. Odio placeat tenetur a!
          </p>
        </div>
        <div className="flex justify-between w-full md:w-[45%] gap-5 md:gap-10 lg:gap-20">
          {footer_data.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-gray-900 md:mb-5">
                {section.title}
              </h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="hover:underline transition">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5"></div>
      </div>

      <p className="py-4 text-center text-sm md:text-base text-gray-500">
        Copyright 2025 QuikBlog All Right Reserved
      </p>
    </div>
  );
}

export default Footer;
