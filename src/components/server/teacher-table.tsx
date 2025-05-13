import { Doc } from '../../../convex/_generated/dataModel';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';

interface TeacherTableProps {
  teachers: Doc[];
}

export function TeacherTable({ teachers }: TeacherTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {teachers.map((teacher) => (
          <TableRow key={teacher._id}>
            <TableCell>{teacher.name}</TableCell>
            <TableCell>{teacher.phone}</TableCell>
            <TableCell>
              <Button asChild variant="outline">
                <Link href={`/dashboard/teachers/${teacher._id}`}>View</Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}