const Course = require('../models/Course');
class CourseController {
    // [GET] /courses/:slug
    async show(req, res, next) {
        try {
            const course = await Course.findOne({
                slug: req.params.slug,
            }).lean();
            res.render('courses/show', { course });
        } catch (error) {
            next(error);
        }
    }

    // [GET] /courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    // [POST] /courses/store
    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg`;
        const course = new Course(formData);
        course
            .save()
            .then(() => {
                res.redirect('/');
            })
            .catch((err) => {});
    }
}
module.exports = new CourseController();
