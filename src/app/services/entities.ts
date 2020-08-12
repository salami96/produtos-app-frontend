interface Store {
    title: string;
    logo: string;
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
    store: string;
    category: string;
    name: string;
    imgs: string[];
    sizes: Value[];
    unity: string;
}
interface Value {
    name: string;
    value: number;
}
