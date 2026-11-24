
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
        return response.status(200).json({
            success: false,
            message:"Enter a valid email"
        })
    }
}