import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from "./high_order_components/Layout";
import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Activate from './containers/Activate';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import Google from "./containers/Google";
import Facebook from "./containers/Facebook";
import store from "./store";
import { Provider } from 'react-redux';

const App = () =>{
    return (
        <Provider store={store}>
            <Router>
                <Layout>
                    <Routes>
                        <Route exact path='/' Component={Home} />
                        <Route exact path='/login' Component={Login} />
                        <Route exact path='/signup' Component={Signup} />
                        <Route exact path='/google' Component={Google} />
                        <Route exact path='/facebook' Component={Facebook} />
                        <Route exact path='/reset-password' Component={ResetPassword} />
                        <Route exact path='/password/reset/confirm/:uid/:token' Component={ResetPasswordConfirm} />
                        <Route exact path='/activate/:uid/:token' Component={Activate} />
                    </Routes>
                </Layout>
            </Router>
        </Provider>
    )
}

export default App;