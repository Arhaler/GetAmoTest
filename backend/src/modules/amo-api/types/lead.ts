type MinimalLeadModel = {
    id?:number,
    status_id?:number,
    pipeline_id?:number,
    _embedded?:{
        contacts:Array<{
            id:number
        }>
    }
}
export default MinimalLeadModel;