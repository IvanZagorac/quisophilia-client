import axios, {AxiosRequestConfig, AxiosResponse } from 'axios';
import { config } from '../../config/config';
import { getToken, saveToken } from './authUtils';
import { navigate } from '../../components/Navigation';

export interface ApiResponse {
  status: 'ok' | 'error' | 'login';
  data: any;
}
// Generic API request function
export default async function api(
    path: string,
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT',
    body?: any,
    multipart?: boolean
    // role: "user" | "administrator" = "user"
): Promise<ApiResponse> 
{
    const contentType = multipart ? 'multipart/form-data' : 'application/json';
    let params: any | null = null;
    if (body)
    {
        params = multipart ? body : JSON.stringify(body)
    }
    console.log(contentType);
    const requestData: AxiosRequestConfig = {
        method,
        baseURL: config.url,
        url: path,
        data: params,
        headers: {
            'Content-Type': contentType,
            Authorization: await getToken('refresh'),
        },
    };
    try 
    {
        console.log(requestData);
        const response = await axios(requestData);
        if (response.data.error)
        {
            return handleApiError(response,requestData)
        }
        return responseHandler(response);
    }
    catch (err: any) 
    {
        // there role
        return handleApiError(err, requestData);
    }
}

// Handle API response
function responseHandler(res: AxiosResponse): ApiResponse 
{
    return {
        status: 'ok',
        data: res.data,
    };
}

// Handle errors (401 - Unauthorized)
async function handleApiError(
    err: any,
    requestData: AxiosRequestConfig,
    // role: "user" | "administrator"
): Promise<ApiResponse> 
{
    console.log(err);
    if (err?.status === 401) 
    {
    // ROLE OVDJE
        const newRefreshToken = await getToken('refresh');

        if (!newRefreshToken) 
        {
            redirectToLogin();
            return { status: 'login', data: err.data?.message };
        }

        // Save new token & retry request
        saveToken(newRefreshToken, 'refresh');
    requestData.headers!.Authorization = newRefreshToken;

    return await repeatRequest(requestData);
    }

    return {
        status: 'error',
        data: err.data?.message || 'Internal error',
    };
}

// Retry failed request after refreshing token
async function repeatRequest(requestData: AxiosRequestConfig): Promise<ApiResponse> 
{
    try 
    {
        const response = await axios(requestData);
        return responseHandler(response);
    }
    catch (err: any) 
    {
        return {
            status: 'error',
            data: err.response?.data || err.message,
        };
    }
}

// Redirect to login (correct for React Native)
function redirectToLogin() 
{
    navigate('Login')
}
