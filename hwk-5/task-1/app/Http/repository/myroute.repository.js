class MyrouteRepository {
    collectData(data) {
        console.log(data);

        return {
            params: data.params,
            query_params: data.query,
            headers: data.headers,
            cookies: data.cookies
        };
    }
}

module.exports = new MyrouteRepository();