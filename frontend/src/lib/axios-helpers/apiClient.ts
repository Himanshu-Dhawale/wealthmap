import { AxiosResponse } from "axios";
import createAxiosInstance from "./axiosInstance";

export const getReq = async <T>(
  url: string, 
  params?: Record<string, any>, 
  clientToken?: string
): Promise<AxiosResponse<T>> => {
  const apiClient = await createAxiosInstance(clientToken);
  try {
    return await apiClient.get<T>(url, { params });
  } catch (error) {
    console.error('GET request failed:', error);
    throw error;
  }
};

export const postReq = async <T>(
  url: string, 
  data?: Record<string, any>, 
  clientToken?: string
): Promise<AxiosResponse<T>> => {
  const apiClient = await createAxiosInstance(clientToken);
  try {
    return await apiClient.post<T>(url, data);
  } catch (error) {
    console.error('POST request failed:', error);
    throw error;
  }
};

export const putReq = async <T>(
  url: string, 
  data?: Record<string, any>, 
  clientToken?: string
): Promise<AxiosResponse<T>> => {
  const apiClient = await createAxiosInstance(clientToken);
  try {
    return await apiClient.put<T>(url, data);
  } catch (error) {
    console.error('PUT request failed:', error);
    throw error;
  }
};

export const patchReq = async <T>(
  url: string, 
  data?: Record<string, any>, 
  clientToken?: string
): Promise<AxiosResponse<T>> => {
  const apiClient = await createAxiosInstance(clientToken);
  try {
    return await apiClient.patch<T>(url, data);
  } catch (error) {
    console.error('PATCH request failed:', error);
    throw error;
  }
};

export const delReq = async <T>(
  url: string, 
  clientToken?: string
): Promise<AxiosResponse<T>> => {
  const apiClient = await createAxiosInstance(clientToken);
  try {
    return await apiClient.delete<T>(url);
  } catch (error) {
    console.error('DELETE request failed:', error);
    throw error;
  }
};