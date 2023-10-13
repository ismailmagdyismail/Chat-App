import {INotification} from "./INotification";
import * as twilio from 'twilio';

/**
 * Free Trial version can't send NOTIFICATIONS except for one number
 */
export class TwilioSMSNotification implements INotification{
    private readonly client: twilio.Twilio ;
    constructor(accountSid:string,authToken:string) {
        this.client = new twilio.Twilio(accountSid, authToken);
    }
    sendNotification(from:string,to:string,content: string):void{
        this.client.messages.create({
            body: `A mssage is Sent to you by ${from} Message:\n${content}`,
            from:process.env.TWILIO_NUMBER,
            to:process.env.TRUSTED_NUMBER!,
        });
    }
}