export interface ITask {
  _id:string;
  status:{_id:string,name:string}
  user:{_id:string, name:string, email:string, password:string}
  updateUser:{_id:string, name:string, email:string, password:string}
  updateTime:Date
  updateTimeString?:string;
  name:string;
  description:string;

}
