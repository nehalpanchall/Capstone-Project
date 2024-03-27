import axios from "axios"
import { useState } from "react";

const Demo = () => {
    const [data,setdata]=useState([])
    const apiCall = async () => {

        try {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'https://jsonplaceholder.typicode.com/posts',
                headers: {}
            };

            const response = await axios.request(config)
            setdata(response.data);
            console.log(response.data);
        } catch (error) {
            console.log('error', error);

        }

    }
    apiCall()
    return <>
        <div>
            {data.map ((item,index)=>{
                return<div> 
                    {
                        item.body
                    }
                    <br/>
                </div>
            })

            }
        </div>
    </>
}

export default Demo