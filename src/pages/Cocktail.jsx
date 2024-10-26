import {Link, Navigate, useLoaderData} from "react-router-dom";
import axios from "axios";
import {singleCocktailSearchUrl} from "../utils.js";
import Wrapper from "../assets/wrappers/CocktailPage.js";
import {useQuery} from "@tanstack/react-query";

const singleCocktailDetailsQuery = (id) => {
    return {
        queryKey: ['cocktail', id],
        queryFn: async () => {
            const {data} = await axios.get(`${singleCocktailSearchUrl + id}`);
            return data;
        },
    }
}
export const loader =(queryClient) => async ({params}) => {
    const {id} = params;
    await queryClient.ensureQueryData(singleCocktailDetailsQuery(id));
    return { id };
}
const Cocktail = () => {
    const {id } = useLoaderData();
    const {data} = useQuery(singleCocktailDetailsQuery(id))

    if (!data) return <Navigate to="/"/>;
    const singleDrink = data.drinks[0];
    // console.log(data)
    const {
        strDrink: name,
        strDrinkThumb: image,
        strAlcoholic: info,
        strGlass: glass,
        strCategory: category,
        strInstructions: instructions,
    } = singleDrink

    // console.log(singleDrink)
    const validIngredients = Object.keys(singleDrink)
        .filter(key => key.startsWith("strIngredient") && singleDrink[key] !== null)
        .map(key => singleDrink[key]);

    return (
        <Wrapper>
            <header>
                <Link to="/" className="btn">back home</Link>
                <h3>{name}</h3>
            </header>
            <div className="drink">
                <img src={image} alt={name} className="img"/>
                <div className="drink-info">
                    <p>
                        <span className="drink-data">name:</span>
                        {name}
                    </p>
                    <p>
                        <span className="drink-data">category:</span>
                        {category}
                    </p>
                    <p>
                        <span className="drink-data">info:</span>
                        {info}
                    </p>
                    <p>
                        <span className="drink-data">glass:</span>
                        {glass}
                    </p>
                    <p>
                        <span className="drink-data">Ingredients:</span>
                        {validIngredients.map((item, index) => {
                            return (
                                <span className="ing" key={item}>
                                    {item}
                                    {index < validIngredients.length - 1 ? ',' : ''}
                                </span>
                            )
                        })}
                    </p>
                    <p>
                        <span className="drink-data">instructions:</span>
                        {instructions}
                    </p>
                </div>
            </div>

        </Wrapper>
    );
};

export default Cocktail;