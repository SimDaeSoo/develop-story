import { useEffect } from 'react';
import { useStaticRendering } from 'mobx-react';
import Environment from './Environment';
import Auth from './Auth';
import User from './User';
import Network from '../utils/network';
import { hydrate } from 'react-dom';

useStaticRendering(!process.browser);

let store;

class Store {
    constructor(initialData) {
        this.environment = new Environment();
        this.auth = new Auth();
        this.user = new User();
        this.hydrate(initialData);
    }

    hydrate = (initialData) => {
        if (!initialData) return;
        if (initialData.environment) this.environment.hydrate(initialData.environment);
        if (initialData.auth) this.auth.hydrate(initialData.auth);
        if (initialData.user) this.user.hydrate(initialData.user);
    }
}

export const useStore = (initialData) => {
    if (!store) store = new Store(initialData);
    if (!process.browser) store.hydrate(initialData);
    if (process.browser) useEffect(() => store.hydrate(initialData), [initialData]);
    Network.jwt = store.auth.jwt;
    return store;
}