import React from 'react';
import axios from 'axios';
import {URI} from './constants/url';

export default class Services {
    token = localStorage.getItem('TOKEN');

    Authorize = async (email, password) => {
        const data = {
            email,
            password
        }
        const headers = {
            "Content-Type": "application/json",

        }
        return await axios.post(URI + '/authenticate', data, {headers}).then(response => response).catch(error => error);
    }
    getUsers = async (lastUser, firstUser) => {
        const headers = {
            "Content-Type": "application/json",
            'auth-token': this.token,
        }
        console.log('users-token-sent', this.token);
        if (lastUser !== undefined) {
            headers.lastuser = lastUser;
        }
        if (firstUser !== undefined) {
            headers.firstuser = firstUser;
        }
        return await axios.get(URI + '/getUsers', {headers}).then(response => response).catch(error => error);
    }
    createUser = async (user) => {
        const headers = {
            "Content-Type": "application/json",
            'auth-token': this.token,
        }
        return await axios.post(URI + '/createUser', user, {headers}).then(response => response).catch(error => error);
    }
    updateUser = async (user) => {
        const headers = {
            "Content-Type": "application/json",
            'auth-token': this.token,
        }
        return await axios.post(URI + '/updateUser', user, {headers}).then(response => response).catch(error => error);
    }

    getProducts = async (lastProduct, firstProduct) => {
        const headers = {
            "Content-Type": "application/json",
            'auth-token': this.token,
        }
        if (lastProduct !== undefined) {
            headers.lastproduct = lastProduct;
        }
        if (firstProduct !== undefined) {
            headers.firstproduct = firstProduct;
        }
        return await axios.get(URI + '/getProducts', {headers}).then(response => response).catch(error => error);
    }
    createProduct = async (product) => {
        const headers = {
            "Content-Type": "application/json",
            'auth-token': this.token,
        }
        return await axios.post(URI + '/createProduct', product, {headers}).then(response => response).catch(error => error);
    }
    updateProduct = async (product) => {
        const headers = {
            "Content-Type": "application/json",
            'auth-token': this.token,
        }
        return await axios.post(URI + '/updateProduct', product, {headers}).then(response => response).catch(error => error);
    }

    getOrders = async (lastOrder, firstOrder) => {
        const headers = {
            "Content-Type": "application/json",
            'auth-token': this.token,
        }
        if (lastOrder !== undefined) {
            headers.lastOrder = lastOrder;
        }
        if (firstOrder !== undefined) {
            headers.firstOrder = firstOrder;
        }
        return await axios.get(URI + '/getOrders', {headers}).then(response => response).catch(error => error);
    }
    createOrder = async (product) => {
        const headers = {
            "Content-Type": "application/json",
            'auth-token': this.token,
        }
        return await axios.post(URI + '/createOrder', product, {headers}).then(response => response).catch(error => error);
    }
    updateOrder = async (product) => {
        const headers = {
            "Content-Type": "application/json",
            'auth-token': this.token,
        }
        return await axios.post(URI + '/updateOrder', product, {headers}).then(response => response).catch(error => error);
    }

    getGories = async (key, parent) => {
        let headers = {
            "Content-Type": "application/json",
            'auth-token': this.token,
        }
        if (key) headers['key'] = key;
        if (parent) headers['parent'] = parent

        return await axios.get(URI + '/getGories', {headers}).then(response => response).catch(error => error);
    }
    createGory = async (gory) => {
        const headers = {
            "Content-Type": "application/json",
            'auth-token': this.token,
        }
        return await axios.post(URI + '/createGory', gory, {headers}).then(response => response).catch(error => error);
    }
    deleteGory = async (gory) => {
        const headers = {
            "Content-Type": "application/json",
            'auth-token': this.token,
        }
        return await axios.post(URI + '/deleteGory', gory, {headers}).then(response => response).catch(error => error);
    }
    updateGory = async (gory) => {
        const headers = {
            "Content-Type": "application/json",
            'auth-token': this.token,
        }
        return await axios.post(URI + '/updateGory', gory, {headers}).then(response => response).catch(error => error);
    }

    search = async (keystring, key) => {
        return axios.get(URI + '/search', {
            headers: {
                "Content-Type": "application/json",
                'auth-token': this.token,
                keystring: keystring.toLowerCase(),
                key
            }
        }).then(response => response).catch(error => error);
    }

    getStores = async () => {
        const headers = {
            "Content-Type": "application/json",
            'auth-token': this.token,
        }
        return await axios.get(URI + '/getStores', {headers}).then(response => response).catch(error => error);
    }
    createStore = async (store) => {
        const headers = {
            "Content-Type": "application/json",
            'auth-token': this.token,
        }
        return await axios.post(URI + '/createStore', store, {headers}).then(response => response).catch(error => error);
    }
    updateStore = async (store) => {
        const headers = {
            "Content-Type": "application/json",
            'auth-token': this.token,
        }
        return await axios.post(URI + '/updateStore', store, {headers}).then(response => response).catch(error => error);
    }

    getBanners = async () => {
        const headers = {
            "Content-Type": "application/json",
            'auth-token': this.token,
        }
        return await axios.get(URI + '/getBanners', {headers}).then(response => response).catch(error => error);
    }
    createBanner = async (banner) => {
        const headers = {
            "Content-Type": "application/json",
            'auth-token': this.token,
        }
        return await axios.post(URI + '/createBanner', banner, {headers}).then(response => response).catch(error => error);
    }
    deleteBanner = async (banner) => {
        const headers = {
            "Content-Type": "application/json",
            'auth-token': this.token,
        }
        return await axios.post(URI + '/deleteBanner', banner, {headers}).then(response => response).catch(error => error);
    }


}

