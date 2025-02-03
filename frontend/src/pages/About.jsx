import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
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
            At Forever, we’re passionate about delivering high-quality fashion
            that stands the test of time. Founded with the vision to bring
            trendy yet timeless clothing to fashion enthusiasts, we offer a wide
            range of styles designed to fit every personality and occasion. Our
            team works tirelessly to curate the best selection of clothing,
            ensuring that each piece reflects our commitment to quality,
            comfort, and style.
          </p>
          <p>
            We believe fashion is more than just clothing—it’s a way to express
            who you are. That’s why we focus on creating looks that are not only
            stylish but also versatile and long-lasting. Whether you’re dressing
            up for a special event or looking for everyday essentials, Forever
            is here to help you find the perfect piece to make you feel
            confident and chic, every step of the way
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Our mission at Forever is to provide stylish, high-quality clothing
            that empowers individuals to express their unique personalities. We
            strive to offer a seamless shopping experience with a focus on
            timeless fashion that blends trendsetting designs with lasting
            comfort and durability.
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
            At Forever, we prioritize quality in every piece we offer, ensuring
            each item is crafted with attention to detail and built to last.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            Shopping with us is easy and hassle-free, with quick delivery and a
            user-friendly website to make your experience seamless from start to
            finish.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            Our dedicated team is always ready to assist you, providing
            personalized support to ensure you find exactly what you need with a
            smile.
          </p>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default About;
