import {IConversationDataAccess} from "./IConversationDataAccess";
import {IMessageDataAccess} from "./IMessageDataAccess";
import {IUserDataAccess} from "./IUserDataAccess";


/**
 * SINGLETON to be sued across the app by different services and handle to access database tables
 */
export interface IDataAccess extends IConversationDataAccess,IUserDataAccess,IMessageDataAccess{

}