import { Document } from "mongoose";

export interface Todo {
  text: string;
  isCompleted: boolean;
  createdAd: Date;
}

export interface TodoDocument extends Todo, Document {}
