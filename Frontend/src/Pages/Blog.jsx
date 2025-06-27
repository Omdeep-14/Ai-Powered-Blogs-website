import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import {
  assets,
  blog_data,
  comments_data,
} from "../assets/QuickBlog-Assets/assets";
import Footer from "../Components/Footer";
import Loader from "../Components/Loader";
import { useAppContext } from "../CONTEXT/AppContext";
import toast from "react-hot-toast";

function Blog() {
  const { id } = useParams();
  const { axios } = useAppContext();

  const [Comments, setComments] = useState([]);
  const [data, setData] = useState(null);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/blog/add-comment", {
        blog: id,
        name,
        content,
      });
      if (data.success) {
        toast.success(data.message);
        setName("");
        setContent("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`);
      data.success ? setData(data.blog) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchComments = async () => {
    try {
      const { data } = await axios.post(`/api/blog/comments`, { blogId: id });
      if (data.success) {
        setComments(data.comments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, [id]);
  return data ? (
    <div className="relative">
      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute -top-50 -z-1 opacity-50"
      />
      <Navbar />
      <div className="text-center mt-20 text-gray-600">
        <p className="text-primary py-4 font-medium">
          Published on {data.createdAt}
        </p>
        <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800">
          {data.title}
        </h1>
        <h2 className="my-5 max-w-lg truncate mx-auto">{data.subTitle}</h2>
        <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary">
          By-Jon Snow
        </p>
      </div>
      <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
        <img src={data.image} alt="" className="rounded-md" />
        <div
          dangerouslySetInnerHTML={{ __html: data.description }}
          className="rich-text max-w-3xl mx-auto"
        ></div>
        <div className="mt-14 mb-10 max-w-3xl mx-auto"></div>
        <p className="font-semibold mb-4">Comments ({Comments.length})</p>
        <div className="flex flex-col gap-4">
          {Comments.map((item, index) => (
            <div
              key={index}
              className="relative bg-primary/2 border border-primary/5 max-w-xl rounded text-gray-600"
            >
              <div className="flex items-center gap-2 mb-2">
                <img src={assets.user_icon} alt="" className="w-6" />
                <p className="font-medium">{item.name}</p>
              </div>
              <p className="text-sm max-w-md ml-8">{item.content}</p>
              <div>{item.createdAt}</div>
            </div>
          ))}
        </div>
        <div className="max-w-3xl mx-auto">
          <p className="font-semibold mb-4 mt-6">Add your comment</p>
          <form onSubmit={addComment}>
            <input
              type="text"
              placeholder="Name"
              required
              className="w-full p-2 border border-gray-300 rounded outline-none"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <textarea
              placeholder="comment"
              required
              className="w-full p-2 border border-gray-300 rounded outline-none h-48"
              onChange={(e) => setContent(e.target.value)}
              value={content}
            ></textarea>
            <button
              type="submit"
              className="bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <Loader />
  );
}

export default Blog;
