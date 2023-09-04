export class PlanModel {
    _id?: string
    name: string
    pricestandar: string
    price3month: string
    price12month: string
    include: string
    imgUrl : string
    constructor (data:{name: string,
        _id?: string,
        pricestandar: string,
        price3month: string,
        price12month: string,
        include: string,
        imgUrl : string}) {
            this._id = data._id
            this.name = data.name
            this.pricestandar = data.pricestandar
            this.price3month =data.price3month
            this.price12month = data.price12month
            this.include =data.include
            this.imgUrl =data.imgUrl
            
        }
}