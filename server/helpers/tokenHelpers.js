import { generateAccessToken, generateRefreshToken } from "../config/jwt.js";

export const setAuthTokens = (res, role) => {
    const refreshToken = generateRefreshToken(role._id);
    const accessToken = generateAccessToken(role._id);

    role.refreshToken = refreshToken;

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return accessToken;
};
