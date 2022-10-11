import tokenService from "./tokenService.js";
import axios from "axios";
const BASE_URL = "https://blogging-platform-zdrxz7zzzq-nw.a.run.app/api/blogs/";

// export const getImages = async () => {
//   try {
//     let res = await fetch("/images");
//     return res.json();
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getImage = async (id) => {
//   try {
//     // axios.get(`api/blogs/${id}`);
//     let res = await fetch(`/images/${id}`);
//     // console.log(res.json());
//     return res.json();
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const createImage = async (image) => {
//   try {
//     const token = tokenService.getToken();
//     let res = await fetch(`/images`, {
//       method: "POST",
//       headers: {
//         "content-type": "application/json",
//         Authorization: "Bearer " + token,
//       },
//       body: JSON.stringify(image),
//     });
//     return res.json();
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getBlogs = async () => {
  try {
    let res = await fetch("/api/blogs");
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getBlog = async (id) => {
  try {
    // axios.get(`api/blogs/${id}`);
    let res = await fetch(BASE_URL + id);
    // console.log(res.json());
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const updateABlog = async (blog) => {
  try {
    const token = tokenService.getToken();

    let res = await fetch(`/api/blogs/${blog._id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(blog),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const createABlog = async (blog) => {
  try {
    const token = tokenService.getToken();
    let res = await fetch(`/api/blogs`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(blog),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const removeABlog = async (blog) => {
  try {
    const token = tokenService();
    let res = await fetch(`/api/blogs/${blog._id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(blog),
    });
    return res;
  } catch (error) {}
};

const exports = {
  getBlogs,
  getBlog,
  updateABlog,
  createABlog,
  removeABlog,
  // getImage,
  // getImages,
  // createImage,
};

export default exports;
