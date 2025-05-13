import { ActivityForm } from '@/components/client/activity-form';

export default function NewActivityPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">New Activity</h1>
      <ActivityForm />
    </div>
  );
}