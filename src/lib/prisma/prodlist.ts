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


export function getAlienGuitars() {
    const list = new Array(27).fill({}).map((i, id) => {
        const item = {
            name: `AAlien guitar ${++id}`,
            image: "guitar/r/" + id,
            description: "AAlien guitar",
            brand: "AAlien",
            price: Math.round(Math.random() * 4) + 2.99,
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
    return new Array(34).fill({}).map((i, id) => {
        return {
            name: `AAlien violin ${++id}`,
            image: "violin/r/" + id,
            description: "AAlien violin",
            brand: "AAlien",
            price: Math.round(Math.random() * 4) + 2.99,
            countInStock: Math.round(Math.random() * 100),
            rating: (Math.random() * 5).toFixed(1),
            // numReviews: Math.round(Math.random() * 100),
        };
    });
}

export function getAlienPianos() {
    return new Array(32).fill({}).map((i, id) => {
        return {
            name: `AAlien piano ${++id}`,
            image: "piano/r/" + id,
            description: "AAlien piano",
            brand: "AAlien",
            price: Math.round(Math.random() * 4) + 2.99,
            countInStock: Math.round(Math.random() * 100),
            rating: (Math.random() * 5).toFixed(1),
            // numReviews: Math.round(Math.random() * 100),
        };
    });
}
