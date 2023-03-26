const express=require("express")
const noteRouter=express.Router()
const {NoteModel}=require("../model/note.model")

noteRouter.get("/",async(req,res)=>{
    try {
        const notes=await NoteModel.find()
        res.status(200).send(notes)
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
    
})

noteRouter.post("/add",async(req,res)=>{
    try {
        const note=new NoteModel(req.body)
        await note.save()
        res.status(200).send({"msg":"A new note has been added"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
        
    }
})

noteRouter.patch("/update/:noteID",async(req,res)=>{
    const {noteID}=req.params
    const payload=req.body
    try {
        await NoteModel.findByIdAndUpdate({_id:noteID},payload)
        res.status(200).send({"msg":"NOte has been Updated"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

noteRouter.delete("/delete/:noteID",async (req,res)=>{
    const {noteID}=req.params
    try {
        await NoteModel.findByIdAndDelete({_id:noteID})
        res.status(200).send({"msg":"Note has been deleted"})
    } catch (error) {
        res.status(200).send({"msg":error.message})
        
    }
})


module.exports={
    noteRouter
}