class IndexController {
    renderIndex(req, res) {
        res
            .status(200)
            .render('index.html')
    }
}

module.exports = new IndexController();