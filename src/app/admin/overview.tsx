export default function DashboardOverview() {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">System Overview</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="overview-card">Courses: 15</div>
        <div className="overview-card">Students: 120</div>
        <div className="overview-card">Enrollments: 80</div>
      </div>
    </div>
  );
}