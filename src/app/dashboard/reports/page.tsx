import { ReportGenerator } from '@/components/client/report-generator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ReportsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Reports</h1>
      <Card>
        <CardHeader>
          <CardTitle>Generate Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <ReportGenerator />
        </CardContent>
      </Card>
    </div>
  );
}