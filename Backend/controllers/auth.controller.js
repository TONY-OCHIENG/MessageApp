import database from "../database/db.js"
import { comparepassword, hashPassword } from "../lib/hashPassword.js"
import jwt from 'jsonwebtoken'

export const registerAccount = (request,response) => {
    const { firstName, lastName, email, password, confirmPassword} = request.body
    if (!firstName || !lastName || !email || !password
        || !confirmPassword
    ) {
        return response.status(400).json({success: false,message: "Fill all fields"})
    }

    if (password !== confirmPassword) {
        return response.status(400).json({success: false, message: "password mismatch"})
    }

    if (firstName.length > 100 || lastName.length > 100) {
        return response.status(400).json({success: false, message: "Enter a valid name"})
    }

    //validating email using regex
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!regex.test(email)) {
        return response.status(400).json({
            success: false,
            message:"Enter a valid email"
        })
    }

    //validating password
    if (password.length < 8) {
        return response.status(400).json({success: false, message: "Password must be at least 8 characters long"})
    }

    const hpassword = hashPassword(password)

    try {
        const checkEmail = "SELECT email FROM users WHERE email = ?"
        database.query(checkEmail,[email],(err,results) => {
            if (err) return response.status(500).json({success: false, message: "Internal server error"})
            if (results.length > 0) {
                return  response.status(409).json({success: false, message: "email already exists"})
            } else {
                const registerAccount = "INSERT INTO users(firstName,lastName,email,password) VALUES(?,?,?,?)"
                database.query(registerAccount,[firstName,lastName,email,hpassword], (error,result) => {
                    if (error) return response.status(500).json({success: false, message: "Internal server error"})
                    return response.status(201).json({success: true, message: "Account created successfully"})
                })                     
            }
        })     
    } catch (error) {
      console.log("Error in registerAccount controller", error.message);
      response.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const loginAccount = (request,response) => {
    const { email, password} = request.body
    if (!email || !password) {
        return response.status(400).json({success: false, message: "Fill all fields"})
    }

    //validating email using regex
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!regex.test(email)) {
        return response.status(400).json({
            success: false,
            message:"Enter a valid email"
        })
    }

    try {
        const fetchingEmail = "SELECT user_id,email, password FROM users WHERE email = ?"
        database.query(fetchingEmail,[email],(error,result) => {
            if (error) return response.status(500).json({success: false, message: "Internal server error"})
            if (result.length > 0) {
                const pass = result[0].password
                const user_id = result[0].user_id
                const hashedPassword = comparepassword(password,pass)
                if (hashedPassword) {
                    const accessToken = jwt.sign({user_id},process.env.TOKEN_SECRET,{expiresIn:'1m'})
                    const refreshToken = jwt.sign({user_id},process.env.TOKEN_SECRET,{expiresIn:"7d"})

                    response.cookie("refresh",refreshToken,({
                        httpOnly: true,
                        secure:process.env.NODE_ENV === "production",
                        sameSite: "strict",
                        maxAge: 7 * 24 * 60 * 60 * 1000
                    }))

                    //storing access token in http only cookie

                    response.cookie("access",accessToken,({
                        httpOnly: true,
                        secure:process.env.NODE_ENV === "production",
                        sameSite: "strict",
                        maxAge: 1 * 60 * 1000
                    })) 
                    return response.status(200).json({success: true, message: "Login successfully"})
                } else {
                    return response.status(401).json({success: false, message: "Invalid credentials"})
                }
            }  
        })
    } catch (error) {
        console.log("Error in loginAccount controller, ", error.message)
        return response.status(500).json({success: false, message: "Internal server error"})
    }
}

export const authenticateUser = (request,response) => {
    return response.status(200).json({success: true, user_id: request.user_id})
}