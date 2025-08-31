export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image?: string;
}

export const products: Product[] = [
    {
        id: '1',
        name: 'Aspirin 100mg',
        price: 8.99,
        description: 'Pain relief and fever reducer. 100 tablets.',
        image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400',
    },
    {
        id: '2',
        name: 'Vitamin D3 1000 IU',
        price: 12.49,
        description: 'Daily vitamin D supplement. 60 capsules.',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400',
    },
    {
        id: '3',
        name: 'Ibuprofen 200mg',
        price: 6.99,
        description: 'Anti-inflammatory pain reliever. 50 tablets.',
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400',
    },
    {
        id: '4',
        name: 'Multivitamin',
        price: 15.99,
        description: 'Complete daily multivitamin. 90 tablets.',
        image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400',
    },
    {
        id: '5',
        name: 'Cough Syrup',
        price: 9.99,
        description: 'Honey-based cough relief syrup. 200ml.',
        image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400',
    },
    {
        id: '6',
        name: 'Bandages Pack',
        price: 4.99,
        description: 'Assorted adhesive bandages. 30 pieces.',
        image: 'https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400',
    },
    {
        id: '7',
        name: 'Thermometer',
        price: 19.99,
        description: 'Digital oral thermometer with fever alarm.',
        image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400',
    },
    {
        id: '8',
        name: 'Hand Sanitizer',
        price: 3.99,
        description: '70% alcohol hand sanitizer gel. 500ml.',
        image: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400',
    },
];
