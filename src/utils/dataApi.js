import React from "react";
import Cookie from 'js-cookie';
const UserLogin={
    username:Cookie.get('username'),
    password:Cookie.get('password')
}
const  UserCredentials=React.createContext(UserLogin)
export default UserCredentials;

//API interface goes here
