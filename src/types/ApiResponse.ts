import { Message } from "@/models/User";

export interface ApiResponse{
  success:boolean,
  message:string,
  isAcceptMessage?:boolean,
  messages?:Array<Message>
}