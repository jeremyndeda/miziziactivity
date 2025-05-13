import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { Doc, Id } from './_generated/dataModel';

export const getByActivity = query({
  args: { activityId: v.id('activities') },
  handler: async (ctx, args): Promise<Doc<'attendance'>[]> => {
    return await ctx.db
      .query('attendance')
      .filter((q) => q.eq(q.field('activityId'), args.activityId))
      .collect();
  },
});

export const create = mutation({
  args: {
    activityId: v.id('activities'),
    studentId: v.id('students'),
    date: v.string(),
    present: v.boolean(),
  },
  handler: async (ctx, args): Promise<Id<'attendance'>> => {
    return await ctx.db.insert('attendance', args);
  },
});

export const update = mutation({
  args: {
    id: v.id('attendance'),
    present: v.boolean(),
    date: v.string(),
  },
  handler: async (ctx, args): Promise<void> => {
    await ctx.db.patch(args.id, { present: args.present, date: args.date });
  },
});