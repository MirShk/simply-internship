class IndexController {
    collectData(req) {
        return {
            params: req.params,
            query_params: req.query,
            headers: req.headers,
            cookies: req.cookies
        };
    }
}

module.exports = new IndexController();