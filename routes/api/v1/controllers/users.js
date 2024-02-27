import express from 'express'; 

var router = express.Router();

router.get('/myIdentity', (req, res) => {
    if (!req.session.isAuthenticated) {
        return res.json({ status: "loggedout" });
    }
    const userInfo = {
        name: req.session.account.name,
        username: req.session.account.username
    };

    return res.json({ status: "loggedin", userInfo });
});

export default router;