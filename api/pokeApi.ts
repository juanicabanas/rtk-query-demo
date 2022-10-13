import axios, {AxiosError, AxiosRequestConfig} from "axios";
import {BaseQueryFn} from "@reduxjs/toolkit/query";

export const sleep = (ms = 2000): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

export const pokeApi = axios.create({
    baseURL: 'https://pokeapi.co/api/v2',
});

pokeApi.interceptors.response.use(async (response) => {
    await sleep();
    return response;
});


export const axiosBaseQuery =
    (
        { baseUrl }: { baseUrl: string } = { baseUrl: '' }
    ): BaseQueryFn<
        {
            url: string
            method: AxiosRequestConfig['method']
            data?: AxiosRequestConfig['data']
            params?: AxiosRequestConfig['params']
        },
        unknown,
        unknown
        > =>
        async ({ url, method, data, params }) => {
            try {
                const result = await pokeApi({ url: baseUrl + url, method, data, params })
                return { data: result.data }
            } catch (axiosError) {
                let err = axiosError as AxiosError
                return {
                    error: {
                        status: err.response?.status,
                        data: err.response?.data || err.message,
                    },
                }
            }
        }
