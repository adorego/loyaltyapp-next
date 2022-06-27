import { ObjectId } from 'mongodb';
import { ReactNode } from 'react';

export type LandingSections = {
   _id:ObjectId,
   section1_title:string,
   section2_title:string,
   section3_title:string
}
export interface CardInterface{
   id:string|undefined;
   additionalStyle?:{};
   pageHeader:string;
   exclusiveComunication:string;
   image:ReactNode;
   title:string;
   description?:string;
   term:string;
   validityFrom:string;
   validityTo:string;
   places:string;
   rewardForShare:string;
   rewardForRegistration:string;
   landing_sections:LandingSections;
   link?:{text:string,url:string}
   // children:ReactNode;
}