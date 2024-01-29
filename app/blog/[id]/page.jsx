import Image from "next/image";
import user from "/public/user.png";
import { LuUserCircle2 } from "react-icons/lu";
import { FaFeatherPointed } from "react-icons/fa6";
import { FaPencilAlt } from "react-icons/fa";

async function getData(id) {
  const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function generateMetadata({ params }) {
  const post = await getData(params.id);
  return {
    title: post.title,
    description: post.desc,
  };
}

function formatTimestamp(timestamp) {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const date = new Date(timestamp);
  const formattedDate = date.toLocaleString("en-US", options);

  return formattedDate;
}

export default async function BlogPost({ params }) {
  const data = await getData(params.id);
  return (
    <div className=" my-0 mx-auto py-0 px-14 flex flex-col justify-between">
      <div className="flex ">
        <div className="flex-[1] flex flex-col justify-between">
          <h1 className=" text-4xl">{data.title} </h1>
          <p className=" text-xl font-normal">{data.desc} </p>
          <div className="flex items-center gap-3">
            <FaPencilAlt size={50} color="white" />
            <div className="flex flex-col">
              <span className="username">{data.username} </span>
              <span className="username">
                {formatTimestamp(data.createdAt)}{" "}
              </span>
            </div>
          </div>
        </div>
        <div className="flex-[1] h-[300px] relative">
          <Image src={data.img} alt="" fill={true} className=" object-cover" />
        </div>
      </div>
      <div className="mt-8 font-normal text-xl text-[#999] text-justify">
        <p className="">{data.content}</p>
      </div>
    </div>
  );
}
