const routes = require('express').Router()
const multer = require('multer');
const multerConfig = require('./config/multer');
const multerMiddleware = multer(multerConfig).single("file")

const EventController = require('./controllers/EventController');
const ProductController = require('./controllers/ProductController');
const OrderController = require('./controllers/OrderController');
const ImageController = require('./controllers/ImageController');
const UserController = require('./controllers/UserController');

routes.get('/event', EventController.listAll);
routes.get('/event/:id', EventController.getById);
routes.post("/event", EventController.create);
routes.delete('/event/:id', EventController.delete);
routes.put('/event/:id', EventController.update);

routes.get('/product', ProductController.listAll);
routes.get('/product/:id', ProductController.getById);
routes.post('/product', ProductController.create);
routes.delete('/product/:id', ProductController.delete);
routes.put('/product/:id', ProductController.update);

routes.get('/order', OrderController.listAll);
routes.post('/order', OrderController.create);
routes.delete('/order/:id', OrderController.delete);

routes.get('/image/:id', ImageController.getById);
routes.post('/image', multerMiddleware, ImageController.uploadImage);
routes.delete('/image/:id', ImageController.delete);
routes.get('/image', ImageController.listAll);

routes.get('/user', UserController.getUser);
routes.post('/user', UserController.create);
routes.put('/user', UserController.update);
routes.delete('/user', UserController.delete);

module.exports = routes;