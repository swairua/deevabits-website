
import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import { ContentProtection } from "@/components/ui/content-protection";
import { UserManagement } from "@/components/UserManagement";
import { ProductManagement } from "@/components/admin/ProductManagement";
import { PackageManagement } from "@/components/admin/PackageManagement";
import { DonorManagement } from "@/components/admin/DonorManagement";
import { BlogManagement } from "@/components/admin/BlogManagement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SubscriberManagement } from "@/components/admin/SubscriberManagement";
import { ReportManagement } from "@/components/admin/ReportManagement";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const Admin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('user_id', user.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
          setIsAdmin(false);
        } else {
          setIsAdmin(profile?.role === 'admin' || profile?.role === 'super_admin' || profile?.role === 'editor');
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect unauthorized users
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!isAdmin) {
    return (
      <ContentProtection>
        <div className="min-h-screen bg-background">
          <Navigation />
          <div className="container mx-auto px-4 py-8">
            <Alert className="max-w-md mx-auto">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                You don't have permission to access the admin dashboard. Please contact an administrator if you need access.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </ContentProtection>
    );
  }

  return (
    <ContentProtection>
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
          
          <Tabs defaultValue="users" className="space-y-6">
            <TabsList className="grid grid-cols-7 w-full">
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="packages">Packages</TabsTrigger>
              <TabsTrigger value="donors">Impact</TabsTrigger>
              <TabsTrigger value="blog">Blog</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
            </TabsList>

            <TabsContent value="users">
              <UserManagement />
            </TabsContent>

            <TabsContent value="products">
              <ProductManagement />
            </TabsContent>

            <TabsContent value="packages">
              <PackageManagement />
            </TabsContent>

            <TabsContent value="donors">
              <DonorManagement />
            </TabsContent>

            <TabsContent value="blog">
              <BlogManagement />
            </TabsContent>

            <TabsContent value="reports">
              <ReportManagement />
            </TabsContent>

            <TabsContent value="subscribers">
              <SubscriberManagement />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ContentProtection>
  );
};

export default Admin;
