const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', './views');

let products = [];

app.get('/', (req,res) => {
    res.render('index',{products});
});

app.post('/add-product', (req, res) => {
    const { name, price } = req.body;
    if (name && price) {
        const newProduct = { id: products.length + 1, name, price };
        products.push(newProduct);
    }
    res.redirect('/');
});

app.use((req, res) => {
    res.status(404).render('error', { message: 'Page not found' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});