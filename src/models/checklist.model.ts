import { checkList } from "../utils/checkList";


export default class CheckListModel {
    
    static evaluateCheckList = async (applicantId:string)=>{
        try {
            const baseUrl = process.env.BASE_API_URL;
            if(!baseUrl){
                throw new Error("Something Went Wrong");
            }
            const response = await fetch(`${baseUrl}/applications/getApplicationById/${applicantId}`);
            

            if(!response.ok){
                return null;
            }
            const data = await response.json();
            if(!data){
                return null;
            }
            const result = checkList(data);
            return result;
        } catch (error) {
            throw error;
        }
    }
}