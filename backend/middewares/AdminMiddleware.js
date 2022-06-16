

const validateAdmin = (req, res, next) => {
    const admin = req.body.admin
    if (admin=1) {
        next();
    } else {
        return res.status(401).json("Vous n'êtes pas administrateur !")
    }
}

module.exports = {validateAdmin};