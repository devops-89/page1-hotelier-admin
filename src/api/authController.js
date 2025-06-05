import { securedApi } from "./config";

export const AuthenticationController={
    login:async (data)=>{
      try{
        const result=await securedApi.post("/hotelier/login",data);
        return result;
      }
      catch(error){
        throw error;
      }
    }
};
