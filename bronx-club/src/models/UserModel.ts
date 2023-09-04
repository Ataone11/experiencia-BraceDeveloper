export class UserModel {
    name: string
    last_name: string
    address: string
    message: string
    constructor (data:{name: string,
        last_name: string,
        address: string,
        message: string}) {
            this.name = data.name
            this.last_name = data.last_name
            this.address =data.address
            this.message = data.message
            
        }
}