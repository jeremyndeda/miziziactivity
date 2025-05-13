import { Id } from "../../convex/_generated/dataModel";


export interface Student {
  _id: Id<'students'>;
  name: string;
  class: string;
}

export interface Teacher {
  _id: Id<'teachers'>;
  name: string;
  phone: string;
}

export interface Activity {
  _id: Id<'activities'>;
  name: string;
  date: string;
  subfield?: string;
  teacherIds: Id<'teachers'>[];
  studentIds: Id<'students'>[];
}

export interface Attendance {
  _id: Id<'attendance'>;
  activityId: Id<'activities'>;
  studentId: Id<'students'>;
  date: string;
  present: boolean;
}