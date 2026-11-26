
export const getusers = (request,response) => {
    const { id } = request.params
    try {
        
    } catch (error) {
        console.log("Error in getusers controller ",error.message)
        return response.status(500).json({success: false, message: "Internal server error"})
    }
}