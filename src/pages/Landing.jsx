import {useLoaderData} from "react-router-dom";
import axios from "axios";
import {cocktailSearchUrl} from "../utils.js";
import CocktailList from "../components/CocktailList.jsx";
import SearchForm from "../components/SearchForm.jsx";
import {useQuery} from "@tanstack/react-query";

const searchCocktailQuery = (searchTerm) => {
    return {
        queryKey: ['search', searchTerm],
        queryFn: async () => {
            const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`);
            return response.data.drinks;
        },
    }
}

export const loader =(queryClient) => async ({request}) => {
    const url = new URL(request.url)
    const searchTerm = url.searchParams.get("search") || "all";
    // console.log(searchTerm)
    // const response = await axios.get(`${cocktailSearchUrl+searchTerm}`);
    // console.log(response.data.drinks)
    // return {drinks: response.data.drinks, searchTerm}
    await queryClient.ensureQueryData(searchCocktailQuery(searchTerm))
    return {searchTerm}
}
const Landing = () => {
    const {searchTerm} = useLoaderData();
    // console.log({drinks, searchTerm})
    // console.log(drinks)
    const {data: drinks, isLoading} = useQuery(searchCocktailQuery(searchTerm));

    if (isLoading) return <div className='loading'/>

    return (
        <>
            <SearchForm searchTerm={searchTerm}/>
            <CocktailList drinks={drinks}/>
        </>
    );
};

export default Landing;