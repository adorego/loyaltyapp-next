import {useState} from 'react';

const useHttp = () =>{
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({state:false, message:'Hubo un error'});

    const sendPostRequest = async (uri:string, data:any) =>{
        setLoading(true);
        const response = await fetch(uri,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        setLoading(false);
        
        const response_object = await response.json();
        if(!response.ok){
            setError({state:true, message:response_object.name});
            return
        }
        return response_object;
    }

    const sendPostWithFile = async (uri:string, data:FormData) =>{
        setLoading(true);
        const response = await fetch(uri,{
            method:'POST',
            body:data
        });
        console.log('Response:', response);
        setLoading(false);
        const response_object = await response.json();
        console.log('Response_object:', response_object);
        if(!response.ok){
            setError({state:true, message:response_object.name});
            return
        }
        console.log("Response json:", response_object);
        return response_object;
    }

    const getDataRequest = async (uri:string) =>{
        console.log('getDataRequest, uri:', uri);
        setLoading(true);
        const response = await fetch(uri, {
            method:'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        });
        setLoading(false);

        const response_object = await response.json();
        if(!response.ok){
            setError({state:true, message:response_object.name});
            return;
        }
        return response_object;
    }

    return {
        loading,
        error,
        sendPostRequest,
        getDataRequest,
        sendPostWithFile
    }
}

export default useHttp;