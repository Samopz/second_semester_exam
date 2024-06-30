import JWT from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: 'Authentication token required' });
    }
    try {
        const payload = JWT.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid or expired authentication token' });
    }
}


// export function authMiddleware (req, res, next) {
//   try {
//     // Get Token From Header
//     const token = req.headers["authorization"].split(" ")[1];
//     JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
//       if (err) {
//         return res.status(401).send({
//           success: false,
//           message: "Please provide Auth token",
//         });
//       } else {
//         req.body.id = decode.id;
//         next();
//       }
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error In Auth Middleware",
//       error,
//     });
//   }
// };