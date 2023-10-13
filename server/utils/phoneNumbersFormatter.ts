import { parsePhoneNumberFromString } from 'libphonenumber-js';
import {AppError} from "../errors/AppError";
export function phoneNumbersFormatter(phoneNumber:string):string{
    return `+2${phoneNumber}`;
    // const parsedNumber = parsePhoneNumberFromString(phoneNumber, {defaultCountry:"EG"});
    // if (parsedNumber) {
    //     return parsedNumber.formatNational();
    // } else {
    //     throw new AppError(500,'Invalid phone number');
    // }
}
