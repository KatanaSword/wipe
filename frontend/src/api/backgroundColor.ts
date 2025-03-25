import config from "@/config/config";
import { CreateBackgroundColor, UpdateBackgroundColor } from "@/type";
import axios, { AxiosInstance, AxiosResponse } from "axios";

export class BackgroundColorService {
  private baseURL: string;
  public client: AxiosInstance;
  constructor() {
    this.baseURL = config.backendBackgroundColorUrl;
    this.client = axios.create({
      baseURL: this.baseURL,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

    // Create a new Background Color 
    async createBackgroundColor(payload: CreateBackgroundColor): Promise<AxiosResponse> {
        try {
            const backgroundColor: AxiosResponse = await this.client.post("/", payload)
            if(backgroundColor) {
                return this.getBackgroundColorId(backgroundColorId: string)
            }
            return backgroundColor
        } catch (error) {
            throw error
        }
      }
    
      // Get a single Background Color by id
      async getBackgroundColorId(backgroundColorId: string): Promise<AxiosResponse> {
        try {
            return await this.client.get(`/:${backgroundColorId}`)
        } catch (error) {
            throw null
        }
      }
    
      // Get a All Background Color
      async allBackgroundColor(): Promise<AxiosResponse> {
        try {
            return await this.client.get("/")
        } catch (error) {
            throw error
        }
      }
    
      // Update a single Background Color by id
      async updateBackgroundColor(backgroundColorId: string, detail: UpdateBackgroundColor): Promise<AxiosResponse> {
        try {
            return await this.client.patch(`/:${backgroundColorId}`, detail)
        } catch (error) {
            throw error
        }
      }
    
      // Delete a single Background Color by id
      async deleteBackgroundColor(backgroundColorId: string): Promise<AxiosResponse> {
        try {
            return await this.client.delete(`/:${backgroundColorId}`)
        } catch (error) {
            throw error
        }
      }
}
