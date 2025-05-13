import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { Doc, Id } from './_generated/dataModel';

export const getAll = query({
  handler: async (ctx): Promise<Doc<'students'>[]> => {
    return await ctx.db.query('students').collect();
  },
});

export const getById = query({
  args: { id: v.id('students') },
  handler: async (ctx, args): Promise<Doc<'students'> | null> => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: { name: v.string(), class: v.string() },
  handler: async (ctx, args): Promise<Id<'students'>> => {
    return await ctx.db.insert('students', args);
  },
});

export const update = mutation({
  args: { id: v.id('students'), name: v.string(), class: v.string() },
  handler: async (ctx, args): Promise<void> => {
    await ctx.db.patch(args.id, { name: args.name, class: args.class });
  },
});

export const remove = mutation({
  args: { id: v.id('students') },
  handler: async (ctx, args): Promise<void> => {
    await ctx.db.delete(args.id);
  },
});