# biblenote

_SERVER_/restAPI/users/create
method: POST
    {
        name;
        firstname;
        lastname;
        email;
        password;
    }
RESPONSE:    201
{
    user-id;
    response-code;
    authorization-token;
}

_SERVER_/restAPI/users/login POST
method: POST
{
    email;
    password;
}
RESPONSE: {
    user_data;
    authorization_token;
}

GET USERS - POST
{
    optional id;
    authorization_token;
}
RESPONSE: {
    users_array;
    authorization_token_updated;
}
