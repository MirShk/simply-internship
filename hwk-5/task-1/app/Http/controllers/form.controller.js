const formRepository = require('../repository/form.repository');
const utils = require('../../../utils/user.validator');


class FormController {
    renderForm(req, res) {
        res.status(200);
        res.render('form');
    }

    saveFormData(req, res) {
        if (utils.validate(req.body).userDataIsValid) {
            formRepository.saveFormData(req.body);
            res.status(200);
            res.redirect(`/api/${envConfig.versioning.app_version}/result`);
        } else {
            res.status(403);
            res.render('form' ,{
                error: `Oops! Something went wrong. Please select ${utils.validate(req.body).fieldName === 'agree'? '' : 'valid'} ${utils.validate(req.body).fieldName}!`
            });
        }
    }
}

module.exports = new FormController();
