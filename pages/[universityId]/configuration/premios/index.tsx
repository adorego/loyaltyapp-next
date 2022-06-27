import { REWARD, UNIVERSITIES } from "../../../../helpers/collectionNames";

import { Fragment } from "react";
import { GetServerSideProps } from "next/types";
import RewardsList from "../../../../components/UI/Configuration/RewardsList";
import SeccionHeader from "../../../../components/UI/SeccionHeader";
import connect from "../../../../dataBase/dataBase";
import { errorNextHandler } from "../../../../helpers/errorHandler";
import spinnerClasses from '../../../../styles/spinner.module.css';
import { useAppDispatch } from "../../../../hooks/store-hooks";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react"

export interface PremiosProps{
    rewards:string;
}
const Premios = ({rewards}:PremiosProps) =>{
    const router = useRouter();
    const dispatch = useAppDispatch();
    const {data:session, status} = useSession();
    const {universityId:universitySiglaId} = router.query;

    

    if(status === 'authenticated'){
        return(
            <Fragment>
                <SeccionHeader 
                    titleText={'Premios'} 
                    subTitleText={''}  
                    explanationText={'Son los premios que tus promotores pueden ganar'}/>  

                <RewardsList rewards={JSON.parse(rewards)} />
            </Fragment>
        )
    }
    if(status === 'loading' || !universitySiglaId){
        return(
            <div className={spinnerClasses["lds-dual-ring "]}></div>
        )
    }
    if(status === 'unauthenticated'){
        router.push('/login');
        return(
            <div className={spinnerClasses["lds-dual-ring "]}></div>
        )
    }
}

export default Premios;


export const getServerSideProps:GetServerSideProps = async({query, req, res}) =>{
    const {universityId:universitySiglaId} = query;

    const dbClient = await connect();
    try{
        if(dbClient){
            const db = dbClient?.db();
            const universityCollection = db.collection(UNIVERSITIES);
            const university = await universityCollection.findOne({sigla:universitySiglaId});
            const rewardCollection = db.collection(REWARD);
            const rewards = await rewardCollection.find({university_id:university?._id}).toArray();
            console.log('rewards:', rewards);
            
            return{
                props:{
                    rewards:JSON.stringify(rewards)
                }
            }
        }else{
            return errorNextHandler({message:"Error al buscar los Premios(rewards)."}, res);
        }
    }
    catch(error:any){
        return errorNextHandler(error, res);

    }
    finally{
        dbClient?.close();
    }

}