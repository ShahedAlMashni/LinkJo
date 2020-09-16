var middlewareObj={};

middlewareObj.isLoggedIn=function(req,res,next){
    if(res.locals.user){
        return next();
    }
    req.flash("error","Please login first");
    res.redirect('/login');
}

module.exports = middlewareObj;