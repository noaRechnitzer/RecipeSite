export interface User {
    _id?:number,
    userName:string,
    password:string,
    email:string,
    description:string,
    role:Role,
    recipes:[Recipe]
}

export enum Role{
    user="user",
    admin="admin"
}

interface Recipe{
    id?:number
    name:string,
    image:string
}