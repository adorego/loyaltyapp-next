import GeneralRegistration from "./GeneralRegistration";

export interface LandingCreatorProps{
    type:string;
}
const LandingCreator = (props:LandingCreatorProps) =>{
    
    return(
        <div>
            {props.type === 'generalRegistration' && <GeneralRegistration />}
        </div>
    )
}

export default LandingCreator;