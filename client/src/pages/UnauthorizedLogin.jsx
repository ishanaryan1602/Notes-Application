import React from "react";
import { Link } from "react-router-dom";

const UnauthorizedLogin = () => {
  return (
    <div className="w-full h-fit p-5 bg-white overflow-hidden flex justify-center items-center relative">
      <div className="w-8/12">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe, iure?
        Dolorem, tempora quia. Repudiandae facilis voluptatem corrupti
        necessitatibus voluptate! Dolore distinctio animi aperiam rem adipisci
        magnam, quibusdam odit, exercitationem consequatur delectus iure eos
        dolor, praesentium qui. Unde dolore eaque laudantium temporibus aperiam
        quae dignissimos explicabo dolor, ducimus perferendis totam debitis
        minus repellendus commodi quis, distinctio ad. Ipsa dolorum fugiat fuga
        quos aliquam ea vitae, vero suscipit quasi libero praesentium. Illo
        perspiciatis sequi aperiam consequatur labore fugit laudantium, a cum
        laboriosam maxime voluptatem nisi, explicabo nihil officiis, architecto
        praesentium iure tenetur. Quo, eum natus culpa amet praesentium eligendi
        sapiente quasi eaque ab asperiores explicabo voluptatibus? Id debitis
        eligendi beatae maxime deleniti aspernatur? Laudantium quos laborum
        voluptas exercitationem, a dignissimos cupiditate eligendi veniam ullam
        neque, fugit sapiente minima at quis velit? Distinctio odit excepturi
        quas illo recusandae doloribus veritatis pariatur? Illum sequi, magni
        suscipit aliquid unde quae explicabo modi vitae velit eos dolore eius
        commodi ut non facere dolorem placeat distinctio facilis itaque
        temporibus corrupti nam eveniet dignissimos et? Odio laborum, optio, sed
        animi eum aliquid illum dolorem voluptates nostrum earum quas, tempora
        vitae ab dolor. Nesciunt architecto omnis temporibus vel molestias
        rerum, dolore suscipit voluptatem optio aspernatur ducimus, reiciendis
        repellendus ex eius. Debitis quo magnam doloribus officia quas nesciunt.
        Fuga vitae dolorum debitis libero veritatis! Pariatur vel ullam totam
        libero est hic iste quas necessitatibus. Illum, quam officia? Animi
        magnam sit nostrum blanditiis itaque? Quaerat ipsum excepturi provident
        laboriosam veniam fugiat velit, soluta distinctio rem tempore
        reprehenderit odit ab aut qui ut omnis optio, maiores ratione. A totam
        iste quisquam alias dolores. Nulla laborum nesciunt dolorem dignissimos
        voluptates. Vel cupiditate quam a eos quaerat officia officiis autem.
        Maxime ad cumque quia perspiciatis? Ex porro beatae, fugiat quam quia
        recusandae maiores voluptatum a ea, natus voluptate? Dolor commodi
        similique nihil deserunt ad harum, expedita asperiores dignissimos.
        Nihil, molestiae. Harum odio quae, iusto facilis quibusdam blanditiis
        atque sapiente aut laboriosam ut! Reprehenderit facilis commodi
        aspernatur veritatis illo modi, in ex eum ullam dignissimos animi vitae,
        explicabo suscipit vero dicta eveniet iusto aliquid beatae asperiores ea
        ducimus maiores dolorum recusandae. Doloremque odit illo commodi
        repellat fuga esse quas veniam unde dolorum optio, tempore possimus
        omnis similique, magnam quasi consequuntur ad rerum deleniti, placeat
        magni itaque iste! Ab laudantium reiciendis non explicabo eos a
        voluptatibus, inventore modi consequuntur et veritatis eius quasi
        exercitationem hic rerum possimus animi, iure vitae? Facere voluptates
        laboriosam inventore tempora nihil sequi quis vero sint vel iusto ipsam
        nulla dicta dolorem, sapiente expedita amet perspiciatis enim quia
        consequatur deserunt, unde maiores ea deleniti vitae. Ullam aspernatur,
        tempora dignissimos quam expedita quo dolorem qui cupiditate aperiam
        unde aliquid facere autem consequatur exercitationem ex impedit
        reprehenderit? Exercitationem architecto consequatur placeat! Sunt
        doloremque ratione quos voluptates iusto, harum repellat et facere
        minima placeat amet vitae asperiores numquam nobis hic optio tempore
        quas obcaecati perspiciatis quia, earum porro voluptatum cupiditate eum.
        Hic tenetur ullam ea quas asperiores in! Officia accusantium quasi quod
        quibusdam repudiandae blanditiis molestiae? Tempora, pariatur quasi quae
        fuga esse iure quam totam.
      </div>
      <div className="w-full h-screen bg-[rgba(255,255,255,0.2)] absolute inset-0 backdrop-blur-md flex justify-center items-center">
        <div className="flex flex-col items-center gap-[15px] pb-[200px]">
          <p className="text-[20px]">
            To access this page you need to be signed in.
          </p>
          <p className="text-[18px]">
            Go to <Link to="/login" className="underline">Login</Link> page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedLogin;
