const apiUrl = "http://localhost:3000/api";

export const ApiEndpoint = {

    Auth:{
        register: `${apiUrl}/users/register`,
        login: `${apiUrl}/users/login`,
        me: `${apiUrl}/users/me`,
    }

}

export const localStorage = {
    token: 'USER_TOKEN',
}