import { Doc } from '../../../convex/_generated/dataModel';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';

interface StudentTableProps {
  students: Doc[];
}

export function StudentTable({ students }: StudentTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Class</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student) => (
          <TableRow key={student._id}>
            <TableCell>{student.name}</TableCell>
            <TableCell>{student.class}</TableCell>
            <TableCell>
              <Button asChild variant="outline">
                <Link href={`/dashboard/students/${student._id}`}>View</Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}