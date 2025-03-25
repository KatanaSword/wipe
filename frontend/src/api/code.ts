import config from "@/config/config";
import { CodePostAspectRatio, CodePostBackgroundColor, CodePostFileName, CreateCodePost, UpdateCodePost } from "@/type";
import axios, { AxiosInstance, AxiosResponse } from "axios";

export class CodeService {
  private baseURL: string;
  public client: AxiosInstance;
  constructor() {
    this.baseURL = config.backendCodeUrl;
    this.client = axios.create({
      baseURL: this.baseURL,
      withCredentials: true,
      headers: {
        "Content-Length": "application/json",
      },
    });
  }

  // Create a new Code post
  async createCodePost(payload: CreateCodePost): Promise<AxiosResponse> {
    try {
      const codePost: AxiosResponse = await this.client.post("/", payload);
      if (codePost) {
        return this.getCodePostId(codeId: string);
      }
      return codePost
    } catch (error) {
      throw error;
    }
  }

  // Get a single Code post by id
  async getCodePostId(codeId: string): Promise<AxiosResponse> {
    try {
        return await this.client.get(`/:${codeId}`)
    } catch (error) {
        throw error
    }
  }

  // Update a single Code post using codeId
  async updateCodePost(codeId: string, detail: UpdateCodePost): Promise<AxiosResponse> {
    try {
        return await this.client.patch(`/:${codeId}`, detail)
    } catch (error) {
        throw error
    }
  }

  // Get All Codes post
  async allCodePost(): Promise<AxiosResponse> {
    try {
        return await this.client.get("/")
    } catch (error) {
        throw error
    }
  }

  // Update a Code post Filename using codeId
  async updateFileName(codePostFileName: CodePostFileName): Promise<AxiosResponse> {
    try {
        return await this.client.patch(`/file_name/:${codePostFileName.codeId}`, {fileName: codePostFileName.fileName})
    } catch (error) {
        throw error
    }
  }

  // Update a Code post Aspect Ratio using codeId
  async updateCodePostAspectRatio(codePostAspectRatio: CodePostAspectRatio): Promise<AxiosResponse> {
    try {
      return await this.client.patch(`/aspect_ratio/:${codePostAspectRatio.codeId}`, {aspectRatioName: codePostAspectRatio.aspectRatioName})
    } catch (error) {
      throw error
    }
  }

  // Update a Code post Background Color using codeId
  async updateCodeBackgroundColor(codePostBackgroundColor: CodePostBackgroundColor): Promise<AxiosResponse> {
    try {
      return await this.client.patch(`/background_color/:${codePostBackgroundColor.codeId}`, {backgroundColorName: codePostBackgroundColor.backgroundColorName})
    } catch (error) {
      throw error
    }
  }

  // Delete a Code post using codeId
  async deleteCode(codeId: string): Promise<AxiosResponse> {
    try {
      return await this.client.delete(`/:${codeId}`)
    } catch (error) {
      throw error
    }
  }
}

const codeService = new CodeService()

export default codeService