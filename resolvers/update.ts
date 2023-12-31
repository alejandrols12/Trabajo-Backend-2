// deno-lint-ignore-file
// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import {  Errormongo, Student,Subject,Teacher } from "../mongo/types.ts";
import { Studentmodel, Studentmodeltype } from "../mongo/models/student.ts";
import { Teachermodeltype , Teachermodel} from "../mongo/models/teacher.ts";
import { Subjectmodel, Subjectmodeltype } from "../mongo/models/subject.ts";
import { geterror, getsubject, getteacher, updatestudent } from "../controlers/controlers.ts";


export const base =  (_req: Request, res: Response)=>{
    res.status(200).send("Operativo")
}
export const update_student = async (req: Request<{},{},Studentmodeltype>, res: Response<Student | Errormongo[]>)=>{

    try{

        const {_id,name,email,subjects} = req.body
        
        const student = new Studentmodel({
            name: name,
            email: email,
            subjects: subjects
        })
        
        
        const final = await updatestudent(student,_id)
        
        res.status(200).send(final)

    }catch(error){
        const me: Errormongo[] = geterror(error)

        res.status(400).send(me)
    }
}

