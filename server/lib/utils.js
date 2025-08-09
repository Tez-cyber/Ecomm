import jwt from "jsonwebtoken"
import { redis } from "./redis.js"

export const generateTokens = (userId) => {
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m"
    })

    const refreshToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "7d"
    })

    return { accessToken, refreshToken }
}

export const storeRefreshToken = async(userId, refreshToken) => {
    await redis.set(`refresh_token: ${userId}`, refreshToken, "EX", 7*24*3600); // 7days
}

/* 
    The res.cookie() method adds a Set-Cookie header to the HTTP response. 
    The browser receives this header and stores the cookie. The next time 
    the browser makes a request to the same domain, it includes a Cookie 
    header containing the stored cookie.
    
    The basic syntax is:
    res.cookie(name, value, [options])
*/
export const setCookies = (res, accessToken, refreshToken) => {
    res.cookie("accessToken", accessToken, {
        httpOnly: true, // prevent XSS attacks
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict", // prevent CSRF attack, cross site req forgery
        maxAge: 15 * 60 * 1000 // 15 mins in milli secconds
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true, // prevent XSS attacks
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict", // prevent CSRF attack, cross site req forgery
        maxAge: 7 * 24 * 60 * 60 * 1000 
    })
} 