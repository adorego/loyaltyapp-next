import Benefit from "./Benefit";
import LandingTemplateInterface from "./LandingTemplate-interface";
export enum CampaignType{
    MATRICULATION,
    SPECIALIZATION,
    COURSE


}
export default interface Campaign{
    id:string;
    name:string;
    type:CampaignType;
    startDate:string;
    endDate:string;
    benefit:string;
    image_url:string;
    image_width:number;
    image_height:number;
    term:number;
    places:number;
    rewardForSharing:number;
    rewardForRegistration:number;
    landing:string;
}