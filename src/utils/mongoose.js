module.exports = {
    mulMongooseToObj : function(arrays){
        return arrays.map(arrays => arrays.toObject())
    },
    mongooseToObj : function(arrays){
        return arrays ? arrays.toObject() : arrays
    }
}
