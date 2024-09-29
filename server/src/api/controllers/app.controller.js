const path = require("path");

class AppController {

    static async getReactApp(req, res, next) {
        try {
            res.sendFile(path.join(__dirname, '../../public/app', 'index.html'));
        } catch (err) {
            next(err);
        }
    }

}

module.exports = {AppController};