const express = require('express');
const app = express();
const port = 3000;

// Middleware для парсинга JSON
app.use(express.json());

// Middleware для парсинга данных форм
app.use(express.urlencoded({ extended: false }));

// Middleware для статических файлов (текущая директория)
// Это позволит открывать index.html по адресу http://localhost:3000
app.use(express.static(__dirname));

// Массив товаров для примера
let products = [
    { id: 1, name: 'Лежанка «Уютный домик»', price: 2500 },
    { id: 2, name: 'Лежанка «Рыбка»', price: 3000 },
    { id: 3, name: 'Венок из цветов', price: 500 }
];

const getNextProductId = () => {
    if (products.length === 0) return 1;
    return Math.max(...products.map(product => product.id)) + 1;
};

// Получение всех товаров
app.get('/products', (req, res) => {
    res.json(products);
});

// Получение товара по id
app.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Товар не найден');
    }
});

// Добавление нового товара
app.post('/products', (req, res) => {
    const { name, price } = req.body;
    
    // Последовательная генерация id
    const newProduct = {
        id: getNextProductId(),
        name,
        price
    };
    
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Редактирование товара
app.put('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);
    
    if (index !== -1) {
        // Обновляем поля, если они переданы, иначе оставляем старые
        // Для полного обновления (PUT) обычно требуют передавать весь объект,
        // но здесь сделаем гибко для удобства
        const { name, price } = req.body;
        
        products[index] = {
            ...products[index],
            name: name !== undefined ? name : products[index].name,
            price: price !== undefined ? price : products[index].price
        };
        
        res.json(products[index]);
    } else {
        res.status(404).send('Товар не найден');
    }
});

// Частичное редактирование товара
app.patch('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);

    if (index !== -1) {
        const { name, price } = req.body;

        products[index] = {
            ...products[index],
            name: name !== undefined ? name : products[index].name,
            price: price !== undefined ? price : products[index].price
        };

        res.json(products[index]);
    } else {
        res.status(404).send('Товар не найден');
    }
});

// Удаление товара
app.delete('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);
    
    if (index !== -1) {
        const deletedProduct = products.splice(index, 1);
        res.json(deletedProduct[0]); // Возвращаем удаленный товар
    } else {
        res.status(404).send('Товар не найден');
    }
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
