import config from "@/config/config";
import { CreateAspectRatio, UpdateAspectRatio } from "@/type";
import axios, { AxiosInstance, AxiosResponse } from "axios";

export class AspectRatioService {
  private baseURL: string;
  public client: AxiosInstance;
  constructor() {
    this.baseURL = config.backendAspectRatioUrl;
    this.client = axios.create({
      baseURL: this.baseURL,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // Create a new Aspect Ratio 
  async createAspectRatio(payload: CreateAspectRatio): Promise<AxiosResponse> {
    try {
        const aspectRatio: AxiosResponse = await this.client.post("/", payload)
        if(aspectRatio) {
            return this.getAspectRatioId(aspectRatioId: string)
        }
        return aspectRatio
    } catch (error) {
        throw error
    }
  }

  // Get a single Aspect Ratio by id
  async getAspectRatioId(aspectRatioId: string): Promise<AxiosResponse> {
    try {
        return await this.client.get(`/:${aspectRatioId}`)
    } catch (error) {
        throw null
    }
  }

  // Get a All Aspect Ratio
  async allAspectRatio(): Promise<AxiosResponse> {
    try {
        return await this.client.get("/")
    } catch (error) {
        throw error
    }
  }

  // Update a single Aspect Ratio by id
  async updateAspectRatio(aspectRatioId: string, detail: UpdateAspectRatio): Promise<AxiosResponse> {
    try {
        return await this.client.patch(`/:${aspectRatioId}`, detail)
    } catch (error) {
        throw error
    }
  }

  // Delete a single Aspect Ratio by id
  async deleteAspectRatio(aspectRatioId: string): Promise<AxiosResponse> {
    try {
        return await this.client.delete(`/:${aspectRatioId}`)
    } catch (error) {
        throw error
    }
  }
}

const aspectRatioService = new AspectRatioService()

export default aspectRatioService