const express = require("express");
const Candidate = require("../Models/candidateModel");
const User = require("../Models/userModel");
const router = express.Router();
const { verifyJwtTokenMiddleware } = require("../jwt");

async function isAdmin(userId) {
  try {
    const user = await User.findById(userId);
    console.log(user, "   is admin ");
    console.log(user.role == "admin", "   testst");
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
      console.log("hiiiiii");
      const data = req.body;
      const response = await Candidate(data);
      await response.save();
      res.status(200).json({ msg: response });
    } else {
      return res.status(404).json({ msg: "only admin can create candidate!!" });
      // res.status(200).json("hiii")
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
})
module.exports = router;
