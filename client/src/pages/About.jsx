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
      content: `The platform offers a clean and responsive user interface built with
          React and React Router, ensuring seamless navigation across desktop
          and mobile devices. The backend, powered by Node.js and Express, is
          designed to handle requests efficiently, while MongoDB with Mongoose
          ensures reliable data storage and retrieval. Authentication and
          session management are securely handled with JWT, giving users the
          confidence that their data is protected. The intuitive design and
          seamless integration between the frontend and backend create a smooth
          user experience, making note management easier than ever.`,
    },
    {
      content: `Future enhancements aim to further enrich the application by
          introducing features like a search and filter option to quickly locate
          notes, a rich text editor for formatting with bold, italics, and
          lists, and categories to organize notes effectively. Additionally,
          users will soon be able to upload files or images to their notes,
          enhancing the versatility of the application. To cater to user
          preferences, a dark mode option will be introduced, allowing seamless
          toggling between light and dark themes. These upgrades will elevate
          the platform, making it a comprehensive tool for personal and
          professional note management.`,
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
        <img src="self.jpg" alt="" className="w-[full] h-[full]" />
      </div>
      <div className="flex flex-col gap-5">
        <p className="bg-gray-100 text-[20px] p-3">
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
                  animationDelay: `${0.3 * index}s`,
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
              className="text-[16px] font-light text-justify opacity-0 fadeInAnimation"
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
  );
};

export default About;
