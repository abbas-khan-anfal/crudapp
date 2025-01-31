import express from 'express'
import isAuthenticated from '../middlewares/Auth.js'
import { addData, deleteData, fetchData, searchData, showUpdateData, updateData } from '../controllers/Data.js'
import fileUploader from '../config/Multer.js'


const router = express.Router()

// route to add data in db
router.post('/add', isAuthenticated, fileUploader.fields([{name : "img1", maxCount : 1}, {name : "img2", maxCount : 1}]), addData)

// route for fetching data from db
router.get('/fetch', isAuthenticated, fetchData)

// route for deleting data
router.delete('/delete', isAuthenticated, deleteData )

// // route for show update data
router.get('/showupdatedate', isAuthenticated, showUpdateData )

// route for update data
router.put('/update', isAuthenticated, fileUploader.fields([{name : "img1", maxCount : 1}, {name : "img2", maxCount : 1}]), updateData )

// // route to search data
router.get('/searchdata/:search', isAuthenticated, searchData )

export default router