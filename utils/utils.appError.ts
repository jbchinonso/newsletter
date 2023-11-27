export default class AppError extends Error{
    public  message: string;
    public  status: string;
    public statusCode: number

    constructor(message: string, statusCode: number){
        super(message);

        this.message = message;
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";

        Error.captureStackTrace(this, this.constructor);
    }
    
}