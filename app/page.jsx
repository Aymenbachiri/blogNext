import Image from "next/image";
import hero from "/public/hero.png";

export default function Home() {
  return (
    <div className="flex items-center gap-24">
      <div className="flex-1 flex flex-col gap-12">
        <h1 className="text-5xl font-bold">Better website for your posts.</h1>
        <p className="text-xl font-normal">Turning your Idea Into Reality.</p>
        <button className="p-[20px] cursor-pointer bg-[#53c28b] border-none rounded-md w-max text-white">
          See Our Works
        </button>
      </div>
      <div className="">
        <Image
          src={hero}
          className="w-full h-[500px] object-cover animate-bounce"
          alt="pp"
        ></Image>
      </div>
    </div>
  );
}
