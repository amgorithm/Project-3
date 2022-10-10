import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useUser from "../../hooks/useUser";
import { getUserBlog } from "../../utils/blogService";
import HTMLReactParser from "html-react-parser";

function Profile() {
  const { user } = useUser();
  // console.log(user);
  const [blog, setBlog] = useState();

  const { userID } = useParams();

  // TODO: Display blogs by user

  // const getBlogData = async () => {
  //   const blog = await getUserBlog(userID);
  //   setBlog(blog);
  //   console.log("test data ->", blog);
  // };
  // console.log(typeof user.createdAt);

  useEffect(() => {
    if (!userID) {
      return;
    }

    async function getBlogData() {
      const blog = await getUserBlog(userID);
      setBlog(blog);
      console.log("blog data ->", blog);
      console.log("blog created", blog.blogs);
    }
    getBlogData();
  }, [userID]);

  // TODO: Upload / edit profile picture
  // TODO: Upload / edit bio

  return (
    <div>
      <section>
        {blog ? (
          <div>
            <div>
              <p>User: {blog.name}</p>
              <p>Joined: {blog.createdAt}</p>
              <p>Blogs: {blog.blogs.length}</p>
              {blog._id === user._id ? <button>Edit</button> : null}
            </div>

            <h2> Blogs by {blog.name}</h2>
            {blog.blogs
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((b) => (
                <>
                  <Link to={`/blog/${b._id}`}>
                    <h3>{b.title}</h3>
                  </Link>

                  <div>{HTMLReactParser(b.content)}</div>
                </>
              ))}
            <Link to={`/profile/${blog._id}/blogs`}>
              <p>View more of {blog.name}'s blogs </p>
            </Link>
          </div>
        ) : null}
      </section>
    </div>
  );
}

export default Profile;
