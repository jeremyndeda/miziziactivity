'use client';
import { Doc } from '../../../convex/_generated/dataModel';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';
import { format } from 'date-fns';

interface ActivityTableProps {
  activities: Doc<'activities'>[];
  teachers: { _id: string; name: string }[];
  students: { _id: string; name: string }[];
}

export function ActivityTable({ activities, teachers, students }: ActivityTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Subfield</TableHead>
          <TableHead>Teachers</TableHead>
          <TableHead>Students</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {activities.map((activity) => (
          <TableRow key={activity._id}>
            <TableCell>{activity.name}</TableCell>
            <TableCell>{format(new Date(activity.date), 'yyyy-MM-dd')}</TableCell>
            <TableCell>{activity.subfield || '-'}</TableCell>
            <TableCell>
              {activity.teacherIds
                .map((id) => teachers.find((t) => t._id === id)?.name)
                .join(', ')}
            </TableCell>
            <TableCell>
              {activity.studentIds
                .map((id) => students.find((s) => s._id === id)?.name)
                .join(', ')}
            </TableCell>
            <TableCell>
              <Button asChild variant="outline">
                <Link href={`/dashboard/activities/${activity._id}`}>View</Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
