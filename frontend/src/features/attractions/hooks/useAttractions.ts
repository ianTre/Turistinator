import {useState ,useEffect , useCallback} from 'react';
import { attractionsApi } from '../../../api/attractions';

export function useAttractions() {
    const [attractions, setAttractions] = useState([]);


    const fetchAttractions = useCallback(async () => {
        const data = await attractionsApi.getAll();
        setAttractions(data);
    },[])

    useEffect(() => {
        fetchAttractions();
    }, [fetchAttractions]);

    return {
        attractions,
        fetchAttractions
    }
}