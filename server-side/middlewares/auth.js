const jwt = require('jsonwebtoken');
exports.auth = (req, res, next)=>{
    try {
        const { authorization } = req.headers; // חילוץ של הטוקן מההידר
        const [, token] = authorization.split(' ');
        const privateKey = process.env.JWT_SECRET || 'JWT_SECRET'; // מחרוזת סודית שלפיה נוצר הטוקן
        console.log(token);
        console.log(privateKey);
        let data={user_id:"1234"}
        data = jwt.verify(token, privateKey);
        console.log("=====");
        console.log(data);
        req.user = data; // הוספת תכונה לבקשה
        next(); // עובר לראוט/מידלוואר
    } catch (error) {
        console.log(error);
        next({ message: error.message, status: 401 })
    }
}