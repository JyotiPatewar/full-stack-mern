import User from "../models/User.js";

export const createUser = async (req, res) => {
  try {
    const { name, mobile, email, role,locations,zone  } = req.body;

    const existingUser = await User.findOne({
      $or: [{ mobile }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Mobile or Email already exists",
      });
    }

 const user = await User.create({
  name,
  mobile,
  email,
  role,

  ...(role === "caretaker" && {
    locations,
    zone
  }),

});
    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};




// Get All Users
export const getAllUsers = async (
  req,
  res
) => {
  try {

    const users = await User.find({
      role: {
        $ne: "admin",
      },
    });

    res.status(200).json(users);

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });

  }
};

// Delete User
export const deleteUser = async (
  req,
  res
) => {
  try {

    const { id } = req.params;

    await User.findByIdAndDelete(id);

    res.status(200).json({
      message: "User Deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });

  }
};
