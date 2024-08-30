export class CartDto {
  phoneId!:number;
  chosenColor!:number;
  chosenConn!:number;
  chosenStorage!:number;
  count:number=1;
  constructor(chosenColor:number,chosenConn:number,chosenStorage:number,phoneId:number){
    this.phoneId=phoneId;
    this.chosenColor=chosenColor;
    this.chosenConn=chosenConn;
    this.chosenStorage=chosenStorage;
  }
}
