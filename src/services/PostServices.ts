import AppDataSource from "../config/data-source";
import { Post } from "../entity/Post";
import { PostDto } from "../validations/PostsDto";

class PostServices {
  public async getAllPosts(): Promise<Post[]> {
    const posts = await Post.find();
    return posts;
  }

  public async getPostById(postId: number): Promise<false | Post> {
    const post = await Post.findOne({
      where: { id: postId },
      relations: { user: true },
    });
    if (!post) {
      return false;
    }

    return post;
  }

  public async updatePostById(postId: number, post: PostDto): Promise<Post> {
    const updatePost = Post.update(postId,{ ...post, id: postId });
    if (updatePost) {
      const findPost = Post.findOne({ where: { id: postId } });
      return findPost;
    }
  }
}

export default PostServices;
