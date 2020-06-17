import React, { useState } from 'react'
import Layout from '../core/Layout';
import { signin, authenticate } from '../auth/index';
import { Redirect } from 'react-router-dom';

const Signin = (props) => {
    const [values, setValues] = useState({
        email: 'robert@gmail.com',
        password: 'robert123',
        error: '',
        loading: false,
        redirectToHome: false,
    });
    // const { from } = props.location.state || '';
    const handleSubmit = async (event) => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true })
        const userData = await signin({ email, password });
        if (userData.error) {
            setValues({ ...values, error: userData.error, loading: false });
        } else {
            await authenticate(userData);
            // if( from === '/dashboard') {
            //     props.history.replace(from);
            // }
            setValues({ ...values, redirectToHome: true });
        }

    }


    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value, error: false });
    }

    //destructuring state variables
    const { password, email, error, loading, redirectToHome } = values;

    // signin form
    const signinForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="text-muted">Email</label>
                    <input className="form-control" type="email" name="email" value={email} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label className="text-muted">Password</label>
                    <input className="form-control" type="password" name="password" value={password} onChange={handleChange} />
                </div>
                <button className="btn btn-outline-primary" >Submit</button>
            </form>
        )
    }

    // showError component
    const showError = () => {
        return (
            <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
                {error}
            </div>
        );
    }

    // showLoading component
    const showLoading = () => {
        return (
            <div className="alert alert-success" style={{ display: loading ? '' : 'none' }}>
                Loading...
            </div>
        );
    }
    const redirectUser = () => {
        if (redirectToHome) {
            return <Redirect to="/" />
        }
    }


    return (
        <Layout title="Sign-in Page" description="signin to Node React Ecommerce App" className="container col-md-8 offset-md-2">
            {showError()}
            {signinForm()}
            {showLoading()}
            {redirectUser()}
        </Layout>
    )
}

export default Signin;
