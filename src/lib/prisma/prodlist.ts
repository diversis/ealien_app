export function getCategories() {
    return [
        {
            name: "Electronics",
        },
        {
            name: "Instruments",
        },
    ];
}

export function getProducts() {
    return [
        {
            name: "Airpods Wireless Bluetooth Headphones",
            image: "/catalogue/airpods.jpg",
            description:
                "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
            brand: "Apple",
            price: 89.99,
            countInStock: 10,
            rating: 4.5,
        },
        {
            name: "iPhone 11 Pro 256GB Memory",
            image: "/catalogue/phone.jpg",
            description:
                "Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life",
            brand: "Apple",
            price: 599.99,
            countInStock: 0,
            rating: 4.0,
        },
        {
            name: "Cannon EOS 80D DSLR Camera",
            image: "/catalogue/camera.jpg",
            description:
                "Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design",
            brand: "Cannon",
            price: 929.99,
            countInStock: 5,
            rating: 3,
        },
        {
            name: "Sony Playstation 4 Pro White Version",
            image: "/catalogue/playstation.jpg",
            description:
                "The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music",
            brand: "Sony",
            price: 399.99,
            countInStock: 11,
            rating: 5,
        },
        {
            name: "Logitech G-Series Gaming Mouse",
            image: "/catalogue/mouse.jpg",
            description:
                "Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience",
            brand: "Logitech",
            price: 49.99,
            countInStock: 7,
            rating: 3.5,
        },
        {
            name: "Amazon Echo Dot 3rd Generation",
            image: "/catalogue/alexa.jpg",
            description:
                "Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space",
            brand: "Amazon",
            price: 29.99,
            countInStock: 0,
            rating: 4,
        },
    ];
}

export function getAlienProducts() {
    return [
        {
            name: "AAlien",
            image: "/catalogue/AAlien AApods 3.png",
            description:
                "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAlien audio offers immersive listening experience Built-in microphone allows you to take calls while working",
            brand: "AAlien",
            price: 89.99,
            countInStock: 10,
            rating: 4.5,
        },
        {
            name: "AAlien D4 Four Dimensions Smartphone",
            image: "/catalogue/AAlien D4.png",
            description:
                "Introducing the AAlien D4. A transformative Quadruple-dimension system that adds tons of capability without complexity. An unprecedented leap in battery life",
            brand: "AAlien",
            price: 799.99,
            countInStock: 0,
            rating: 4.5,
        },
        {
            name: "AAlien Lux Aeterna",
            image: "/catalogue/AAlien Lux Aeterna.png",
            description: "Stand out with this unique luxury",
            brand: "AAlien",
            price: 1929.99,
            countInStock: 5,
            rating: 3,
        },
        {
            name: "AAlien Wings twin smartphone",
            image: "/catalogue/AAlien Wings.png",
            description: "When one is not enough.",
            brand: "AAlien",
            price: 399.99,
            countInStock: 11,
            rating: 5,
        },
        {
            name: "AAlien AApro gaming mouse",
            image: "/catalogue/AAlien AApro mouse.png",
            description:
                "Get a better handle on your games with this AAlien gaming mouse. Programmable buttons allow customization for a smooth playing experience. Palm form and construction configurable",
            brand: "AAlien",
            price: 89.99,
            countInStock: 7,
            rating: 5,
        },
        {
            name: "AAlien AA7 mouse",
            image: "/catalogue/AAlien AA7 mouse.png",
            description: "Just mouse. Just a bit alien.",
            brand: "AAlien",
            price: 29.99,
            countInStock: 0,
            rating: 4,
        },
        {
            name: "AAlien AAbook 2 laptop",
            image: "/catalogue/AAlien AAbook 2.png",
            description: "Unconventional laptop for aliens.",
            brand: "AAlien",
            price: 2119.99,
            countInStock: 0,
            rating: 4,
        },
        {
            name: "AAlien AAcoustics Ego",
            image: "/catalogue/AAlien AAcoustics Ego.png",
            description: "Compact stereosystem",
            brand: "AAlien",
            price: 69.99,
            countInStock: 0,
            rating: 4,
        },
        {
            name: "AAlien AAcoustics Home",
            image: "/catalogue/AAlien AAcoustics Home.png",
            description: "Home stereosystem",
            brand: "AAlien",
            price: 269.99,
            countInStock: 0,
            rating: 4,
        },
        {
            name: "AAlien Float 2 Gaming console",
            image: "/catalogue/AAlien Float 2.png",
            description: "AAlien gaming console, second gen",
            brand: "AAlien",
            price: 229.99,
            countInStock: 0,
            rating: 4,
        },
        {
            name: "AAlien Float 3 Gaming console",
            image: "/catalogue/AAlien Float 3.png",
            description: "AAlien gaming console, third gen",
            brand: "AAlien",
            price: 429.99,
            countInStock: 0,
            rating: 4,
        },
    ];
}

export function getAlienGuitars() {
    const list = new Array(20).fill({}).map((i, id) => {
        const item = {
            name: `AAlien guitar ${++id}`,
            image: "guitar/r/" + id,
            description: "AAlien guitar",
            brand: "AAlien",
            price: Math.round(Math.random() * 400) + 200.99,
            countInStock: Math.round(Math.random() * 100),
            rating: (Math.random() * 5).toFixed(1),
            // numReviews: Math.round(Math.random() * 100),
        };
        // console.log("guitar # " + id + " " + item.name);
        return item;
    });
    // console.log("guitars: ", list);
    return list;
}

export function getAlienViolins() {
    return new Array(16).fill({}).map((i, id) => {
        return {
            name: `AAlien violin ${++id}`,
            image: "violin/r/" + id,
            description: "AAlien violin",
            brand: "AAlien",
            price: Math.round(Math.random() * 400) + 200.99,
            countInStock: Math.round(Math.random() * 100),
            rating: (Math.random() * 5).toFixed(1),
            // numReviews: Math.round(Math.random() * 100),
        };
    });
}

export function getAlienPianos() {
    return new Array(7).fill({}).map((i, id) => {
        return {
            name: `AAlien piano ${++id}`,
            image: "piano/r/" + id,
            description: "AAlien piano",
            brand: "AAlien",
            price: Math.round(Math.random() * 400) + 200.99,
            countInStock: Math.round(Math.random() * 100),
            rating: (Math.random() * 5).toFixed(1),
            // numReviews: Math.round(Math.random() * 100),
        };
    });
}
