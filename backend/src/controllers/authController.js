import admin from "../config/firebase.js";
import User from "../models/User.js";

export const syncUser = async (req, res) => {
  try {
    const { uid, email } = req.user;

    let user = await User.findOne({ firebaseUid: uid });

    if (!user) {
      user = await User.create({
        firebaseUid: uid,
        email: email,
        role: "customer",
      });

      await admin.auth().setCustomUserClaims(uid, {
        role: "customer",
      });

      console.log("New User created:", uid);
    } else {
      if (user.firebaseUid !== uid) {
        user.firebaseUid = uid;
        await user.save();

        await admin.auth().setCustomUserClaims(uid, { role: "customer" });
        console.log("Updated Firebase UID for existing email:", email);
      }

      console.log("Existing user synced", uid);
    }
    res.json({
      success: true,
      user: {
        uid: user.firebaseUid,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Sync error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUSerProfile = async (req, res) => {
  try {
    const { uid } = req.user;

    const user = await User.findOne({ firebaseUid: uid });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        uid: user.firebaseUid,
        email: user.email,
        role: user.role,
        displayName: user.displayName,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
