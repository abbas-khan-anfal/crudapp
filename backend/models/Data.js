import mongoose from "mongoose"

const dateSchema = new mongoose.Schema({
    title : {type : String, require : true},
    imgs : [{type : String, require : true}],
    pub_ids : [{type : String, require : true}],
    createdAt : {type : Date, default : Date.now}
})

const dataModel = mongoose.model('data', dateSchema)
export default dataModel