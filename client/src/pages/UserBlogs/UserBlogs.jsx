import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getUserBlog } from "../../utils/blogService";
import HTMLReactParser from "html-react-parser";
// import useUser from "../../hooks/useUser";
import "./UserBlogs.css";

function UserBlogs() {
  // const { user } = useUser();
  const [userBlogs, setUserBlogs] = useState("");
  const { userID } = useParams();

  let navigate = useNavigate();

  useEffect(() => {
    if (!userID) {
      return;
    }
    async function getUserBlogs() {
      const blog = await getUserBlog(userID);
      if (userID !== blog._id) {
        navigate(`/`);
      }
      setUserBlogs(blog);
    }
    getUserBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID]);

  return (
    <section className="user-blogs-list">
      {userBlogs ? (
        <>
          <div key={userBlogs._id} className="user-blogs-intro">
            {userBlogs.image ? (
              <img src={userBlogs.image} alt="profile avatar" className="pfp" />
            ) : (
              <img
                src={require("../../images/default-user.png")}
                alt="profile avatar"
                className="pfp"
              />
            )}
            <h3>
              {" "}
              <Link
                to={`/profile/${userBlogs._id}`}
                style={{
                  color: "#4a4a4a",
                  textDecoration: "underline",
                  textDecorationColor: "#fa9500",
                }}
              >
                {" "}
                {userBlogs.name}'s
              </Link>{" "}
              blog posts
            </h3>
          </div>
          <article>
            {userBlogs.blogs
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((b) => (
                <div key={b._id} className="user-blogs-card">
                  <div className="user-blogs-title">
                    <Link
                      to={`/blogpost/detail/${b._id}`}
                      style={{ color: "black" }}
                    >
                      <h3>{b.title}</h3>
                    </Link>

                    <p className="creation-date">{b.createdAt.split("T")[0]}</p>
                  </div>

                  <div className="user-blogs-description">
                    {HTMLReactParser(b.description)}...{" "}
                    <Link
                      to={`/blogpost/detail/${b._id}`}
                      style={{ color: "#fa9500" }}
                    >
                      Read more
                    </Link>
                  </div>
                </div>
              ))}
          </article>
        </>
      ) : (
        <p className="loading-msg">Loading, please wait.</p>
      )}
    </section>
  );
}

export default UserBlogs;
