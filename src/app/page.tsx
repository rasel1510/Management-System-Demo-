"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Users, 
  CheckSquare, 
  FileText, 
  BarChart3, 
  GitBranch, 
  Settings, 
  Bell, 
  Search, 
  Plus, 
  Download, 
  Play, 
  Pause, 
  RefreshCcw, 
  Shield, 
  UserCheck, 
  ListTodo, 
  Lock, 
  LogOut, 
  Eye, 
  Trash2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Menu,
  ChevronRight,
  TrendingUp,
  Database
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  AreaChart,
  Area
} from "recharts";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Import mock data
import {
  dashboardStats,
  analyticsData,
  taskStatusData,
  workflowSteps as initialWorkflowSteps,
  usersData as initialUsersData,
  tasksData as initialTasksData,
  reportsData as initialReportsData,
  monthlyAnalytics,
  performanceMetrics,
  taskDistribution,
  workflowsData as initialWorkflowsData,
  auditLogs as initialAuditLogs,
  systemSettings as initialSystemSettings
} from "@/lib/mock-data";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive" | "Suspended";
  lastActive: string;
  avatar: string;
}

interface Task {
  id: string;
  title: string;
  assignee: string;
  priority: "Critical" | "High" | "Medium" | "Low";
  status: "Completed" | "In Progress" | "Pending" | "Overdue";
  dueDate: string;
  category: string;
}

interface Workflow {
  id: string;
  name: string;
  status: "Active" | "Paused" | "Completed";
  steps: number;
  completedSteps: number;
  assignee: string;
  lastRun: string;
  nextRun: string;
}

interface WorkflowStep {
  name: string;
  time: string;
  status: "Completed" | "In Progress" | "Pending";
}

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [searchQuery, setSearchQuery] = useState("");

  // Live state managers for CRUD
  const [users, setUsers] = useState<User[]>(initialUsersData as User[]);
  const [tasks, setTasks] = useState<Task[]>(initialTasksData as Task[]);
  const [reports, setReports] = useState(initialReportsData);
  const [workflows, setWorkflows] = useState<Workflow[]>(initialWorkflowsData as Workflow[]);
  const [systemSettings, setSystemSettings] = useState(initialSystemSettings);
  const [auditLogs, setAuditLogs] = useState(initialAuditLogs);
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>(initialWorkflowSteps as WorkflowStep[]);

  // Forms states
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState<{ name: string; email: string; role: string; status: "Active" | "Inactive" | "Suspended" }>({ name: "", email: "", role: "Editor", status: "Active" });
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [newTask, setNewTask] = useState<{ title: string; assignee: string; priority: "Critical" | "High" | "Medium" | "Low"; status: "Completed" | "In Progress" | "Pending" | "Overdue"; category: string }>({ title: "", assignee: "", priority: "Medium", status: "Pending", category: "Development" });

  // Reporting generating animation
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [reportProgress, setReportProgress] = useState(0);

  // Notifications simulation
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Sarah Johnson completed task Authentication Flow", read: false },
    { id: 2, text: "System Auto-backup completed successfully", read: false },
    { id: 3, text: "New login detected from IP 192.168.1.105", read: false }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Log actions to the audit log dynamically
  const addAuditLog = (action: string, user: string = "Current User", status: "Success" | "Failed" | "Warning" = "Success") => {
    const newLog = {
      id: Date.now(),
      action,
      user,
      timestamp: new Date().toLocaleString("en-US", { hour: "numeric", minute: "2-digit", hour12: true, month: "short", day: "numeric", year: "numeric" }),
      ip: "192.168.1.12",
      status
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Add User handler
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;

    const initials = newUser.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    const addedUser = {
      id: users.length + 1,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: newUser.status,
      lastActive: "Just now",
      avatar: initials || "U"
    };

    setUsers(prev => [addedUser, ...prev]);
    addAuditLog(`User Added: ${newUser.name} (${newUser.role})`);
    setNewUser({ name: "", email: "", role: "Editor", status: "Active" });
    setShowAddUserModal(false);
  };

  // Delete User handler
  const handleDeleteUser = (id: number, name: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    addAuditLog(`User Deleted: ${name}`, "Current User", "Warning");
  };

  // Toggle user status
  const toggleUserStatus = (id: number, currentStatus: string, name: string) => {
    const nextStatus = currentStatus === "Active" ? "Inactive" : "Active";
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: nextStatus } : u));
    addAuditLog(`Status changed for ${name} to ${nextStatus}`);
  };

  // Add Task handler
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title || !newTask.assignee) return;

    const addedTask = {
      id: `TSK-0${tasks.length + 1}`,
      title: newTask.title,
      assignee: newTask.assignee,
      priority: newTask.priority,
      status: newTask.status,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      category: newTask.category
    };

    setTasks(prev => [addedTask, ...prev]);
    addAuditLog(`Task Created: "${newTask.title}"`);
    setNewTask({ title: "", assignee: "", priority: "Medium", status: "Pending", category: "Development" });
    setShowAddTaskModal(false);
  };

  // Change task status
  const handleUpdateTaskStatus = (id: string, title: string, nextStatus: "Completed" | "In Progress" | "Pending" | "Overdue") => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: nextStatus } : t));
    addAuditLog(`Task Status Updated: "${title}" to ${nextStatus}`);
  };

  // Generate Report simulations
  const handleGenerateReport = () => {
    if (isGeneratingReport) return;
    setIsGeneratingReport(true);
    setReportProgress(0);
    addAuditLog("Report generation initiated", "Current User");

    const interval = setInterval(() => {
      setReportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const newReport = {
              id: reports.length + 1,
              title: `System Performance Report ${new Date().toLocaleDateString()}`,
              type: "Performance",
              date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
              status: "Generated" as const,
              size: "1.5 MB",
              author: "Current User"
            };
            setReports(prevReports => [newReport, ...prevReports]);
            setIsGeneratingReport(false);
            addAuditLog("Report generated successfully");
            setNotifications(prevNotif => [
              { id: Date.now(), text: `New report "${newReport.title}" generated`, read: false },
              ...prevNotif
            ]);
          }, 400);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  // Toggle system settings
  const handleToggleSetting = (label: string, currentValue: boolean) => {
    setSystemSettings(prev => prev.map(s => s.label === label ? { ...s, enabled: !currentValue } : s));
    addAuditLog(`System Setting Changed: "${label}" set to ${!currentValue ? 'ENABLED' : 'DISABLED'}`);
  };

  // Advance workflow simulation
  const handleAdvanceWorkflow = (index: number) => {
    setWorkflowSteps(prev => {
      const nextSteps = [...prev];
      if (nextSteps[index].status === "Pending") {
        nextSteps[index].status = "In Progress";
        addAuditLog(`Workflow Step Progress: "${nextSteps[index].name}" is now In Progress`);
      } else if (nextSteps[index].status === "In Progress") {
        nextSteps[index].status = "Completed";
        addAuditLog(`Workflow Step Progress: "${nextSteps[index].name}" completed`);
        if (index + 1 < nextSteps.length) {
          nextSteps[index + 1].status = "In Progress";
          addAuditLog(`Workflow Step Progress: "${nextSteps[index + 1].name}" is now In Progress`);
        }
      }
      return nextSteps;
    });
  };

  if (!isMounted) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#030712] text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent"></div>
          <p className="text-sm font-medium text-slate-400">Loading Neuravixor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#030712] overflow-x-hidden text-slate-100 selection:bg-indigo-500/30">
      
      {/* BACKGROUND GRAPHICS */}
      <div className="absolute inset-0 bg-neon-grid animate-grid-shift pointer-events-none opacity-40 z-0"></div>
      
      {/* Glowing Neon Mesh Backgrounds */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[120px] animate-neon-pulse-slow pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-[120px] animate-neon-pulse-slow pointer-events-none z-0"></div>
      
      {/* Interactive Glowing Laser Wave Top/Bottom */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30 blur-[1px]"></div>
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-30 blur-[1px]"></div>

      {/* ========================================================================= */}
      {/* MODE 1: LANDING PAGE & PRESENTATION (Split View) */}
      {/* ========================================================================= */}
      {!showDemo && (
        <div className="relative z-10 flex min-h-screen flex-col justify-between px-6 py-8 md:px-16 md:py-12 max-w-[1440px] mx-auto">
          {/* Header Bar */}
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600/20 border border-indigo-500/40 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                <div className="h-4 w-4 rounded-sm border-2 border-indigo-400 rotate-45 flex items-center justify-center">
                  <div className="h-1 w-1 bg-indigo-400 rounded-full"></div>
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-sans">
                Neuravixor
              </span>
            </div>
            
            <button 
              onClick={() => setShowDemo(true)}
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg px-6 py-2 text-sm font-semibold text-white shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></span>
              <span className="relative flex items-center gap-2 font-bold cursor-pointer">
                Launch Live Demo
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          </header>

          {/* Main Grid */}
          <main className="grid grid-cols-1 items-center gap-12 py-12 lg:grid-cols-12 lg:gap-8 xl:gap-16">
            {/* Left Content Column */}
            <div className="flex flex-col gap-6 lg:col-span-5">
              <div className="inline-flex max-w-fit items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 px-3 py-1 text-xs font-medium text-indigo-300">
                <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
                v0.1.0 Interactive Preview
              </div>
              
              <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl font-sans leading-[1.1]">
                <span className="gradient-text-blue block">Management</span>
                <span className="block">System <span className="gradient-text-software">Software</span></span>
              </h1>
              
              <div className="h-[2px] w-24 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
              
              <p className="text-lg leading-relaxed text-slate-400 font-sans max-w-md">
                Control operations, users, reports, and workflows from one unified, beautiful platform. Optimized for state-of-the-art visual presentation.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => setShowDemo(true)}
                  className="px-8 py-4 rounded-xl font-bold bg-white text-slate-950 shadow-[0_4px_30px_rgba(255,255,255,0.15)] hover:shadow-[0_4px_40px_rgba(99,102,241,0.4)] hover:bg-slate-100 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer text-sm"
                >
                  Enter Interactive Portal
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById("device-mock");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-6 py-4 rounded-xl font-semibold border border-slate-700 bg-slate-900/50 hover:bg-slate-900 hover:border-slate-600 transition-all duration-300 text-slate-300 text-sm cursor-pointer"
                >
                  Quick Preview
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-800/80">
                <div>
                  <div className="text-2xl font-bold text-white">99.9%</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Uptime SLA</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">Zero</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">DB Required</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">Full</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Mock Sync</div>
                </div>
              </div>
            </div>

            {/* Right Tablet Column */}
            <div id="device-mock" className="flex justify-center lg:col-span-7 perspective-container">
              <div 
                onClick={() => setShowDemo(true)}
                className="perspective-card cursor-pointer w-full max-w-[680px] rounded-[24px] border border-white/10 bg-[#0c1322]/90 p-3 shadow-2xl transition-all select-none group"
              >
                {/* Tablet Frame Bezel */}
                <div className="relative rounded-[20px] bg-[#030712] border border-white/5 overflow-hidden shadow-inner aspect-[1.6/1]">
                  {/* Internal Live Preview of the Dashboard */}
                  <div className="absolute inset-0 p-4 overflow-hidden text-[9px] flex flex-col pointer-events-none">
                    {/* Tablet Top Nav */}
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                      <div className="flex items-center gap-1.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-indigo-500"></div>
                        <span className="font-semibold text-white tracking-wider text-[8px]">Neuravixor</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-30 rounded bg-slate-800"></div>
                        <div className="h-3.5 w-3.5 rounded-full bg-slate-800"></div>
                      </div>
                    </div>
                    
                    {/* Tablet Main Panel split */}
                    <div className="flex flex-1 gap-3 overflow-hidden">
                      {/* Tablet mini-sidebar */}
                      <div className="w-24 border-r border-slate-800/80 pr-2 flex flex-col gap-1 text-[7px] text-slate-400">
                        <div className="h-4 rounded bg-indigo-500/20 text-indigo-400 flex items-center px-1 font-semibold gap-1">
                          <BarChart3 className="h-2 w-2" /> Dashboard
                        </div>
                        <div className="h-4 flex items-center px-1 gap-1"><Users className="h-2 w-2" /> Users</div>
                        <div className="h-4 flex items-center px-1 gap-1"><CheckSquare className="h-2 w-2" /> Tasks</div>
                        <div className="h-4 flex items-center px-1 gap-1"><FileText className="h-2 w-2" /> Reports</div>
                        <div className="h-4 flex items-center px-1 gap-1"><GitBranch className="h-2 w-2" /> Workflows</div>
                        <div className="h-4 flex items-center px-1 gap-1"><Settings className="h-2 w-2" /> System Control</div>
                      </div>

                      {/* Tablet mini-content */}
                      <div className="flex-1 flex flex-col gap-2 overflow-hidden">
                        {/* Header */}
                        <div className="font-semibold text-white text-[10px]">Dashboard</div>
                        
                        {/* Stats Cards */}
                        <div className="grid grid-cols-4 gap-1.5">
                          {dashboardStats.map((stat, i) => (
                            <div key={i} className="p-1 rounded bg-[#0b0f19] border border-white/5 flex flex-col">
                              <span className="text-[7px] text-slate-500">{stat.label}</span>
                              <span className="font-bold text-white text-[9px]">{stat.value}</span>
                            </div>
                          ))}
                        </div>

                        {/* Mid Section Grid */}
                        <div className="grid grid-cols-12 gap-2 flex-1 overflow-hidden">
                          {/* Analytics Mini Chart */}
                          <div className="col-span-8 p-1.5 rounded bg-[#0b0f19] border border-white/5 flex flex-col overflow-hidden">
                            <span className="text-slate-400 font-semibold mb-1 text-[8px]">Analytics Overview</span>
                            <div className="flex-1 flex items-end gap-1 px-1 pb-1">
                              {analyticsData.map((d, i) => (
                                <div key={i} className="flex-1 flex flex-col justify-end items-center gap-0.5 h-full">
                                  <div className="w-1.5 bg-blue-500 rounded-t" style={{ height: `${d.thisWeek * 15}%` }}></div>
                                  <div className="w-1.5 bg-indigo-500 rounded-t opacity-40" style={{ height: `${d.lastWeek * 15}%` }}></div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Task Donut chart */}
                          <div className="col-span-4 p-1.5 rounded bg-[#0b0f19] border border-white/5 flex flex-col items-center justify-center">
                            <div className="h-10 w-10 rounded-full border-4 border-t-indigo-500 border-r-blue-400 border-l-yellow-400 border-b-rose-500 flex items-center justify-center">
                              <span className="text-[7px] font-bold">328</span>
                            </div>
                          </div>
                        </div>

                        {/* Footer row */}
                        <div className="grid grid-cols-2 gap-2 h-12">
                          <div className="p-1.5 rounded bg-[#0b0f19] border border-white/5 flex flex-col gap-0.5 text-[6px]">
                            <span className="font-semibold text-slate-400 text-[7px]">Workflow Tracking</span>
                            <div className="flex items-center gap-1"><div className="h-1.5 w-1.5 rounded-full bg-green-500"></div> Request Submitted</div>
                            <div className="flex items-center gap-1"><div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div> Review & Approval</div>
                          </div>
                          <div className="p-1.5 rounded bg-[#0b0f19] border border-white/5 flex flex-col gap-1">
                            <span className="font-semibold text-slate-400 text-[7px]">System Control</span>
                            <div className="grid grid-cols-2 gap-1 text-[6px]">
                              <div className="bg-slate-800/80 rounded py-0.5 text-center">Settings</div>
                              <div className="bg-slate-800/80 rounded py-0.5 text-center">Audit Logs</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pulsing "Click to Enter" Cover */}
                  <div className="absolute inset-0 bg-[#030712]/30 group-hover:bg-[#030712]/10 transition-colors flex items-center justify-center">
                    <div className="px-4 py-2 rounded-xl bg-slate-950/80 border border-indigo-500/30 text-indigo-400 text-xs font-semibold tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(99,102,241,0.2)] animate-pulse">
                      <Play className="h-3 w-3 fill-indigo-400" />
                      ENTER LIVE DEMO
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Footer Bar */}
          <footer className="flex flex-col md:flex-row items-center justify-between border-t border-slate-800/60 pt-6 mt-12 text-sm text-slate-500">
            <p>© {new Date().getFullYear()} Neuravixor Inc. All rights reserved.</p>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <a href="#" onClick={(e) => {e.preventDefault(); setShowDemo(true)}} className="hover:text-indigo-400 transition-colors">Client View</a>
              <a href="#" className="hover:text-indigo-400 transition-colors">Documentation</a>
              <a href="https://github.com/rasel1510/Management-System-Demo-" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">Repository</a>
            </div>
          </footer>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: FULL-SCREEN INTERACTIVE DASHBOARD SUITE */}
      {/* ========================================================================= */}
      {showDemo && (
        <div className="relative z-10 min-h-screen flex text-slate-100 bg-[#080d1a] border-t border-white/5 animate-fade-in custom-scrollbar">
          
          {/* SIDEBAR NAVIGATION */}
          <aside className="hidden md:flex flex-col w-64 border-r border-slate-800 bg-[#0b0f19]/90 backdrop-blur-xl">
            {/* Sidebar Brand Header */}
            <div className="flex h-16 items-center justify-between px-6 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/20 border border-indigo-500/40">
                  <div className="h-3 w-3 rounded-sm border border-indigo-400 rotate-45 flex items-center justify-center">
                    <div className="h-0.5 w-0.5 bg-indigo-400 rounded-full"></div>
                  </div>
                </div>
                <span className="font-bold tracking-tight text-white">Neuravixor</span>
              </div>
              <Badge className="bg-indigo-500/10 border-indigo-500/30 text-indigo-400">Demo</Badge>
            </div>

            {/* Sidebar Navigation Items */}
            <nav className="flex-1 px-4 py-6 space-y-1">
              {[
                { name: "Dashboard", icon: BarChart3 },
                { name: "Users", icon: Users, badge: users.length },
                { name: "Tasks", icon: CheckSquare, badge: tasks.length },
                { name: "Reports", icon: FileText, badge: reports.length },
                { name: "Workflows", icon: GitBranch },
                { name: "System Control", icon: Settings }
              ].map(item => {
                const IconComponent = item.icon;
                const isSelected = activeTab === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      setActiveTab(item.name);
                      setSearchQuery("");
                    }}
                    className={`flex w-full items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all group cursor-pointer ${
                      isSelected
                        ? "bg-indigo-600/20 text-white border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.15)]"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className={`h-4.5 w-4.5 transition-colors ${isSelected ? "text-indigo-400" : "text-slate-400 group-hover:text-white"}`} />
                      <span>{item.name}</span>
                    </div>
                    {item.badge !== undefined && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isSelected ? "bg-indigo-500 text-white" : "bg-slate-800 text-slate-400"}`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Sidebar Footer (Return Button) */}
            <div className="p-4 border-t border-slate-800">
              <button
                onClick={() => setShowDemo(false)}
                className="flex w-full items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl border border-slate-800 hover:bg-slate-900 hover:border-slate-700 transition-all text-slate-400 hover:text-white cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                Exit Presentation
              </button>
            </div>
          </aside>

          {/* MAIN CONTAINER */}
          <div className="flex-1 flex flex-col min-w-0 overflow-y-auto custom-scrollbar">
            
            {/* TOP BAR / NAVIGATION */}
            <header className="flex h-16 items-center justify-between px-6 border-b border-slate-800 bg-[#0b0f19]/70 backdrop-blur-md sticky top-0 z-30">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowDemo(false)}
                  className="md:hidden p-2 rounded-lg border border-slate-800 hover:bg-slate-900 text-slate-400 hover:text-white cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-medium">Console</span>
                  <span className="text-slate-700">/</span>
                  <span className="text-white font-semibold">{activeTab}</span>
                </div>
              </div>

              {/* Top Bar Actions */}
              <div className="flex items-center gap-4">
                {/* Search Header */}
                <div className="relative hidden sm:block w-64">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    placeholder={`Search ${activeTab.toLowerCase()}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-900 border border-slate-800 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
                  />
                </div>

                {/* Notifications Bell */}
                <div className="relative">
                  <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 rounded-xl border border-slate-800 hover:bg-slate-900 text-slate-400 hover:text-white transition-all cursor-pointer"
                  >
                    <Bell className="h-4.5 w-4.5" />
                    {notifications.filter(n => !n.read).length > 0 && (
                      <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-[#080d1a]"></span>
                    )}
                  </button>

                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 rounded-xl border border-slate-800 bg-[#0d1322] shadow-2xl p-4 z-50">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                        <span className="text-xs font-bold text-white uppercase tracking-wider">Notifications</span>
                        <button 
                          onClick={() => setNotifications(prev => prev.map(n => ({...n, read: true})))}
                          className="text-[10px] text-indigo-400 hover:underline cursor-pointer"
                        >
                          Mark all read
                        </button>
                      </div>
                      <div className="space-y-2.5 max-h-60 overflow-y-auto custom-scrollbar">
                        {notifications.map(n => (
                          <div key={n.id} className={`p-2 rounded-lg text-xs leading-relaxed border ${n.read ? "bg-transparent border-transparent text-slate-400" : "bg-indigo-500/5 border-indigo-500/10 text-white"}`}>
                            {n.text}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* User avatar */}
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 rounded-xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-300 font-bold text-xs">
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <div className="hidden lg:flex flex-col text-left">
                    <span className="text-xs font-bold text-white">Administrator</span>
                    <span className="text-[10px] text-slate-500 font-medium">admin@neuravixor.com</span>
                  </div>
                </div>
              </div>
            </header>

            {/* MAIN PANEL CONTENT SCROLLABLE AREA */}
            <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto space-y-8 z-10">

              {/* ========================================= */}
              {/* TAB 1: CORE DASHBOARD */}
              {/* ========================================= */}
              {activeTab === "Dashboard" && (
                <div className="space-y-6">
                  {/* Dynamic welcome banner */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl border border-indigo-500/15 bg-indigo-500/5 shadow-inner">
                    <div>
                      <h2 className="text-2xl font-bold text-white">Console Overview</h2>
                      <p className="text-sm text-slate-400 mt-1">Here is a summary of activities and states in Neuravixor.</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        onClick={handleGenerateReport} 
                        className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2.5 rounded-xl border border-indigo-400/20 shadow-lg shadow-indigo-600/15 flex items-center gap-2 cursor-pointer"
                        disabled={isGeneratingReport}
                      >
                        <RefreshCcw className={`h-4 w-4 ${isGeneratingReport ? "animate-spin" : ""}`} />
                        {isGeneratingReport ? `Generating... (${reportProgress}%)` : "Generate New Report"}
                      </Button>
                    </div>
                  </div>

                  {/* STATS CARDS */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {[
                      { label: "Users", value: users.length, icon: Users, color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
                      { label: "Tasks", value: tasks.length, icon: CheckSquare, color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
                      { label: "Reports", value: reports.length, icon: FileText, color: "text-teal-400 bg-teal-500/10 border-teal-500/20" },
                      { label: "Workflows", value: workflows.length, icon: GitBranch, color: "text-pink-400 bg-pink-500/10 border-pink-500/20" }
                    ].map((stat, index) => {
                      const IconComponent = stat.icon;
                      return (
                        <div key={index} className="p-6 rounded-2xl border border-slate-800 bg-[#0c1220]/80 hover:scale-[1.02] transition-all duration-300 flex items-center justify-between group shadow-xl">
                          <div className="space-y-2">
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</span>
                            <div className="text-3xl font-extrabold text-white">{stat.value}</div>
                          </div>
                          <div className={`p-4 rounded-xl border ${stat.color} group-hover:scale-110 transition-transform`}>
                            <IconComponent className="h-6 w-6" />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* CHARTS GRID */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left: Analytics Overview Line Chart */}
                    <Card className="lg:col-span-8 border-slate-800 bg-[#0c1220]/80 shadow-xl overflow-hidden p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div>
                          <h3 className="text-base font-bold text-white">Analytics Overview</h3>
                          <p className="text-xs text-slate-500 mt-0.5">Dual timeline tracking current vs past week</p>
                        </div>
                        <div className="flex items-center gap-4 text-xs">
                          <div className="flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                            <span className="text-slate-400 font-medium">This Week</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-indigo-500 opacity-60"></span>
                            <span className="text-slate-400 font-medium">Last Week</span>
                          </div>
                        </div>
                      </div>
                      <div className="h-[280px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={analyticsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                              <linearGradient id="colorThisWeek" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                              </linearGradient>
                              <linearGradient id="colorLastWeek" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.08}/>
                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.3} />
                            <XAxis dataKey="day" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                            <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} domain={[0, 5]} />
                            <Tooltip 
                              contentStyle={{ backgroundColor: "#0c1322", borderColor: "#1e293b", borderRadius: "12px", color: "#fff", fontSize: "11px" }}
                            />
                            <Area type="monotone" dataKey="thisWeek" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorThisWeek)" activeDot={{ r: 6 }} />
                            <Area type="monotone" dataKey="lastWeek" stroke="#6366f1" strokeWidth={2} strokeDasharray="4 4" fillOpacity={1} fill="url(#colorLastWeek)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </Card>

                    {/* Right: Task Status Donut Chart */}
                    <Card className="lg:col-span-4 border-slate-800 bg-[#0c1220]/80 shadow-xl p-6 flex flex-col justify-between">
                      <div>
                        <h3 className="text-base font-bold text-white">Task Status</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Current workload distribution</p>
                      </div>
                      
                      <div className="relative h-44 my-4 flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={taskStatusData}
                              cx="50%"
                              cy="50%"
                              innerRadius={50}
                              outerRadius={70}
                              paddingAngle={4}
                              dataKey="value"
                            >
                              {taskStatusData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip 
                              contentStyle={{ backgroundColor: "#0c1322", borderColor: "#1e293b", borderRadius: "8px", color: "#fff", fontSize: "11px" }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute flex flex-col items-center justify-center">
                          <span className="text-2xl font-black text-white">{tasks.length}</span>
                          <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Total</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {taskStatusData.map((status, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-white/5">
                            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: status.color }}></span>
                            <span className="text-slate-400 font-medium">{status.name}</span>
                            <span className="ml-auto font-bold text-white">{status.value}%</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>

                  {/* BOTTOM TRACKING ROW */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left: Workflow Tracking vertical stepper */}
                    <Card className="border-slate-800 bg-[#0c1220]/80 shadow-xl p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="text-base font-bold text-white">Workflow Tracking</h3>
                          <p className="text-xs text-slate-500 mt-0.5">Onboarding pipeline verification flow</p>
                        </div>
                        <Button 
                          onClick={() => {
                            setWorkflowSteps(initialWorkflowSteps);
                            addAuditLog("Reset onboarding workflow tracker", "System");
                          }}
                          className="h-8 rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-white px-3 text-xs cursor-pointer"
                        >
                          Reset Flow
                        </Button>
                      </div>

                      <div className="space-y-4">
                        {workflowSteps.map((step, index) => {
                          const isCompleted = step.status === "Completed";
                          const isInProgress = step.status === "In Progress";
                          
                          return (
                            <div key={index} className="flex gap-4 group">
                              {/* Step indicator column */}
                              <div className="flex flex-col items-center">
                                <button 
                                  onClick={() => handleAdvanceWorkflow(index)}
                                  className={`h-7 w-7 rounded-full border-2 flex items-center justify-center font-bold text-xs transition-all cursor-pointer ${
                                    isCompleted 
                                      ? "border-green-500 bg-green-500/10 text-green-400" 
                                      : isInProgress 
                                      ? "border-blue-500 bg-blue-500/10 text-blue-400 ring-4 ring-blue-500/10 animate-pulse" 
                                      : "border-slate-800 bg-slate-900 text-slate-500"
                                  }`}
                                  title="Click to progress this step"
                                >
                                  {isCompleted ? "✓" : index + 1}
                                </button>
                                {index < workflowSteps.length - 1 && (
                                  <div className={`w-0.5 h-10 my-1 ${isCompleted ? "bg-green-500/40" : "bg-slate-800"}`}></div>
                                )}
                              </div>
                              
                              {/* Step details */}
                              <div className="flex-1 p-3 rounded-xl border border-white/5 bg-slate-900/40 flex items-center justify-between hover:border-white/10 transition-colors">
                                <div>
                                  <div className="text-xs font-bold text-white">{step.name}</div>
                                  <div className="text-[10px] text-slate-500 mt-0.5">Updated: {step.time}</div>
                                </div>
                                
                                <Badge className={
                                  isCompleted 
                                    ? "bg-green-500/10 border-green-500/30 text-green-400" 
                                    : isInProgress 
                                    ? "bg-blue-500/10 border-blue-500/30 text-blue-400" 
                                    : "bg-slate-800 border-slate-700 text-slate-400"
                                }>
                                  {step.status}
                                </Badge>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </Card>

                    {/* Right: Quick actions and metrics */}
                    <Card className="border-slate-800 bg-[#0c1220]/80 shadow-xl p-6">
                      <div className="mb-6">
                        <h3 className="text-base font-bold text-white">System Control Panel</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Quick access shortcuts</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { title: "User Management", desc: "View all user accounts", icon: Users, action: "Users", color: "border-purple-500/20 text-purple-400 hover:bg-purple-500/5" },
                          { title: "Roles & Permissions", desc: "View security groups", icon: Shield, action: "System Control", color: "border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/5" },
                          { title: "System Settings", desc: "View core settings config", icon: Settings, action: "System Control", color: "border-amber-500/20 text-amber-400 hover:bg-amber-500/5" },
                          { title: "Audit Log Feed", desc: "Trace user logs stream", icon: FileText, action: "System Control", color: "border-blue-500/20 text-blue-400 hover:bg-blue-500/5" }
                        ].map((btn, index) => {
                          const IconComponent = btn.icon;
                          return (
                            <button
                              key={index}
                              onClick={() => setActiveTab(btn.action)}
                              className={`p-4 rounded-xl border bg-slate-900/40 text-left transition-all duration-300 hover:scale-102 flex flex-col gap-2 cursor-pointer ${btn.color}`}
                            >
                              <IconComponent className="h-5 w-5" />
                              <div>
                                <div className="text-xs font-bold text-white">{btn.title}</div>
                                <div className="text-[10px] text-slate-500 mt-0.5">{btn.desc}</div>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Small Live stats chart summary */}
                      <div className="mt-6 p-4 rounded-xl bg-slate-900/50 border border-white/5 space-y-3">
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <span className="text-slate-400">Database Connection Pool</span>
                          <span className="text-green-400">Healthy (100%)</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className="w-full h-full bg-green-500 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              )}

              {/* ========================================= */}
              {/* TAB 2: USER MANAGEMENT */}
              {/* ========================================= */}
              {activeTab === "Users" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-white">Users Directory</h2>
                      <p className="text-sm text-slate-400">Add, edit, or suspend security logins from the platform.</p>
                    </div>
                    <Button 
                      onClick={() => setShowAddUserModal(true)} 
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl px-4 py-2.5 shadow-lg shadow-indigo-600/15 flex items-center gap-2 border border-indigo-400/20 cursor-pointer"
                    >
                      <Plus className="h-4.5 w-4.5" />
                      Add New Account
                    </Button>
                  </div>

                  {/* Filter and Search Bar */}
                  <div className="p-4 rounded-xl border border-slate-800 bg-[#0c1220]/80 flex flex-wrap gap-4 items-center justify-between">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                      <input
                        type="text"
                        placeholder="Search users by name, email, or role..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    
                    <div className="text-xs text-indigo-400 font-semibold bg-indigo-500/5 border border-indigo-500/10 px-3 py-1.5 rounded-lg">
                      Showing {users.filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.role.toLowerCase().includes(searchQuery.toLowerCase())).length} of {users.length} Users
                    </div>
                  </div>

                  {/* USERS TABLE */}
                  <div className="rounded-xl border border-slate-800 bg-[#0c1220]/80 overflow-hidden shadow-xl">
                    <div className="overflow-x-auto custom-scrollbar">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-800 text-slate-500 text-xs font-semibold bg-slate-900/40">
                            <th className="p-4">User Details</th>
                            <th className="p-4">Access Role</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Last Logged In</th>
                            <th className="p-4 text-right">Console Controls</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 text-xs">
                          {users
                            .filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase()) || u.role.toLowerCase().includes(searchQuery.toLowerCase()))
                            .map((user) => (
                              <tr key={user.id} className="hover:bg-slate-900/30 transition-colors">
                                <td className="p-4">
                                  <div className="flex items-center gap-3">
                                    <Avatar className="h-9 w-9 rounded-xl border border-slate-800 bg-slate-950 text-slate-300 font-bold text-xs flex items-center justify-center">
                                      <AvatarFallback>{user.avatar}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <div className="font-bold text-white">{user.name}</div>
                                      <div className="text-slate-500 text-[10px]">{user.email}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="p-4">
                                  <Badge className="bg-slate-900 border-slate-800 text-slate-300 font-semibold">{user.role}</Badge>
                                </td>
                                <td className="p-4">
                                  <Badge className={
                                    user.status === "Active" 
                                      ? "bg-green-500/10 border-green-500/20 text-green-400 font-semibold"
                                      : user.status === "Inactive"
                                      ? "bg-slate-800 border-slate-700 text-slate-400 font-semibold"
                                      : "bg-rose-500/10 border-rose-500/20 text-rose-400 font-semibold"
                                  }>
                                    {user.status}
                                  </Badge>
                                </td>
                                <td className="p-4 text-slate-400">{user.lastActive}</td>
                                <td className="p-4 text-right space-x-2">
                                  <Button 
                                    onClick={() => toggleUserStatus(user.id, user.status, user.name)}
                                    className="h-8 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white px-2.5 text-[10px] cursor-pointer"
                                  >
                                    {user.status === "Active" ? "Deactivate" : "Activate"}
                                  </Button>
                                  <button 
                                    onClick={() => handleDeleteUser(user.id, user.name)}
                                    className="p-2 rounded-lg border border-slate-800 hover:border-rose-500/30 hover:bg-rose-500/5 text-slate-400 hover:text-rose-400 transition-all inline-flex items-center justify-center cursor-pointer"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* ADD USER MODAL */}
                  {showAddUserModal && (
                    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                      <Card className="w-full max-w-md border-slate-800 bg-[#0c1220] p-6 shadow-2xl space-y-4">
                        <CardHeader className="p-0">
                          <CardTitle className="text-lg font-bold text-white">Create Security Account</CardTitle>
                          <CardDescription className="text-slate-400 text-xs mt-1">Specify user details and permission boundaries.</CardDescription>
                        </CardHeader>

                        <form onSubmit={handleAddUser} className="space-y-4 pt-2">
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-400">Full Name</label>
                            <input
                              type="text"
                              required
                              value={newUser.name}
                              onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                              placeholder="e.g. Liam Anderson"
                              className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-800 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-400">Email Address</label>
                            <input
                              type="email"
                              required
                              value={newUser.email}
                              onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                              placeholder="e.g. liam.anderson@neuravixor.com"
                              className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-800 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <label className="text-xs font-semibold text-slate-400">Access Level</label>
                              <select
                                value={newUser.role}
                                onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                                className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none focus:border-indigo-500"
                              >
                                <option>Admin</option>
                                <option>Manager</option>
                                <option>Editor</option>
                                <option>Viewer</option>
                              </select>
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-xs font-semibold text-slate-400">Status</label>
                              <select
                                value={newUser.status}
                                onChange={(e) => setNewUser({...newUser, status: e.target.value as any})}
                                className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none focus:border-indigo-500"
                              >
                                <option>Active</option>
                                <option>Inactive</option>
                                <option>Suspended</option>
                              </select>
                            </div>
                          </div>

                          <div className="flex items-center justify-end gap-2 pt-4">
                            <Button 
                              type="button" 
                              onClick={() => setShowAddUserModal(false)}
                              className="h-9 px-4 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white text-xs cursor-pointer"
                            >
                              Cancel
                            </Button>
                            <Button 
                              type="submit" 
                              className="h-9 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs cursor-pointer"
                            >
                              Add Account
                            </Button>
                          </div>
                        </form>
                      </Card>
                    </div>
                  )}
                </div>
              )}

              {/* ========================================= */}
              {/* TAB 3: TASKS BOARD & LIST */}
              {/* ========================================= */}
              {activeTab === "Tasks" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-white">Tasks Tracker</h2>
                      <p className="text-sm text-slate-400">Manage security schedules, audits, and deployment queues.</p>
                    </div>
                    <Button 
                      onClick={() => setShowAddTaskModal(true)} 
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl px-4 py-2.5 shadow-lg shadow-indigo-600/15 flex items-center gap-2 border border-indigo-400/20 cursor-pointer"
                    >
                      <Plus className="h-4.5 w-4.5" />
                      Create New Task
                    </Button>
                  </div>

                  {/* Filter / search panel */}
                  <div className="p-4 rounded-xl border border-slate-800 bg-[#0c1220]/80 flex flex-wrap gap-4 items-center justify-between">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                      <input
                        type="text"
                        placeholder="Search tasks by title, category, or assignee..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    
                    <div className="text-xs text-indigo-400 font-semibold bg-indigo-500/5 border border-indigo-500/10 px-3 py-1.5 rounded-lg">
                      {tasks.filter(t => t.status === "In Progress").length} Tasks In Progress
                    </div>
                  </div>

                  {/* TASKS TABLE */}
                  <div className="rounded-xl border border-slate-800 bg-[#0c1220]/80 overflow-hidden shadow-xl">
                    <div className="overflow-x-auto custom-scrollbar">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-800 text-slate-500 text-xs font-semibold bg-slate-900/40">
                            <th className="p-4">Task ID</th>
                            <th className="p-4">Task Title</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Assignee</th>
                            <th className="p-4">Priority</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Due Date</th>
                            <th className="p-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 text-xs">
                          {tasks
                            .filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.assignee.toLowerCase().includes(searchQuery.toLowerCase()) || t.category.toLowerCase().includes(searchQuery.toLowerCase()))
                            .map((task) => (
                              <tr key={task.id} className="hover:bg-slate-900/30 transition-colors">
                                <td className="p-4 font-mono text-[10px] text-slate-500">{task.id}</td>
                                <td className="p-4 font-bold text-white">{task.title}</td>
                                <td className="p-4">
                                  <Badge className="bg-slate-900 border-slate-800 text-slate-400 font-medium">{task.category}</Badge>
                                </td>
                                <td className="p-4 text-slate-300 font-semibold">{task.assignee}</td>
                                <td className="p-4">
                                  <Badge className={
                                    task.priority === "Critical" 
                                      ? "bg-rose-500/10 border-rose-500/20 text-rose-400 font-bold"
                                      : task.priority === "High"
                                      ? "bg-amber-500/10 border-amber-500/20 text-amber-400 font-semibold"
                                      : task.priority === "Medium"
                                      ? "bg-blue-500/10 border-blue-500/20 text-blue-400 font-medium"
                                      : "bg-slate-800 border-slate-700 text-slate-400"
                                  }>
                                    {task.priority}
                                  </Badge>
                                </td>
                                <td className="p-4">
                                  <select
                                    value={task.status}
                                    onChange={(e) => handleUpdateTaskStatus(task.id, task.title, e.target.value as any)}
                                    className="bg-slate-900 border border-slate-800 text-xs rounded-lg px-2 py-1 text-slate-300 focus:outline-none focus:border-indigo-500 font-semibold"
                                  >
                                    <option>Pending</option>
                                    <option>In Progress</option>
                                    <option>Completed</option>
                                    <option>Overdue</option>
                                  </select>
                                </td>
                                <td className="p-4 text-slate-400">{task.dueDate}</td>
                                <td className="p-4 text-right">
                                  <Button 
                                    onClick={() => handleUpdateTaskStatus(task.id, task.title, "Completed")}
                                    className="h-8 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/25 px-2.5 text-[10px] font-bold cursor-pointer"
                                    disabled={task.status === "Completed"}
                                  >
                                    Complete
                                  </Button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* ADD TASK MODAL */}
                  {showAddTaskModal && (
                    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                      <Card className="w-full max-w-md border-slate-800 bg-[#0c1220] p-6 shadow-2xl space-y-4">
                        <CardHeader className="p-0">
                          <CardTitle className="text-lg font-bold text-white">Create Security Task</CardTitle>
                          <CardDescription className="text-slate-400 text-xs mt-1">Specify task objective and resource routing.</CardDescription>
                        </CardHeader>

                        <form onSubmit={handleAddTask} className="space-y-4 pt-2">
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-400">Task Title</label>
                            <input
                              type="text"
                              required
                              value={newTask.title}
                              onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                              placeholder="e.g. Implement API rate limit headers"
                              className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-800 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <label className="text-xs font-semibold text-slate-400">Assignee</label>
                              <select
                                value={newTask.assignee}
                                onChange={(e) => setNewTask({...newTask, assignee: e.target.value})}
                                className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none focus:border-indigo-500"
                              >
                                <option value="">Select Assignee</option>
                                {users.map(u => (
                                  <option key={u.id} value={u.name}>{u.name}</option>
                                ))}
                              </select>
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-xs font-semibold text-slate-400">Category</label>
                              <input
                                type="text"
                                required
                                value={newTask.category}
                                onChange={(e) => setNewTask({...newTask, category: e.target.value})}
                                placeholder="e.g. Security, Dev"
                                className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-800 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <label className="text-xs font-semibold text-slate-400">Priority</label>
                              <select
                                value={newTask.priority}
                                onChange={(e) => setNewTask({...newTask, priority: e.target.value as any})}
                                className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none focus:border-indigo-500"
                              >
                                <option>Critical</option>
                                <option>High</option>
                                <option>Medium</option>
                                <option>Low</option>
                              </select>
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-xs font-semibold text-slate-400">Initial Status</label>
                              <select
                                value={newTask.status}
                                onChange={(e) => setNewTask({...newTask, status: e.target.value as any})}
                                className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none focus:border-indigo-500"
                              >
                                <option>Pending</option>
                                <option>In Progress</option>
                              </select>
                            </div>
                          </div>

                          <div className="flex items-center justify-end gap-2 pt-4">
                            <Button 
                              type="button" 
                              onClick={() => setShowAddTaskModal(false)}
                              className="h-9 px-4 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white text-xs cursor-pointer"
                            >
                              Cancel
                            </Button>
                            <Button 
                              type="submit" 
                              className="h-9 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs cursor-pointer"
                            >
                              Create Task
                            </Button>
                          </div>
                        </form>
                      </Card>
                    </div>
                  )}
                </div>
              )}

              {/* ========================================= */}
              {/* TAB 4: REPORTS GENERATOR */}
              {/* ========================================= */}
              {activeTab === "Reports" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-white">System Reports</h2>
                      <p className="text-sm text-slate-400">Generate, schedule, or download system compliance reports.</p>
                    </div>
                    <Button 
                      onClick={handleGenerateReport} 
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl px-4 py-2.5 shadow-lg shadow-indigo-600/15 flex items-center gap-2 border border-indigo-400/20 cursor-pointer"
                      disabled={isGeneratingReport}
                    >
                      <RefreshCcw className={`h-4.5 w-4.5 ${isGeneratingReport ? "animate-spin" : ""}`} />
                      {isGeneratingReport ? `Processing (${reportProgress}%)` : "Compile New Report"}
                    </Button>
                  </div>

                  {isGeneratingReport && (
                    <div className="p-6 rounded-xl border border-indigo-500/20 bg-indigo-500/5 space-y-3">
                      <div className="flex items-center justify-between text-xs font-bold text-indigo-400">
                        <span>Compiling security metrics and event logs...</span>
                        <span>{reportProgress}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-150" style={{ width: `${reportProgress}%` }}></div>
                      </div>
                    </div>
                  )}

                  {/* REPORTS LISTING */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reports
                      .filter(r => r.title.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((report) => (
                        <div key={report.id} className="p-6 rounded-2xl border border-slate-800 bg-[#0c1220]/80 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all group">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <Badge className="bg-slate-900 border-slate-800 text-slate-400 font-semibold">{report.type}</Badge>
                              <span className="text-[10px] text-slate-500 font-medium">{report.date}</span>
                            </div>
                            
                            <h3 className="text-sm font-bold text-white leading-snug group-hover:text-indigo-400 transition-colors">{report.title}</h3>
                            <p className="text-[10px] text-slate-500">Author: {report.author}</p>
                          </div>

                          <div className="border-t border-slate-800/80 mt-6 pt-4 flex items-center justify-between text-xs">
                            <span className="text-slate-400 font-semibold">{report.size}</span>
                            <Button 
                              onClick={() => addAuditLog(`Downloaded report: "${report.title}"`)}
                              className="h-8 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white px-3 text-[10px] font-bold flex items-center gap-1.5 cursor-pointer"
                            >
                              <Download className="h-3.5 w-3.5" />
                              Download File
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* ========================================= */}
              {/* TAB 5: WORKFLOWS */}
              {/* ========================================= */}
              {activeTab === "Workflows" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Workflows Pipeline</h2>
                    <p className="text-sm text-slate-400">Track and step through automated orchestration workflows.</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left: Interactive Workflow Runner */}
                    <Card className="lg:col-span-2 border-slate-800 bg-[#0c1220]/80 shadow-xl p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="text-base font-bold text-white">Onboarding Flow Simulation</h3>
                          <p className="text-xs text-slate-500 mt-0.5">Click steps to advance the automated process.</p>
                        </div>
                        <Button 
                          onClick={() => {
                            setWorkflowSteps(initialWorkflowSteps);
                            addAuditLog("Reset onboarding workflow simulation", "System");
                          }}
                          className="h-8 rounded-lg border border-slate-800 bg-slate-900 text-indigo-400 hover:text-indigo-300 px-3 text-xs cursor-pointer"
                        >
                          Reset Simulation
                        </Button>
                      </div>

                      <div className="space-y-6">
                        {workflowSteps.map((step, index) => {
                          const isCompleted = step.status === "Completed";
                          const isInProgress = step.status === "In Progress";
                          
                          return (
                            <div key={index} className="flex gap-4">
                              <div className="flex flex-col items-center">
                                <div className={`h-8 w-8 rounded-full border-2 flex items-center justify-center font-bold text-sm ${
                                  isCompleted 
                                    ? "border-green-500 bg-green-500/10 text-green-400" 
                                    : isInProgress 
                                    ? "border-blue-500 bg-blue-500/10 text-blue-400 ring-4 ring-blue-500/15" 
                                    : "border-slate-800 bg-slate-900 text-slate-500"
                                }`}>
                                  {isCompleted ? "✓" : index + 1}
                                </div>
                                {index < workflowSteps.length - 1 && (
                                  <div className={`w-0.5 h-12 my-1 ${isCompleted ? "bg-green-500/40" : "bg-slate-800"}`}></div>
                                )}
                              </div>
                              
                              <div className="flex-1 p-4 rounded-xl border border-white/5 bg-slate-900/40 flex items-center justify-between">
                                <div className="space-y-1">
                                  <div className="text-sm font-bold text-white">{step.name}</div>
                                  <div className="text-xs text-slate-500">Updated: {step.time}</div>
                                </div>
                                
                                <div className="flex items-center gap-3">
                                  <Badge className={
                                    isCompleted 
                                      ? "bg-green-500/10 border-green-500/30 text-green-400" 
                                      : isInProgress 
                                      ? "bg-blue-500/10 border-blue-500/30 text-blue-400" 
                                      : "bg-slate-800 border-slate-700 text-slate-400"
                                  }>
                                    {step.status}
                                  </Badge>

                                  {!isCompleted && (
                                    <Button 
                                      onClick={() => handleAdvanceWorkflow(index)}
                                      className="h-8 rounded-lg bg-slate-850 hover:bg-slate-800 border border-slate-750 text-white px-3 text-[10px] font-bold cursor-pointer"
                                    >
                                      {isInProgress ? "Complete Step" : "Activate"}
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </Card>

                    {/* Right: Active workflows catalog */}
                    <div className="space-y-6">
                      {workflows.map((flow) => {
                        const progressPercent = Math.round((flow.completedSteps / flow.steps) * 100);
                        return (
                          <Card key={flow.id} className="border-slate-800 bg-[#0c1220]/80 shadow-xl p-6 space-y-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="text-sm font-bold text-white">{flow.name}</h4>
                                <span className="text-[10px] text-slate-500 font-medium">Assignee: {flow.assignee}</span>
                              </div>
                              <Badge className={
                                flow.status === "Active"
                                  ? "bg-green-500/10 border-green-500/30 text-green-400 font-semibold"
                                  : flow.status === "Paused"
                                  ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-400 font-semibold"
                                  : "bg-blue-500/10 border-blue-500/30 text-blue-400 font-semibold"
                              }>
                                {flow.status}
                              </Badge>
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                                <span>Progress</span>
                                <span>{flow.completedSteps}/{flow.steps} Steps ({progressPercent}%)</span>
                              </div>
                              <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                                <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" style={{ width: `${progressPercent}%` }}></div>
                              </div>
                            </div>

                            <div className="border-t border-slate-800/80 pt-3 flex items-center justify-between text-[10px] text-slate-500">
                              <span>Last Run: {flow.lastRun}</span>
                              <span>Next Run: {flow.nextRun}</span>
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================= */}
              {/* TAB 6: SYSTEM CONTROL (SETTINGS & LOGS) */}
              {/* ========================================= */}
              {activeTab === "System Control" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">System Control Panel</h2>
                    <p className="text-sm text-slate-400">Configure global security switches and trace system actions in real-time.</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left: Settings Panel toggles */}
                    <Card className="lg:col-span-5 border-slate-800 bg-[#0c1220]/80 shadow-xl p-6 space-y-6 h-fit">
                      <div>
                        <h3 className="text-base font-bold text-white">Security Switches</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Toggle global access states.</p>
                      </div>

                      <div className="space-y-4 divide-y divide-slate-800/60">
                        {systemSettings.map((setting, index) => (
                          <div key={index} className="flex items-center justify-between pt-4 first:pt-0">
                            <div>
                              <div className="text-xs font-bold text-white">{setting.label}</div>
                              <div className="text-[10px] text-slate-500 mt-0.5">Category: {setting.category}</div>
                            </div>
                            
                            <button
                              onClick={() => handleToggleSetting(setting.label, setting.enabled)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none cursor-pointer ${
                                setting.enabled ? "bg-indigo-600" : "bg-slate-800"
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  setting.enabled ? "translate-x-6" : "translate-x-1"
                                }`}
                              />
                            </button>
                          </div>
                        ))}
                      </div>
                    </Card>

                    {/* Right: Real-time audit logs feed */}
                    <Card className="lg:col-span-7 border-slate-800 bg-[#0c1220]/80 shadow-xl p-6 flex flex-col justify-between">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="text-base font-bold text-white">Audit Trail Logs</h3>
                          <p className="text-xs text-slate-500 mt-0.5">Secured log pipeline output.</p>
                        </div>
                        <Button
                          onClick={() => {
                            setAuditLogs([]);
                            addAuditLog("Cleared local audit trail logs", "Administrator", "Warning");
                          }}
                          className="h-8 rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-white px-3 text-xs cursor-pointer"
                        >
                          Clear Feed
                        </Button>
                      </div>

                      <div className="flex-1 min-h-[350px] max-h-[480px] overflow-y-auto custom-scrollbar border border-slate-800/80 rounded-xl bg-slate-950/40 p-4 space-y-3 font-mono text-[11px] leading-relaxed">
                        {auditLogs.length === 0 ? (
                          <div className="text-slate-600 italic text-center py-10">No security audit logs recorded yet.</div>
                        ) : (
                          auditLogs.map((log) => (
                            <div key={log.id} className="flex gap-2 text-slate-400 border-b border-slate-900 pb-2 last:border-0 last:pb-0 font-mono">
                              <span className="text-indigo-400 shrink-0">[{log.timestamp}]</span>
                              <span className="text-slate-500 shrink-0">{log.ip}</span>
                              <span className="text-slate-300 font-bold shrink-0">{log.user}:</span>
                              <span className="text-white flex-1">{log.action}</span>
                              <Badge className={
                                log.status === "Success" 
                                  ? "bg-green-500/10 border-green-500/20 text-green-400" 
                                  : log.status === "Warning" 
                                  ? "bg-amber-500/10 border-amber-500/20 text-amber-400" 
                                  : "bg-rose-500/10 border-rose-500/20 text-rose-400"
                              }>
                                {log.status}
                              </Badge>
                            </div>
                          ))
                        )}
                      </div>
                    </Card>
                  </div>
                </div>
              )}

            </main>
          </div>
        </div>
      )}
    </div>
  );
}
