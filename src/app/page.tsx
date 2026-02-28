"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Area, AreaChart } from "recharts";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";

// Avatar colors for businesses
const avatarColors = [
  { bg: "bg-rose-100", text: "text-rose-600" },
  { bg: "bg-amber-100", text: "text-amber-600" },
  { bg: "bg-emerald-100", text: "text-emerald-600" },
  { bg: "bg-sky-100", text: "text-sky-600" },
  { bg: "bg-violet-100", text: "text-violet-600" },
  { bg: "bg-pink-100", text: "text-pink-600" },
  { bg: "bg-teal-100", text: "text-teal-600" },
  { bg: "bg-orange-100", text: "text-orange-600" },
];

function getAvatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % avatarColors.length;
  return avatarColors[index];
}

// Data
const orderChartData = [
  { month: "Jan", orders: 45 },
  { month: "Feb", orders: 52 },
  { month: "Mar", orders: 61 },
  { month: "Apr", orders: 58 },
  { month: "May", orders: 72 },
  { month: "Jun", orders: 84 },
];

const revenueChartData = [
  { month: "Jan", revenue: 125000 },
  { month: "Feb", revenue: 142000 },
  { month: "Mar", revenue: 168000 },
  { month: "Apr", revenue: 155000 },
  { month: "May", revenue: 189000 },
  { month: "Jun", revenue: 215000 },
];

const chartConfig = {
  orders: { label: "Orders", color: "var(--chart-1)" },
  revenue: { label: "Revenue", color: "var(--chart-1)" },
} satisfies ChartConfig;

const recentOrders = [
  { id: "ORD-4832", business: "Bombay Express", items: 12, total: "8,450 EUR", status: "new", date: "Today, 14:32" },
  { id: "ORD-4831", business: "Curry House Prague", items: 8, total: "5,230 EUR", status: "confirmed", date: "Today, 11:15" },
  { id: "ORD-4830", business: "Tandoori Nights", items: 15, total: "12,100 EUR", status: "confirmed", date: "Today, 09:45" },
  { id: "ORD-4829", business: "Namaste Restaurant", items: 6, total: "3,890 EUR", status: "completed", date: "Yesterday" },
  { id: "ORD-4828", business: "Spice Garden", items: 22, total: "18,500 EUR", status: "completed", date: "Yesterday" },
];

const topBusinesses = [
  { name: "Bombay Express", orders: 24, revenue: "156,000 EUR", avatar: "BE" },
  { name: "Curry House Prague", orders: 18, revenue: "98,500 EUR", avatar: "CH" },
  { name: "Tandoori Nights", orders: 15, revenue: "87,200 EUR", avatar: "TN" },
  { name: "Namaste Restaurant", orders: 12, revenue: "65,400 EUR", avatar: "NR" },
];

const activityFeed = [
  { action: "New order placed", detail: "Bombay Express #ORD-4832", time: "2 min ago" },
  { action: "Order confirmed", detail: "Curry House Prague #ORD-4831", time: "1 hour ago" },
  { action: "New business added", detail: "Masala Kitchen s.r.o.", time: "3 hours ago" },
  { action: "Invoice issued", detail: "Tandoori Nights - INV-2024-089", time: "5 hours ago" },
];

type Page = "dashboard" | "orders" | "businesses" | "items" | "invoicing" | "analytics" | "settings";

const navItems: { title: string; icon: string; page: Page }[] = [
  { title: "Dashboard", icon: "home", page: "dashboard" },
  { title: "Orders", icon: "orders", page: "orders" },
  { title: "Businesses", icon: "users", page: "businesses" },
  { title: "Items", icon: "package", page: "items" },
  { title: "Invoicing", icon: "invoice", page: "invoicing" },
  { title: "Analytics", icon: "chart", page: "analytics" },
];

// Icons
function IconHome() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function IconOrders() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconInvoice() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

function IconChart() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function IconPackage() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M16.5 9.4 7.55 4.24" /><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.29 7 12 12 20.71 7" /><line x1="12" y1="22" x2="12" y2="12" />
    </svg>
  );
}

function IconPlus() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function IconNewOrder() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

function IconOpenOrder() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}

function IconBusiness() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function IconRevenue() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

const navIconMap: Record<string, () => React.ReactNode> = {
  home: IconHome,
  orders: IconOrders,
  users: IconUsers,
  package: IconPackage,
  invoice: IconInvoice,
  chart: IconChart,
};

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    new: "bg-amber-500/15 text-amber-600 border-amber-500/20",
    confirmed: "bg-blue-500/15 text-blue-600 border-blue-500/20",
    completed: "bg-emerald-500/15 text-emerald-600 border-emerald-500/20",
    draft: "bg-slate-500/15 text-slate-600 border-slate-500/20",
    issued: "bg-blue-500/15 text-blue-600 border-blue-500/20",
    paid: "bg-emerald-500/15 text-emerald-600 border-emerald-500/20",
  };
  const labels: Record<string, string> = {
    new: "New",
    confirmed: "Confirmed",
    completed: "Completed",
    draft: "Draft",
    issued: "Issued",
    paid: "Paid",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || styles.draft}`}>
      {labels[status] || status}
    </span>
  );
}

// Business data
type Business = {
  id: number;
  name: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  ico: string;
  status: string;
  lastOrder: string;
  avgOrder: string;
  totalOrders: number;
  totalRevenue: string;
  notes?: string;
};

const allBusinesses: Business[] = [
  { id: 1, name: "Bombay Express", contact: "Raj Patel", email: "raj@bombayexpress.cz", phone: "+420 777 123 456", address: "Vodickova 32, Prague 1", ico: "12345678", status: "active", lastOrder: "Today", avgOrder: "6,500 EUR", totalOrders: 45, totalRevenue: "292,500 EUR", notes: "Preferred delivery: Morning" },
  { id: 2, name: "Curry House Prague", contact: "Amit Singh", email: "amit@curryhouse.cz", phone: "+420 777 234 567", address: "Vinohradska 89, Prague 2", ico: "23456789", status: "active", lastOrder: "Today", avgOrder: "5,470 EUR", totalOrders: 38, totalRevenue: "207,860 EUR" },
  { id: 3, name: "Tandoori Nights", contact: "Priya Sharma", email: "priya@tandoorinights.cz", phone: "+420 777 345 678", address: "Namesti Miru 12, Prague 2", ico: "34567890", status: "active", lastOrder: "Yesterday", avgOrder: "8,070 EUR", totalOrders: 52, totalRevenue: "419,640 EUR" },
  { id: 4, name: "Namaste Restaurant", contact: "Vikram Kumar", email: "vikram@namaste.cz", phone: "+420 777 456 789", address: "Karlova 8, Prague 1", ico: "45678901", status: "active", lastOrder: "2 days ago", avgOrder: "5,450 EUR", totalOrders: 28, totalRevenue: "152,600 EUR" },
  { id: 5, name: "Spice Garden", contact: "Maya Devi", email: "maya@spicegarden.cz", phone: "+420 777 567 890", address: "Dlouha 33, Prague 1", ico: "56789012", status: "active", lastOrder: "3 days ago", avgOrder: "8,410 EUR", totalOrders: 61, totalRevenue: "513,010 EUR", notes: "Large orders, needs advance notice" },
  { id: 6, name: "Masala Kitchen", contact: "Arjun Reddy", email: "arjun@masalakitchen.cz", phone: "+420 777 678 901", address: "Revolucni 25, Prague 1", ico: "67890123", status: "paused", lastOrder: "2 weeks ago", avgOrder: "4,200 EUR", totalOrders: 15, totalRevenue: "63,000 EUR", notes: "Temporarily closed for renovation" },
];

// Invoice data
type Invoice = {
  id: string;
  business: string;
  ico: string;
  address: string;
  amount: string;
  date: string;
  due: string;
  status: string;
  items: { description: string; qty: number; unitPrice: string; total: string }[];
  subtotal: string;
  vat: string;
  orderId?: string;
};

const allInvoices: Invoice[] = [
  { id: "INV-2024-089", business: "Tandoori Nights", ico: "34567890", address: "Namesti Miru 12, Prague 2", amount: "12,100 EUR", date: "Jun 15, 2024", due: "Jun 29, 2024", status: "issued", orderId: "ORD-4830", subtotal: "10,000 EUR", vat: "2,100 EUR", items: [{ description: "Tandoori Paste 500g", qty: 8, unitPrice: "145 EUR", total: "1,160 EUR" }, { description: "Naan Bread Mix 2kg", qty: 7, unitPrice: "180 EUR", total: "1,260 EUR" }, { description: "Basmati Rice 5kg", qty: 12, unitPrice: "320 EUR", total: "3,840 EUR" }, { description: "Garam Masala 500g", qty: 10, unitPrice: "180 EUR", total: "1,800 EUR" }] },
  { id: "INV-2024-088", business: "Curry House Prague", ico: "23456789", address: "Vinohradska 89, Prague 2", amount: "5,230 EUR", date: "Jun 14, 2024", due: "Jun 28, 2024", status: "issued", orderId: "ORD-4831", subtotal: "4,322 EUR", vat: "908 EUR", items: [{ description: "Chickpeas 2kg", qty: 5, unitPrice: "95 EUR", total: "475 EUR" }, { description: "Turmeric Powder 1kg", qty: 3, unitPrice: "210 EUR", total: "630 EUR" }, { description: "Coconut Milk 400ml", qty: 20, unitPrice: "65 EUR", total: "1,300 EUR" }] },
  { id: "INV-2024-087", business: "Bombay Express", ico: "12345678", address: "Vodickova 32, Prague 1", amount: "18,500 EUR", date: "Jun 12, 2024", due: "Jun 26, 2024", status: "paid", orderId: "ORD-4828", subtotal: "15,289 EUR", vat: "3,211 EUR", items: [{ description: "Mixed Spices Set", qty: 15, unitPrice: "450 EUR", total: "6,750 EUR" }, { description: "Basmati Rice 5kg", qty: 10, unitPrice: "320 EUR", total: "3,200 EUR" }, { description: "Ghee 1L", qty: 8, unitPrice: "290 EUR", total: "2,320 EUR" }] },
  { id: "INV-2024-086", business: "Namaste Restaurant", ico: "45678901", address: "Karlova 8, Prague 1", amount: "8,900 EUR", date: "Jun 10, 2024", due: "Jun 24, 2024", status: "paid", orderId: "ORD-4829", subtotal: "7,355 EUR", vat: "1,545 EUR", items: [{ description: "Paneer 1kg", qty: 8, unitPrice: "320 EUR", total: "2,560 EUR" }, { description: "Lentils Variety Pack", qty: 6, unitPrice: "280 EUR", total: "1,680 EUR" }] },
  { id: "INV-2024-085", business: "Spice Garden", ico: "56789012", address: "Dlouha 33, Prague 1", amount: "22,300 EUR", date: "Jun 8, 2024", due: "Jun 22, 2024", status: "paid", orderId: "ORD-4825", subtotal: "18,430 EUR", vat: "3,870 EUR", items: [{ description: "Mixed Spices Set", qty: 20, unitPrice: "450 EUR", total: "9,000 EUR" }, { description: "Lentils Variety Pack", qty: 15, unitPrice: "280 EUR", total: "4,200 EUR" }, { description: "Basmati Rice 5kg", qty: 8, unitPrice: "320 EUR", total: "2,560 EUR" }] },
];

// Dashboard Page
function DashboardPage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 h-24 w-24 -translate-y-8 translate-x-8 rounded-full bg-chart-1 opacity-10" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">New Orders</CardTitle>
            <div className="text-chart-1">
              <IconNewOrder />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8</div>
            <p className="text-sm text-muted-foreground mt-1">
              <span className="text-emerald-600 font-medium">+3</span> from yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 h-24 w-24 -translate-y-8 translate-x-8 rounded-full bg-chart-2 opacity-10" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Open Orders</CardTitle>
            <div className="text-chart-2">
              <IconOpenOrder />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
            <p className="text-sm text-muted-foreground mt-1">
              <span className="text-amber-600 font-medium">4</span> awaiting confirmation
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 h-24 w-24 -translate-y-8 translate-x-8 rounded-full bg-chart-1 opacity-10" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Businesses</CardTitle>
            <div className="text-chart-1">
              <IconBusiness />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24</div>
            <p className="text-sm text-muted-foreground mt-1">
              <span className="text-emerald-600 font-medium">+2</span> this month
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 h-24 w-24 -translate-y-8 translate-x-8 rounded-full bg-chart-2 opacity-10" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Revenue</CardTitle>
            <div className="text-chart-2">
              <IconRevenue />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">215K</div>
            <p className="text-sm text-muted-foreground mt-1">
              <span className="text-emerald-600 font-medium">+14%</span> vs last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts + Activity */}
      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Orders Overview</CardTitle>
            <CardDescription>Monthly order volume for the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart data={orderChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="orders" fill="var(--color-orders)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest events and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {activityFeed.map((activity, i) => {
                const dotColors = ["bg-amber-500", "bg-emerald-500", "bg-sky-500", "bg-violet-500"];
                return (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`h-2 w-2 rounded-full ${dotColors[i % dotColors.length]} mt-2 shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground truncate">{activity.detail}</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders + Top Businesses */}
      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest orders from businesses</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => onNavigate("orders")}>View all</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center gap-4 p-3 rounded-xl border bg-card hover:bg-muted/50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{order.id}</span>
                      <StatusBadge status={order.status} />
                    </div>
                    <p className="text-sm text-muted-foreground">{order.business}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{order.total}</p>
                    <p className="text-sm text-muted-foreground">{order.items} items</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Top Businesses</CardTitle>
              <CardDescription>By revenue this month</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => onNavigate("businesses")}>View all</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topBusinesses.map((business, i) => (
                <div key={business.name} className="flex items-center gap-4">
                  <span className="text-lg font-bold text-muted-foreground w-5">{i + 1}</span>
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className={`${getAvatarColor(business.name).bg} ${getAvatarColor(business.name).text} font-semibold text-sm`}>{business.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{business.name}</p>
                    <p className="text-sm text-muted-foreground">{business.orders} orders</p>
                  </div>
                  <span className="font-semibold">{business.revenue}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Orders Page
type Order = {
  id: string;
  business: string;
  items: number;
  total: string;
  status: string;
  date: string;
  delivery: string;
  contact?: string;
  phone?: string;
  address?: string;
  products?: { name: string; qty: number; price: string }[];
};

const allOrders: Order[] = [
  { id: "ORD-4832", business: "Bombay Express", items: 12, total: "8,450 EUR", status: "new", date: "Jun 15", delivery: "Jun 17", contact: "Raj Patel", phone: "+420 777 123 456", address: "Vodickova 32, Prague 1", products: [{ name: "Basmati Rice 5kg", qty: 4, price: "320 EUR" }, { name: "Garam Masala 500g", qty: 6, price: "180 EUR" }, { name: "Ghee 1L", qty: 2, price: "290 EUR" }] },
  { id: "ORD-4831", business: "Curry House Prague", items: 8, total: "5,230 EUR", status: "confirmed", date: "Jun 15", delivery: "Jun 17", contact: "Amit Singh", phone: "+420 777 234 567", address: "Vinohradska 89, Prague 2", products: [{ name: "Chickpeas 2kg", qty: 5, price: "95 EUR" }, { name: "Turmeric Powder 1kg", qty: 3, price: "210 EUR" }] },
  { id: "ORD-4830", business: "Tandoori Nights", items: 15, total: "12,100 EUR", status: "confirmed", date: "Jun 15", delivery: "Jun 16", contact: "Priya Sharma", phone: "+420 777 345 678", address: "Namesti Miru 12, Prague 2", products: [{ name: "Tandoori Paste 500g", qty: 8, price: "145 EUR" }, { name: "Naan Bread Mix 2kg", qty: 7, price: "180 EUR" }] },
  { id: "ORD-4829", business: "Namaste Restaurant", items: 6, total: "3,890 EUR", status: "completed", date: "Jun 14", delivery: "Jun 15", contact: "Vikram Kumar", phone: "+420 777 456 789", address: "Karlova 8, Prague 1", products: [{ name: "Paneer 1kg", qty: 4, price: "320 EUR" }, { name: "Coriander Fresh 200g", qty: 2, price: "45 EUR" }] },
  { id: "ORD-4828", business: "Spice Garden", items: 22, total: "18,500 EUR", status: "completed", date: "Jun 14", delivery: "Jun 15", contact: "Maya Devi", phone: "+420 777 567 890", address: "Dlouha 33, Prague 1", products: [{ name: "Mixed Spices Set", qty: 10, price: "450 EUR" }, { name: "Lentils Variety Pack", qty: 12, price: "280 EUR" }] },
  { id: "ORD-4827", business: "Bombay Express", items: 9, total: "6,200 EUR", status: "completed", date: "Jun 13", delivery: "Jun 14", contact: "Raj Patel", phone: "+420 777 123 456", address: "Vodickova 32, Prague 1", products: [{ name: "Basmati Rice 5kg", qty: 3, price: "320 EUR" }, { name: "Coconut Milk 400ml", qty: 6, price: "65 EUR" }] },
];

function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Orders</h2>
          <p className="text-sm text-muted-foreground">Manage all orders from your B2B clients</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <IconSearch />
          <Input placeholder="Search orders..." className="pl-10 h-9 text-sm" />
        </div>
        <Button variant="outline" size="sm">New</Button>
        <Button variant="outline" size="sm">Confirmed</Button>
        <Button variant="outline" size="sm">Completed</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Order</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Business</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Date</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Delivery</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Items</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Total</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {allOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b last:border-0 hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <td className="px-4 py-3 font-medium">{order.id}</td>
                    <td className="px-4 py-3">{order.business}</td>
                    <td className="px-4 py-3 text-muted-foreground">{order.date}</td>
                    <td className="px-4 py-3 text-muted-foreground">{order.delivery}</td>
                    <td className="px-4 py-3">{order.items}</td>
                    <td className="px-4 py-3 font-medium">{order.total}</td>
                    <td className="px-4 py-3"><StatusBadge status={order.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-lg">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>{selectedOrder.id}</span>
                  <StatusBadge status={selectedOrder.status} />
                </DialogTitle>
                <DialogDescription>{selectedOrder.business}</DialogDescription>
              </DialogHeader>

              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Contact</p>
                    <p className="font-medium">{selectedOrder.contact}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Phone</p>
                    <p className="font-medium">{selectedOrder.phone}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-muted-foreground">Delivery Address</p>
                    <p className="font-medium">{selectedOrder.address}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Order Date</p>
                    <p className="font-medium">{selectedOrder.date}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Delivery Date</p>
                    <p className="font-medium">{selectedOrder.delivery}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Products</p>
                  <div className="space-y-2">
                    {selectedOrder.products?.map((product, i) => (
                      <div key={i} className="flex items-center justify-between text-sm py-2 border-b last:border-0">
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-muted-foreground">Qty: {product.qty}</p>
                        </div>
                        <p className="font-medium">{product.price}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <p className="font-medium">Total</p>
                  <p className="text-lg font-bold">{selectedOrder.total}</p>
                </div>

                <div className="flex gap-2 pt-2">
                  {selectedOrder.status === "new" && (
                    <Button className="flex-1">Confirm Order</Button>
                  )}
                  {selectedOrder.status === "confirmed" && (
                    <Button className="flex-1">Mark as Completed</Button>
                  )}
                  <Button variant="outline" className="flex-1">Print Invoice</Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Businesses Page
function BusinessesPage() {
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Businesses</h2>
          <p className="text-sm text-muted-foreground">Manage your B2B customers</p>
        </div>
        <Button size="sm" onClick={() => setShowAddDialog(true)}>
          <IconPlus />
          <span className="ml-2">Add Business</span>
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <IconSearch />
          <Input placeholder="Search businesses..." className="pl-10 h-9 text-sm" />
        </div>
        <Button variant="outline" size="sm">Active</Button>
        <Button variant="outline" size="sm">Paused</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Business</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Contact</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Phone</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Last Order</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Avg. Order</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {allBusinesses.map((business) => (
                  <tr
                    key={business.id}
                    className="border-b last:border-0 hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedBusiness(business)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className={`${getAvatarColor(business.name).bg} ${getAvatarColor(business.name).text} text-xs font-medium`}>
                            {business.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{business.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">{business.contact}</td>
                    <td className="px-4 py-3 text-muted-foreground">{business.phone}</td>
                    <td className="px-4 py-3 text-muted-foreground">{business.lastOrder}</td>
                    <td className="px-4 py-3 font-medium">{business.avgOrder}</td>
                    <td className="px-4 py-3">
                      <Badge variant={business.status === "active" ? "default" : "secondary"}>
                        {business.status === "active" ? "Active" : "Paused"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Business Detail Dialog */}
      <Dialog open={!!selectedBusiness} onOpenChange={() => setSelectedBusiness(null)}>
        <DialogContent className="max-w-md">
          {selectedBusiness && (
            <>
              <DialogHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className={`${getAvatarColor(selectedBusiness.name).bg} ${getAvatarColor(selectedBusiness.name).text} font-semibold text-lg`}>
                      {selectedBusiness.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <DialogTitle className="text-lg">{selectedBusiness.name}</DialogTitle>
                    <DialogDescription className="flex items-center gap-2 mt-0.5">
                      ICO: {selectedBusiness.ico}
                      <Badge variant={selectedBusiness.status === "active" ? "default" : "secondary"} className="ml-1">
                        {selectedBusiness.status === "active" ? "Active" : "Paused"}
                      </Badge>
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Contact</span>
                  <span className="font-medium">{selectedBusiness.contact}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Email</span>
                  <span className="font-medium">{selectedBusiness.email}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Phone</span>
                  <span className="font-medium">{selectedBusiness.phone}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Address</span>
                  <span className="font-medium text-right max-w-[200px]">{selectedBusiness.address}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Total Orders</span>
                  <span className="font-medium">{selectedBusiness.totalOrders}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Avg. Order</span>
                  <span className="font-medium">{selectedBusiness.avgOrder}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Total Revenue</span>
                  <span className="font-semibold">{selectedBusiness.totalRevenue}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Last Order</span>
                  <span className="font-medium">{selectedBusiness.lastOrder}</span>
                </div>

                {selectedBusiness.notes && (
                  <div className="pt-2">
                    <p className="text-muted-foreground mb-1.5">Notes</p>
                    <p className="text-sm text-muted-foreground italic">{selectedBusiness.notes}</p>
                  </div>
                )}

                <div className="flex gap-2 pt-4">
                  <Button variant="outline" size="sm" className="flex-1">View Orders</Button>
                  <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                  <Button size="sm" className="flex-1">Create Order</Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Business Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Business</DialogTitle>
            <DialogDescription>Add a new B2B customer to your database</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input id="businessName" placeholder="Enter business name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ico">ICO</Label>
                <Input id="ico" placeholder="12345678" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue="active">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact">Contact Person</Label>
                <Input id="contact" placeholder="Full name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="email@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="+420 777 000 000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="Street, City" />
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button variant="outline" className="flex-1" onClick={() => setShowAddDialog(false)}>
                Cancel
              </Button>
              <Button className="flex-1" onClick={() => setShowAddDialog(false)}>
                Add Business
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Item data
type Item = {
  id: number;
  name: string;
  category: string;
  price: string;
  stock: number;
  unit: string;
  image?: string;
  discount?: number;
};

const allItems: Item[] = [
  { id: 1, name: "Basmati Rice 5kg", category: "Rice & Grains", price: "12.80 EUR", stock: 145, unit: "bag", discount: 10 },
  { id: 2, name: "Garam Masala 500g", category: "Spices", price: "7.20 EUR", stock: 89, unit: "pack" },
  { id: 3, name: "Ghee 1L", category: "Dairy", price: "11.60 EUR", stock: 62, unit: "jar", discount: 15 },
  { id: 4, name: "Chickpeas 2kg", category: "Legumes", price: "3.80 EUR", stock: 203, unit: "bag" },
  { id: 5, name: "Turmeric Powder 1kg", category: "Spices", price: "8.40 EUR", stock: 78, unit: "pack" },
  { id: 6, name: "Coconut Milk 400ml", category: "Canned Goods", price: "2.60 EUR", stock: 312, unit: "can", discount: 5 },
  { id: 7, name: "Paneer 1kg", category: "Dairy", price: "12.80 EUR", stock: 45, unit: "block" },
  { id: 8, name: "Naan Bread Mix 2kg", category: "Flour & Baking", price: "7.20 EUR", stock: 98, unit: "bag" },
];

const itemCategories = ["Rice & Grains", "Spices", "Dairy", "Legumes", "Canned Goods", "Flour & Baking"];

// Items Page
function ItemsPage() {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Items</h2>
          <p className="text-sm text-muted-foreground">Manage your product inventory</p>
        </div>
        <Button size="sm" onClick={() => setShowAddDialog(true)}>
          <IconPlus />
          <span className="ml-2">Add Item</span>
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <IconSearch />
          <Input placeholder="Search items..." className="pl-10 h-9 text-sm" />
        </div>
        {itemCategories.slice(0, 4).map((cat) => (
          <Button key={cat} variant="outline" size="sm">{cat}</Button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {allItems.map((item) => {
          const stockStatus = item.stock > 100 ? "emerald" : item.stock > 50 ? "amber" : "red";
          return (
            <Card
              key={item.id}
              className="cursor-pointer hover:shadow-md transition-shadow overflow-hidden"
              onClick={() => setSelectedItem(item)}
            >
              <div className="bg-muted/30 flex items-center justify-center p-4 h-36 relative">
                {item.discount && (
                  <Badge className="absolute top-2 left-2 bg-red-500 text-white text-[10px]">{item.discount}% OFF</Badge>
                )}
                <img
                  src="/item-placeholder.png"
                  alt={item.name}
                  className="h-full object-contain"
                />
              </div>
              <CardContent className="p-4 pt-3">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-sm leading-tight">{item.name}</h3>
                  <Badge variant="secondary" className="text-[10px] ml-2 shrink-0">{item.category}</Badge>
                </div>
                <p className="text-lg font-bold text-primary mb-2">{item.price}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Stock</span>
                  <span className={`font-medium ${item.stock > 100 ? "text-emerald-600" : item.stock > 50 ? "text-amber-600" : "text-red-600"}`}>{item.stock} {item.unit}s</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Item Detail Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-md">
          {selectedItem && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <DialogTitle>{selectedItem.name}</DialogTitle>
                    <DialogDescription>{selectedItem.category}</DialogDescription>
                  </div>
                  {selectedItem.discount && (
                    <Badge className="bg-red-500 text-white">{selectedItem.discount}% OFF</Badge>
                  )}
                </div>
              </DialogHeader>

              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-center p-4 bg-muted/30 rounded-lg relative">
                  <img
                    src="/item-placeholder.png"
                    alt={selectedItem.name}
                    className="h-40 w-40 object-contain"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Price</p>
                    <p className="text-xl font-bold">{selectedItem.price}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">In Stock</p>
                    <p className="text-xl font-bold">{selectedItem.stock} <span className="text-sm font-normal text-muted-foreground">{selectedItem.unit}s</span></p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Category</p>
                    <p className="font-medium">{selectedItem.category}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Item ID</p>
                    <p className="font-medium">ITM-{String(selectedItem.id).padStart(4, '0')}</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Discount</p>
                      <p className="text-xs text-muted-foreground">
                        {selectedItem.discount ? `${selectedItem.discount}% discount active` : "No discount applied"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Select defaultValue={selectedItem.discount?.toString() || "0"}>
                        <SelectTrigger className="w-24 h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">None</SelectItem>
                          <SelectItem value="5">5%</SelectItem>
                          <SelectItem value="10">10%</SelectItem>
                          <SelectItem value="15">15%</SelectItem>
                          <SelectItem value="20">20%</SelectItem>
                          <SelectItem value="25">25%</SelectItem>
                          <SelectItem value="30">30%</SelectItem>
                          <SelectItem value="50">50%</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">Edit Item</Button>
                  <Button variant="outline" size="sm" className="flex-1">Adjust Stock</Button>
                  <Button size="sm" className="flex-1">Reorder</Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Item Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Item</DialogTitle>
            <DialogDescription>Add a new product to your inventory</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label>Product Image</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-muted-foreground">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Upload Image</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="itemName">Item Name</Label>
                <Input id="itemName" placeholder="e.g. Basmati Rice 5kg" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {itemCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit">Unit Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bag">Bag</SelectItem>
                    <SelectItem value="pack">Pack</SelectItem>
                    <SelectItem value="jar">Jar</SelectItem>
                    <SelectItem value="can">Can</SelectItem>
                    <SelectItem value="block">Block</SelectItem>
                    <SelectItem value="bottle">Bottle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price (EUR)</Label>
                <Input id="price" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Initial Stock</Label>
                <Input id="stock" type="number" placeholder="0" />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button variant="outline" className="flex-1" onClick={() => setShowAddDialog(false)}>
                Cancel
              </Button>
              <Button className="flex-1" onClick={() => setShowAddDialog(false)}>
                Add Item
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Invoicing Page
function InvoicingPage() {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showNewInvoice, setShowNewInvoice] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Invoicing</h2>
          <p className="text-sm text-muted-foreground">Manage invoices and payments</p>
        </div>
        <Button size="sm" onClick={() => setShowNewInvoice(true)}>
          <IconPlus />
          <span className="ml-2">New Invoice</span>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 h-20 w-20 -translate-y-6 translate-x-6 rounded-full bg-amber-500 opacity-10" />
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Unpaid</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">17,330 EUR</div>
            <p className="text-sm text-muted-foreground mt-1">2 invoices</p>
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 h-20 w-20 -translate-y-6 translate-x-6 rounded-full bg-emerald-500 opacity-10" />
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Paid This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">49,700 EUR</div>
            <p className="text-sm text-muted-foreground mt-1">3 invoices</p>
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 h-20 w-20 -translate-y-6 translate-x-6 rounded-full bg-red-500 opacity-10" />
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">0 EUR</div>
            <p className="text-sm text-muted-foreground mt-1">0 invoices</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Invoice</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Business</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Amount</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Issued</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Due Date</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {allInvoices.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className="border-b last:border-0 hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedInvoice(invoice)}
                  >
                    <td className="px-4 py-3 font-medium">{invoice.id}</td>
                    <td className="px-4 py-3">{invoice.business}</td>
                    <td className="px-4 py-3 font-medium">{invoice.amount}</td>
                    <td className="px-4 py-3 text-muted-foreground">{invoice.date}</td>
                    <td className="px-4 py-3 text-muted-foreground">{invoice.due}</td>
                    <td className="px-4 py-3"><StatusBadge status={invoice.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Invoice Preview Dialog */}
      <Dialog open={!!selectedInvoice} onOpenChange={() => setSelectedInvoice(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="sr-only">
            <DialogTitle>Invoice Preview</DialogTitle>
            <DialogDescription>View invoice details</DialogDescription>
          </DialogHeader>
          {selectedInvoice && (
            <div className="space-y-6">
              {/* Invoice Header */}
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">INVOICE</h2>
                  <p className="text-muted-foreground">{selectedInvoice.id}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-3 mb-2">
                    <img src="/swagat-logo.webp" alt="Swagat" className="h-10 w-10 object-contain" />
                    <div>
                      <p className="font-bold">Swagat s.r.o.</p>
                      <p className="text-xs text-muted-foreground">Indian Groceries Wholesale</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Billing Info */}
              <div className="grid grid-cols-2 gap-8 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Bill To</p>
                  <p className="font-semibold">{selectedInvoice.business}</p>
                  <p className="text-muted-foreground">ICO: {selectedInvoice.ico}</p>
                  <p className="text-muted-foreground">{selectedInvoice.address}</p>
                </div>
                <div className="text-right">
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Issue Date:</span>
                      <span className="font-medium">{selectedInvoice.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Due Date:</span>
                      <span className="font-medium">{selectedInvoice.due}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Order:</span>
                      <span className="font-medium">{selectedInvoice.orderId}</span>
                    </div>
                    <div className="flex justify-between items-center pt-1">
                      <span className="text-muted-foreground">Status:</span>
                      <StatusBadge status={selectedInvoice.status} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-left px-4 py-2 font-medium">Item</th>
                      <th className="text-center px-4 py-2 font-medium">Qty</th>
                      <th className="text-right px-4 py-2 font-medium">Unit Price</th>
                      <th className="text-right px-4 py-2 font-medium">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedInvoice.items.map((item, i) => (
                      <tr key={i} className="border-t">
                        <td className="px-4 py-2">{item.description}</td>
                        <td className="px-4 py-2 text-center">{item.qty}</td>
                        <td className="px-4 py-2 text-right text-muted-foreground">{item.unitPrice}</td>
                        <td className="px-4 py-2 text-right font-medium">{item.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="flex justify-end">
                <div className="w-64 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{selectedInvoice.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">VAT (21%)</span>
                    <span>{selectedInvoice.vat}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-base font-bold">
                    <span>Total</span>
                    <span>{selectedInvoice.amount}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <IconInvoice />
                  <span className="ml-2">Download PDF</span>
                </Button>
                <Button variant="outline" size="sm" className="flex-1">Send to Client</Button>
                {selectedInvoice.status === "issued" && (
                  <Button size="sm" className="flex-1">Mark as Paid</Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* New Invoice Dialog */}
      <Dialog open={showNewInvoice} onOpenChange={setShowNewInvoice}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Create New Invoice</DialogTitle>
            <DialogDescription>Generate an invoice from an order or create manually</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="invoiceBusiness">Business</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select business" />
                  </SelectTrigger>
                  <SelectContent>
                    {allBusinesses.map((b) => (
                      <SelectItem key={b.id} value={b.name}>{b.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="invoiceOrder">From Order (optional)</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select order to invoice" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ORD-4832">ORD-4832 - Bombay Express</SelectItem>
                    <SelectItem value="ORD-4831">ORD-4831 - Curry House Prague</SelectItem>
                    <SelectItem value="ORD-4830">ORD-4830 - Tandoori Nights</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="issueDate">Issue Date</Label>
                <Input id="issueDate" type="date" defaultValue="2024-06-15" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input id="dueDate" type="date" defaultValue="2024-06-29" />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="amount">Amount (EUR)</Label>
                <Input id="amount" placeholder="0.00" />
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button variant="outline" className="flex-1" onClick={() => setShowNewInvoice(false)}>
                Cancel
              </Button>
              <Button className="flex-1" onClick={() => setShowNewInvoice(false)}>
                Create Invoice
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Analytics Page
function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground">Performance overview and trends</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
            <CardDescription>Monthly revenue in euros</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <AreaChart data={revenueChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(v) => `${v / 1000}k`} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area type="monotone" dataKey="revenue" stroke="var(--color-revenue)" fill="url(#fillRevenue)" strokeWidth={2} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
            <CardDescription>Monthly order count</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart data={orderChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="orders" fill="var(--color-orders)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Businesses</CardTitle>
          <CardDescription>Best performing clients by revenue</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topBusinesses.map((business, i) => (
              <div key={business.name} className="flex items-center gap-3 py-2 border-b last:border-0">
                <span className="text-sm font-bold text-muted-foreground w-5">{i + 1}</span>
                <Avatar className="h-8 w-8">
                  <AvatarFallback className={`${getAvatarColor(business.name).bg} ${getAvatarColor(business.name).text} text-xs font-medium`}>{business.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium text-sm">{business.name}</p>
                  <p className="text-xs text-muted-foreground">{business.orders} orders this month</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm">{business.revenue}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Settings Page
function SettingsPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Profile</CardTitle>
          <CardDescription>Your personal information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary text-primary-foreground text-xl font-semibold">SS</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">Saini Sanjeev</p>
              <p className="text-sm text-muted-foreground">saini.sanjeev@swagat.com</p>
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" defaultValue="Saini" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" defaultValue="Sanjeev" />
            </div>
            <div className="col-span-2 space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="saini.sanjeev@swagat.com" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Notifications</CardTitle>
          <CardDescription>Configure how you receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">New order alerts</p>
              <p className="text-sm text-muted-foreground">Get notified when a new order is placed</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Payment notifications</p>
              <p className="text-sm text-muted-foreground">Get notified when an invoice is paid</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Weekly reports</p>
              <p className="text-sm text-muted-foreground">Receive weekly summary via email</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Business Settings</CardTitle>
          <CardDescription>Configure your business preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select defaultValue="eur">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="eur">EUR (Euro)</SelectItem>
                  <SelectItem value="usd">USD (US Dollar)</SelectItem>
                  <SelectItem value="gbp">GBP (British Pound)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select defaultValue="en">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="cs">Čeština</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="vat">Default VAT Rate</Label>
              <Select defaultValue="21">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="21">21%</SelectItem>
                  <SelectItem value="15">15%</SelectItem>
                  <SelectItem value="10">10%</SelectItem>
                  <SelectItem value="0">0%</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentTerms">Payment Terms</Label>
              <Select defaultValue="14">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 days</SelectItem>
                  <SelectItem value="14">14 days</SelectItem>
                  <SelectItem value="30">30 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}

export default function SwagatAdmin() {
  const [activePage, setActivePage] = useState<Page>("dashboard");

  return (
    <>
      <Sidebar className="border-r-0">
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-3">
            <img
              src="/swagat-logo.webp"
              alt="Swagat Logo"
              className="h-10 w-10 object-contain"
            />
            <div>
              <p className="font-bold text-base">Swagat</p>
              <p className="text-xs text-sidebar-foreground/60">Demo Admin Panel</p>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent className="px-3">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {navItems.map((item) => {
                  const Icon = navIconMap[item.icon];
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        isActive={activePage === item.page}
                        onClick={() => setActivePage(item.page)}
                        className="h-11 px-3 rounded-xl font-medium"
                      >
                        <Icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-4 border-t border-sidebar-border">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 w-full hover:bg-sidebar-accent rounded-lg p-2 -m-2 transition-colors">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground text-sm font-semibold">SS</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-semibold truncate">Saini Sanjeev</p>
                  <p className="text-xs text-sidebar-foreground/60 truncate">Admin</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-sidebar-foreground/60">
                  <path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/>
                </svg>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="start" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setActivePage("settings")}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2">
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>
                </svg>
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2">
                  <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>
                </svg>
                Help & Support
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-6" />
          <h1 className="text-lg font-semibold">
            {activePage === "settings" ? "Settings" : (navItems.find(n => n.page === activePage)?.title || "Dashboard")}
          </h1>
          <div className="ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                  </svg>
                  <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-background" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 overflow-hidden">
                <DropdownMenuLabel className="flex items-center justify-between">
                  <span>Notifications</span>
                  <Badge variant="secondary" className="text-xs">3 new</Badge>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-80 overflow-y-auto overflow-x-hidden">
                  <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer w-full">
                    <div className="flex items-center gap-2 w-full min-w-0">
                      <span className="h-2 w-2 rounded-full bg-amber-500 shrink-0" />
                      <span className="font-medium text-sm truncate">New order received</span>
                      <span className="text-xs text-muted-foreground ml-auto shrink-0">2m ago</span>
                    </div>
                    <p className="text-xs text-muted-foreground pl-4 truncate w-full">Bombay Express placed order #ORD-4832</p>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer w-full">
                    <div className="flex items-center gap-2 w-full min-w-0">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                      <span className="font-medium text-sm truncate">Payment received</span>
                      <span className="text-xs text-muted-foreground ml-auto shrink-0">1h ago</span>
                    </div>
                    <p className="text-xs text-muted-foreground pl-4 truncate w-full">Invoice INV-2024-087 paid by Bombay Express</p>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer w-full">
                    <div className="flex items-center gap-2 w-full min-w-0">
                      <span className="h-2 w-2 rounded-full bg-sky-500 shrink-0" />
                      <span className="font-medium text-sm truncate">New business registered</span>
                      <span className="text-xs text-muted-foreground ml-auto shrink-0">3h ago</span>
                    </div>
                    <p className="text-xs text-muted-foreground pl-4 truncate w-full">Masala Kitchen s.r.o. added to clients</p>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer opacity-60 w-full">
                    <div className="flex items-center gap-2 w-full min-w-0">
                      <span className="h-2 w-2 rounded-full bg-muted shrink-0" />
                      <span className="font-medium text-sm truncate">Order delivered</span>
                      <span className="text-xs text-muted-foreground ml-auto shrink-0">Yesterday</span>
                    </div>
                    <p className="text-xs text-muted-foreground pl-4 truncate w-full">Order #ORD-4828 delivered to Spice Garden</p>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer opacity-60 w-full">
                    <div className="flex items-center gap-2 w-full min-w-0">
                      <span className="h-2 w-2 rounded-full bg-muted shrink-0" />
                      <span className="font-medium text-sm truncate">Weekly report ready</span>
                      <span className="text-xs text-muted-foreground ml-auto shrink-0">2 days ago</span>
                    </div>
                    <p className="text-xs text-muted-foreground pl-4 truncate w-full">Your weekly sales report is ready to view</p>
                  </DropdownMenuItem>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center text-sm text-muted-foreground cursor-pointer">
                  View all notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 p-6">
          {activePage === "dashboard" && <DashboardPage onNavigate={setActivePage} />}
          {activePage === "orders" && <OrdersPage />}
          {activePage === "businesses" && <BusinessesPage />}
          {activePage === "items" && <ItemsPage />}
          {activePage === "invoicing" && <InvoicingPage />}
          {activePage === "analytics" && <AnalyticsPage />}
          {activePage === "settings" && <SettingsPage />}
        </main>
      </SidebarInset>
    </>
  );
}
