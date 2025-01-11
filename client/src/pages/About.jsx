import React from "react";
import "./styles/About.css";

const About = () => {
  const aboutProject = "About|";
  const splitHeading = aboutProject.split("");
  const aboutParagraphs = [
    {
      content: `The Note-Making Application is a feature-rich and secure platform
          developed by Ishan, a skilled MERN stack developer, to streamline the
          process of managing personal notes. This application provides robust
          user authentication and authorization using JSON Web Tokens (JWT),
          ensuring a secure experience. Users can register and log in to access
          their personal dashboard, where their notes are stored privately.
          Every note is linked to its respective owner, guaranteeing that only
          the user can create, edit, or delete their content. Unauthorized users
          have restricted access and can only view public notes, maintaining a
          balance between privacy and accessibility.
    `,
    },
    {
      content: ` The Note-Making Application utilizes modern technologies and best
          practices to deliver a reliable and efficient solution. The frontend's
          styling could be further improved with Tailwind CSS or Material-UI for
          a polished look, while advanced error-handling middleware in the
          backend ensures smooth operation. With plans for deployment on
          platforms like Render, users can access the application conveniently
          from anywhere. Version control is managed via GitHub, ensuring
          continuous improvement and collaboration. Developed with a focus on
          security, functionality, and user experience, this application stands
          as a testament to Ishan’s expertise and commitment to delivering
          high-quality web solutions.`,
    },
  ];
  return (
    <div className="flex gap-5">
      <div className="w-fit opacity-0 fadeInAnimation">
        <img src="self.jpg" alt="" className="w-[full] h-[full] rounded-lg" />
      </div>
      <div className="flex flex-col gap-5">
        
        <div className="bg-gray-100 p-[20px] rounded-xl relative opacity-0 fadeInAnimation">
          <div className="h-[150px] w-[100px] bg-gray-100 absolute bottom-[-40px] right-[0px]" style={{
            clipPath: "polygon(100% 0, 0 0, 100% 100%)"
          }} ></div>
          <p className="text-[20px] pb-5">
          {splitHeading.map((item, index) => {
            return (
              <span
                key={index}
                className={`font-mono opacity-0 ${
                  index === splitHeading.length - 1
                    ? "blinkAnimation"
                    : "fadeInAnimation"
                }`}
                style={{
                  animationDelay: `${0.9 * index}s`,
                }}
              >
                {item}
              </span>
            );
          })}
        </p>
          {aboutParagraphs.map((item, index) => {
            return (
              <p
                className="text-justify mb-[20px] opacity-0 fadeInAnimation z-[10]"
                key={index}
                style={{
                  animationDelay: `${index * 0.5}s`,
                }}
              >
                {item.content}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default About;
