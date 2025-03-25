import config from "@/config/config";
import { BlogPostAspectRatio, BlogPostBackgroundColor, BlogPostFileName, CreateBlogPost, UpdateBlogPost, UpdateBlogPostImage } from "@/type";
import axios, { AxiosInstance, AxiosResponse } from "axios";

export class BlogService {
  private baseURL: string;
  public client: AxiosInstance;
  constructor() {
    this.baseURL = config.backendBlogUrl;
    this.client = axios.create({
      baseURL: this.baseURL,
      withCredentials: true,
      headers: {
        "Content-Length": "application/json",
      },
    });
  }

  // Create a new Blog post
  async createBlogPost(payload: CreateBlogPost): Promise<AxiosResponse> {
    try {
      const blogPost: AxiosResponse = await this.client.post("/", payload);
      if (blogPost) {
        return this.getBlogPostId(blogId: string);
      }
      return blogPost
    } catch (error) {
      throw error;
    }
  }

  // Get a single Blog post by id
  async getBlogPostId(blogId: string): Promise<AxiosResponse> {
    try {
        return await this.client.get(`/:${blogId}`)
    } catch (error) {
        throw error
    }
  }

  // Update a single Blog post using blogId
  async updateBlogPost(blogId: string, detail: UpdateBlogPost): Promise<AxiosResponse> {
    try {
        return await this.client.patch(`/:${blogId}`, detail)
    } catch (error) {
        throw error
    }
  }

  // Get All Blogs post
  async allBlogPost(): Promise<AxiosResponse> {
    try {
        return await this.client.get("/")
    } catch (error) {
        throw error
    }
  }

  // Update a Blog post Filename using blogId
  async updateFileName(blogPostFileName: BlogPostFileName): Promise<AxiosResponse> {
    try {
        return await this.client.patch(`/file_name/:${blogPostFileName.blogId}`, {fileName: blogPostFileName.fileName})
    } catch (error) {
        throw error
    }
  }

  // Update a Blog post Image using blogId
  async updateBlogPostImage(blogImage: UpdateBlogPostImage): Promise<AxiosResponse> {
    try {
      return await this.client.patch(`/image/:${blogImage.blogId}`)
    } catch (error) {
      throw error
    }
  }

  // Update a Blog post Aspect Ratio using blogId
  async updateBlogPostAspectRatio(blogPostAspectRatio: BlogPostAspectRatio): Promise<AxiosResponse> {
    try {
      return await this.client.patch(`/aspect_ratio/:${blogPostAspectRatio.blogId}`, {aspectRatioName: blogPostAspectRatio.aspectRatioName})
    } catch (error) {
      throw error
    }
  }

  // Update a Blog post Background Color using blogId
  async updateBlogBackgroundColor(blogPostBackgroundColor: BlogPostBackgroundColor): Promise<AxiosResponse> {
    try {
      return await this.client.patch(`/background_color/:${blogPostBackgroundColor.blogId}`, {backgroundColorName: blogPostBackgroundColor.backgroundColorName})
    } catch (error) {
      throw error
    }
  }

  // Delete a Blog post using blogId
  async deleteBlog(blogId: string): Promise<AxiosResponse> {
    try {
      return await this.client.delete(`/:${blogId}`)
    } catch (error) {
      throw error
    }
  }
}

const blogService = new BlogService()

export default blogService