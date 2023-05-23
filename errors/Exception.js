import {print ,OutputType} from '../helpers/print.js'

export default class Exception extends Error {
    static USER_EXIST = "User already exist"
    static CANNOT_rEGISTER_USER =" Canot register user "
    static WRONG_EMAIL_AND_PASSWORD =" Wrong email and password"
    static WRONG_PASSWORD_EMAIL =" Wrong  password email"
    constructor(message,validationError={}){
        // call constructor of parent class(Error)
        super(message)
        print(message,OutputType.ERROR)
        this.validationError =validationError
    }
}