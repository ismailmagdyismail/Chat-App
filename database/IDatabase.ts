export default interface IDatabase{
    connect():Promise<any>
    disconnect():Promise<any>
}

