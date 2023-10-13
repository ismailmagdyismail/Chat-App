import {INotification} from "./INotification";

export class MockNotificationService implements INotification{
    sendNotification(from: string, to: string, content: string):void {
    }
}