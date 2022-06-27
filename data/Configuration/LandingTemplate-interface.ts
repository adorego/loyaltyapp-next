import LandingSectionInterface from "./LandingSection-interface";

export default interface LandingTemplateInterface{
    _id?:string;
    template_name:string;
    numberOfSections:number;
    sections:LandingSectionInterface[];

}