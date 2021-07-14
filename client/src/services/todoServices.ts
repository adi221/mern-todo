import axios, { AxiosResponse } from 'axios';
import { Todo } from '../types/todoTypes';

const baseUrl = 'http://127.0.0.1:4000';

export const getTodosApi = async (): Promise<AxiosResponse> =>{
  try {
    const data: AxiosResponse = await axios.get(`${baseUrl}/todos`);
    return data;
  } catch (error) {
    throw new Error(error)
  }
}

export const addTodoApi = async (todoDetails: Todo): Promise<AxiosResponse> =>{
  try {
    const data: AxiosResponse = await axios.post(`${baseUrl}/add`, {...todoDetails});
    return data;
  } catch (error) {
    throw new Error(error)
  }
}

export const updateTodoApi = async (todoDetails: Todo): Promise<AxiosResponse> =>{
  try {
    const data: AxiosResponse = await axios.put(`${baseUrl}/update/${todoDetails._id}`, {...todoDetails});
    return data;
  } catch (error) {
    throw new Error(error)
  }
}

export const deleteTodoApi = async (todoId: string): Promise<void> =>{
  try {
    await axios.delete(`${baseUrl}/delete/${todoId}`);
  } catch (error) {
    throw new Error(error)
  }
}