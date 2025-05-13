import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  students: defineTable({
    name: v.string(),
    class: v.string(),
  }),
  teachers: defineTable({
    name: v.string(),
    phone: v.string(),
  }),
  activities: defineTable({
    name: v.string(),
    date: v.string(), // ISO date string (e.g., "2025-05-12")
    subfield: v.optional(v.string()), // e.g., Guitar, Piano
    teacherIds: v.array(v.id('teachers')),
    studentIds: v.array(v.id('students')),
  }),
  attendance: defineTable({
    activityId: v.id('activities'),
    studentId: v.id('students'),
    date: v.string(), // ISO date string
    present: v.boolean(),
  }),
});