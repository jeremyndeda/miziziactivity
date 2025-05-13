'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { api } from '../../../../../convex/_generated/api';
import { useQuery } from 'convex/react';
import { ActivityForm } from '@/components/client/activity-form';
import { AttendanceForm } from '@/components/client/attendance-form';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Id } from '../../../../../convex/_generated/dataModel';

export default function ActivityPage() {
  const router = useRouter();
  const params = useParams();
  const activityId = params.id as Id<'activities'>;

  const [attendance, setAttendance] = useState<
    { _id: Id<'attendance'>; studentId: Id<'students'>; date: string; present: boolean }[]
  >([]);
  const [students, setStudents] = useState<{ _id: Id<'students'>; name: string }[]>([]);

  const activity = useQuery(api.activities.getById, { id: activityId });

  const fetchData = useCallback(async () => {
    const [attendanceData, studentData] = await Promise.all([
      fetch('/api/convex/attendance/getByActivity', {
        method: 'POST',
        body: JSON.stringify({ activityId }),
      }).then((res) => res.json()),
      fetch('/api/convex/students/getAll').then((res) => res.json()),
    ]);
    setAttendance(attendanceData);
    setStudents(studentData);
  }, [activityId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (activity === undefined) return <div>Loading...</div>;
  if (activity === null) return <div>Activity not found</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Activity Details</h1>

      <Card>
        <CardHeader>
          <CardTitle>Edit Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ActivityForm activity={activity} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Attendance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <AttendanceForm
            activityId={activity._id}
            refetch={() => {
              fetchData();
              router.push('/dashboard/activities');
            }}
          />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Present</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendance.map((record) => (
                <TableRow key={record._id}>
                  <TableCell>
                    {students.find((s) => s._id === record.studentId)?.name || 'Unknown'}
                  </TableCell>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{record.present ? 'Yes' : 'No'}</TableCell>
                  <TableCell>
                    <AttendanceForm
                      activityId={activity._id}
                      attendance={record}
                      refetch={fetchData}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
