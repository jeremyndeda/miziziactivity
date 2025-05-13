'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '../../../../../convex/_generated/api';
import { useQuery } from 'convex/react';
import { StudentForm } from '@/components/client/student-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Id } from '../../../../../convex/_generated/dataModel';

interface Activity {
  _id: string;
  name: string;
  date: string;
  subfield?: string;
  studentIds: Id<'students'>[];
}

export default function StudentPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [studentId] = useState<Id<'students'>>(params.id as Id<'students'>);
  const student = useQuery(api.students.getById, { id: studentId });
  const activities = useQuery(api.activities.getAll);

  const [studentActivities, setStudentActivities] = useState<Activity[]>([]);

  useEffect(() => {
    if (activities && student) {
      const filtered = activities.filter((activity: Activity) =>
        activity.studentIds.includes(studentId)
      );
      setStudentActivities(filtered);
    }
  }, [activities, student, studentId]);

  const handleSave = () => {
    setTimeout(() => {
      router.push('/dashboard/students');
    }, 1500);
  };

  if (student === undefined || activities === undefined) {
    return <div>Loading...</div>;
  }

  if (student === null) {
    return <div>Student not found</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Student Details</h1>
      <Card>
        <CardHeader>
          <CardTitle>Edit Student</CardTitle>
        </CardHeader>
        <CardContent>
          <StudentForm student={student} onSave={handleSave} />
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
              {studentActivities.map((activity) => (
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
