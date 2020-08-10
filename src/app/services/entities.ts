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
    lat: string;
    long: string;
    payments: Payment[];
    ship: number;
}
interface Payment {
    name: string;
    icon: string;
}
