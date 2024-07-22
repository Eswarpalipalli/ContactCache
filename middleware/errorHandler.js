import constants from "../constants.js";

const errorHandler = (err,req,res,next) =>{
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({title :"Validation Failed!",message : err.message, stackTrace : err.stack}); 
            break;
        case constants.NOT_FOUND:
            res.json({title :"Not Found",message : err.message, stackTrace : err.stack});
            break;
        case constants.UNAUTHORISED:
            res.json({title :"UNAUTHORISED",message : err.message, stackTrace : err.stack});
            break;
        case constants.FORBIDDEN:
            res.json({title :"FORBIDDEN ERROR",message : err.message, stackTrace : err.stack});
            break;
        case constants.SERVER_ERROR:
            res.json({title :"SERVER ERROR",message : err.message, stackTrace : err.stack});
            break;
        default:
            console.log("No Error! Everything's Fine..");
            break;
    }
};

export default errorHandler;