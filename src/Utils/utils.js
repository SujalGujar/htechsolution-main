import {toast} from "react-tostify"
export const handleSuccess = (msg)=>{
    toast.success(msg,{
        position:"top-right"
    })

}

export const handleError=(msg)=>{
    toast.error(msg,{
        position:"bottom-right"
    })
}