// import { json } from "docker/src/languages.js";
import tokenService from "./tokenService.js";
// const BASE_URL = "https://blogging-platform-365219.ew.r.appspot.com";
import { BASE_URL } from "./constants.js";
// import Axios from "axios";

export const getBlogs = async () => {
  try {
    let res = await fetch(`${BASE_URL}/api/blogs`);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getBlog = async (blogID) => {
  try {
    let res = await fetch(`${BASE_URL}/api/blogs/${blogID}`);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getUserBlog = async (userID) => {
  try {
    let res = await fetch(`${BASE_URL}/api/users/${userID}`);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const updateABlog = async (blog) => {
  try {
    const token = tokenService.getToken();

    let res = await fetch(`${BASE_URL}/api/blogs/${blog._id}`, {
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
    let res = await fetch(`${BASE_URL}/api/blogs`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: blog,
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const uploadAnImage = async (formData) => {
  try {
    let res = await fetch(
      "https://api.cloudinary.com/v1_1/ds0xop14b/image/upload",
      formData,
      {
        method: "POST",
        body: formData,
      }
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const removeABlog = async (blogID) => {
  try {
    const token = tokenService.getToken();
    let res = await fetch(`${BASE_URL}/api/blogs/${blogID}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
