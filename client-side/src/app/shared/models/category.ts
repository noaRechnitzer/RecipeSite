export interface Category {
    _id:number,
    name:string,
    description:string,
    recipes:[Recipe],
}
interface Recipe{
    id:number
    name:string,
    image:string
}