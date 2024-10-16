const apiUrl = "http://localhost:4402/api";

export const ApiEndpoint = {

    Auth:{
        register: `${apiUrl}/users/register`,
        login: `${apiUrl}/users/login`,
        me: `${apiUrl}/users/me`,
    }

}

export const LocalStorage = {
    token: 'USER_TOKEN',
}