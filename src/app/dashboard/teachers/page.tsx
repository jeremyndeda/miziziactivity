"use client";
import React from 'react';
import { api } from '../../../../convex/_generated/api';
import { convex } from '@/lib/convex-client';
import { TeacherTable } from '@/components/server/teacher-table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Id } from '../../../../convex/_generated/dataModel';

export default function TeachersPage() {
  const [teachers, setTeachers] = React.useState<{ _id: Id<"teachers">; _creationTime: number; name: string; phone: string; }[]>([]);

  React.useEffect(() => {
    async function fetchTeachers() {
      const data = await convex.query(api.teachers.getAll);
      setTeachers(data);
    }
    fetchTeachers();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Teachers</h1>
        <Button asChild>
          <Link href="/dashboard/teachers/new">Add Teacher</Link>
        </Button>
      </div>
      <TeacherTable teachers={teachers} />
    </div>
  );
}