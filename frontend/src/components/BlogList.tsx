"use client";


import BlogCard from "./BlogCard";

const BlogList = () => {
  const blogs = [
    {
      title: "Instant Help at Your Fingertips",
      
      image: "https://images.pexels.com/photos/163097/twitter-social-media-communication-internet-network-163097.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
       href: "/blog/slug",
    },
    {
      title: "Instant Help at Your Fingertips",
      image: "https://images.pexels.com/photos/163097/twitter-social-media-communication-internet-network-163097.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
       href: "/blog/slug",
    },
    {
      title: "Unlocking the Power of Social Media",
       image: "https://images.pexels.com/photos/163097/twitter-social-media-communication-internet-network-163097.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      href: "/blog/slug",
    },
  ];

  return (
    <div className="relative min-h-screen flex justify-center items-center bg-cover bg-fixed" style={{ backgroundImage: "url('/images/mybackground.jpeg')" }}>
      <div className="w-full bg-white bg-opacity-40 backdrop-blur-lg p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, index) => (
            <BlogCard key={index} {...blog} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
