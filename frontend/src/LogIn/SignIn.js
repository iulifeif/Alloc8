import React from "react";
function SignInForm() {
    const [state, setState] = React.useState({
        email:"",
        password:""
    });
    const handleOnChange = event => {
        const value = event.target.value;
        setState({
            ...state,
            [event.target.name]: value
        });
    };

    const handleOnSubmit = event => {
        event.preventDefault();

        const { email, password} = state;
        alert('You are login with email: ${email} and password: ${password}');

        for (const key in state){
            setState({
                ...state,
                [key]: ""
            });
        }
    };

    return (
        <div className="form-container sign-in-container">
            <form onSubmit={handleOnSubmit}>
                <h1> Sign In</h1>
                < div className="social-container">
                    <a href="#" calssName="social"><i className="fab fa-facebook-f"></i></a>
                    < a href = "#" className = "social" > <i className="fab fa-google-plus-g"></i></a>
                    < a href = "#" className = "social" > <i className="fab fa-linkedin-in"></i></a>
                </div>
                <span>or use your account</span>
                <input 
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={state.email}
                    onChange={handleOnChange}
                />
                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={state.password}
                    onChange={handleOnChange}  
                />
                <a href="#">Forgot your password?</a>
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
}

export default SignInForm;
