export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Access denied, no token provided'
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded); // <--- DEBUG LOG
        req.user = {
            userId: decoded.userId,
            role: decoded.role
        };
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token.'
        });
    }
};

export const authorizedRoles = (...allowedRoles) => {
    return (req, res, next) => {
        console.log("Allowed roles:", allowedRoles);         // <--- DEBUG LOG
        console.log("User from token:", req.user);           // <--- DEBUG LOG
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: 'Access denied you are not authorized'
            });
        }
        next();
    };
};
