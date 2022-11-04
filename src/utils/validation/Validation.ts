import { isFulfilled } from "@reduxjs/toolkit";

export const isEmty = value => {
    if(!value) return true;
    return false;
}

export const isEmail = email => {
    const  re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email);
}

export const isPassword = password => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i;
    return re.test(password);
}

export const isMatch = (password, confirmPassword) => {
    if(password === confirmPassword) return true;
    return false;
}