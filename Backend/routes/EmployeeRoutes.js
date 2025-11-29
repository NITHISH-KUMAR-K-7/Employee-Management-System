import express from'express'
import Employee from '../models/Employee.js';

const router = express.Router();


// router.post("/", async (req,res)=>{
//     try{
//         const employee = new Employee(req.body);
//         await employee.save();
//         res.json(employee);
//     }
//     catch(err){
//         res.status(400).json({error : err.message})
//     }   
// })

router.post('/', async (req, res) => {
  console.log("BODY RECEIVED:", req.body);

  try {
    const employee = new Employee(req.body);
    await employee.save();
    console.log("SAVED:", employee);
    res.json(employee);
  } catch (err) {
    console.log("SAVE ERROR:", err.message);
    res.status(400).json({ error: err.message });
  }
});


router.get("/", async (req,res)=>{
    try{
        const {position,search} = req.query;
        let filter = {};

        if (position && position !== "All Position") {
            filter.position = position;
    }
        if(search && search.trim() !== ""){
            const regex = new RegExp (search,"i");
            filter.$or = [
                {name:regex},
                {position:regex}
            ]
        }

        const employee = await Employee.find(filter).sort({createdAt: -1})
        res.json(employee)
    }
    catch(err){
        res.status(400).json({err : err.message})
    }
})


router.put("/:id", async (req,res)=>{
    try{
        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        res.json(employee)
    }
    catch(err){
        res.status(400).json({err : err.message})
    }
})

router.delete("/:id", async (req,res)=>{
    try{
        await Employee.findByIdAndDelete(req.params.id);
        res.json({message:"Deleted Sucessfull"})
    }
    catch(err){
        res.status(400).json({ error: err.message });
    }
})

export default router;