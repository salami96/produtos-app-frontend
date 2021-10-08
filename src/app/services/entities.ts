interface Store {
    _id?: string;
    code: string;
    ownerUid: string;
    title: string;
    logo: string;
    favicon: string;
    slogan: string;
    phone: string;
    whatsapp: string;
    fb: string;
    insta: string;
    email: string;
    address: Address[];
    map: string;
    directions: string;
    payments: Payment[];
    categories: Category[];
    shippings: {
        zipCode: string;
        value: number;
    }[];
    color: string;
    pixQrCode: string;
    pixKey: string;
    pixKeyType: string;
}
interface Payment {
    _id: string;
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
    categories: Category[];
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
    active: boolean;
}
interface Order {
    _id: string;
    cod: number;
    products: OrderItem[];
    client: User;
    store: Store;
    date: Date[];
    payment: Payment;
    address: Address;
    status: number;
    total: number;
}
interface OrderItem {
    cod: string;
    img: string;
    name: string;
    size: string;
    total: number;
    value: number;
    extras: {
        name: string;
        value: number;
    }[];
    removed: string[];
    quantity: number;
    observations: string;
}
interface User {
    _id?: string;
    uid: string;
    name: string;
    phone: string;
    email: string;
    address: Address[];
    avatar: string;
}
interface Address {
    _id: string;
    name: string;
    street: string;
    number: string;
    district: string;
    city: string;
    state: string;
    zipCode: string;
    complement: string;
    reference: string;
}
