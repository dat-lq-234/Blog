const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const Schema = mongoose.Schema
const mongooseDelete = require('mongoose-delete')
const AutoIncrement = require('mongoose-sequence')(mongoose);




const Course = new Schema({
    _id: {type: Number},
    name: {type: String, required: true},
    description: {type: String, maxlength: 600},
    image: {type: String, maxlength: 255},
    videoId: {type: String, maxlength: 255},
    slug: { type: String, slug: 'name', unique: true}
}, {
    timestamps: true,
    _id: false
})

// add plugin
mongoose.plugin(slug)
Course.plugin(mongooseDelete, { 
    deletedAt : true,
    overrideMethods: 'all' 
});
Course.plugin(AutoIncrement);


module.exports = mongoose.model('Course', Course)
