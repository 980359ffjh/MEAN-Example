function router(app) {
    app.get('/angular/*', (req, res) => {
        res.render('../../public/app/components/' + req.params[0]);
    });

    app.get('*', (req, res) => {
        res.render('./home/index', { Message: message });
    });
}

module.exports = router; // export module call bookRouter