'use client';

import { useMutation, useQuery } from 'convex/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { DatePickerWrapper as DatePicker } from '@/components/ui/date-picker';

import { toast } from 'sonner';
import { Id } from '../../../convex/_generated/dataModel';
import { api } from '../../../convex/_generated/api';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  date: z.date(),
  subfield: z.string().optional(),
  teacherIds: z.array(z.string()).min(1, 'At least one teacher is required'),
  studentIds: z.array(z.string()).min(1, 'At least one student is required'),
});

interface ActivityFormProps {
  activity?: {
    _id: Id<'activities'>;
    name: string;
    date: string;
    subfield?: string;
    teacherIds: Id<'teachers'>[];
    studentIds: Id<'students'>[];
  };
}

export function ActivityForm({ activity }: ActivityFormProps) {
  const router = useRouter();
  const create = useMutation(api.activities.create);
  const update = useMutation(api.activities.update);
  const students = useQuery(api.students.getAll) || [];
  const teachers = useQuery(api.teachers.getAll) || [];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: activity?.name || '',
      date: activity ? new Date(activity.date) : new Date(),
      subfield: activity?.subfield || '',
      teacherIds: activity?.teacherIds || [],
      studentIds: activity?.studentIds || [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (activity) {
        await update({
          id: activity._id,
          name: values.name,
          date: format(values.date, 'yyyy-MM-dd'),
          subfield: values.subfield,
          teacherIds: values.teacherIds as Id<'teachers'>[],
          studentIds: values.studentIds as Id<'students'>[],
        });
        toast.success('Activity updated successfully');
      } else {
        await create({
          name: values.name,
          date: format(values.date, 'yyyy-MM-dd'),
          subfield: values.subfield,
          teacherIds: values.teacherIds as Id<'teachers'>[],
          studentIds: values.studentIds as Id<'students'>[],
        });
        toast.success('Activity created successfully');
        form.reset(); // Clear form on create
      }

      // Delay redirect to let toast show
      setTimeout(() => {
        router.push('/dashboard/activities');
      }, 1000);
    } catch {
      toast.error('Failed to save activity');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Activity Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter activity name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Date */}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <DatePicker value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Subfield */}
        <FormField
          control={form.control}
          name="subfield"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subfield (Optional)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. Sports, Music" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Teachers */}
        <FormField
          control={form.control}
          name="teacherIds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teachers</FormLabel>
              <Select
                onValueChange={(value) => {
                  if (!field.value.includes(value)) {
                    field.onChange([...field.value, value]);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select teachers" />
                </SelectTrigger>
                <SelectContent>
                  {teachers.map((teacher) => (
                    <SelectItem key={teacher._id} value={teacher._id}>
                      {teacher.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-2 mt-2">
                {field.value.map((id) => {
                  const teacher = teachers.find(t => t._id === id);
                  return (
                    <Badge key={id} className="flex items-center gap-1">
                      {teacher?.name || 'Unknown'}
                      <button
                        type="button"
                        onClick={() => field.onChange(field.value.filter(v => v !== id))}
                        className="cursor-pointer"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  );
                })}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Students */}
        <FormField
          control={form.control}
          name="studentIds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Students</FormLabel>
              <Select
                onValueChange={(value) => {
                  if (!field.value.includes(value)) {
                    field.onChange([...field.value, value]);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select students" />
                </SelectTrigger>
                <SelectContent>
                  {students.map((student) => (
                    <SelectItem key={student._id} value={student._id}>
                      {student.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-2 mt-2">
                {field.value.map((id) => {
                  const student = students.find(s => s._id === id);
                  return (
                    <Badge key={id} className="flex items-center gap-1">
                      {student?.name || 'Unknown'}
                      <button
                        type="button"
                        onClick={() => field.onChange(field.value.filter(v => v !== id))}
                        className="cursor-pointer"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  );
                })}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="cursor-pointer">
          Save Activity
        </Button>
      </form>
    </Form>
  );
}
