type MinimalContactModel = {
    id?:number,
    name:string;
    first_name:string;
    last_name:string;
    custom_fields_values:Array<{
        field_code:string,
        values:Array<{
            value: string
        }>
    }>
}
export default MinimalContactModel;