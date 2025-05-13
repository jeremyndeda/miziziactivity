import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { Doc, Id } from './_generated/dataModel';

export const getAll = query({
  handler: async (ctx): Promise<Doc<'activities'>[]> => {
    return await ctx.db.query('activities').collect();
  },
});

export const getById = query({
  args: { id: v.id('activities') },
  handler: async (ctx, args): Promise<Doc<'activities'> | null> => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    date: v.string(),
    subfield: v.optional(v.string()),
    teacherIds: v.array(v.id('teachers')),
    studentIds: v.array(v.id('students')),
  },
  handler: async (ctx, args): Promise<Id<'activities'>> => {
    return await ctx.db.insert('activities', args);
  },
});

export const update = mutation({
  args: {
    id: v.id('activities'),
    name: v.string(),
    date: v.string(),
    subfield: v.optional(v.string()),
    teacherIds: v.array(v.id('teachers')),
    studentIds: v.array(v.id('students')),
  },
  handler: async (ctx, args): Promise<void> => {
    await ctx.db.patch(args.id, {
      name: args.name,
      date: args.date,
      subfield: args.subfield,
      teacherIds: args.teacherIds,
      studentIds: args.studentIds,
    });
  },
});

export const remove = mutation({
  args: { id: v.id('activities') },
  handler: async (ctx, args): Promise<void> => {
    await ctx.db.delete(args.id);
  },
});