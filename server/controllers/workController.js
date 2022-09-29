import User from "../models/UserModel.js";
import Work from "../models/workModel.js";

export const getClassWork = async (req, res) => {
  try {
    let allwork = [];

    for (let i = 0; i < req.user.class.length; i++) {
      const data = await Work.find({ class: req.user.class[i] });
      allwork = [...allwork, ...data];
    }

    res.status(200).json(allwork);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getWorkDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const work = await Work.findById(id);

    if (work.length === 0) {
      res.status(500).json({ message: "No such assignment exist" });
      return;
    }
    res.status(200).json(work);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const createWork = async (req, res) => {
  try {
    const teacher = await User.find({ _id: req.body.teacherId });
    if (teacher.length === 0) {
      res
        .status(500)
        .json({ message: "Not authorised for creating a new assignment" });
      return;
    }

    if (teacher[0].person === "student") {
      res
        .status(500)
        .json({ message: "Not authorised for creating a new assignment" });

      return;
    }

    const work = await Work.create(req.body);
    res.status(200).json(work);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
