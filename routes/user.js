const express = require("express");
const router = express.Router();
const userController=require('../controllers/userController')

router.post('/createArticle',userController.createArticle)
router.get('/getAllArticle',userController.getAllArticle)
router.post('/editArticle/:id',userController.editArticle)
router.post('/removeArticle/:id',userController.removeArticle)
router.post('/createcategory',userController.createCategory)
router.post('/listcategory',userController.listcategory)







module.exports = router;