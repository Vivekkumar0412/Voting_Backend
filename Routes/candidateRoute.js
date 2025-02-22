const express = require("express");
const Candidate = require("../Models/candidateModel");
const User = require("../Models/userModel");
const router = express.Router();
const { verifyJwtTokenMiddleware } = require("../jwt");

async function isAdmin(userId) {
  try {
    const user = await User.findById(userId);
    if (user.role == "admin") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
router.post("/", verifyJwtTokenMiddleware, async function (req, res) {
  try {
    if (await isAdmin(req.decodedData.id)) {
      const data = req.body;
      const response = await Candidate(data);
      await response.save();
      res.status(200).json({ msg: response });
    } else {
      return res.status(404).json({ msg: "only admin can create candidate!!" });
    }
  } catch (error) {
    res.status(404).json({ err: error });
  }
});

router.put("/:candidateId", verifyJwtTokenMiddleware,async function(req,res){
   try {
    if(await isAdmin(req.decodedData.id)){
        console.log("hii iam innn")
        const candidateId = req.params.candidateId;
        const updatedData = req.body;
        const response = await Candidate.findByIdAndUpdate(candidateId,updatedData,{
            new : true,
            runValidators : true
        });
        await response.save();
        res.status(200).json({msg : response});
    }
   } catch (error) {
        res.send(error)
   }
})
router.delete("/:candidateId", verifyJwtTokenMiddleware,async function(req,res){
   try {
    if(await isAdmin(req.decodedData.id)){
        console.log("hii iam innn")
        const candidateId = req.params.candidateId;
        const updatedData = req.body;
        const response = await Candidate.findByIdAndDelete(candidateId,updatedData);
        // await response.save();
        res.status(200).json({msg : response});
    }
   } catch (error) {
        res.send(error)
   }
});

router.post("/vote/:candidateId", verifyJwtTokenMiddleware,async function(req,res){
    const userId = req.decodedData.id;
    const candidateId = req.params.candidateId;
    console.log(candidateId,"   candidateId in vote")
    try {

        // candidate find
        const candidate = await Candidate.findById(candidateId)
        if(!candidate){
            return res.status(404).json({msg : "No candidate found !!!"})
        };
        // user find
        const user = await User.findById(userId);
        if(!user || user.role == "admin"){
            return res.status(404).json({msg : "No user found !! or admin cant vote"})
        };
        if(user.isVoted){
            return res.status(403).json({msg : "user has alredy voted !!!"})
        }


        // candidate vote update 
        candidate.votes.push({
            user : userId
        });
        candidate.voteCount++; 
        await candidate.save();

        // user vote update
        user.isVoted = true;
        await user.save();

        res.status(200).json({msg : "voting completed !!"})

    } catch (error) {
        res.status(404).json({msg : error});   
    }
});


router.get("/voteCount",async function(req,res){
    const candidate = await Candidate.find().sort({voteCount : 'desc'});
    const result = candidate.map((data)=>{
        return {
            part : data.party,
            votes : data.voteCount
        }
    });
    res.status(200).json({msg : result});
} )
module.exports = router;
