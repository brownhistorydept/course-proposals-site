import mongoose from 'mongoose';
const { model, Schema } = mongoose;


const ROLES = ["student", "professor", "undergraduate reviewer", "undergraduate director", "graduate director", "manager"];

interface IRole {
    role: String,
    names: String,
    can_submit_courses: Boolean,
    can_edit_submission_while_not_under_review: Boolean,
    can_edit_submission_while_under_review: Boolean,
    can_review_undergrad_courses: Boolean,
    can_review_graduate_courses: Boolean,
    can_request_professor_action: Boolean,
    can_accept_reject_courses: Boolean,
    created_at?: Date,
}

const roleSchema =  new Schema<IRole>({
    role: {type: String, enum: ROLES},
    names: String,
    can_submit_courses: Boolean,
    can_edit_submission_while_not_under_review: Boolean,
    can_edit_submission_while_under_review: Boolean,
    can_review_undergrad_courses: Boolean,
    can_review_graduate_courses: Boolean,
    can_request_professor_action: Boolean,
    can_accept_reject_courses: Boolean,
    created_at: { type: Date, default: Date.now },
});

var Role = model<IRole>("Role", roleSchema);
// export = Role; // do we need to be exporting this as well?
export = IRole; 