import z from 'zod';

const SubmitFeedbackModel=z.object({
    email:z.string().email(),
    feedbackId:z.string(),
    remarks:z.string().optional()
})

type SubmitFeedbackModelType = z.infer<typeof SubmitFeedbackModel>;

export {
    SubmitFeedbackModel,
    SubmitFeedbackModelType
}
