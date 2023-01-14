import React from "react";
import "./DetailPage.css";
// import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import TokenService from "../../utils/tokenService";
import { getBlog } from "../../utils/blogService";
import HTMLReactParser from "html-react-parser";
import { removeABlog } from "../../utils/blogService";
import useUser from "../../hooks/useUser";

function DetailPage() {
  let navigate = useNavigate();

  const id = useParams().id;

  const { user } = useUser();

  function deleteSingleBlog(e) {
    e.preventDefault();
    removeABlog(blog._id);
    navigate("/");
    // updateABlog(blog).then((res) => {
    // });
  }

  const [blog, setBlog] = React.useState("");
  // const [blog, setBlog] = React.useState(!!getBlog(id));

  // var MySwal = withReactContent(Swal);

  // const [comment, setComment] = React.useState(!!blog);

  // const [isAuthor, setIsAuthor] = React.useState(
  //   !!TokenService.getUserFromToken()
  // );

  // console.log("check author", blog.author._id);
  // const [isUser, setIsUser] = React.useState(!!blog);

  let fetchBlog = () => {
    // setBlog(blog = "Apple");
    // console.log("Reached fetchBlog function!");
    // console.log(id);
    getBlog(id).then((res) => {
      // console.log(res);
      setBlog(res);
      // if (TokenService.getUserFromToken()._id) {
      //   setIsUser(true);
      //   if (blog.author) {
      //     console.log(TokenService.getUserFromToken()._id);
      //     console.log(blog.author._id);
      //     if (TokenService.getUserFromToken()._id === blog.author._id) {
      //       setIsAuthor(true);
      //     }
      //   }
      // }
    });
  };

  React.useEffect(() => {
    fetchBlog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // let deleteBlog = (blog) => {
  //   console.log("deleted!!!");
  //   removeABlog(blog)
  // removeABlog(id)
  // .then(res => console.log(res.data))
  //     .then(() => {
  //       MySwal.fire({
  //         title: <strong>Blog Deleted!</strong>,
  //         html: <i>Your blog was deleted</i>,
  //         icon: "success",
  //       });
  //     })
  //     .then(() => {
  //       fetchBlog();
  //     });
  // };

  //Function triggered if the user presses the "like" button
  //Edits the blog like count in the blog database table
  // let likeBlog = () => {
  //     setLike(!like)
  //     // const id = "634540287131dc0fdff1164b"
  //     axios.post(`api/blogs/${id}`)
  //     .then(res => console.log(res.data))
  //     .then(() =>  {MySwal.fire({
  //             title: <strong>Blog Liked</strong>,
  //             html: <i>You liked this blog!</i>,
  //             icon: 'success'
  //         })
  //     })
  //     .then(() => {fetchBlog()})
  // }

  // let handleChange = (e) => {
  //   setComment(`${e.target.value}`);
  // };

  // let handleSubmit = (e) => {
  //   e.preventDefault();
  //   // const id = "6341881d24ab218818a7ceba"
  //   console.log("comment was submitted!");
  //   axios.patch(`api/blogs/${id}`, comment).then((res) => {
  //     console.log(res.data);
  //     fetchBlog();
  //   });
  // };

  return (
    <div>
      {blog ? (
        <article className="detail-section" key={blog._id}>
          <div className="detail-title">
            <h2 className="blog-detail-title">{blog.title}</h2>
            <h3 className="desc">{blog.description} </h3>
            <h3 className="posted">
              Posted on {blog.createdAt.split("T")[0]} by
              <span className="blog-author">
                <Link
                  to={`/profile/${blog.author._id}`}
                  style={{
                    color: "#4a4a4a",
                    textDecoration: "underline",
                    textDecorationColor: "#fa9500",
                  }}
                >
                  {blog.author.name}
                </Link>
              </span>
            </h3>
          </div>

          {blog.image ? (
            <div className="blog-img-container">
              <img
                src={`https://project-3-production.up.railway.app/uploads/${blog.image}`}
                alt={blog.title}
              />
            </div>
          ) : null}

          <div className="blog-content">
            <div>{HTMLReactParser(blog.content)}</div>
            {blog.createdAt < blog.updatedAt ? (
              <h3 className="updated-date">
                Updated on {blog.updatedAt.split("T")[0]}
              </h3>
            ) : null}
          </div>

          <div className="blog-tags-content">
            {blog.tags ? (
              <>
                <ul className="blog-tags">
                  {blog.tags.map((tag) => (
                    <li className="blog-tag" key={tag}>
                      #{tag}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>

          {user && blog.author._id === user._id ? (
            <div className="author-only">
              <div className="edit-blog">
                <Link to={`/blog/edit/${blog._id}`}>
                  <button> Edit blog</button>
                </Link>
              </div>

              <div className="delete-blog">
                <button onClick={(e) => deleteSingleBlog(e)}>
                  Delete blog
                </button>

                {/* <h3>Delete blog</h3> */}
              </div>
            </div>
          ) : null}
          {/* 
                    <div className="message-header">
            <h3 className="title">{blog.title}</h3>

            {blog.image ? <img src={blog.image} alt={blog.title} /> : null}
            <h4 className="description">{blog.description} </h4>
          </div>
          <div className="detail-box">
            <div className="message-body">
              <div>{HTMLReactParser(blog.content || "")}</div>
              <p>
                <strong>Tags:</strong>
              </p>
              {blog.tags ? (
                <ul className="tags">
                  <div className="tags-container">
                    <div className="tags-box">
                      {blog.tags.map((tag) => (
                        <li className="tag" id="tag" key={tag}>
                          {tag}
                        </li>
                      ))}
                    </div>
                  </div>
                </ul>
              ) : null} */}

          {/* <p>
                <strong>Comments:</strong>
              </p>
              {blog.comments ? (
                <ul className="comments">
                  {blog.comments[0]?.comments.map((comment) => (
                    <li className="message is-dark comment" key={comment}>
                      {comment}
                    </li>
                  ))}{" "}
                </ul>
              ) : null} */}

          {/* {isUser ? (
                <div className="user-box">
          

                   <form
                    onSubmit={handleSubmit}
                    className="message is-primary user-only"
                  >
                    <label className="message-header">
                      <strong>Add a comment</strong>
                    </label>
                    <textarea
                      id="comment-input"
                      className="comment-input textarea is-small is-hover"
                      name="comment"
                      value={comment}
                      onChange={handleChange}
                    ></textarea>
                    <button
                      className="add button is-primary"
                      type="Submit"
                      value="Submit"
                    >
                      Submit
                    </button>
                  </form> 
                </div>
              ) : null} */}

          {/* isAuthor ? (
            <div className="author-box">
              <div className="author-only message is-warning">
                <p className="message-header">Author-only Functions</p>
                <div className="author-functions">
                  <div className="delete-function">
                    <button
                      className="delete"
                      aria-label="delete"
                      onClick={() => {
                        deleteBlog(blog._id);
                      }}
                    ></button>
                    <p>Delete Blog</p>
                  </div>

                  <Link to={`/blog/edit/${blog._id}`}>
                    <button className="edit button is-info">Edit Blog</button>
                  </Link>
                </div>
              </div>
            </div>
          ) : null} */}

          {/* <p>Author: {blog.author.name}</p> */}
          {/* <div className="footnotes">
                <p>Posted: {blog.createdAt} </p>
                <p>Updated: {blog.updatedAt} </p>
              </div> */}
        </article>
      ) : null}
    </div>
  );
}

export default DetailPage;
