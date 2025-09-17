import axios from "axios";

export class HttpClient {
  private baseUrl: string;
  constructor(private url: string) {
    this.baseUrl = url;
  }

  async get<T>(endpoint: string, params?: any): Promise<T> {
    const response = await axios.get<T>(`${this.baseUrl}${endpoint}`, {
      params,
    });
    return response.data;
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    const response = await axios.post<T>(`${this.baseUrl}${endpoint}`, data);
    return response.data;
  }
}
