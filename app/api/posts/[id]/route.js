import Post from "@/models/Post";
import connect from "@/utils/db";

export const GET = async (req, { params }) => {
  const { id } = params;
  try {
    await connect();

    const post = await Post.findById(id);
    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new Response("failed to fetch all posts", { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  const { id } = params;
  try {
    await connect();

    await Post.findByIdAndDelete(id);
    return new Response("Post has been deleted", { status: 200 });
  } catch (error) {
    return new Response("failed to fetch all posts", { status: 500 });
  }
};
