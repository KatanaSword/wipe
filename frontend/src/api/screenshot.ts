import config from "@/config/config";
import { CreateScreenshotPost, ScreenshotPostAspectRatio, ScreenshotPostBackgroundColor, ScreenshotPostFileName, UpdateScreenshotPostImage } from "@/type";
import axios, { AxiosInstance, AxiosResponse } from "axios";

export class ScreenshotService {
  private baseURL: string;
  public client: AxiosInstance;
  constructor() {
    this.baseURL = config.backendScreenshotUrl;
    this.client = axios.create({
      baseURL: this.baseURL,
      withCredentials: true,
      headers: {
        "Content-Length": "application/json",
      },
    });
  }

  // Create a new Screenshot post
  async createScreenshotPost(payload: CreateScreenshotPost): Promise<AxiosResponse> {
    try {
      const screenshotPost: AxiosResponse = await this.client.post("/", payload);
      if (screenshotPost) {
        return this.getScreenshotPostId(screenshotId: string);
      }
      return screenshotPost
    } catch (error) {
      throw error;
    }
  }

  // Get a single Screenshot post by id
  async getScreenshotPostId(screenshotId: string): Promise<AxiosResponse> {
    try {
        return await this.client.get(`/:${screenshotId}`)
    } catch (error) {
        throw error
    }
  }

  // Get All Screenshots post
  async allScreenshotPost(): Promise<AxiosResponse> {
    try {
        return await this.client.get("/")
    } catch (error) {
        throw error
    }
  }

    // Update a Screenshot post Image using screenshotId
    async updateScreenshotPostImage(screenshotImage: UpdateScreenshotPostImage): Promise<AxiosResponse> {
      try {
        return await this.client.patch(`/:${screenshotImage.screenshotId}`)
      } catch (error) {
        throw error
      }
    }

  // Update a Screenshot post Filename using screenshotId
  async updateFileName(screenshotPostFileName: ScreenshotPostFileName): Promise<AxiosResponse> {
    try {
        return await this.client.patch(`/file_name/:${screenshotPostFileName.screenshotId}`, {fileName: screenshotPostFileName.fileName})
    } catch (error) {
        throw error
    }
  }

  // Update a Screenshot post Aspect Ratio using screenshotId
  async updateScreenshotPostAspectRatio(screenshotPostAspectRatio: ScreenshotPostAspectRatio): Promise<AxiosResponse> {
    try {
      return await this.client.patch(`/aspect_ratio/:${screenshotPostAspectRatio.screenshotId}`, {aspectRatioName: screenshotPostAspectRatio.aspectRatioName})
    } catch (error) {
      throw error
    }
  }

  // Update a Screenshot post Background Color using screenshotId
  async updateScreenshotBackgroundColor(screenshotPostBackgroundColor: ScreenshotPostBackgroundColor): Promise<AxiosResponse> {
    try {
      return await this.client.patch(`/background_color/:${screenshotPostBackgroundColor.screenshotId}`, {backgroundColorName: screenshotPostBackgroundColor.backgroundColorName})
    } catch (error) {
      throw error
    }
  }

  // Delete a Screenshot post using screenshotId
  async deleteCode(screenshotId: string): Promise<AxiosResponse> {
    try {
      return await this.client.delete(`/:${screenshotId}`)
    } catch (error) {
      throw error
    }
  }
}

const screenshotService = new ScreenshotService()

export default screenshotService