import { IUser } from "./User";
import mongoose from 'mongoose';
const { model, Schema } = mongoose;

export const GEO_REGIONS = ["Africa", "East Asia", "Europe", "Latin America", "MESA", "North America", "Global"]; // taken from dept. spreadsheet tracking courses, https://docs.google.com/spreadsheets/d/1NT5l7zAqlXDCivZXcTdsdceSnMD5v28ke6550tnBrnE/edit?usp=sharing

// do we think my designation of optional variables is fair? Might be something to run by the client,
// not sure whether more/less of these are optional than I might think
export interface ICourse {
    _id?: String, // assigned by MongoDB
    created_at?: Date,
    course_number: Number,
    course_title: String,
    final_time: String, // A,B... hour, so a string of this character
    time_ranking?: String[], // array of strings, e.g. [A, C, E]
    professor: IUser,
    is_DIAP: Boolean,
    is_WRIT: Boolean,
    is_Premodern: Boolean,
    is_FYS: Boolean, // First-Year-Seminar
    is_SYS: Boolean, // Sophomore Seminar
    is_Capstone: Boolean,
    is_Lecture: Boolean,
    geography: String, // has to be from geo_regions list
    description: String,
    further_notes?: String,
}

const courseSchema = new Schema<ICourse>({
    created_at: { type: Date, default: Date.now },
    course_number: { type: Number, required: true},
    course_title: { type: String, required: true},
    final_time: { type: String, required: true}, // A,B... hour, so a string of this character
    time_ranking: [{type: String}], // array of strings, e.g. [A, C, E]
    professor: { type: String, required: true},
    is_DIAP: { type: Boolean, required: true},
    is_WRIT: { type: Boolean, required: true},
    is_Premodern: { type: Boolean, required: true},
    is_FYS: { type: Boolean, required: true}, // First-Year-Seminar
    is_SYS: { type: Boolean, required: true}, // Sophomore Seminar
    is_Capstone: { type: Boolean, required: true},
    is_Lecture: { type: Boolean, required: true}, // do we need this, since we can tell if 
    geography: { type: String, enum: GEO_REGIONS, required: true}, // has to be from geo_regions list
    description: { type: String, required: true},
    further_notes: { type: String},
});

const Course = model<ICourse>("Course", courseSchema);
export default Course;

