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
  class: z.string().min(1, 'Class is required'),
});

interface StudentFormProps {
  student?: {
    _id: Id<'students'>;
    name: string;
    class: string;
  };
  onSave?: () => void; // ✅ NEW: optional callback
}

export function StudentForm({ student, onSave }: StudentFormProps) {
  const create = useMutation(api.students.create);
  const update = useMutation(api.students.update);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: student?.name || '',
      class: student?.class || '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (student) {
        await update({ id: student._id, ...values });
        toast.success('Student updated successfully');
      } else {
        await create(values);
        toast.success('Student created successfully');
      }

      if (onSave) {
        onSave(); // ✅ call the parent handler after successful save
      }

    } catch {
      toast.error('Failed to save student');
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
          name="class"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Class</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save Student</Button>
      </form>
    </Form>
  );
}
