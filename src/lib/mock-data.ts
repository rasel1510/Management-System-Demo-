// ===== Dashboard Stats =====
export const dashboardStats = [
  {
    label: "Users",
    value: "1,248",
    icon: "users",
    trend: "+12%",
    trendUp: true,
  },
  {
    label: "Tasks",
    value: "328",
    icon: "tasks",
    trend: "+8%",
    trendUp: true,
  },
  {
    label: "Reports",
    value: "54",
    icon: "reports",
    trend: "+3%",
    trendUp: true,
  },
  {
    label: "Workflows",
    value: "12",
    icon: "workflows",
    trend: "+2",
    trendUp: true,
  },
];

// ===== Analytics Chart Data =====
export const analyticsData = [
  { day: "Mon", thisWeek: 2.5, lastWeek: 1.8 },
  { day: "Tue", thisWeek: 3.2, lastWeek: 2.5 },
  { day: "Wed", thisWeek: 2.8, lastWeek: 3.0 },
  { day: "Thu", thisWeek: 4.1, lastWeek: 2.8 },
  { day: "Fri", thisWeek: 3.5, lastWeek: 3.5 },
  { day: "Sat", thisWeek: 4.8, lastWeek: 3.2 },
  { day: "Sun", thisWeek: 4.2, lastWeek: 3.8 },
];

// ===== Task Status Data =====
export const taskStatusData = [
  { name: "Completed", value: 60, color: "#7c5cfc" },
  { name: "In Progress", value: 25, color: "#3b82f6" },
  { name: "Pending", value: 10, color: "#eab308" },
  { name: "Overdue", value: 5, color: "#f43f5e" },
];

// ===== Workflow Tracking =====
export const workflowSteps = [
  {
    name: "Request Submitted",
    time: "May 27, 10:15 AM",
    status: "Completed" as const,
  },
  {
    name: "Review & Approval",
    time: "May 27, 11:23 AM",
    status: "In Progress" as const,
  },
  {
    name: "Processing",
    time: "May 27, 11:45 AM",
    status: "Pending" as const,
  },
  {
    name: "Completed",
    time: "—",
    status: "Pending" as const,
  },
];

// ===== Users Data =====
export const usersData = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@neuravixor.com",
    role: "Admin",
    status: "Active" as const,
    lastActive: "2 min ago",
    avatar: "SJ",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@neuravixor.com",
    role: "Manager",
    status: "Active" as const,
    lastActive: "5 min ago",
    avatar: "MC",
  },
  {
    id: 3,
    name: "Emily Davis",
    email: "emily.davis@neuravixor.com",
    role: "Editor",
    status: "Active" as const,
    lastActive: "12 min ago",
    avatar: "ED",
  },
  {
    id: 4,
    name: "James Wilson",
    email: "james.wilson@neuravixor.com",
    role: "Viewer",
    status: "Inactive" as const,
    lastActive: "2 days ago",
    avatar: "JW",
  },
  {
    id: 5,
    name: "Anna Martinez",
    email: "anna.martinez@neuravixor.com",
    role: "Manager",
    status: "Active" as const,
    lastActive: "1 hr ago",
    avatar: "AM",
  },
  {
    id: 6,
    name: "Robert Taylor",
    email: "robert.taylor@neuravixor.com",
    role: "Editor",
    status: "Active" as const,
    lastActive: "30 min ago",
    avatar: "RT",
  },
  {
    id: 7,
    name: "Lisa Anderson",
    email: "lisa.anderson@neuravixor.com",
    role: "Admin",
    status: "Active" as const,
    lastActive: "Just now",
    avatar: "LA",
  },
  {
    id: 8,
    name: "David Brown",
    email: "david.brown@neuravixor.com",
    role: "Viewer",
    status: "Suspended" as const,
    lastActive: "1 week ago",
    avatar: "DB",
  },
];

// ===== Tasks Data =====
export const tasksData = [
  {
    id: "TSK-001",
    title: "Update user authentication flow",
    assignee: "Sarah Johnson",
    priority: "High" as const,
    status: "In Progress" as const,
    dueDate: "May 30, 2025",
    category: "Development",
  },
  {
    id: "TSK-002",
    title: "Design new dashboard layout",
    assignee: "Emily Davis",
    priority: "Medium" as const,
    status: "Completed" as const,
    dueDate: "May 25, 2025",
    category: "Design",
  },
  {
    id: "TSK-003",
    title: "Quarterly financial report",
    assignee: "Michael Chen",
    priority: "High" as const,
    status: "Pending" as const,
    dueDate: "Jun 01, 2025",
    category: "Finance",
  },
  {
    id: "TSK-004",
    title: "Server migration to cloud",
    assignee: "James Wilson",
    priority: "Critical" as const,
    status: "Overdue" as const,
    dueDate: "May 20, 2025",
    category: "Infrastructure",
  },
  {
    id: "TSK-005",
    title: "Customer onboarding documentation",
    assignee: "Anna Martinez",
    priority: "Low" as const,
    status: "In Progress" as const,
    dueDate: "Jun 05, 2025",
    category: "Documentation",
  },
  {
    id: "TSK-006",
    title: "API rate limiting implementation",
    assignee: "Robert Taylor",
    priority: "Medium" as const,
    status: "Completed" as const,
    dueDate: "May 22, 2025",
    category: "Development",
  },
  {
    id: "TSK-007",
    title: "Security audit preparation",
    assignee: "Lisa Anderson",
    priority: "Critical" as const,
    status: "In Progress" as const,
    dueDate: "Jun 10, 2025",
    category: "Security",
  },
  {
    id: "TSK-008",
    title: "Mobile app UI testing",
    assignee: "David Brown",
    priority: "Medium" as const,
    status: "Pending" as const,
    dueDate: "Jun 03, 2025",
    category: "QA",
  },
];

// ===== Reports Data =====
export const reportsData = [
  {
    id: 1,
    title: "Monthly Performance Report",
    type: "Performance",
    date: "May 27, 2025",
    status: "Generated" as const,
    size: "2.4 MB",
    author: "Sarah Johnson",
  },
  {
    id: 2,
    title: "User Activity Summary",
    type: "Analytics",
    date: "May 26, 2025",
    status: "Generated" as const,
    size: "1.8 MB",
    author: "Michael Chen",
  },
  {
    id: 3,
    title: "Q2 Financial Overview",
    type: "Financial",
    date: "May 25, 2025",
    status: "Pending" as const,
    size: "—",
    author: "Anna Martinez",
  },
  {
    id: 4,
    title: "Security Compliance Audit",
    type: "Security",
    date: "May 24, 2025",
    status: "Generated" as const,
    size: "3.1 MB",
    author: "Lisa Anderson",
  },
  {
    id: 5,
    title: "Workflow Efficiency Analysis",
    type: "Operations",
    date: "May 23, 2025",
    status: "Generated" as const,
    size: "1.2 MB",
    author: "Emily Davis",
  },
  {
    id: 6,
    title: "Infrastructure Cost Report",
    type: "Financial",
    date: "May 22, 2025",
    status: "Draft" as const,
    size: "0.9 MB",
    author: "James Wilson",
  },
];

// ===== Analytics Page Data =====
export const monthlyAnalytics = [
  { month: "Jan", users: 820, tasks: 210, reports: 32 },
  { month: "Feb", users: 890, tasks: 245, reports: 38 },
  { month: "Mar", users: 950, tasks: 280, reports: 41 },
  { month: "Apr", users: 1050, tasks: 300, reports: 45 },
  { month: "May", users: 1180, tasks: 315, reports: 50 },
  { month: "Jun", users: 1248, tasks: 328, reports: 54 },
];

export const performanceMetrics = [
  { name: "System Uptime", value: "99.9%", trend: "+0.1%", trendUp: true },
  { name: "Avg Response Time", value: "120ms", trend: "-15ms", trendUp: true },
  { name: "Error Rate", value: "0.3%", trend: "-0.1%", trendUp: true },
  { name: "Active Sessions", value: "847", trend: "+23", trendUp: true },
];

export const taskDistribution = [
  { category: "Development", count: 95, color: "#7c5cfc" },
  { category: "Design", count: 62, color: "#3b82f6" },
  { category: "Marketing", count: 48, color: "#06b6d4" },
  { category: "Finance", count: 35, color: "#eab308" },
  { category: "Operations", count: 45, color: "#22c55e" },
  { category: "Security", count: 43, color: "#f43f5e" },
];

// ===== Workflows Data =====
export const workflowsData = [
  {
    id: "WF-001",
    name: "Employee Onboarding",
    status: "Active" as const,
    steps: 5,
    completedSteps: 3,
    assignee: "HR Department",
    lastRun: "May 27, 2025",
    nextRun: "Jun 03, 2025",
  },
  {
    id: "WF-002",
    name: "Invoice Processing",
    status: "Active" as const,
    steps: 4,
    completedSteps: 4,
    assignee: "Finance Team",
    lastRun: "May 27, 2025",
    nextRun: "May 28, 2025",
  },
  {
    id: "WF-003",
    name: "Content Approval Pipeline",
    status: "Active" as const,
    steps: 6,
    completedSteps: 2,
    assignee: "Marketing Team",
    lastRun: "May 26, 2025",
    nextRun: "May 29, 2025",
  },
  {
    id: "WF-004",
    name: "Bug Report Triage",
    status: "Paused" as const,
    steps: 3,
    completedSteps: 1,
    assignee: "Engineering Team",
    lastRun: "May 25, 2025",
    nextRun: "—",
  },
  {
    id: "WF-005",
    name: "Quarterly Review Process",
    status: "Active" as const,
    steps: 8,
    completedSteps: 5,
    assignee: "Management",
    lastRun: "May 24, 2025",
    nextRun: "Jun 15, 2025",
  },
  {
    id: "WF-006",
    name: "Security Patch Deployment",
    status: "Completed" as const,
    steps: 4,
    completedSteps: 4,
    assignee: "DevOps Team",
    lastRun: "May 23, 2025",
    nextRun: "—",
  },
];

// ===== Audit Logs =====
export const auditLogs = [
  {
    id: 1,
    action: "User Login",
    user: "Sarah Johnson",
    timestamp: "May 27, 2025 10:15 AM",
    ip: "192.168.1.105",
    status: "Success" as const,
  },
  {
    id: 2,
    action: "Role Updated",
    user: "Michael Chen",
    timestamp: "May 27, 2025 09:45 AM",
    ip: "192.168.1.210",
    status: "Success" as const,
  },
  {
    id: 3,
    action: "Failed Login Attempt",
    user: "Unknown",
    timestamp: "May 27, 2025 09:30 AM",
    ip: "10.0.0.55",
    status: "Failed" as const,
  },
  {
    id: 4,
    action: "Report Generated",
    user: "Anna Martinez",
    timestamp: "May 27, 2025 08:50 AM",
    ip: "192.168.1.88",
    status: "Success" as const,
  },
  {
    id: 5,
    action: "Settings Changed",
    user: "Lisa Anderson",
    timestamp: "May 26, 2025 04:20 PM",
    ip: "192.168.1.105",
    status: "Success" as const,
  },
  {
    id: 6,
    action: "User Suspended",
    user: "Lisa Anderson",
    timestamp: "May 26, 2025 03:15 PM",
    ip: "192.168.1.105",
    status: "Warning" as const,
  },
  {
    id: 7,
    action: "Workflow Created",
    user: "Emily Davis",
    timestamp: "May 26, 2025 02:00 PM",
    ip: "192.168.1.42",
    status: "Success" as const,
  },
  {
    id: 8,
    action: "Permission Denied",
    user: "David Brown",
    timestamp: "May 26, 2025 01:30 PM",
    ip: "192.168.1.77",
    status: "Failed" as const,
  },
];

// ===== System Control Settings =====
export const systemSettings = [
  { label: "Two-Factor Authentication", enabled: true, category: "Security" },
  { label: "Email Notifications", enabled: true, category: "Notifications" },
  { label: "Auto-backup", enabled: true, category: "System" },
  { label: "Maintenance Mode", enabled: false, category: "System" },
  { label: "API Access", enabled: true, category: "Security" },
  { label: "Debug Logging", enabled: false, category: "System" },
];
