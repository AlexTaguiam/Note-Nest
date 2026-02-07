import admin from "../config/firebase";

export const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const token = authHeader.split("Bearer")[1];

    const decodedToken = await admin.auth().verifyIdToken(token);

    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      emailVerified: decodedToken.email_verified,
      role: decodedToken.role || "customer",
    };

    next();
  } catch (error) {
    console.error("Auth error", error);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
