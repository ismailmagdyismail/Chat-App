import {INotification} from "./INotification";
import {TwilioSMSNotification} from "./twilioSMSNotification";
import {MockNotificationService} from "./mockNotificationService";
export function notificationServiceFactory(serviceName:string):INotification{
    let service:INotification|null;
    if(serviceName == "twilio"){
        service = createTwilioNotificationService();
    }
    else{
        service = new MockNotificationService();
    }
    return service ?? new MockNotificationService();
}
function createTwilioNotificationService():INotification|null{
    const accountSid:string|undefined = process.env.ACCOUNT_SID;
    const authToken:string|undefined = process.env.AUTH_TOKEN;
    if(!accountSid || !authToken){
        return  null;
    }
    return new TwilioSMSNotification(accountSid,authToken);
}