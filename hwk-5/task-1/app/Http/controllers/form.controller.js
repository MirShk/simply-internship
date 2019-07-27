const formRepository = require('../repository/form.repository');

class FormController {
    renderForm(req, res) {
        res.render('form');
    }

    saveFormData(req, res) {
        formRepository.saveFormData(req.body);
        res.redirect(`/api/${envConfig.versioning.app_version}/result`);
    }
}

module.exports = new FormController();
