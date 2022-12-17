const express = require("express")
const routes = express.Router();

const AnnotationController = require('./controllers/AnnotationController');
const PriorityController = require("./controllers/PriorityController");
const ContentController = require("./controllers/ContentController")

//Rota Annotation 
routes.post('/annotations', AnnotationController.create)
routes.delete('/annotations/:id', AnnotationController.delete)
routes.get('/annotations', AnnotationController.read)
module.exports = routes

//Rota Content
routes.post('/contents/:id', ContentController.update)


//Rota Priority
routes.get('/priorities', PriorityController.read)
routes.post('/priorities/:id', PriorityController.update)
