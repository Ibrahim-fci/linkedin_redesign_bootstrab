import Post from "../models/Post.models.js";
import User from "../models/User.models.js";

// Func for create a new post

export const createPost = async (req, res) => {
  const data = req.body;
  const user = req.user;

  try {
    const post = new Post({
      ...data,
      author: user._id,
    });

    await post.save();

    // add user id to user posts list
    user.posts.push(post._id);
    await user.save();

    return res
      .status(201)
      .json({ message: "post created successfully", data: post });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Func for update a post

export const updatePost = async (req, res) => {
  const data = req.body;
  const user = req.user;

  try {
    // check if post existes
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }

    // check if user is the author of the post
    if (post.author.toString() !== user._id.toString()) {
      return res
        .status(403)
        .json({ message: "you are not the author of this post" });
    }

    // update post
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: data },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "post updated successfully", data: updatedPost });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Func for deleating post

export const deletePost = async (req, res) => {
  const user = req.user;

  try {
    // check if post existes
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }

    // check if user is the author of the post
    if (post.author.toString() !== user._id.toString()) {
      return res
        .status(403)
        .json({ message: "you are not the author of this post" });
    }

    // remove post id from user posts list
    user.posts.pull(post._id);
    await user.save();

    // delete post from database
    await Post.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "post deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Func for getting all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "-password  -posts")
      .sort({ date: -1 });
    return res.status(200).json({ data: posts });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
