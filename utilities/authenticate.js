//const isAuthenticated = (req, res, next) => {
//    if (req.session.user === undefined) {
//        return res.status(401).json({ message: "You do not have access" });
//    }  
//    next();
//}
//
//module.exports = { isAuthenticated };

const isAuthenticated = (req, res, next) => {
    // req.isAuthenticated() is a built-in Passport method
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: "You do not have access" });
}
module.exports = { isAuthenticated };