import DavidImage from "@/images/david-image.png";
import FranciscoImage from "@/images/francisco-image.png";
import ValentinaImage from "@/images/valentina-image.png";
import TeamCard from "../TeamCard";

export default function Team() {
  return (
    <section className="w-full flex flex-col items-center justify-center pt-10">
      <h2 className="text-[clamp(30px,3.3vw,40px)] text-[#000] font-normal">
        Meet my team
      </h2>

      {/* Cambiamos de flex-row a flex-col en móviles, y cambiamos espaciado */}
      <div
        className="flex flex-col md:flex-row items-center md:items-start 
                space-y-20 md:space-y-0 md:space-x-[clamp(10px,5.47vw,70px)] mt-14"
      >
        <TeamCard
          imageSrc={FranciscoImage.src}
          name="Francisco Ameri"
          role="Project Manager & FullStack"
          linkedinLink="https://www.linkedin.com/in/fran-ameri/"
          githubLink="https://github.com/franameri"
        />
        <TeamCard
          imageSrc={DavidImage.src}
          name="David Abril Perrig"
          role="FullStack Developer"
          linkedinLink="https://www.linkedin.com/in/david-abril-perrig/"
          githubLink="https://github.com/DavidAbril"
        />
        <TeamCard
          imageSrc={ValentinaImage.src}
          name="Valentina Correa"
          role="UX/UI Designer & Graphic Designer"
          linkedinLink="https://www.linkedin.com/in/valentinacorreaok/"
        />
      </div>
    </section>
  );
}
