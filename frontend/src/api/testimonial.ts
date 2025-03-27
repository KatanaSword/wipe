import config from "@/config/config";
import { CreateTestimonialPost, TestimonialPostAspectRatio, TestimonialPostBackgroundColor, TestimonialPostFileName, UpdateTestimonialPost, UpdateTestimonialPostAvatar } from "@/type";
import axios, { AxiosInstance, AxiosResponse } from "axios";

export class TestimonialService {
  private baseURL: string;
  public client: AxiosInstance;
  constructor() {
    this.baseURL = config.backendTestimonialUrl;
    this.client = axios.create({
      baseURL: this.baseURL,
      withCredentials: true,
      headers: {
        "Content-Length": "application/json",
      },
    });
  }

  // Create a new Testimonial post
  async createTestimonialPost(payload: CreateTestimonialPost): Promise<AxiosResponse> {
    try {
      const testimonialPost: AxiosResponse = await this.client.post("/", payload);
      if (testimonialPost) {
        return this.getTestimonialPostId(testimonialId: string);
      }
      return testimonialPost
    } catch (error) {
      throw error;
    }
  }

  // Get a single Testimonial post by id
  async getTestimonialPostId(testimonialId: string): Promise<AxiosResponse> {
    try {
        return await this.client.get(`/:${testimonialId}`)
    } catch (error) {
        throw error
    }
  }

  // Update a single Testimonial post using testimonialId
  async updateTestimonialPost(testimonialId: string, detail: UpdateTestimonialPost): Promise<AxiosResponse> {
    try {
        return await this.client.patch(`/:${testimonialId}`, detail)
    } catch (error) {
        throw error
    }
  }

  // Get All Testimonials post
  async allTestimonialPost(): Promise<AxiosResponse> {
    try {
        return await this.client.get("/")
    } catch (error) {
        throw error
    }
  }

  // Update a Testimonial post Filename using testimonialId
  async updateFileName(testimonialPostFileName: TestimonialPostFileName): Promise<AxiosResponse> {
    try {
        return await this.client.patch(`/file_name/:${testimonialPostFileName.testimonialId}`, {fileName: testimonialPostFileName.fileName})
    } catch (error) {
        throw error
    }
  }

  // Update a Testimonial post Image using testimonialId
  async updateTestimonialPostAvatar(testimonialImage: UpdateTestimonialPostAvatar): Promise<AxiosResponse> {
    try {
      return await this.client.patch(`/update_avatar/:${testimonialImage.testimonialId}`)
    } catch (error) {
      throw error
    }
  }

  // Update a Testimonial post Aspect Ratio using testimonialId
  async updateTestimonialPostAspectRatio(testimonialPostAspectRatio: TestimonialPostAspectRatio): Promise<AxiosResponse> {
    try {
      return await this.client.patch(`/aspect_ratio/:${testimonialPostAspectRatio.testimonialId}`, {aspectRatioName: testimonialPostAspectRatio.aspectRatioName})
    } catch (error) {
      throw error
    }
  }

  // Update a Testimonial post Background Color using testimonialId
  async updateTestimonialBackgroundColor(testimonialPostBackgroundColor: TestimonialPostBackgroundColor): Promise<AxiosResponse> {
    try {
      return await this.client.patch(`/background_color/:${testimonialPostBackgroundColor.testimonialId}`, {backgroundColorName: testimonialPostBackgroundColor.backgroundColorName})
    } catch (error) {
      throw error
    }
  }

  // Delete a Testimonial post using testimonialId
  async deleteTestimonial(testimonialId: string): Promise<AxiosResponse> {
    try {
      return await this.client.delete(`/:${testimonialId}`)
    } catch (error) {
      throw error
    }
  }
}

const testimonialService = new TestimonialService()

export default testimonialService