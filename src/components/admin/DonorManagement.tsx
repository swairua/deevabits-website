import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, AlertCircle, RefreshCw, Users, Building } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ImageUpload } from "@/components/ui/image-upload";

interface Donor {
  id: string;
  name: string;
  description: string | null;
  logo_url: string | null;
  website_url: string | null;
  is_active: boolean;
  created_at: string;
}

interface Project {
  id: string;
  title: string;
  description: string | null;
  amount: number | null;
  start_date: string | null;
  end_date: string | null;
  outcome: string | null;
  impact_metrics: any;
  image_url: string | null;
  is_public: boolean;
  donor_id: string | null;
  created_at: string;
}

export const DonorManagement = () => {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDonorDialogOpen, setIsDonorDialogOpen] = useState(false);
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [editingDonor, setEditingDonor] = useState<Donor | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const { toast } = useToast();

  const [donorFormData, setDonorFormData] = useState({
    name: "",
    description: "",
    logo_url: "",
    website_url: "",
    is_active: true,
  });

  const [projectFormData, setProjectFormData] = useState({
    title: "",
    description: "",
    amount: "",
    start_date: "",
    end_date: "",
    outcome: "",
    image_url: "",
    donor_id: "",
    is_public: true,
  });

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [donorsResult, projectsResult] = await Promise.all([
        supabase.from('donors').select('*').order('created_at', { ascending: false }),
        supabase.from('projects').select('*').order('created_at', { ascending: false })
      ]);

      if (donorsResult.error) throw donorsResult.error;
      if (projectsResult.error) throw projectsResult.error;

      setDonors(donorsResult.data || []);
      setProjects(projectsResult.data || []);
    } catch (err) {
      console.error('Error loading data:', err);
      setError('Failed to load donors and projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const resetDonorForm = () => {
    setDonorFormData({
      name: "",
      description: "",
      logo_url: "",
      website_url: "",
      is_active: true,
    });
    setEditingDonor(null);
  };

  const resetProjectForm = () => {
    setProjectFormData({
      title: "",
      description: "",
      amount: "",
      start_date: "",
      end_date: "",
      outcome: "",
      image_url: "",
      donor_id: "",
      is_public: true,
    });
    setEditingProject(null);
  };

  const handleSaveDonor = async () => {
    try {
      const donorData = {
        name: donorFormData.name,
        description: donorFormData.description,
        logo_url: donorFormData.logo_url,
        website_url: donorFormData.website_url,
        is_active: donorFormData.is_active,
      };

      if (editingDonor) {
        const { error } = await supabase
          .from('donors')
          .update(donorData)
          .eq('id', editingDonor.id);

        if (error) throw error;
        toast({ title: "Donor updated successfully" });
      } else {
        const { error } = await supabase
          .from('donors')
          .insert([donorData]);

        if (error) throw error;
        toast({ title: "Donor created successfully" });
      }

      setIsDonorDialogOpen(false);
      resetDonorForm();
      loadData();
    } catch (err) {
      console.error('Error saving donor:', err);
      toast({
        title: "Error",
        description: "Failed to save donor",
        variant: "destructive",
      });
    }
  };

  const handleSaveProject = async () => {
    try {
      const projectData = {
        title: projectFormData.title,
        description: projectFormData.description,
        amount: projectFormData.amount ? parseFloat(projectFormData.amount) : null,
        start_date: projectFormData.start_date || null,
        end_date: projectFormData.end_date || null,
        outcome: projectFormData.outcome,
        image_url: projectFormData.image_url,
        donor_id: projectFormData.donor_id || null,
        is_public: projectFormData.is_public,
        impact_metrics: {},
      };

      if (editingProject) {
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', editingProject.id);

        if (error) throw error;
        toast({ title: "Project updated successfully" });
      } else {
        const { error } = await supabase
          .from('projects')
          .insert([projectData]);

        if (error) throw error;
        toast({ title: "Project created successfully" });
      }

      setIsProjectDialogOpen(false);
      resetProjectForm();
      loadData();
    } catch (err) {
      console.error('Error saving project:', err);
      toast({
        title: "Error",
        description: "Failed to save project",
        variant: "destructive",
      });
    }
  };

  const handleEditDonor = (donor: Donor) => {
    setEditingDonor(donor);
    setDonorFormData({
      name: donor.name,
      description: donor.description || "",
      logo_url: donor.logo_url || "",
      website_url: donor.website_url || "",
      is_active: donor.is_active,
    });
    setIsDonorDialogOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setProjectFormData({
      title: project.title,
      description: project.description || "",
      amount: project.amount?.toString() || "",
      start_date: project.start_date || "",
      end_date: project.end_date || "",
      outcome: project.outcome || "",
      image_url: project.image_url || "",
      donor_id: project.donor_id || "",
      is_public: project.is_public,
    });
    setIsProjectDialogOpen(true);
  };

  const handleDeleteDonor = async (donor: Donor) => {
    if (!confirm(`Are you sure you want to delete "${donor.name}"?`)) return;

    try {
      const { error } = await supabase
        .from('donors')
        .delete()
        .eq('id', donor.id);

      if (error) throw error;
      toast({ title: "Donor deleted successfully" });
      loadData();
    } catch (err) {
      console.error('Error deleting donor:', err);
      toast({
        title: "Error",
        description: "Failed to delete donor",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProject = async (project: Project) => {
    if (!confirm(`Are you sure you want to delete "${project.title}"?`)) return;

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', project.id);

      if (error) throw error;
      toast({ title: "Project deleted successfully" });
      loadData();
    } catch (err) {
      console.error('Error deleting project:', err);
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Manage Donors & Projects</h2>
        <Card>
          <CardContent className="pt-6 space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Donors & Projects</h2>
        <Button variant="outline" onClick={loadData}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      {error && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="donors" className="space-y-6">
        <TabsList>
          <TabsTrigger value="donors">Donors ({donors.length})</TabsTrigger>
          <TabsTrigger value="projects">Projects ({projects.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="donors" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Donor Organizations</h3>
            <Dialog open={isDonorDialogOpen} onOpenChange={setIsDonorDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetDonorForm}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Donor
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingDonor ? "Edit Donor" : "Add New Donor"}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="donor-name">Organization Name</Label>
                    <Input
                      id="donor-name"
                      value={donorFormData.name}
                      onChange={(e) => setDonorFormData({ ...donorFormData, name: e.target.value })}
                      placeholder="Enter organization name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="donor-description">Description</Label>
                    <Textarea
                      id="donor-description"
                      value={donorFormData.description}
                      onChange={(e) => setDonorFormData({ ...donorFormData, description: e.target.value })}
                      placeholder="Brief description of the organization"
                    />
                  </div>
                  <div>
                    <ImageUpload
                      label="Organization Logo"
                      value={donorFormData.logo_url}
                      onChange={(url) => setDonorFormData({ ...donorFormData, logo_url: url })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="donor-website">Website URL</Label>
                    <Input
                      id="donor-website"
                      value={donorFormData.website_url}
                      onChange={(e) => setDonorFormData({ ...donorFormData, website_url: e.target.value })}
                      placeholder="https://example.com"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="donor-active"
                      checked={donorFormData.is_active}
                      onCheckedChange={(checked) => setDonorFormData({ ...donorFormData, is_active: checked })}
                    />
                    <Label htmlFor="donor-active">Active</Label>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsDonorDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveDonor}>
                    {editingDonor ? "Update" : "Create"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="pt-6">
              {donors.length === 0 ? (
                <div className="text-center py-8">
                  <Building className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">No donors found. Add your first donor!</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Organization</TableHead>
                      <TableHead>Website</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {donors.map((donor) => (
                      <TableRow key={donor.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {donor.logo_url && (
                              <img 
                                src={donor.logo_url} 
                                alt={donor.name}
                                className="w-8 h-8 rounded object-cover"
                              />
                            )}
                            <div>
                              <div className="font-medium">{donor.name}</div>
                              {donor.description && (
                                <div className="text-sm text-muted-foreground">
                                  {donor.description.substring(0, 50)}...
                                </div>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {donor.website_url && (
                            <a 
                              href={donor.website_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              Visit
                            </a>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant={donor.is_active ? "default" : "secondary"}>
                            {donor.is_active ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditDonor(donor)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteDonor(donor)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Impact Projects</h3>
            <Dialog open={isProjectDialogOpen} onOpenChange={setIsProjectDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetProjectForm}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Project
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingProject ? "Edit Project" : "Add New Project"}
                  </DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="project-title">Project Title</Label>
                    <Input
                      id="project-title"
                      value={projectFormData.title}
                      onChange={(e) => setProjectFormData({ ...projectFormData, title: e.target.value })}
                      placeholder="Enter project title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="project-donor">Donor</Label>
                    <select
                      id="project-donor"
                      value={projectFormData.donor_id}
                      onChange={(e) => setProjectFormData({ ...projectFormData, donor_id: e.target.value })}
                      className="w-full p-2 border rounded"
                    >
                      <option value="">Select a donor</option>
                      {donors.map((donor) => (
                        <option key={donor.id} value={donor.id}>
                          {donor.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="project-amount">Amount (KES)</Label>
                    <Input
                      id="project-amount"
                      type="number"
                      value={projectFormData.amount}
                      onChange={(e) => setProjectFormData({ ...projectFormData, amount: e.target.value })}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="project-start">Start Date</Label>
                    <Input
                      id="project-start"
                      type="date"
                      value={projectFormData.start_date}
                      onChange={(e) => setProjectFormData({ ...projectFormData, start_date: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="project-end">End Date</Label>
                    <Input
                      id="project-end"
                      type="date"
                      value={projectFormData.end_date}
                      onChange={(e) => setProjectFormData({ ...projectFormData, end_date: e.target.value })}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="project-description">Description</Label>
                    <Textarea
                      id="project-description"
                      value={projectFormData.description}
                      onChange={(e) => setProjectFormData({ ...projectFormData, description: e.target.value })}
                      placeholder="Project description and goals"
                      rows={3}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="project-outcome">Outcome/Impact</Label>
                    <Textarea
                      id="project-outcome"
                      value={projectFormData.outcome}
                      onChange={(e) => setProjectFormData({ ...projectFormData, outcome: e.target.value })}
                      placeholder="Results and impact achieved"
                      rows={2}
                    />
                  </div>
                  <div className="col-span-2">
                    <ImageUpload
                      label="Project Image"
                      value={projectFormData.image_url}
                      onChange={(url) => setProjectFormData({ ...projectFormData, image_url: url })}
                    />
                  </div>
                  <div className="col-span-2 flex items-center space-x-2">
                    <Switch
                      id="project-public"
                      checked={projectFormData.is_public}
                      onCheckedChange={(checked) => setProjectFormData({ ...projectFormData, is_public: checked })}
                    />
                    <Label htmlFor="project-public">Public (visible on impact page)</Label>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsProjectDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveProject}>
                    {editingProject ? "Update" : "Create"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="pt-6">
              {projects.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">No projects found. Add your first project!</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project</TableHead>
                      <TableHead>Donor</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{project.title}</div>
                            {project.description && (
                              <div className="text-sm text-muted-foreground">
                                {project.description.substring(0, 60)}...
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {project.donor_id ? 
                            donors.find(d => d.id === project.donor_id)?.name || 'Unknown' :
                            'No donor assigned'
                          }
                        </TableCell>
                        <TableCell>
                          {project.amount ? `KES ${project.amount.toLocaleString()}` : 'N/A'}
                        </TableCell>
                        <TableCell>
                          <Badge variant={project.is_public ? "default" : "secondary"}>
                            {project.is_public ? "Public" : "Private"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditProject(project)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteProject(project)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};