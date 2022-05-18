const Course = require('../models/Course')
const {mulMongooseToObj} = require('../../utils/mongoose')

class SiteController {
    // [GET] /news
    index(req, res, next) {

        // use callback
        // Course.find({}, function(err, courses){
        //     if(!err){
        //         res.json(courses)
        //     }else{
        //         next(err)
        //     }
        // })

        // use promise
        // Course.find({})
        // .then(courses => res.json(courses))
        // .catch(next)

        Course.find({})
        .then(courses => {
            res.render('home', {courses : mulMongooseToObj(courses)})
        })
        .catch(next)
        //res.render('home');
    }
}

module.exports = new SiteController();
