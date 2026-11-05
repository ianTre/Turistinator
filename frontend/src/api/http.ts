import axios from 'axios';

export const http = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  timeout: 10000, // Set a timeout for requests (in milliseconds)
  headers: {
    'Content-Type': 'application/json', // Set default content type
  },
});