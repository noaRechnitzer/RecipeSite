export interface Recipe {
    _id:number,
    name:string,
    description:string,
    categoryName:[string],
    prepareMinute:number,
    level:number,
    publishDate:Date,
    steps:[Step],
    instructions:[string],
    image:string,
    private:Boolean,
    userCreated_id:number,
    userCreated_name:string
}
interface Step{
    name:string,
    ingredients:[string]
}
