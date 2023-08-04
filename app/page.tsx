import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  const { userId } = auth();

  if (userId) redirect("/dashboard");
  return (
    <main
      style={{
        background: `url("/images/bg1.jpg")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="flex min-h-screen flex-col justify-center items-center  p-24"
    >
      <div className=" rounded-2xl p-20 items-center flex flex-col">
        <Image
          src="/images/logo.png"
          alt="logo"
          objectFit="cover"
          width={500}
          height={100}
        />
        <p className="text-2xl text-[#545050] text-center">
          A South African cutting-edge platform that offers real-time webhook
          notifications for power outages in your area. With its powerful
          webhook integration, GridWatch keeps you informed whenever
          there&apos;s a disruption in your electricity supply, enabling you to
          take prompt actions and stay prepared for any potential challenges.
        </p>
        <p className="mt-4 text-md text-[#4C5AD7]">
          Never be caught off guard by power cuts again with GridWatch by your
          side.
        </p>

        <Link href={"/sign-in"}>
          <div className="flex text-lg items-center justify-center rounded-md px-20 mt-10 py-8 h-12 bg-[#8690E8]">
            Get Started
          </div>
        </Link>
      </div>
      <Link href="/about">
        <p className="text-gray-500 text-md">Learn more</p>
      </Link>
    </main>
  );
}
