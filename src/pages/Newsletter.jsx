import {Form, redirect, useNavigation} from "react-router-dom";
import axios from "axios";
import {newsletterUrl} from "../utils.js";
import {toast} from "react-toastify";

export const action = async ({request}) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    // const response = await axios.post(newsletterUrl, data)
    console.log(data);
    toast.success("form submitted successfully")
    return redirect("/");
}

const Newsletter = () => {
    const navigation = useNavigation()
    const isSubmitting = navigation.state === "submitting"

    return (
        <>
            <Form className="form" method="post">
                <h4 style={{textAlign: "center", marginBottom: "2rem"}}>
                    our newsletter
                </h4>
                {/* name */}
                <div className="form-row">
                    <label htmlFor="name" className="form-label">
                        name
                    </label>
                    <input
                        type="text"
                        name="name"
                        defaultValue="Herman"
                        className="form-input"
                        id="name"
                        required
                    />
                </div>
                {/* lastname */}
                <div className="form-row">
                    <label htmlFor="lastName" className="form-label">
                       last name
                    </label>
                    <input
                        type="text"
                        defaultValue="Makiese"
                        name="lastName"
                        className="form-input"
                        id="lastName"
                        required
                    />
                </div>
                {/* email */}
                <div className="form-row">
                    <label htmlFor="email" className="form-label">
                        email
                    </label>
                    <input
                        type="email"
                        name="email"
                        defaultValue="makiese@htech-cloud.com"
                        className="form-input"
                        id="email"
                        required
                    />
                </div>
                <button
                    disabled={isSubmitting}
                    type="submit"
                    className="btn btn-block"
                    style={{marginTop: "0.5rem"}}
                >
                    {isSubmitting ? "submitting" : "submit"}
                </button>
            </Form>
        </>
    );
};

export default Newsletter;