// CREATE POST 
const createPost = async (req, res) => {
  const { title, desc } = req.body;
  if (!title || !desc) {
    return res.status(400).json({ error: "Please fill in all the fields" });
  }
  try {
    const post = await Post.create(req.body);
    res.status(200).json({ mssg: "Post has been made", post });
  } catch (error) {
    res.status(400).json(error);
  }
};


module.exports = { createPost };
