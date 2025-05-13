'use client';

import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { ActivityTable } from '@/components/server/activity-table';
import { StudentTable } from '@/components/server/student-table';
import { TeacherTable } from '@/components/server/teacher-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Dashboard() {
  const activities = useQuery(api.activities.getAll) || [];
  const students = useQuery(api.students.getAll) || [];
  const teachers = useQuery(api.teachers.getAll) || [];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <ActivityTable 
            activities={activities.slice(0, 5)} 
            teachers={teachers} 
            students={students} 
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Students</CardTitle>
        </CardHeader>
        <CardContent>
          <StudentTable students={students.slice(0, 5)} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Teachers</CardTitle>
        </CardHeader>
        <CardContent>
          <TeacherTable teachers={teachers.slice(0, 5)} />
        </CardContent>
      </Card>
    </div>
  );
}
