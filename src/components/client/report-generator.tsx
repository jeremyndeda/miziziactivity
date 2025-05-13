'use client';

import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Button } from '@/components/ui/button';
import { ReportTemplate } from '@/lib/pdf/report-template';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';


export function ReportGenerator() {
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const students: Array<{ _id: string; name: string }> = useQuery(api.students.getAll) || [];
  const activities = useQuery(api.activities.getAll) || [];
  const teachers = useQuery(api.teachers.getAll) || [];
  const studentQuery = useQuery(
    api.students.getById,
    selectedStudentId ? { id: selectedStudentId as Id<'students'> } : "skip"
  );
  const student = selectedStudentId ? studentQuery : null;
  const attendanceQuery = useQuery(
    api.attendance.getByActivity,
    selectedStudentId ? { activityId: activities[0]?._id } : "skip"
  );
  const attendance = selectedStudentId ? attendanceQuery || [] : [];

  const studentActivities = selectedStudentId
    ? activities.filter((activity) => activity.studentIds.includes(selectedStudentId as Id<'students'>))
    : activities;

  // Create teacher ID to name mapping
  const teacherMap = teachers.reduce((acc, teacher) => {
    acc[teacher._id] = teacher.name;
    return acc;
  }, {} as Record<string, string>);

  // Create activity ID to name mapping
  const activitiesMap = activities.reduce((acc, activity) => {
    acc[activity._id] = activity.name;
    return acc;
  }, {} as Record<string, string>);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Student Report</h2>
        <Select onValueChange={setSelectedStudentId} value={selectedStudentId || ''}>
          <SelectTrigger>
            <SelectValue placeholder="Select a student" />
          </SelectTrigger>
          <SelectContent>
            {students.map((student: { _id: string; name: string }) => (
              <SelectItem key={student._id} value={student._id}>
                {student.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedStudentId && student && (
          <PDFDownloadLink
            document={
              <ReportTemplate
                title={`Activity Report for ${student.name}`}
                data={{ student, activities: studentActivities, attendance, teachers: teacherMap, activitiesMap }}
              />
            }
            fileName={`student-report-${student.name}.pdf`}
          >
            {({ loading }) => (
              <Button disabled={loading} className="mt-2">
                {loading ? 'Generating...' : 'Download Student Report'}
              </Button>
            )}
          </PDFDownloadLink>
        )}
      </div>
      <div>
        <h2 className="text-lg font-semibold">General Activity Report</h2>
        <PDFDownloadLink
          document={
            <ReportTemplate
              title="General Activity Report"
              data={{ activities, teachers: teacherMap, activitiesMap }}
            />
          }
          fileName="general-activity-report.pdf"
        >
          {({ loading }) => (
            <Button disabled={loading}>
              {loading ? 'Generating...' : 'Download General Report'}
            </Button>
          )}
        </PDFDownloadLink>
      </div>
    </div>
  );
}