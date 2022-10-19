import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./homepage.css";
export default function HomePage() {
  let [blogs, setBlogs] = useState([]);
  let [tags, setTags] = useState([]);
  useEffect(() => {
    getBlogs();
    getTags();
  }, []);

  async function getBlogs() {
    try {
      const response = await fetch("/api/blogs");
      const blogs = await response.json();
      setBlogs(blogs);
    } catch (err) {
      console.log(err);
    }
  }
  async function getTags() {
    try {
      const response = await fetch("/api/blogs");
      const blogs = await response.json();
      blogs.forEach((blog) => {
        blog.tags.forEach((tag) => {
          tags.push(tag);
        });
      });
    } catch (err) {
      console.log(err);
    }
  }
  const onFilterChange = (e) => {
    const thisTag = e.target["name"];
    if (e.target.checked) {
      setTags([...tags, thisTag]);
    } else {
      setTags(tags.filter((tag) => tag !== thisTag));
    }
    if (tags.size) {
      setBlogs(
        blogs.filter((blog) => {
          return tags.includes(blog.tags);
        })
      );
    }
  };

  const onFilterButton = (e) => {
    console.log(e.target.value);
    const thisTag = e.target.value;
    setTags(tags.filter((tag) => tag === thisTag));
  };

  const onDateSortChange = (e) => {
    console.log(e.target);
    const newBlogs = structuredClone(blogs);
    setBlogs(
      newBlogs.sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
    );
  };

  const onAlphabetSortChange = (e) => {
    const newBlogs = structuredClone(blogs);
    setBlogs(newBlogs.sort((a, b) => a.title.localeCompare(b.title)));
  };

  return (
    <div>
      <div className="main-flex">
        <div className="blogs-side">
          <h2>Sort by:</h2>
          <input
            type="radio"
            id="latest"
            name="sort"
            value="latest"
            onChange={onDateSortChange}
          />
          <label for="latest">Latest</label>

          <input
            type="radio"
            id="title"
            name="sort"
            value="title"
            onChange={onAlphabetSortChange}
          />
          <label for="title">Title</label>
          <hr />
          <h2>Filter by:</h2>
          {blogs.map((blog) =>
            blog.tags.map((tag) => (
              <label class="container">
                {tag}
                <input
                  type="checkbox"
                  name={tag}
                  onChange={onFilterChange}
                  checked={tags.includes(tag)}
                />
              </label>
            ))
          )}
        </div>

        <main className="blogs-feed">
          {blogs.map((post) =>
            tags.some((el) => post.tags.includes(el)) ? (
              //article post

              <article className="article-post" key={post._id}>
                <div>
                  <Link to={`/profile/${post.author._id}`}>
                    <div className="user-details">
                      <img
                        src={
                          post.author.image
                            ? post.author.image
                            : require("../../images/default-user.png")
                        }
                        alt="profile pic"
                      />
                      <p>{post.author.name}</p>
                    </div>
                  </Link>
                </div>

                <h2 className="homepage-title">{post.title}</h2>
                {post.image ? <img src={post.image} alt={post.title} /> : null}
                <p>
                  {post.description.substring(0, 300)}...{" "}
                  {<Link to={`/blogpost/detail/${post._id}`}>Read on</Link>}
                </p>
                <div className="post-settings">
                  <div className="box1">
                    <p>Posted on: {post.createdAt.substring(0, 10)}</p>
                  </div>

                  <div className="box2">
                    <ul className="tags">
                      {post.tags.map((tag) => (
                        <li key={tag}>
                          <button
                            // className="homepage-button"
                            className="tag-buttons"
                            value={tag}
                            onClick={onFilterButton}
                          >
                            #{tag}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ) : null
          )}
        </main>
      </div>
    </div>
  );
}
