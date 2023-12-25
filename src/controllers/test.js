const DB = require('../models');

const { Test } = DB.models;

module.exports = {
    addTest: async (req, res) => {
        try {
            const test = await Test.create(req.body);

            res.status(201).json({
                time: (Date.now() - req.time) + " ms",
                test
            })
        } catch(e) {
            console.log(e);
            res.status(500).json({
                message: 'Interval server error!'
            })
        }
    },
    getTests: async (req, res) => {
        try {
            const test = await Test.findAndCountAll();

            res.status(201).json({
                time: (Date.now() - req.time) + " ms",
                test
            })
        } catch(e) {
            console.log(e);
            res.status(500).json({
                message: 'Interval server error!'
            })
        }
    },
    getTest: async (req, res) => {
        try {
            const test = await Test.findOne({
                where: { id: req.params.id }
            });

            res.status(201).json({
                time: (Date.now() - req.time) + " ms",
                test
            })
        } catch(e) {
            console.log(e);
            res.status(500).json({
                message: 'Interval server error!'
            })
        }
    },
    updateTest: async (req, res) => {
        try {
            const test = await Test.findByPk(req.params.id);

            // if (!test) return next(new AppError('Category not found.', 404));

            for(key in req.body) test[key] = req.body[key];
            await test.save();

            res.status(201).json({
                status: 'success',
                time: (Date.now() - req.time) + " ms",
                test
            })
        } catch(e) {
            console.log(e);
            res.status(500).json({
                message: 'Interval server error!'
            })
        }
    },
    deleteTask: async (req, res) => {
        try {
            await Test.destroy({
                where: { id: req.params.id }
            });
            res.status(204).json({});
        } catch(e) {
            console.log(e);
            res.status(500).json({
                message: 'Interval server error!'
            });
        }
    }
}