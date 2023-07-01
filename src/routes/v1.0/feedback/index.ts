import { NextFunction, Request, Response, Router } from "express";
import {
  SubmitFeedbackModel,
  SubmitFeedbackModelType,
} from "../../../models/submitFeedBackModel";
import moment from "moment";
type submitFeedbackFormProps = SubmitFeedbackModelType & {
  createdAt: Date;
  updatedAt: Date;
};
const feedbackRouter = Router();
let SubmitedData: submitFeedbackFormProps[] = [];
feedbackRouter.post(
  "/",
  async (
    req: Request<null, null, SubmitFeedbackModelType>,
    res: Response,
    next: NextFunction
  ) => {
    const validateBody = SubmitFeedbackModel.safeParse(req.body);
    if (!validateBody.success) {
      const formatted = validateBody.error.flatten().fieldErrors;
      return next({ message: formatted });
    }
    SubmitedData.push({
      ...validateBody.data,
      createdAt: moment().utc().toDate(),
      updatedAt: moment().utc().toDate(),
    });

    return res.send({ message: "Submit Feedback From successfully" });
  }
);

feedbackRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    return res.send(SubmitedData);
  }
);

export { feedbackRouter };
