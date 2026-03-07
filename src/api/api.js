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
    localStorage.setItem("token", data.token);
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
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user))
    return data;
};

export const Logout = () => {
    localStorage.removeItem("token");
}

export const getLocals = async (q = "", type = "", priceRange = "", rating = "", city = "", zone = "") => {
    const response = await fetch(`${url}/api/locals?q=${q}&type=${type}&priceRange=${priceRange}&rating=${rating}&city=${city}&zone=${zone}`);
    const data = await response.json();
    return data;
}

export const getLocal = async (id) => {
    const response = await fetch(`${url}/api/locals/${id}`);
    const data = await response.json();
    return data;
}

export const postLocal = async (name, type, priceRange, city, zone, address, hours, photos) => {

    const response = await fetch(`${url}/api/locals`, {
        method: "POST",
        headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        ,
        body: JSON.stringify({ name, type, priceRange, city, zone, address, hours, photos })
    })

    const data = await response.json();
    return data;

}

export const postPlato = async (name, category, localId, city, price, description) => {
    const response = await fetch(`${url}/api/dishes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
            name: name.trim(),
            category,
            localId,
            city,
            price,
            description
        }),
    });

    const data = await response.json();
    return data;
};



export const postReview = async (id, rating, comment) => {
    const response = await fetch(`${url}/api/locals/${id}/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ rating, comment })
    });
    const data = await response.json();
    return data;
}
