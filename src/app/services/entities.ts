interface Store {
    title: string;
    logo: string;
    favicon: string;
    slogan: string;
    phone: string;
    whatsapp: string;
    fb: string;
    insta: string;
    email: string;
    address: string;
    map: string;
    directions: string;
    payments: Payment[];
    categories: Category[];
    ship: number;
}
interface Payment {
    name: string;
    icon: string;
}
interface Category {
    name: string;
    icon: string;
}
interface Product {
    cod: string;
    store: string;
    category: string;
    name: string;
    imgs: string[];
    sizes: {
        name: string;
        value: number;
    }[];
    unity: string;
    extras: {
        name: string;
        value: number;
    }[];
    optional: string[];
}
