"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import useSWR from "swr";

export default function Dashboard() {
  // const [data, setData] = useState([]);
  // const [err, setErr] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const getData = async () => {
  //     setIsLoading(true);
  //     const res = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
  //       cache: "no-store",
  //     });

  //     if (!res.ok) {
  //       throw new Error("Failed to fetch data");
  //     }
  //     const data = await res.json();

  //     setData(data);
  //     setIsLoading(false);
  //   };
  //   getData();
  // }, []);

  const session = useSession();

  const router = useRouter();
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR(
    `/api/posts?username=${session?.data?.user.name}`,
    fetcher
  );
  console.log(data);

  if (session.status === "loading") {
    return <div>Loading...</div>;
  }

  if (session.status === "unauthenticated") {
    router.push("/dashboard/login");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const desc = e.target[1].value;
    const img = e.target[2].value;
    const content = e.target[3].value;

    try {
      await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title,
          desc,
          img,
          content,
          username: session.data.user.name,
        }),
      });
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  if (session.status === "authenticated") {
    return (
      <div className="flex gap-24">
        <div className="flex-[1]">
          {isLoading
            ? "Loading"
            : data.map((post) => (
                <div
                  className="flex items-center justify-between my-12 mx-0"
                  key={post._id}
                >
                  <div className="w-[200px] h-[100px]">
                    <Image
                      src={post.img}
                      width={200}
                      height={100}
                      className=" object-cover"
                      alt="post image"
                    />
                  </div>
                  <h2 className="postTitle">{post.title} </h2>
                  <span
                    onClick={() => handleDelete(post._id)}
                    className=" text-red-700 cursor-pointer"
                  >
                    X{" "}
                  </span>
                </div>
              ))}
        </div>
        <form className="flex-[1] flex flex-col gap-5" onSubmit={handleSubmit}>
          <h1>Add New Post</h1>
          <input
            className="p-2 bg-transparent border border-[#bbb] rounded-sm text-[#bbb] font-bold text-xl"
            type="text"
            placeholder="Title"
          />
          <input
            className="p-2 bg-transparent border border-[#bbb] rounded-sm text-[#bbb] font-bold text-xl"
            type="text"
            placeholder="Desc"
          />
          <input
            className="p-2 bg-transparent border border-[#bbb] rounded-sm text-[#bbb] font-bold text-xl"
            type="text"
            placeholder="Image Url "
          />
          <textarea
            className="p-2 bg-transparent border border-[#bbb] rounded-sm text-[#bbb] font-bold text-xl"
            placeholder="Content"
            cols="30"
            rows="10"
          ></textarea>
          <button
            className=" p-5 bg-[#53c28b] text-[#eee] font-bold"
            type="submit"
          >
            Post
          </button>
        </form>
      </div>
    );
  }
}
