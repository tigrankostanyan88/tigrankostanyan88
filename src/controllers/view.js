module.exports = {
    getHome: (req, res) => {
        res.render('user/index', {
            title: 'Գլխավոր'
        })
    },
    getTests: (req, res) => {
        res.render('user/pages/tests', {
            title: 'Թեստեր'
        })
    },
    // Admin controllers
    getAdmin: (req, res) => {
        res.render('admin/index', {
            title: 'Թեստեր'
        })
    }
}