import Post from "../models/Post.js";

export const createPost = async (req, res, next) => {
  try {
    const { content, images, videos } = req.body;
    const post = new Post({
      content,
      images,
      videos,
      createdBy: req.user.id,
      approvalStatus: "pending",
    });
    await post.save();
    console.log(`[POST] Created: ${post._id}`);
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const { approvalStatus, artist } = req.query;
    let filter = {};
    if (approvalStatus) filter.approvalStatus = approvalStatus;
    if (artist) filter.createdBy = artist;
    const posts = await Post.find(filter).populate("createdBy", "name");
    console.log(`[POST] Posts fetched. Count: ${posts.length}`);
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

export const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate("createdBy", "name");
    if (!post) return res.status(404).json({ message: "Post not found" });
    console.log(`[POST] Post fetched by ID: ${req.params.id}`);
    res.json(post);
  } catch (err) {
    next(err);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.createdBy.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }
    Object.assign(post, req.body);
    await post.save();
    console.log(`[POST] Updated: ${post._id}`);
    res.json(post);
  } catch (err) {
    next(err);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.createdBy.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }
    await post.deleteOne();
    console.log(`[POST] Deleted: ${req.params.id}`);
    res.json({ message: "Post deleted" });
  } catch (err) {
    next(err);
  }
};

export const approvePost = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can approve/reject posts" });
    }
    const { status } = req.body; // 'approved' or 'rejected'
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    post.approvalStatus = status;
    await post.save();
    console.log(`[POST] Approval status changed: ${post._id} -> ${status}`);
    res.json({ message: `Post ${status}` });
  } catch (err) {
    next(err);
  }
}; 