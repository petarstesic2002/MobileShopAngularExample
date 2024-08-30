export interface Brand {
  id:number,
  name:string
}
export interface Model{
  id:number,
  name:string,
  brand_id:number
}
export interface StorageOption{
  id:number,
  name:string
}
export interface Color{
  id:number,
  name:string
}
export interface Connectivity{
  id:number,
  name:string
}
export interface Mobile{
  id:number,
  model_id:number,
  storage_option_ids:Array<number>,
  color_ids:Array<number>,
  connectivity_ids:Array<number>,
  prices:Array<number>,
  image:string,
  release_date:string
}
