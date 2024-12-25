import { NextFunction, Request, Response } from "express";
import CheckListModel from "../models/checklist.model";

export default class CheckListController{

    async getMainPage(req:Request, res:Response, next:NextFunction){  
        try {
            const applicantId = (req.query.applicantId
                                ?req.query.applicantId:"67339ae56d5231c1a2c63639") as string;
            const checkList = await CheckListModel.evaluateCheckList(applicantId);
            if(!checkList){
                return res.render("errorPage", {message: "Applicant Not found"});
            }
            return res.render("checkList", { applicantId, checkList});
        } catch (error) {
            next(error);
        }
    }
}