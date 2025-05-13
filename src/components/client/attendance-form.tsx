/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DatePickerWrapper as DatePicker } from '@/components/ui/date-picker';
import { toast } from 'sonner';

const formSchema = z.object({
  studentId: z.string().min(1, 'Student is required'),
  date: z.date(),
  present: z.boolean(),
});

interface AttendanceFormProps {
  activityId: Id<'activities'>;
  attendance?: {
    _id: Id<'attendance'>;
    studentId: Id<'students'>;
    date: string;
    present: boolean;
  };
  refetch?: () => void;
}

export function AttendanceForm({ activityId, attendance, refetch }: AttendanceFormProps) {
  const create = useMutation(api.attendance.create);
  const update = useMutation(api.attendance.update);
  const activity = useQuery(api.activities.getById, { id: activityId });
  const students = useQuery(api.students.getAll) || [];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentId: attendance?.studentId ?? '',
      date: attendance ? new Date(attendance.date) : new Date(),
      present: attendance?.present ?? false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (attendance) {
        await update({
          id: attendance._id,
          present: values.present,
          date: format(values.date, 'yyyy-MM-dd'),
        });
        toast.success('Attendance updated successfully');
      } else {
        await create({
          activityId,
          studentId: values.studentId as Id<'students'>,
          date: format(values.date, 'yyyy-MM-dd'),
          present: values.present,
        });
        toast.success('Attendance recorded successfully');
      }

      if (refetch) refetch();
    } catch (error) {
      toast.error('Failed to save attendance');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="studentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a student" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {activity?.studentIds.map((id) => {
                    const student = students.find((s) => s._id === id);
                    return (
                      <SelectItem key={id} value={id}>
                        {student?.name || 'Unknown'}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

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

        <FormField
          control={form.control}
          name="present"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Present</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => field.onChange(value === 'true')}
                  value={field.value.toString()}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {attendance ? 'Update' : 'Save'} Attendance
        </Button>
      </form>
    </Form>
  );
}
