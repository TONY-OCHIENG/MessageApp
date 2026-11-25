import database from "../database/db.js"
import { hashPassword } from "../lib/hashPassword.js"

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
        const fetchingEmail = "SELECT email, password FROM users WHERE email = ?"
        database.query(fetchingEmail,[email],(error,result) => {
            if (error) return response.status(500).json({success: false, message: "Internal server error"})
            
        })
    } catch (error) {
        console.log("Error in loginAccount controller, ", error.message)
        return response.status(500).json({success: false, message: "Internal server error"})
    }
}