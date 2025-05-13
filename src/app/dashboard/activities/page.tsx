'use client';
import React from 'react';
import { api } from '../../../../convex/_generated/api';
import { convex } from '@/lib/convex-client';
import { ActivityTable } from '@/components/server/activity-table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Id } from '../../../../convex/_generated/dataModel';

export default function ActivitiesPage() {
  const [activities, setActivities] = React.useState<{ 
    _id: Id<"activities">; 
    _creationTime: number; 
    subfield?: string; 
    name: string; 
    date: string; 
    teacherIds: Id<"teachers">[]; 
    studentIds: Id<"students">[]; 
  }[]>([]);
  const [teachers, setTeachers] = React.useState<{ 
    _id: Id<"teachers">; 
    _creationTime: number; 
    name: string; 
    phone: string; 
  }[]>([]);
  const [students, setStudents] = React.useState<{ 
    _id: Id<"students">; 
    _creationTime: number; 
    name: string; 
    class: string; 
  }[]>([]);

  React.useEffect(() => {
    async function fetchAll() {
      const [activitiesData, teachersData, studentsData] = await Promise.all([
        convex.query(api.activities.getAll),
        convex.query(api.teachers.getAll),
        convex.query(api.students.getAll),
      ]);
      setActivities(activitiesData);
      setTeachers(teachersData);
      setStudents(studentsData);
    }

    fetchAll();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Activities</h1>
        <Button asChild>
          <Link href="/dashboard/activities/new">Add Activity</Link>
        </Button>
      </div>
      <ActivityTable activities={activities} teachers={teachers} students={students} />
    </div>
  );
}
