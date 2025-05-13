import { StudentForm } from '@/components/client/student-form';

export default function NewStudentPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">New Student</h1>
      <StudentForm />
    </div>
  );
}