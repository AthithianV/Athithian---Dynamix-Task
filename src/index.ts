import { config } from "dotenv";
import express, { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import ejsLayouts from "express-ejs-layouts";
import path from "path";
import CheckListController from "./controllers/checklist.controller";

config();


/**
 * Create Express App and Sets up the EJS for serving static page.
 */
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))
app.use(ejsLayouts);
app.set("view engine", "ejs");
app.set("views", path.resolve("src", "views"));


/**
 * Hadling Routes and Errors
 */
const checkListController = new CheckListController();
app.get("/", checkListController.getMainPage);
app.use((err:ErrorRequestHandler, req:Request, res:Response, next:NextFunction)=>{
    return res.render("errorPage", {message: "Something Went Wrong"});
})
app.use((req:Request, res:Response, next:NextFunction)=>{
    return res.render("errorPage", {message: "Page Not Found"});
})

/**
 * Starts the server in port specified
 */

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("Server Listening at port:"+port+". Visit http://localhost:"+port);
})