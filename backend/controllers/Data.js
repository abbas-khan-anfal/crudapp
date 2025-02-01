import mongoose from 'mongoose';
import dataModel from '../models/Data.js'
import path from 'path'
import deleteFileHandler from '../utils/deleteFile.js'
import pkg from 'cloudinary';
const { v2: cloudinary } = pkg;

// function to add data in db
const addData = async (req, res, next) => {
    try
    {
        const { title } = req.body
        const { files } = req

        const imgs = [];
        const pub_ids = [];
        Object.keys(files).forEach((item) => {
            files[item].forEach((img) => {
                imgs.push(img.path)
                pub_ids.push(img.filename)
            })
        })

        const data = await dataModel.create({title, imgs, pub_ids});

        res.status(200).json({
            success :true,
            message : "Data added in db",
        })
    }
    catch(error)
    {
        res.status(500).json({
            success :false,
            message : error.message
        })
    }
}

// function to delete data from db
const deleteData = async (req, res, next) => {
    try
    {
        const { d_id } = req.query

        if(!mongoose.isValidObjectId(d_id))
        {
            return res.status(400).json({
                success :false,
                message : "Invalid ID"
            })
        }
    
        const data = await dataModel.findById(d_id)

        if(!data)
        {
            return res.status(404).json({
                success :false,
                message : "Data not found"
            })
        }

        for(const item of data.pub_ids) // suppor asynchronous and wait
        {
            await deleteFileHandler(item);
        }

        await data.deleteOne()

        res.status(200).json({
            success :true,
            message : "Data deleted from db"
        })
    }
    catch(error)
    {
        res.status(500).json({
            success :false,
            message : error.message
        })
    }
}


// function to fetch data from db
const fetchData = async (req, res, next) => {
    try
    {
        const page = Number(req.query.page) || 1
        const limit = 3
        const data = await dataModel.find()
        .sort({_id : 1})
        .limit(limit)
        .skip((page - 1) * limit)

        if(!data)
        {
            return res.status(404).json({
                success :false,
                message : "Data not found"
            })
        }

        const totalDocuments = await dataModel.countDocuments()

        // formula for getting totalPaes
        const totalPages = Math.ceil(totalDocuments / limit)

        res.status(200).json({
            success :true,
            data,
            currentPage : page,
            totalPages
        })
    }
    catch(error)
    {
        res.status(500).json({
            success :false,
            message : error.message
        })
    }
}


// function to fetch data from update
const showUpdateData = async (req, res, next) => {
    try
    {
        const { d_id } = req.query

        if(!mongoose.isValidObjectId(d_id))
        {
            return res.status(404).json({
                success :false,
                message : "Invalid ID"
            })
        }

        const data = await dataModel.findById(d_id)

        if(!data)
        {
            return res.status(404).json({
                success :false,
                message : "Data not found"
            })
        }

        res.status(200).json({
            success :true,
            data,
        })
    }
    catch(error)
    {
        res.status(500).json({
            success :false,
            message : error.message
        })
    }
}


// function to update data in db
const updateData = async (req, res, next) => {
    try
    {
        const { title } = req.body; // New title from request
        const { files } = req; // Uploaded files from multer
        const { d_id } = req.query; // ID passed as a query parameter (e.g., `/update?id=12345`)

        // check if id correct or not
        if(!mongoose.isValidObjectId(d_id))
        {
            return res.status(400).json({
                success : false,
                message : "Invalid ID"
            })
        }

        // Fetch existing data from DB
        const existingData = await dataModel.findById(d_id);
        if(!existingData)
        {
            return res.status(404).json({ 
                success: false, 
                message: "Data not found" 
            });
        }

        // Initialize update object
        const updateFields = {};

        // Update title if it is changed
        if (title && title !== existingData.title) {
            updateFields.title = title;
        }

        // Handle image updates
        const updatedImgs = [...existingData.imgs];
        const updatedPubIds = [...existingData.pub_ids];

        // Iterate through uploaded files
        Object.keys(files).forEach((key, index) => {
            const file = files[key][0];
            if (file) {
                // Remove old image from Cloudinary
                const oldPubId = existingData.pub_ids[index];
                if (oldPubId) {
                    cloudinary.uploader.destroy(oldPubId, (err, result) => {
                        if (err) console.error(`Error deleting old image: ${err.message}`);
                        else console.log(`Deleted old image: ${result}`);
                    });
                }

                // Add new image data
                updatedImgs[index] = file.path; // Cloudinary URL
                updatedPubIds[index] = file.filename; // Cloudinary public_id
            }
        });

        // Update images and public IDs only if they are changed
        if(JSON.stringify(updatedImgs) !== JSON.stringify(existingData.imgs))
        {
            updateFields.imgs = updatedImgs;
        }
        if(JSON.stringify(updatedPubIds) !== JSON.stringify(existingData.pub_ids))
        {
            updateFields.pub_ids = updatedPubIds;
        }

        // Save updates to the database
        const updatedData = await dataModel.findByIdAndUpdate(d_id, { $set: updateFields }, { new: true });

        res.status(200).json({
            success: true,
            message: "Data updated successfully",
            // data: updatedData,
        });
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// function to search data in db
const searchData = async (req, res, next) => {
    try
    {
        const { search } = req.params

        const data = await dataModel.find({
            $or : [
                {title : {$regex : search, $options : "i"}}
            ]
        })

        res.status(200).json({
            success :true,
            data,
        })
    }
    catch(error)
    {
        res.status(500).json({
            success :false,
            message : error.message
        })
    }
}

export { addData, deleteData, fetchData, showUpdateData, updateData, searchData }