import {http} from './http';

export interface Attraction {
  id: number;
  name: string;
  tipology: string;
  description: string;
  coordinates: string;
  city: number;
}

export const attractionsApi = {
    getAll: async (): Promise<Attraction[]> => {
        const response = await http.get<Attraction[]>('/attractions/');
        return response.data;
    },
    
    getById: async (id: number): Promise<Attraction> => {
        const response = await http.get<Attraction>(`/attractions/${id}/`);
        return response.data;
    }
}
