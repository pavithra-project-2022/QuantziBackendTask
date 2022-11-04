import Profile from "../models/Profile.js";
import User from "../models/User.js";

export const createProfile = async (req, res, next) => {
  const id = req.params.id;

  const userData = await User.findById(id);

  const newProfile = new Profile({
    profileId: req.params.id,
    ...req.body,
  });

  try {
    const savedProfile = await newProfile.save();
    res.status(200).json(savedProfile);
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  const idData = await Profile.findOne({ empId: req.params.id });
  try {
    const updatedProfile = await Profile.findByIdAndUpdate(
      idData._id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedProfile);
  } catch (err) {
    next(err);
  }
};

export const deleteProfile = async (req, res, next) => {
  try {
    await Profile.findByIdAndDelete(req.params.id);
    res.status(200).json("Profile has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getProfile = async (req, res, next) => {
  const idData = await Profile.findOne({ empId: req.params.id });

  try {
    const profile = await Profile.findById(idData._id);
    res.status(200).json(profile);
  } catch (err) {
    next(err);
  }
};

export const getProfiles = async (req, res, next) => {
  try {
    const profile = await Profile.find();
    res.status(200).json(profile);
  } catch (err) {
    next(err);
  }
};
