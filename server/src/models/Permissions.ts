export const ROLES = ["student", "professor", "undergraduate reviewer", "undergraduate director", "graduate director", "manager"];

export interface IPermissions {
    _id?: string, // assigned by MongoDB
    created_at?: Date,
    can_submit_courses: Boolean,
    can_edit_submission_while_not_under_review: Boolean,
    can_edit_submission_while_under_review: Boolean,
    can_review_undergrad_courses: Boolean,
    can_review_graduate_courses: Boolean,
    can_request_professor_action: Boolean,
    can_accept_reject_courses: Boolean,
}

export function getPermissions(role: string): IPermissions {
    switch (role) {
        case "student": 
            return {
                can_submit_courses: false,
                can_edit_submission_while_not_under_review: false,
                can_edit_submission_while_under_review: false,
                can_review_undergrad_courses: false,
                can_review_graduate_courses: false,
                can_request_professor_action: false,
                can_accept_reject_courses: false,
            }
        case "professor":
            return {
                can_submit_courses: true,
                can_edit_submission_while_not_under_review: true,
                can_edit_submission_while_under_review: false,
                can_review_undergrad_courses: false,
                can_review_graduate_courses: false,
                can_request_professor_action: false,
                can_accept_reject_courses: false,
            }
        case "undergraduate_reviewer":
            return {
                can_submit_courses: true,
                can_edit_submission_while_not_under_review: true,
                can_edit_submission_while_under_review: false,
                can_review_undergrad_courses: true,
                can_review_graduate_courses: false,
                can_request_professor_action: true,
                can_accept_reject_courses: false,
            }
        case "undergraduate_director":
            return {
                can_submit_courses: true,
                can_edit_submission_while_not_under_review: true,
                can_edit_submission_while_under_review: false,
                can_review_undergrad_courses: true,
                can_review_graduate_courses: false,
                can_request_professor_action: true,
                can_accept_reject_courses: true,
            }
        case "graduate_director":
            return {
                can_submit_courses: true,
                can_edit_submission_while_not_under_review: true,
                can_edit_submission_while_under_review: false,
                can_review_undergrad_courses: false,
                can_review_graduate_courses: true,
                can_request_professor_action: true,
                can_accept_reject_courses: true,
            }
        case "manager":
            return {
                can_submit_courses: true,
                can_edit_submission_while_not_under_review: true,
                can_edit_submission_while_under_review: true,
                can_review_undergrad_courses: true,
                can_review_graduate_courses: true,
                can_request_professor_action: true,
                can_accept_reject_courses: true,
            }
        default:
            throw "Unrecognized role; probably missing .env server file";
    }
}
