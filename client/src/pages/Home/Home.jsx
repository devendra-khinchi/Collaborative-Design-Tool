import { Link, useLocation, useNavigate } from "react-router";
import { Button } from "../../components/ui/Button";
import {
  Eye,
  MessageSquare,
  Users,
  Zap,
  Shield,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "../../utils/contexts/AuthContext";
import { useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: null };
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: Eye,
      title: "Visual Feedback",
      description:
        "Get precise feedback on designs with interactive annotations and comments directly on your prototypes.",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description:
        "Collaborate seamlessly with your team, stakeholders, and clients in real-time feedback sessions.",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Experience instant feedback delivery with our optimized platform built for speed and efficiency.",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description:
        "Your designs and feedback are protected with enterprise-grade security and privacy controls.",
    },
  ];

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from || "/dashboard", { replace: true });
    }
  }, []);

  return (
    <div className="h-full min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="relative px-4 py-20">
        <div className="p-8 mx-auto text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-brand-100 px-6 py-2 text-sm font-medium text-brand-700">
            <Sparkles className="h-4 w-4" />
            <span>Transform your design feedback process</span>
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-brand-600 via-purple-600 to-feedback-600 bg-clip-text text-transparent">
              Visual Feedback
            </span>
            <br />
            <span className="text-foreground">Made Simple</span>
          </h1>

          <p className="mb-10 text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Streamline your design review process with interactive feedback
            tools. Get clear, actionable insights from your team and clients in
            minutes, not days.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/signup">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-feedback-600 hover:from-primary/90 hover:to-feedback-600/90 text-lg px-8 py-4 h-auto"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4 h-auto"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 opacity-20">
          <MessageSquare className="h-12 w-12 text-brand-500" />
        </div>
        <div className="absolute top-32 right-16 opacity-15">
          <Eye className="h-16 w-16 text-feedback-500" />
        </div>
        <div className="absolute bottom-20 left-20 opacity-10">
          <Users className="h-14 w-14 text-purple-500" />
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 bg-gradient-to-b from-transparent to-muted/10">
        <div className="p-8 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Everything you need for
              <span className="bg-gradient-to-r from-brand-600 to-feedback-600 bg-clip-text text-transparent">
                {" "}
                seamless feedback
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to make design reviews effortless and
              effective
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="border-0 shadow-lg bg-white/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="p-6 text-center">
                  <div className="mb-4 mx-auto w-12 h-12 bg-gradient-to-br from-brand-100 to-feedback-100 rounded-xl flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-brand-600" />
                  </div>
                  <h3 className="font-semibold mb-2 text-lg">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 bg-gradient-to-r from-brand-50 to-feedback-50">
        <div className="p-8 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to transform your design feedback?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of design teams who have streamlined their review
            process with FeedbackVision
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-feedback-600 hover:from-primary/90 hover:to-feedback-600/90 text-lg px-8 py-4 h-auto"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4 h-auto"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-t-border bg-background px-4 py-12">
        <div className="p-8 mx-auto text-center text-muted-foreground">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Eye className="h-5 w-5 text-primary" />
            <span className="font-bold text-lg bg-gradient-to-r from-primary to-feedback-600 bg-clip-text text-transparent">
              FeedbackVision
            </span>
          </div>
          <p className="text-sm">© 2024 FeedbackVision. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
