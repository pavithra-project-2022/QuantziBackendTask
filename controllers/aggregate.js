import Profile from "../models/Profile.js";
import User from "../models/User.js";

export const matchData = async (req, res, next) => {
  try {
    let arg = await User.aggregate([
      {
        $match: { role: "Executive Officer" },
      },
      {
        $project: {
            _id:0,
            userId: 1,
          name: 1,
          userId: 1,
          emailId: 1,

        },
      },
     
      {
        $lookup: {
          from: 'profiles',
          localField: 'userId',
          foreignField: 'userId',
          as: 'ProfileData',
        },
      },
      {
        $project: {
            "ProfileData._id":0,
            "ProfileData.__v":0,
            "ProfileData.createdAt":0,
            "ProfileData.updatedAt":0,
        }

      },

    {
        $unwind:'$ProfileData',
        
    },
    
    {
        $unwind:'$ProfileData.educationDetails'
    },
    {
      $project: {
          "ProfileData.educationDetails._id":0,
         
          
      }

    },

    ]);
    res.status(200).json(arg);
  } catch (err) {
    next(err);
  }
};

