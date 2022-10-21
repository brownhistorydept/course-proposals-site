import { Request, Response, Router } from "express";
import { IGetUserAuthInfoRequest, authCheck } from "../middleware/auth";
import User, { ROLES } from "../models/User";

const userRouter = Router();

// get all users
userRouter.get("/all", authCheck, async (req: Request, res: Response) => {
  try {
    const results = await User.find({});
    res.status(200).json({ results });
  } catch (err) {
    res.status(401).json({
      message: "getting all users failed",
    });
  }
});

// get all professors
userRouter.get("/professors", authCheck, async (req: Request, res: Response) => {
  try {
    const results = await User.find({
      $or:
        [{ role: ROLES.PROFESSOR }, { role: ROLES.CURRIC_COORD }, { role: ROLES.UG_DIRECTOR }, { role: ROLES.GRAD_DIRECTOR }]
    });
    res.status(200).json({ results });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: "getting all professors failed",
    });
  }
}
);

interface RoleBody {
  role: (typeof ROLES)[keyof typeof ROLES],
}

// change user's role; this should only be used by managers
// id is the string form of the _id of the user whose role is being changed, role is their new role as a string in req.body
userRouter.post("/change-role/:id", authCheck, async (req: IGetUserAuthInfoRequest, res: Response) => {
  const role_body = (req as any).body as RoleBody;

  if (typeof (req as any).params.id === 'undefined') {
    res.status(400).json({
      message: "specify the user whose role is to be changed",
    });
    return;
  }

  if (typeof role_body.role === 'undefined') {
    res.status(400).json({
      message: "specify the new role",
    });
    return;
  }

  if (!Object.values(ROLES).includes(role_body.role)) {
    res.status(400).json({
      message: `role must be one of ${Object.values(ROLES)}`,
    });
    return;
  }

  if (req.user.role !== ROLES.MANAGER) {
    res.status(403).json({
      message: "only managers can change roles",
    });
    return;
  }

  const user_id = (req as any).params.id;

  try {
    await User.updateOne({ _id: user_id }, {
      role: role_body.role
    });

    res.status(200).json({
      message: "updating role succeeded"
    });

  } catch (err) {
    res.status(400).json({
      message: "updating role failed",
    });
  }
});

export default userRouter;
