/* eslint-disable jsx-a11y/alt-text */
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { format } from 'date-fns';
import { Doc } from '../../../convex/_generated/dataModel';

const styles = StyleSheet.create({
  page: { padding: 30 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  logo: { width: 50, height: 50, marginRight: 10 },
  title: { fontSize: 18, fontWeight: 'bold' },
  section: { marginBottom: 10 },
  table: { width: 'auto', marginBottom: 10 },
  tableRow: { flexDirection: 'row' },
  tableCol: { width: '25%', borderStyle: 'solid', borderWidth: 1, padding: 5 },
  tableCell: { fontSize: 10 },
});

interface ReportProps {
  title: string;
  data: {
    student?: Doc<'students'>;
    activities?: (Doc<'activities'> & { teacherIds: string[] })[];
    attendance?: Doc<'attendance'>[];
    teachers: Record<string, string>; // Map of teacherId to teacher name
    activitiesMap: Record<string, string>; // Map of activityId to activity name
  };
}

export function ReportTemplate({ title, data }: ReportProps) {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Image src="/logo.png" style={styles.logo} />
          <Text style={styles.title}>Mizizi Learning Hub Activity</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
        {data.student && (
          <View style={styles.section}>
            <Text>Student: {data.student.name}</Text>
            <Text>Class: {data.student.class}</Text>
          </View>
        )}
        {data.activities && (
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Name</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Date</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Subfield</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Teachers</Text>
              </View>
            </View>
            {data.activities.map((activity) => (
              <View style={styles.tableRow} key={activity._id}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{activity.name}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{format(new Date(activity.date), 'yyyy-MM-dd')}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{activity.subfield || '-'}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {activity.teacherIds.map((id: string) => data.teachers[id]).join(', ')}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
        {data.attendance && (
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Activity</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Date</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Present</Text>
              </View>
            </View>
            {data.attendance.map((record) => (
              <View style={styles.tableRow} key={record._id}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{data.activitiesMap[record.activityId] || 'Unknown'}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{record.date}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{record.present ? 'Yes' : 'No'}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}