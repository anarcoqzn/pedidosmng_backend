const routes = require('express').Router()
const multer = require('multer');
const multerConfig = require('./config/multer');
const multerMiddleware = multer(multerConfig).single("file")
const authMiddleware = require('./middlewares/auth');
routes.use('/user', authMiddleware);

const EventController = require('./controllers/EventController');
const ProductController = require('./controllers/ProductController');
const OrderController = require('./controllers/OrderController');
const ImageController = require('./controllers/ImageController');
const UserController = require('./controllers/UserController');
const authController = require('./controllers/authController');

// Public routes
routes.get('/event', EventController.listAll);
routes.get('/product', ProductController.listAll);
routes.get('/event/:id', EventController.getById);
routes.get('/product/:id', ProductController.getById);
routes.get('/products/:category', ProductController.getByCategory);
routes.get('/categories', ProductController.getCategories);
// ----------

// CONSERTAR ESTAS ROTAS
routes.get('/user/event',  UserController.getEvents);
routes.get('/user/event/:id',  EventController.getById);
routes.post("/user/event",  EventController.create);
routes.delete('/user/event/:id',  EventController.delete);
routes.put('/user/event/:id',  EventController.update);

routes.get('/user/product', UserController.getProducts);
routes.get('/user/product/:id', ProductController.getById);
routes.post('/user/product', ProductController.create);
routes.delete('/user/product/:id', ProductController.delete);
routes.put('/user/product/:id', ProductController.update);
routes.get('/user/categories', ProductController.getCategories);

routes.get('/user/order', OrderController.listAll);
routes.delete('/user/order/:id', OrderController.delete);
routes.post('/order', OrderController.create);

routes.get('/image/:id', ImageController.getById);
routes.post('/user/image', multerMiddleware, ImageController.uploadImage);
routes.delete('/user/image/:id', ImageController.delete);

routes.get('/user', UserController.getUser);
routes.post('/register', authController.register);
routes.put('/user', UserController.update);
routes.delete('/user/:id', UserController.delete);

routes.post('/authenticate', authController.authenticate);

module.exports = routes;