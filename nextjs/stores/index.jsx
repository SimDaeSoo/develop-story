import { useStaticRendering } from 'mobx-react';
import Environment from './Environment';
import Auth from './Auth';
import User from './User';

useStaticRendering(!process.browser);

let store = null;

export function hydrate(initialData) {
    if (store === null) {
        store = {
            environment: new Environment(),
            auth: new Auth(),
            user: new User(),
        };
    }
    store.environment.hydrate(initialData.environment || {});
    store.auth.hydrate(initialData.auth || {});
    store.user.hydrate(initialData.user || {});

    return store;
}