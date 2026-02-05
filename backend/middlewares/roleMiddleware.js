const authorizeRoles=(...allowedRoles)=>{
  return (req,res,next) =>{
    if (!req.user) {
      return res.status(401).json({ 
        message: "Authentication required. Please login first." 
      });
    }
    if(!allowedRoles.includes(req.user.role)){
        return res.status(403).json({message:"access denied"})
    }
    next();
  }
  
}
export default authorizeRoles;