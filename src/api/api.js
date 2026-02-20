const url = "https://api-react-taller-production.up.railway.app";

export const Register = async (username, password, name) => {
    const response = await fetch(`${url}/api/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            name,
            password,
        }),
    });
    const data = await response.json();
    console.log("Base de datos creada", data);
};

export const Login = async (username, password) => {
    const response = await fetch(`${url}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
        }),
    });
    const data = await response.json();
    console.log("Login", data);
    localStorage.setItem("token", data.token);
    return data;
};

export const Logout = () => {
    localStorage.removeItem("token");
}

export const getUser = async (token) => { };

