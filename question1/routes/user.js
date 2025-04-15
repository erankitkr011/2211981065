const express = require("express");
const router = express.Router();
const axios = require("axios");

const BASE_URL = "http://20.244.56.144/evaluation-service";


const HEADERS = {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ0NzA0NDI0LCJpYXQiOjE3NDQ3MDQxMjQsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImQ2NzU5MTQzLTNmNDQtNGQ2MS05MzlmLTU4ZjhlYzc5Mzg5YiIsInN1YiI6ImFua2l0MTA2NS5iZTIyQGNoaXRrYXJhdW5pdmVyc2l0eS5lZHUuaW4ifSwiZW1haWwiOiJhbmtpdDEwNjUuYmUyMkBjaGl0a2FyYXVuaXZlcnNpdHkuZWR1LmluIiwibmFtZSI6ImFua2l0IGt1bWFyIiwicm9sbE5vIjoiMjIxMTk4MTA2NSIsImFjY2Vzc0NvZGUiOiJQd3p1ZkciLCJjbGllbnRJRCI6ImQ2NzU5MTQzLTNmNDQtNGQ2MS05MzlmLTU4ZjhlYzc5Mzg5YiIsImNsaWVudFNlY3JldCI6InhtektSVEFXd2hVRlRVWVYifQ.QQZ_Ca7giArvq2S0dqNBRvw2g7ZVGyEw74WZu256nIA`
    }
  };

 
  

router.get("/users", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/users`, HEADERS);
    res.json(response.data);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error });
  }
});

router.get("/users/:userId/posts", async (req, res) => {
  const { userId } = req.params;
  try {
    const response = await axios.get(`${BASE_URL}/users/${userId}/posts`, HEADERS);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error });
  }
});


router.get("/posts/:postId/comments", async (req, res) => {
  const { postId } = req.params;
  try {
    const response = await axios.get(`${BASE_URL}/posts/${postId}/comments`, HEADERS);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error });
  }
});

module.exports = router;