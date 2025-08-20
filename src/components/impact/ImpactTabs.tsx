import React, { useEffect, useState } from "react";
import { Heart, Users, Building2, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { DonationWidget } from "@/components/DonationWidget";
import { ImpactStats } from "@/components/ImpactStats";
import { useDonation } from "@/context/DonationContext";
import { supabase } from "@/integrations/supabase/client";

export const ImpactTabs: React.FC = () => {
  const { openDonationModal } = useDonation();
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false })
        .limit(3);
      
      if (data && !error) {
        setBlogPosts(data);
      }
    };

    fetchBlogPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-solar-green/5">
      <div className="container mx-auto px-4 py-16">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="donations">Donations</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="stories">Stories</TabsTrigger>
            <TabsTrigger value="partners">Partners & SDGs</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-solar-blue to-brand-green bg-clip-text text-transparent">
                Our Impact at a Glance
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                See how your support transforms communities across Kenya through solar energy access and economic empowerment.
              </p>
            </div>

            <ImpactStats />

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-brand-green" />
                  </div>
                  <CardTitle>Energy Access</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Bringing reliable, clean solar power to rural homes, schools, and health centers across Kenya.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-solar-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-solar-blue" />
                  </div>
                  <CardTitle>Economic Empowerment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Training Village Social Entrepreneurs to build sustainable solar businesses in their communities.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-brand-yellow/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-brand-yellow" />
                  </div>
                  <CardTitle>Climate Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Reducing carbon emissions while creating green jobs and sustainable energy solutions.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button 
                size="lg" 
                className="bg-brand-green hover:bg-brand-green/90 text-white px-8"
                onClick={() => openDonationModal()}
              >
                <Heart className="mr-2 h-5 w-5" />
                Join Our Mission
              </Button>
            </div>
          </TabsContent>

          {/* Donations Tab */}
          <TabsContent value="donations" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-solar-blue to-brand-green bg-clip-text text-transparent">
                Support Our Mission
              </h2>
              <p className="text-lg text-muted-foreground">Choose how you'd like to help us bring solar power to rural Kenya</p>
            </div>

            <Tabs defaultValue="standard" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="standard">Standard Support</TabsTrigger>
                <TabsTrigger value="project-based">Project-Based Giving</TabsTrigger>
              </TabsList>

              {/* Standard Support */}
              <TabsContent value="standard" className="space-y-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Online Donation Widget */}
                  <div>
                    <h3 className="text-2xl font-semibold mb-6">Online Donation</h3>
                    <DonationWidget className="w-full" />
                  </div>

                  {/* Traditional Methods */}
                  <div>
                    <h3 className="text-2xl font-semibold mb-6">Other Ways to Give</h3>
                    <div className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Bank Transfer (Kenya)</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm">
                          <p><strong>Bank:</strong> Equity Bank Kenya</p>
                          <p><strong>Account Name:</strong> Tuko Pamoja Solar</p>
                          <p><strong>Account Number:</strong> 0123456789</p>
                          <p><strong>Branch:</strong> Westlands</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Mobile Money (M-Pesa)</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm">
                          <p><strong>Paybill:</strong> 400200</p>
                          <p><strong>Account:</strong> TUKOPAMOJA</p>
                          <p className="text-muted-foreground mt-2">
                            Send to 400200, Account: TUKOPAMOJA
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">International Transfer</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm">
                          <p><strong>SWIFT:</strong> EQBLKENA</p>
                          <p><strong>Bank:</strong> Equity Bank Kenya Ltd</p>
                          <p><strong>Account:</strong> USD 0987654321</p>
                          <p className="text-muted-foreground mt-2">
                            For USD donations from international supporters
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">PayPal</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm mb-3">Send donations via PayPal</p>
                          <Button variant="outline" className="w-full">
                            Donate via PayPal
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Project-Based Giving */}
              <TabsContent value="project-based" className="space-y-8">
                <p className="text-center text-muted-foreground mb-8">
                  Support specific initiatives that align with your values and see direct impact from your contribution.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Heart className="h-5 w-5 text-red-500" />
                        Solar Clinics Fund
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Power rural health facilities with reliable solar energy, enabling 24/7 medical services and vaccine refrigeration.
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Target: $5,000 per clinic</span>
                        <Button 
                          size="sm" 
                          className="bg-brand-green hover:bg-brand-green/90"
                          onClick={() => openDonationModal('solar-clinics-fund')}
                        >
                          <Heart className="mr-1 h-3 w-3" />
                          Donate
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-blue-500" />
                        Women Entrepreneurs Fund
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Sponsor training, equipment, and business support for women starting solar enterprises in their communities.
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Target: $1,000 per entrepreneur</span>
                        <Button 
                          size="sm" 
                          className="bg-brand-green hover:bg-brand-green/90"
                          onClick={() => openDonationModal('women-entrepreneurs-fund')}
                        >
                          <Heart className="mr-1 h-3 w-3" />
                          Donate
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-solar-blue to-brand-green bg-clip-text text-transparent">
                Our Projects
              </h2>
              <p className="text-lg text-muted-foreground">Focused initiatives creating lasting impact</p>
              <p className="text-sm text-muted-foreground mt-2">
                <em>Projects are managed through our admin portal and updated regularly</em>
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <Badge className="w-fit mb-2">Infrastructure</Badge>
                  <CardTitle>Rural Electrification Program</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Installing solar mini-grids in off-grid villages, providing electricity to homes, schools, and small businesses.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-brand-green">Status: Active</span>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white"
                      onClick={() => openDonationModal('rural-electrification')}
                    >
                      Support This Project
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Badge className="w-fit mb-2">Financial Inclusion</Badge>
                  <CardTitle>Solar Microfinance Program</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Providing affordable financing options for solar systems, making clean energy accessible to low-income families.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-brand-green">Status: Expanding</span>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white"
                      onClick={() => openDonationModal('microfinance-program')}
                    >
                      Support This Project
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center bg-gradient-to-r from-solar-blue/10 to-brand-green/10 rounded-lg p-8">
              <h3 className="text-2xl font-semibold mb-4">Sponsor a New Project</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Have an idea for a solar project? Partner with us to bring innovative solutions to rural communities.
              </p>
              <Button 
                size="lg" 
                className="bg-brand-green hover:bg-brand-green/90 text-white"
                onClick={() => window.open('/contact?subject=Project Sponsorship Inquiry', '_blank')}
              >
                Sponsor a Project
              </Button>
            </div>
          </TabsContent>

          {/* Stories Tab */}
          <TabsContent value="stories" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-solar-blue to-brand-green bg-clip-text text-transparent">
                Stories of Impact
              </h2>
              <p className="text-lg text-muted-foreground">Real stories from our Village Social Entrepreneurs</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {blogPosts.length > 0 ? (
                blogPosts.map((post: any) => (
                  <Card key={post.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Heart className="h-6 w-6 text-brand-green" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">{post.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            {post.excerpt}
                          </p>
                          <div className="text-xs text-brand-green font-medium">
                            Published {new Date(post.published_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                // Fallback stories when no blog posts are available
                <>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Heart className="h-6 w-6 text-brand-green" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">Sarah Wanjiku - Kibera, Nairobi</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            "Before joining Tuko Pamoja, I struggled to keep my small shop running during power outages. 
                            Now with solar power, I can serve customers 24/7 and my income has doubled. I've even hired two assistants!"
                          </p>
                          <div className="text-xs text-brand-green font-medium">
                            +150% income increase • 2 new jobs created
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Users className="h-6 w-6 text-brand-green" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">James Mwangi - Machakos</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            "As a VSE, I've helped install solar systems in 45 homes in my community. 
                            Children can now study at night, and mothers can charge phones to run mobile money businesses."
                          </p>
                          <div className="text-xs text-brand-green font-medium">
                            45 families connected • 180+ lives impacted
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Building2 className="h-6 w-6 text-brand-green" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">Grace Nyambura - Nakuru</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            "Our women's cooperative now has solar-powered sewing machines. 
                            We produce school uniforms and sell them across the region. Solar changed everything for us!"
                          </p>
                          <div className="text-xs text-brand-green font-medium">
                            20-member cooperative • Ksh 500,000 monthly revenue
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <TrendingUp className="h-6 w-6 text-brand-green" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">Peter Kamau - Meru</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            "I started with one solar panel for my phone charging business. 
                            Today I have a solar shop serving the entire district and employ 8 people!"
                          </p>
                          <div className="text-xs text-brand-green font-medium">
                            800% business growth • 8 employees hired
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>

            <div className="text-center">
              <Button 
                size="lg" 
                className="bg-brand-green hover:bg-brand-green/90 text-white"
                onClick={() => openDonationModal('entrepreneurship-training')}
              >
                Fund Entrepreneurship Training
              </Button>
            </div>
          </TabsContent>

          {/* Partners & SDGs Tab */}
          <TabsContent value="partners" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-solar-blue to-brand-green bg-clip-text text-transparent">
                Partners & UN SDGs
              </h2>
              <p className="text-lg text-muted-foreground">Working together towards sustainable development goals</p>
            </div>

            {/* Partners Section */}
            <div className="mb-16">
              <h3 className="text-2xl font-semibold text-center mb-8">Our Partners & Supporters</h3>
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                {[
                  "USAID Kenya", "Kenya Climate Innovation Center", "Africa Enterprise Challenge Fund", 
                  "Shell Foundation", "Acumen Academy", "GSMA Mobile for Development", 
                  "Power Africa", "UK Aid Direct"
                ].map((partner, index) => (
                  <Card key={index} className="text-center p-6">
                    <div className="w-16 h-16 bg-muted rounded-lg mx-auto mb-3 flex items-center justify-center">
                      <Building2 className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-medium">{partner}</p>
                  </Card>
                ))}
              </div>
              
              <div className="text-center">
                <Button 
                  size="lg" 
                  className="bg-brand-green hover:bg-brand-green/90 text-white"
                  onClick={() => window.open('/contact?subject=Partnership Opportunity', '_blank')}
                >
                  Partner With Us
                </Button>
              </div>
            </div>

            {/* SDGs Section */}
            <div className="bg-gradient-to-r from-solar-blue/5 to-brand-green/5 rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-center mb-8">UN Sustainable Development Goals</h3>
              <p className="text-center text-muted-foreground mb-8">
                Our work directly contributes to achieving these global development targets by 2030
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="text-center">
                  <CardHeader>
                    <div className="w-16 h-16 bg-yellow-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                      <span className="text-2xl">⚡</span>
                    </div>
                    <CardTitle className="text-lg">SDG 7: Clean Energy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Ensuring access to affordable, reliable, sustainable and modern energy for all
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <div className="w-16 h-16 bg-blue-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                      <span className="text-2xl">💼</span>
                    </div>
                    <CardTitle className="text-lg">SDG 8: Decent Work</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Promoting sustained, inclusive and sustainable economic growth and employment
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <div className="w-16 h-16 bg-green-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                      <span className="text-2xl">🌍</span>
                    </div>
                    <CardTitle className="text-lg">SDG 13: Climate Action</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Taking urgent action to combat climate change and its impacts
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-solar-blue to-brand-green bg-clip-text text-transparent">
                Transparency & Accountability
              </h2>
              <p className="text-lg text-muted-foreground">Access our impact reports and financial disclosures</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle>Impact Reports</CardTitle>
                  <CardDescription>Annual and quarterly impact assessments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-muted rounded">
                    <div>
                      <p className="font-medium">2023 Annual Impact Report</p>
                      <p className="text-sm text-muted-foreground">Complete year overview</p>
                    </div>
                    <Button size="sm" variant="outline">Download PDF</Button>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded">
                    <div>
                      <p className="font-medium">Q3 2023 Quarterly Report</p>
                      <p className="text-sm text-muted-foreground">July - September highlights</p>
                    </div>
                    <Button size="sm" variant="outline">Download PDF</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Third-Party Assessments</CardTitle>
                  <CardDescription>Independent evaluations and certifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-muted rounded">
                    <div>
                      <p className="font-medium">GiveDirectly Impact Assessment</p>
                      <p className="text-sm text-muted-foreground">External evaluation 2023</p>
                    </div>
                    <Button size="sm" variant="outline">View Report</Button>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded">
                    <div>
                      <p className="font-medium">ISO 14001 Certification</p>
                      <p className="text-sm text-muted-foreground">Environmental management</p>
                    </div>
                    <Button size="sm" variant="outline">View Certificate</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button 
                size="lg" 
                className="bg-brand-green hover:bg-brand-green/90 text-white"
                onClick={() => openDonationModal('transparency-initiative')}
              >
                Support Transparent Impact
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};