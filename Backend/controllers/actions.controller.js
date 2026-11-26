import database from "../database/db.js"
export const getusers = (request,response) => {
    const { id } = request.params
    try {
        const getusers = "SELECT user_id,firstName, lastName, profile FROM users WHERE user_id != ?" 
        database.query(getusers,[id],(error,result) => {
            if (error) return response.status(500).json({success: false, message: "Internal server error"})
            if (result.length > 0) {
                return response.status(200).json({success: true, result: result})
            } else {
                return response.status(404).json({success: false, message: "users not found"})
            }
        })       
    } catch (error) {
        console.log("Error in getusers controller ",error.message)
        return response.status(500).json({success: false, message: "Internal server error"})
    }
}