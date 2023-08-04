import { Github, GithubIcon, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {}

const About: React.FC<Props> = ({}) => {
  return (
    <>
      <div className="px-24 mt-20">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="logo"
            objectFit="cover"
            width={200}
            height={100}
          />
        </Link>
      </div>
      <main
        style={{
          background: `url("/images/bg1.jpg")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="flex min-h-screen flex-col justify-center items-center  p-24 pt-0"
      >
        <div className=" rounded-2xl p-20 flex flex-col">
          <h2 className="text-4xl mb-4 text-bold">Background</h2>
          <p className="text-2xl text-[#545050]">
            In a world increasingly reliant on constant connectivity, the search
            for real-time solutions to critical issues has become paramount. The
            quest to develop a comprehensive system for power outage
            notifications proved both challenging and enlightening.
          </p>

          <p className="text-2xl text-[#545050] my-10">
            Frustrated by the lack of readily available APIs offering real-time
            updates on power outage schedules,I scoured the internet in hopes of
            finding a solution that would provide the necessary immediacy. The
            existing options, such as the{" "}
            <Link
              target="_blank"
              href="https://eskom-calendar-api.shuttleapp.rs/"
              className="text-blue-500"
            >
              Eskom Calendar API
            </Link>
            , fell short as they required periodic queries.
          </p>

          <p className="text-2xl text-[#545050]">
            Then, a spark of inspiration struck: why not create a Platform that
            leverages the power of webhooks to deliver real-time notifications
            of power outages in the area? And so, GridWatch was born, with an
            ambitious aim to revolutionize the way people stay informed about
            electricity disruptions.
          </p>

          <h2 className="text-3xl my-10">Posibilities</h2>
          <p className="text-2xl text-[#545050]">
            The driving force behind GridWatch was to open up a world of
            possibilities for developers and users alike. Armed with a real-time
            webhook integration, the platform unlocks a wealth of potential
            applications. For starters, it empowers the creation of WhatsApp
            notification bots that can efficiently dispatch power cut schedules
            to users' phones, keeping them abreast of any changes as they occur.
          </p>
          <p className="text-2xl text-[#545050] my-10">
            But the potential doesn't stop there. GridWatch opens doors to
            diverse notification systems, from email alerts to push
            notifications on mobile apps, ensuring that users receive immediate
            updates wherever they may be. The vision goes even further,
            imagining a future where industries relying on continuous power can
            utilize this real-time data to automatically manage their
            generators, preventing even the slightest disruption in operations.
          </p>
        </div>
        <div className="flex self-start ml-20 items-center space-x-8">
          <Image
            src="/images/me.jpeg"
            alt="Dellan"
            width={150}
            height={150}
            className="object-contain rounded-full"
          />
          <div>
            <h2 className="text-4xl">Hi, I'm Dellan.</h2>
            <h2 className="text-2xl text-gray-500 text-bold">
              Fullstack Sofware Engineer
            </h2>
            <div className="flex mt-4">
              <div className="flex space-x-5 items-baseline">
                <Link href="https://www.linkedin.com/in/dellan-muchengapadare-2a2086157/">
                  <GithubIcon size={40} color="black" />
                </Link>
                <Link href="https://www.linkedin.com/in/dellan-muchengapadare-2a2086157/">
                  <Linkedin size={40} color="#0e76a8" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default About;
