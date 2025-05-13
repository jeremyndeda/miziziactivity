'use client';

import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
});

interface TeacherFormProps {
  teacher?: {
    _id: Id<'teachers'>;
    name: string;
    phone: string;
  };
  onSave?: () => void; // ✅ optional callback
}

export function TeacherForm({ teacher, onSave }: TeacherFormProps) {
  const create = useMutation(api.teachers.create);
  const update = useMutation(api.teachers.update);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: teacher?.name || '',
      phone: teacher?.phone || '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (teacher) {
        await update({ id: teacher._id, ...values });
        toast.success('Teacher updated successfully');
      } else {
        await create(values);
        toast.success('Teacher created successfully');
      }

      // ✅ trigger parent onSave if provided
      if (onSave) {
        onSave();
      }
    } catch {
      toast.error('Failed to save teacher');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save Teacher</Button>
      </form>
    </Form>
  );
}
