import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap16">
        <img
          src={assets.about_img}
          alt="about"
          className="w-full md:max-w-[450px]"
        />
        <div
          className="flex flex-col justify-center gap-6 md:w-2/4
         text-gray-600"
        >
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
            ratione obcaecati voluptatum vel ut repudiandae molestias corrupti!
            Fuga quas molestiae quod, non eius illum, laudantium explicabo amet
            libero culpa est?
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime
            sapiente beatae doloribus laboriosam, facere alias rerum. Non,
            labore eaque ducimus in, quam inventore doloribus, amet molestiae
            debitis quas provident magnam!
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
            aperiam repellat similique dolorum sit sequi ipsam molestias eaque
            ducimus itaque. Nostrum reiciendis laudantium atque voluptatibus
            alias ex a inventore labore.
          </p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
            architecto quas necessitatibus iste repellendus ipsa,
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
            architecto quas necessitatibus iste repellendus ipsa,
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
            architecto quas necessitatibus iste repellendus ipsa,
          </p>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default About;
