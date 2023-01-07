import bcrypt from 'bcryptjs';
const data = {
  users: [
    {
      name: 'Szymon',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'Marcel',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],

  products: [
    {
      name: 'Green tea',
      slug: 'green-tea',
      category: 'Teas',
      image: '/images/p1.jpg',
      price: 20,
      countInStock: 10,
      brand: 'Lipton',
      rating: 3,
      numReviews: 8,
      description: 'high quality tea',
    },
    {
      name: 'Black tea',
      slug: 'Black-tea',
      category: 'Teas',
      image: '/images/p2.jpg',
      price: 50,
      countInStock: 20,
      brand: 'Nelson',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality black tea',
    },
    {
      name: 'Yerba mate',
      slug: 'yerba-mate',
      category: 'Yerba',
      image: '/images/p3.jpg',
      price: 100,
      countInStock: 0,
      brand: 'Mate',
      rating: 5,
      numReviews: 16,
      description: 'Energizing yerba mate',
    },
    {
      name: 'Yerba ',
      slug: 'yerba',
      category: 'Yerba',
      image: '/images/p3.jpg',
      price: 150,
      countInStock: 5,
      brand: 'Mate',
      rating: 4,
      numReviews: 12,
      description: 'Energizing yerba mate',
    },
  ],
};

export default data;
