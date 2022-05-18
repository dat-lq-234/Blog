const { mulMongooseToObj } = require("../../utils/mongoose");
const Course = require("../models/Course");

class MeController {
    // [GET] /me /stored/course  
    storedCourses(req, res, next) {

        let courseQuery = Course.find({}); 
        if(req.query.hasOwnProperty('_sort')){
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type
            });
        }
        Promise.all([courseQuery, Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) => res.render('me/stored-courses',{
                deletedCount,
                courses: mulMongooseToObj(courses)
            }))
        .catch(next)

    }

    // [GET] /me /trash.course  
    trashCourses(req, res, next) {
        Course.findDeleted({})
        .then(courses => res.render('me/trash-courses',{
            courses: mulMongooseToObj(courses)
        }))
        .catch(next)
        
    }
}

module.exports = new MeController();
