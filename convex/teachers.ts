import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { Doc, Id } from './_generated/dataModel';

export const getAll = query({
  handler: async (ctx): Promise<Doc<'teachers'>[]> => {
    return await ctx.db.query('teachers').collect();
  },
});

export const getById = query({
  args: { id: v.id('teachers') },
  handler: async (ctx, args): Promise<Doc<'teachers'> | null> => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: { name: v.string(), phone: v.string() },
  handler: async (ctx, args): Promise<Id<'teachers'>> => {
    return await ctx.db.insert('teachers', args);
  },
});

export const update = mutation({
  args: { id: v.id('teachers'), name: v.string(), phone: v.string() },
  handler: async (ctx, args): Promise<void> => {
    await ctx.db.patch(args.id, { name: args.name, phone: args.phone });
  },
});

export const remove = mutation({
  args: { id: v.id('teachers') },
  handler: async (ctx, args): Promise<void> => {
    await ctx.db.delete(args.id);
  },
});