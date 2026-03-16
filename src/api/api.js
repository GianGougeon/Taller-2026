const url = "https://api-react-taller-production.up.railway.app";

export const Register = async (username, name, password) => {
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
    if (!response.ok) throw new Error(data.message || "Error al registrar");
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user))
    return data;
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

    if (!response.ok) {
        throw new Error(data.message || "Error al iniciar sesión");
    }
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
const local = {
    name,
    type,
    priceRange,
    city,
    zone,
    address,
    hours,
    photos
}
console.log(local);

    const response = await fetch(`${url}/api/locals`, {
        method: "POST",
        headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        ,
        body: JSON.stringify({ name, type, priceRange, city, zone, address, hours, photos })
    })

    const data = await response.json();
    return data;

}

export const getPlatos = async (q = "", category = "", dateFrom = "", dateTo = "", city = "", zone = "", localId = "") => {
    const response = await fetch(
        `${url}/api/dishes?q=${q}&category=${category}&dateFrom=${dateFrom}&dateTo=${dateTo}&city=${city}&zone=${zone}&localId=${localId}`
    );
    const data = await response.json();
    return data;
};

export const getPlato = async (id) => {
    const response = await fetch(`${url}/api/dishes/${id}`);
    const data = await response.json();
    return data;
}

export const postPlatos = async (name, category, localId, city, price, description) => {
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
export const postReviewPlato = async (id, rating, comment) => {
    const response = await fetch(`${url}/api/dishes/${id}/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ rating, comment })
    });
    const data = await response.json();
    return data;
};

export const getUser = async (id) => {
    const response = await fetch(`${url}/api/users/${id}`);
    const data = await response.json();
    return data;
};