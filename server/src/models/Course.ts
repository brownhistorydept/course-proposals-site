import mongoose from 'mongoose';
const { model, Schema } = mongoose;

// taken from dept. spreadsheet tracking courses, https://docs.google.com/spreadsheets/d/1NT5l7zAqlXDCivZXcTdsdceSnMD5v28ke6550tnBrnE/edit?usp=sharing
export const GEO_REGIONS = Object.freeze(["Africa", "East Asia", "Europe", "Latin America", "Middle East - South Asia (MESA)", "North America", "Global"]);
export const SEMESTERS = Object.freeze(["Fall", "Spring", "Winter", "Summer"]);
export const TIMES = Object.freeze(["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "T"]);
export const PROPOSAL_STATUS = Object.freeze({
  // initial/default status
  DIRECTOR_REVIEW: "under review by director",
  // undergraduate or graduate director accepts
  DIRECTOR_ACCEPTED: "accepted by director",
  // undergraduate or graduate director rejects
  DIRECTOR_REJECTED: "revisions requested by director",
  // manager accepts, reflecting CCC decision
  CCC_ACCEPTED: "accepted by CCC",
  // manager rejects, reflecting CCC decision
  CCC_REJECTED: "revisions requested by manager",
});
export const COURSE_STATUS = Object.freeze({
  NEW: "new",
  REVISED: "revised",
  EXISTING: "existing",
});

export interface ICourse {
  _id?: string,
  created_at?: Date,
  // non-course related
  on_leave_fall: boolean,
  on_leave_spring: boolean,
  is_regular_prof: boolean,
  prof_type: string, // lecturer, etc.
  // core attributes
  course_title: string,
  description: string,
  professors: string[], // professors is an array of strings, where each string is the professor's Object ID
  syllabus_link?: string,
  levels: string[],
  // boolean designations
  is_undergrad: boolean, // if false, then grad only
  is_RPP?: boolean,
  is_WRIT?: boolean,
  is_CBLR?: boolean,
  is_premodern?: boolean,
  is_remote_accessible?: boolean,
  is_remote_only?: boolean,
  is_cross_listed?: boolean,
  // enumerated designations
  semester: string,
  year: number,
  time_ranking?: string[], // array of strings, e.g. [A, C, E]
  times_cant_teach?: string[], // array of times (strings) that prof can't teach, optional since maybe they can teach all times
  geography?: string[], // has to be from geo_regions list -- this is optional b/c graduate courses don't use these
  course_type: string,
  // these are optional so that frontend can pass back proposed courses w/o them, but we always set them in submit
  proposal_status?: string,
  course_status?: string, // new, revised, or existing --> these are existing hist. dept. standards that we're replicating here
  // manager sets this after course is finalized
  final_time?: string, // string of A,B,C or another string for a time outside of these (manager enters this once time is finalized)
  course_number?: string,
  // further notes/misc
  further_notes?: string;
  comments?: string,
  transcript_title: string,
}

const courseSchema = new Schema<ICourse>({
  created_at: { type: Date, default: Date.now },

  // non-course related
  on_leave_fall: { type: Boolean, required: true },
  on_leave_spring: { type: Boolean, required: true },
  is_regular_prof: { type: Boolean, required: true },
  prof_type: { type: String, required: false },
  // core attributes
  course_title: { type: String, required: true },
  description: { type: String, required: true },
  professors: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  syllabus_link: { type: String, required: false },
  levels: [{ type: String, required: false }],
  // boolean designations
  is_undergrad: { type: Boolean, required: true },
  is_RPP: { type: Boolean, required: false },
  is_WRIT: { type: Boolean, required: false },
  is_CBLR: { type: Boolean, required: false },
  is_premodern: { type: Boolean, required: false },
  is_remote_accessible: { type: Boolean, required: false },
  is_remote_only: { type: Boolean, required: false },
  is_cross_listed: { type: Boolean, required: false },
  // enumerated designations
  semester: { type: String, enum: SEMESTERS, required: true },
  year: { type: Number, required: true },
  time_ranking: { type: [String], enum: TIMES, required: false }, // array of strings, e.g. [A, C, E]
  times_cant_teach: { type: [String], enum: TIMES, required: false },
  geography: { type: [String], required: false }, // has to be from geo_regions list
  course_type: { type: String, required: false },
  // we set these in backend
  proposal_status: { type: String, enum: Object.values(PROPOSAL_STATUS), required: false },
  course_status: { type: String, enum: Object.values(COURSE_STATUS), required: false },
  // manager adds later
  course_number: { type: String, required: false },
  final_time: { type: String, required: false },
  // further notes, misc
  further_notes: { type: String, required: false },
  comments: { type: String, required: false },
  transcript_title: { type: String, required: false }
});

const Course = model<ICourse>("Course", courseSchema);
export default Course;
