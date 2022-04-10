export const ROLES = Object.freeze({
    STUDENT: "student",
    PROFESSOR: "professor",
    UG_REVIEWER: "undergraduate reviewer",
    UG_DIRECTOR: "undergraduate director",
    GRAD_DIRECTOR: "graduate director",
    MANAGER: "manager",
});
// ["student", "professor", "undergraduate reviewer", "undergraduate director", "graduate director", "manager"];

export interface IPermissions {
    _id?: string, 
    created_at?: Date,
    can_submit_courses: boolean,
    can_edit_submission_while_not_under_review: boolean,
    can_edit_submission_while_under_review: boolean,
    can_review_undergrad_courses: boolean,
    can_review_graduate_courses: boolean,
    can_request_professor_action: boolean,
    can_accept_reject_courses: boolean,
}

export function getPermissions(role: string): IPermissions {
    switch (role) {
        case ROLES.STUDENT: 
            return {
                can_submit_courses: false,
                can_edit_submission_while_not_under_review: false,
                can_edit_submission_while_under_review: false,
                can_review_undergrad_courses: false,
                can_review_graduate_courses: false,
                can_request_professor_action: false,
                can_accept_reject_courses: false,
            }
        case ROLES.PROFESSOR:
            return {
                can_submit_courses: true,
                can_edit_submission_while_not_under_review: true,
                can_edit_submission_while_under_review: false,
                can_review_undergrad_courses: false,
                can_review_graduate_courses: false,
                can_request_professor_action: false,
                can_accept_reject_courses: false,
            }
        case ROLES.UG_REVIEWER:
            return {
                can_submit_courses: true,
                can_edit_submission_while_not_under_review: true,
                can_edit_submission_while_under_review: false,
                can_review_undergrad_courses: true,
                can_review_graduate_courses: false,
                can_request_professor_action: true,
                can_accept_reject_courses: false,
            }
        case ROLES.UG_DIRECTOR:
            return {
                can_submit_courses: true,
                can_edit_submission_while_not_under_review: true,
                can_edit_submission_while_under_review: false,
                can_review_undergrad_courses: true,
                can_review_graduate_courses: false,
                can_request_professor_action: true,
                can_accept_reject_courses: true,
            }
        case ROLES.GRAD_DIRECTOR:
            return {
                can_submit_courses: true,
                can_edit_submission_while_not_under_review: true,
                can_edit_submission_while_under_review: false,
                can_review_undergrad_courses: false,
                can_review_graduate_courses: true,
                can_request_professor_action: true,
                can_accept_reject_courses: true,
            }
        case ROLES.MANAGER:
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
