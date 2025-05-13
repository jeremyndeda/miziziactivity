'use client';

import { useEffect, useState } from 'react';
import { api } from '../../../../../convex/_generated/api';
import { useQuery } from 'convex/react';
import { useRouter } from 'next/navigation';
import { TeacherForm } from '@/components/client/teacher-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Id } from '../../../../../convex/_generated/dataModel';

interface Activity {
  _id: string;
  name: string;
  date: string;
  subfield?: string;
  teacherIds: Id<'teachers'>[];
}

export default function TeacherPage({ params }: { params: { id: string } }) {
  const [teacherId] = useState<Id<'teachers'>>(params.id as Id<'teachers'>);
  const teacher = useQuery(api.teachers.getById, { id: teacherId });
  const activities = useQuery(api.activities.getAll);
  const router = useRouter();

  const [teacherActivities, setTeacherActivities] = useState<Activity[]>([]);

  useEffect(() => {
    if (activities && teacher) {
      const filtered = activities.filter((activity: Activity) =>
        activity.teacherIds.includes(teacherId)
      );
      setTeacherActivities(filtered);
    }
  }, [activities, teacher, teacherId]);

  const handleSave = () => {
    setTimeout(() => {
      router.push('/dashboard/teachers');
    }, 1000);
  };

  if (teacher === undefined || activities === undefined) {
    return <div>Loading...</div>;
  }

  if (teacher === null) {
    return <div>Teacher not found</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Teacher Details</h1>
      <Card>
        <CardHeader>
          <CardTitle>Edit Teacher</CardTitle>
        </CardHeader>
        <CardContent>
          <TeacherForm teacher={teacher} onSave={handleSave} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Subfield</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teacherActivities.map((activity) => (
                <TableRow key={activity._id}>
                  <TableCell>{activity.name}</TableCell>
                  <TableCell>{activity.date}</TableCell>
                  <TableCell>{activity.subfield || '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
