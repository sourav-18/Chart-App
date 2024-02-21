try{
        

}catch(error){
    console.log("error form getMessage ",error)
    res.status(500).json({error:error.message})

}