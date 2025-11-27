'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, adminLogout, getDashboardStats, getCurrentAdmin } from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  TrendingUp, 
  CheckCircle, 
  XCircle, 
  Star, 
  LogOut,
  Plus,
  Settings,
  BarChart3,
  MapPin
} from 'lucide-react';
import Link from 'next/link';

interface DashboardStats {
  total_properties: number;
  available_properties: number;
  rented_properties: number;
  sold_properties: number;
  featured_properties: number;
  properties_by_type: { type: string; count: number }[];
  properties_by_location: { location: string; count: number }[];
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [adminUser, setAdminUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated()) {
      router.push('/admin');
      return;
    }

    // Load dashboard data
    loadDashboard();
  }, [router]);

  const loadDashboard = async () => {
    try {
      const [statsData, userData] = await Promise.all([
        getDashboardStats(),
        getCurrentAdmin()
      ]);
      setStats(statsData);
      setAdminUser(userData);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    adminLogout();
    router.push('/admin');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">
                Welcome back, {adminUser?.username} ({adminUser?.role})
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/admin/properties/new">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  New Property
                </Button>
              </Link>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Properties
              </CardTitle>
              <Home className="w-4 h-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stats?.total_properties || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Available
              </CardTitle>
              <CheckCircle className="w-4 h-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {stats?.available_properties || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Rented
              </CardTitle>
              <XCircle className="w-4 h-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {stats?.rented_properties || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Sold
              </CardTitle>
              <TrendingUp className="w-4 h-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {stats?.sold_properties || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Featured
              </CardTitle>
              <Star className="w-4 h-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {stats?.featured_properties || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Properties by Type */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                Properties by Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats?.properties_by_type.map((item) => (
                  <div key={item.type} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {item.type}
                    </span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full"
                          style={{
                            width: `${(item.count / (stats?.total_properties || 1)) * 100}%`
                          }}
                        />
                      </div>
                      <span className="text-sm font-bold text-gray-900 w-8 text-right">
                        {item.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Properties by Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                Top Locations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats?.properties_by_location.slice(0, 5).map((item) => (
                  <div key={item.location} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      {item.location}
                    </span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-600 rounded-full"
                          style={{
                            width: `${(item.count / (stats?.total_properties || 1)) * 100}%`
                          }}
                        />
                      </div>
                      <span className="text-sm font-bold text-gray-900 w-8 text-right">
                        {item.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/admin/properties/new">
                <Button variant="outline" className="w-full justify-start h-auto py-4">
                  <Plus className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-semibold">Add Property</div>
                    <div className="text-xs text-gray-600">Create new listing</div>
                  </div>
                </Button>
              </Link>

              <Link href="/admin/properties">
                <Button variant="outline" className="w-full justify-start h-auto py-4">
                  <Home className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-semibold">Manage Properties</div>
                    <div className="text-xs text-gray-600">View all listings</div>
                  </div>
                </Button>
              </Link>

              <Link href="/admin/settings">
                <Button variant="outline" className="w-full justify-start h-auto py-4">
                  <Settings className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-semibold">Settings</div>
                    <div className="text-xs text-gray-600">Configure system</div>
                  </div>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

