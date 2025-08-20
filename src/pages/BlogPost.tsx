import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { StickyWhatsApp } from "@/components/StickyWhatsApp";
import { ContentProtection } from "@/components/ui/content-protection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowLeft, Share2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Newsletter } from "@/components/Newsletter";
import heroImage from "@/assets/hero-blog.jpg";
import DOMPurify from "dompurify";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  category?: string;
  image_url?: string;
  author_id?: string;
  published_at?: string;
  created_at: string;
  slug: string;
}

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .eq('is_published', true)
          .maybeSingle();
        
        if (error) throw error;
        setPost(data);
      } catch (error) {
        console.error('Error loading blog post:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadPost();
    }
  }, [slug]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: post?.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <ContentProtection>
        <div className="min-h-screen bg-background">
          <Navigation />
          
          {/* Hero Skeleton */}
          <section className="relative py-32 min-h-[60vh] flex items-center justify-center overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat backdrop-blur-[0.5px]"
              style={{ backgroundImage: `url(${heroImage})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/40"></div>
            </div>
            <div className="relative container mx-auto px-4 text-center text-white">
              <Skeleton className="h-8 w-32 mx-auto mb-4 bg-white/20" />
              <Skeleton className="h-16 w-3/4 mx-auto mb-4 bg-white/20" />
              <Skeleton className="h-6 w-1/2 mx-auto bg-white/20" />
            </div>
          </section>

          {/* Content Skeleton */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            </div>
          </section>

          <Footer />
          <StickyWhatsApp />
        </div>
      </ContentProtection>
    );
  }

  if (error || !post) {
    return (
      <ContentProtection>
        <div className="min-h-screen bg-background">
          <Navigation />
          
          <section className="py-32">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl font-bold mb-6">Blog Post Not Found</h1>
              <p className="text-xl text-muted-foreground mb-8">
                The blog post you're looking for doesn't exist or has been removed.
              </p>
              <Button asChild>
                <Link to="/blog">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blog
                </Link>
              </Button>
            </div>
          </section>

          <Footer />
          <StickyWhatsApp />
        </div>
      </ContentProtection>
    );
  }

  return (
    <ContentProtection>
      <div className="min-h-screen bg-background">
        <Navigation />
        
        {/* Hero Section */}
        <section className="relative py-32 min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat backdrop-blur-[0.5px]"
            style={{ backgroundImage: `url(${post.image_url || heroImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/60"></div>
          </div>
          <div className="relative container mx-auto px-4 text-white">
            <div className="max-w-4xl mx-auto">
              <Link 
                to="/blog"
                className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
              
              {post.category && (
                <Badge className="mb-4 bg-primary text-primary-foreground">
                  {post.category}
                </Badge>
              )}
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{format(new Date(post.published_at || post.created_at), 'MMMM d, yyyy')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>5 min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Deevabits Team</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <article className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Article Actions */}
              <div className="flex justify-between items-center mb-8 pb-6 border-b">
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div 
                className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content || '') }}
              />
            </div>
          </div>
        </article>

        {/* Newsletter Signup */}
        <Newsletter />

        <Footer />
        <StickyWhatsApp />
      </div>
    </ContentProtection>
  );
};

export default BlogPost;