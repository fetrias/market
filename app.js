const express = require('express');
const cors = require('cors');
const { nanoid } = require('nanoid');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 3000;

let products = [
    {
        id: nanoid(6),
        name: 'Лежанка «Уютный домик»',
        category: 'Лежанки',
        description: 'Мягкая лежанка для морских свинок из гипоаллергенного флиса.',
        price: 2500,
        stock: 12,
        rating: 4.9,
        image: '/assets/images/products/bed.jpg'
    },
    {
        id: nanoid(6),
        name: 'Лежанка «Рыбка»',
        category: 'Лежанки',
        description: 'Уютная закрытая лежанка в форме рыбки для комфортного отдыха.',
        price: 3000,
        stock: 9,
        rating: 4.8,
        image: '/assets/images/products/bed_fish.jpg'
    },
    {
        id: nanoid(6),
        name: 'Венок из цветов',
        category: 'Аксессуары',
        description: 'Красивый венок для фотосессий из безопасных искусственных цветов.',
        price: 500,
        stock: 27,
        rating: 4.6,
        image: '/assets/images/products/wreath_of_flowers.jpg'
    },
    {
        id: nanoid(6),
        name: 'Игрушка «Птички-друзья»',
        category: 'Игрушки',
        description: 'Милые птички в корзинке отлично подойдут для фотосессии',
        price: 690,
        stock: 25,
        rating: 4.6,
        image: '/assets/images/products/bird_friends.jpg'
    },
    {
        id: nanoid(6),
        name: 'Миска «Зелёная»',
        category: 'Кормление',
        description: 'Керамическая миска с устойчивым основанием.',
        price: 790,
        stock: 32,
        rating: 4.7,
        image: '/assets/images/products/bowl_green.jpg'
    },
    {
        id: nanoid(6),
        name: 'Миска «Розовая»',
        category: 'Кормление',
        description: 'Удобная миска для корма и воды.',
        price: 820,
        stock: 20,
        rating: 4.6,
        image: '/assets/images/products/bowl_pink.jpg'
    },
    {
        id: nanoid(6),
        name: 'Ошейник «Устрашающий»',
        category: 'Аксессуары',
        description: 'Поможет отпугнуть от беззащитной свинки любых недоброжелателей',
        price: 540,
        stock: 44,
        rating: 4.5,
        image: '/assets/images/products/collar.jpg'
    },
    {
        id: nanoid(6),
        name: 'Домик-гамак «Шалашик»',
        category: 'Домики и гамаки',
        description: 'Подвесной домик для комфортного отдыха питомца.',
        price: 1890,
        stock: 14,
        rating: 4.8,
        image: '/assets/images/products/hammock_house.jpg'
    },
    {
        id: nanoid(6),
        name: 'Костюм «Мехико»',
        category: 'Одежда',
        description: 'Яркий тематический костюм для фотосессий.',
        price: 1390,
        stock: 7,
        rating: 4.7,
        image: '/assets/images/products/mexico_costume.jpg'
    },
    {
        id: nanoid(6),
        name: 'Костюм «Скелетон»',
        category: 'Одежда',
        description: 'Праздничный костюм для тематических мероприятий.',
        price: 1250,
        stock: 8,
        rating: 4.4,
        image: '/assets/images/products/skeleton_costume.jpg'
    }
];

let users = [
    { id: nanoid(6), name: 'Петр', age: 16 },
    { id: nanoid(6), name: 'Иван', age: 18 },
    { id: nanoid(6), name: 'Дарья', age: 20 }
];

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3001'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API управления товарами',
            version: '1.0.0',
            description: 'Простое API для управления товарами'
        },
        servers: [
            {
                url: `http://localhost:${port}`,
                description: 'Локальный сервер'
            }
        ]
    },
    apis: ['./app.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req, res, next) => {
    res.on('finish', () => {
        console.log(`[${new Date().toISOString()}] [${req.method}] ${res.statusCode} ${req.path}`);
        if (req.method === 'POST' || req.method === 'PATCH') {
            console.log('Body:', req.body);
        }
    });
    next();
});

app.use(express.static(__dirname));

function findProductOr404(id, res) {
    const product = products.find((item) => item.id === id);
    if (!product) {
        res.status(404).json({ error: 'Product not found' });
        return null;
    }
    return product;
}

function findUserOr404(id, res) {
    const user = users.find((item) => item.id === id);
    if (!user) {
        res.status(404).json({ error: 'User not found' });
        return null;
    }
    return user;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - category
 *         - description
 *         - price
 *         - stock
 *         - rating
 *         - image
 *       properties:
 *         id:
 *           type: string
 *           description: Автоматически сгенерированный уникальный ID товара
 *         name:
 *           type: string
 *           description: Название товара
 *         category:
 *           type: string
 *           description: Категория товара
 *         description:
 *           type: string
 *           description: Описание товара
 *         price:
 *           type: number
 *           description: Цена товара
 *         stock:
 *           type: integer
 *           description: Количество товара на складе
 *         rating:
 *           type: number
 *           description: Рейтинг товара от 0 до 5
 *         image:
 *           type: string
 *           description: Путь к изображению товара
 *       example:
 *         id: abc123
 *         name: Игрушка «Птички-друзья»
 *         category: Игрушки
 *         description: Милые птички в корзинке отлично подойдут для фотосессии
 *         price: 690
 *         stock: 25
 *         rating: 4.6
 *         image: /assets/images/products/bird_friends.jpg
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - age
 *       properties:
 *         id:
 *           type: string
 *           description: Автоматически сгенерированный уникальный ID пользователя
 *         name:
 *           type: string
 *           description: Имя пользователя
 *         age:
 *           type: integer
 *           description: Возраст пользователя
 *       example:
 *         id: abc123
 *         name: Петр
 *         age: 16
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Создает нового пользователя
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - age
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Пользователь успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Ошибка в теле запроса
 */
app.post('/api/users', (req, res) => {
    const { name, age } = req.body;
    if (typeof name !== 'string' || !name.trim() || age === undefined || !Number.isFinite(Number(age))) {
        return res.status(400).json({ error: 'Name and age are required' });
    }

    const newUser = {
        id: nanoid(6),
        name: name.trim(),
        age: Number(age)
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Возвращает список всех пользователей
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Список пользователей
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
app.get('/api/users', (req, res) => {
    res.json(users);
});

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Получает пользователя по ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID пользователя
 *     responses:
 *       200:
 *         description: Данные пользователя
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Пользователь не найден
 */
app.get('/api/users/:id', (req, res) => {
    const user = findUserOr404(req.params.id, res);
    if (!user) return;
    res.json(user);
});

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: Обновляет данные пользователя
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID пользователя
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Обновленный пользователь
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Нет данных для обновления
 *       404:
 *         description: Пользователь не найден
 */
app.patch('/api/users/:id', (req, res) => {
    const user = findUserOr404(req.params.id, res);
    if (!user) return;

    if (req.body?.name === undefined && req.body?.age === undefined) {
        return res.status(400).json({ error: 'Nothing to update' });
    }

    if (req.body.name !== undefined) {
        if (typeof req.body.name !== 'string' || !req.body.name.trim()) {
            return res.status(400).json({ error: 'Name must be a non-empty string' });
        }
        user.name = req.body.name.trim();
    }

    if (req.body.age !== undefined) {
        if (!Number.isFinite(Number(req.body.age))) {
            return res.status(400).json({ error: 'Age must be a valid number' });
        }
        user.age = Number(req.body.age);
    }

    res.json(user);
});

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Удаляет пользователя
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID пользователя
 *     responses:
 *       204:
 *         description: Пользователь успешно удален
 *       404:
 *         description: Пользователь не найден
 */
app.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const exists = users.some((item) => item.id === id);
    if (!exists) return res.status(404).json({ error: 'User not found' });

    users = users.filter((item) => item.id !== id);
    res.status(204).send();
});

function validateProductPayload(payload, isPatch = false) {
    const { name, category, description, price, stock, rating, image } = payload;

    if (!isPatch || name !== undefined) {
        if (typeof name !== 'string' || !name.trim()) return 'Name is required';
    }
    if (!isPatch || category !== undefined) {
        if (typeof category !== 'string' || !category.trim()) return 'Category is required';
    }
    if (!isPatch || description !== undefined) {
        if (typeof description !== 'string' || !description.trim()) return 'Description is required';
    }
    if (!isPatch || price !== undefined) {
        const parsedPrice = Number(price);
        if (!Number.isFinite(parsedPrice) || parsedPrice < 0) return 'Price must be a valid number';
    }
    if (!isPatch || stock !== undefined) {
        const parsedStock = Number(stock);
        if (!Number.isInteger(parsedStock) || parsedStock < 0) return 'Stock must be a non-negative integer';
    }
    if (!isPatch || rating !== undefined) {
        const parsedRating = Number(rating);
        if (!Number.isFinite(parsedRating) || parsedRating < 0 || parsedRating > 5) return 'Rating must be between 0 and 5';
    }
    if (!isPatch || image !== undefined) {
        if (typeof image !== 'string' || !image.trim()) return 'Image is required';
    }

    return null;
}

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Возвращает список всех товаров
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Список товаров
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
app.get('/api/products', (req, res) => {
    res.json(products);
});

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Получает товар по ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID товара
 *     responses:
 *       200:
 *         description: Данные товара
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Товар не найден
 */
app.get('/api/products/:id', (req, res) => {
    const product = findProductOr404(req.params.id, res);
    if (!product) return;
    res.json(product);
});

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Создает новый товар
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category
 *               - description
 *               - price
 *               - stock
 *               - rating
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *               rating:
 *                 type: number
 *               image:
 *                 type: string
 *     responses:
 *       201:
 *         description: Товар успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Ошибка в теле запроса
 */
app.post('/api/products', (req, res) => {
    const error = validateProductPayload(req.body);
    if (error) return res.status(400).json({ error });

    const { name, category, description, price, stock, rating, image } = req.body;
    const newProduct = {
        id: nanoid(6),
        name: name.trim(),
        category: category.trim(),
        description: description.trim(),
        price: Number(price),
        stock: Number(stock),
        rating: Number(rating),
        image: image.trim()
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
});

/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Обновляет данные товара
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID товара
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *               rating:
 *                 type: number
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Обновленный товар
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Нет данных для обновления или ошибка валидации
 *       404:
 *         description: Товар не найден
 */
app.patch('/api/products/:id', (req, res) => {
    const product = findProductOr404(req.params.id, res);
    if (!product) return;

    if (
        req.body?.name === undefined &&
        req.body?.category === undefined &&
        req.body?.description === undefined &&
        req.body?.price === undefined &&
        req.body?.stock === undefined &&
        req.body?.rating === undefined &&
        req.body?.image === undefined
    ) {
        return res.status(400).json({ error: 'Nothing to update' });
    }

    const error = validateProductPayload(req.body, true);
    if (error) return res.status(400).json({ error });

    if (req.body.name !== undefined) product.name = req.body.name.trim();
    if (req.body.category !== undefined) product.category = req.body.category.trim();
    if (req.body.description !== undefined) product.description = req.body.description.trim();
    if (req.body.price !== undefined) product.price = Number(req.body.price);
    if (req.body.stock !== undefined) product.stock = Number(req.body.stock);
    if (req.body.rating !== undefined) product.rating = Number(req.body.rating);
    if (req.body.image !== undefined) product.image = req.body.image.trim();

    res.json(product);
});

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Удаляет товар
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID товара
 *     responses:
 *       204:
 *         description: Товар успешно удален
 *       404:
 *         description: Товар не найден
 */
app.delete('/api/products/:id', (req, res) => {
    const id = req.params.id;
    const exists = products.some((item) => item.id === id);
    if (!exists) return res.status(404).json({ error: 'Product not found' });

    products = products.filter((item) => item.id !== id);
    res.status(204).send();
});

app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});

app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
    console.log(`Swagger UI доступен по адресу http://localhost:${port}/api-docs`);
});
