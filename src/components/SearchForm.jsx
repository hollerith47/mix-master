import Wrapper from "../assets/wrappers/SearchForm.js";
import {Form, useNavigation} from "react-router-dom";

const SearchForm = ({searchTerm}) => {
    const navigation = useNavigation()
    const isSubmitting = navigation.state === "submitting"

    return (
        <Wrapper>
            <Form className="form">
                <input
                    type="search"
                    name="search"
                    placeholder="Search for a cocktail..."
                    className="form-input"
                    defaultValue={searchTerm}
                />
                <button
                    type="submit"
                    className="btn search-btn"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "searching..." : "Search"}
                </button>
            </Form>
        </Wrapper>
    );
};

export default SearchForm;