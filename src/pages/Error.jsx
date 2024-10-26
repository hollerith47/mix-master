import Wrapper from "../assets/wrappers/ErrorPage.js";
import img from "../assets/not-found.svg";
import {Link, useRouteError} from "react-router-dom";

const Error = () => {
    // TODO: Handle the useRouteError not working in my case
    // const error = useRouteError();
    // console.log(error);
    // if (error.status === 404) {
    //     return <ErrorComponent />
    // }
    return (
        <Wrapper>
            <div>
                <img src={img} alt="not found"/>
                <h3>Oops! Page not found.</h3>
                <p>We can't seem to find the page you are looking for</p>
                <Link to="/">Go back home</Link>
            </div>
        </Wrapper>
    );
};

export default Error;