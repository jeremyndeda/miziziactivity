"use client";
import React from 'react';
import { api } from '../../../../convex/_generated/api';
import { convex } from '@/lib/convex-client';
import { StudentTable } from '@/components/server/student-table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Id } from '../../../../convex/_generated/dataModel';

export default function StudentsPage() {
  const [students, setStudents] = React.useState<{ _id: Id<"students">; _creationTime: number; name: string; class: string; }[]>([]);

  React.useEffect(() => {
    async function fetchStudents() {
      const fetchedStudents = await convex.query(api.students.getAll);
      setStudents(fetchedStudents);
    }
    fetchStudents();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Students</h1>
        <Button asChild>
          <Link href="/dashboard/students/new">Add Student</Link>
        </Button>
      </div>
      <StudentTable students={students} />
    </div>
  );
}