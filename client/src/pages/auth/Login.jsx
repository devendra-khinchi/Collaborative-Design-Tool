import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Button } from "../../components/ui/Button";
import {
  MessageCircle,
  Star,
  ThumbsUp,
  Eye,
  Target,
  Zap,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "../../utils/contexts/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: null };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuthenticated } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login:", { email, password });
    const loggedIn = await login(email, password);
    if (loggedIn) {
      navigate(from || "/dashboard", { replace: true });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from || "/dashboard", { replace: true });
    }
  }, []);

  return (
    <div className="h-full bg-gradient-to-br from-brand-50 via-feedback-50 to-purple-50">
      {/* Background Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <MessageCircle className="absolute top-20 left-10 h-8 w-8 text-brand-200 opacity-60" />
        <Star className="absolute top-32 right-16 h-6 w-6 text-feedback-300 opacity-50" />
        <ThumbsUp className="absolute top-60 left-20 h-7 w-7 text-brand-300 opacity-40" />
        <Eye className="absolute top-80 right-32 h-9 w-9 text-feedback-200 opacity-60" />
        <Target className="absolute bottom-40 left-16 h-8 w-8 text-brand-200 opacity-50" />
        <Zap className="absolute bottom-32 right-20 h-6 w-6 text-feedback-400 opacity-40" />
        <CheckCircle className="absolute top-40 left-1/2 h-7 w-7 text-brand-300 opacity-30" />
        <AlertCircle className="absolute bottom-60 right-1/4 h-8 w-8 text-feedback-300 opacity-40" />

        {/* Floating feedback bubbles */}
        <div className="absolute top-24 right-1/4 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-brand-700 opacity-60">
          "Great design!"
        </div>
        <div className="absolute bottom-38 left-3/4 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-feedback-700 opacity-50">
          "Needs improvement"
        </div>
        <div className="absolute top-56 left-1/4 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-brand-600 opacity-40">
          "Perfect!"
        </div>
      </div>

      <div className="relative flex items-center justify-center min-h-[calc(100vh-65px)] px-4 py-12">
        <div className="w-full max-w-md shadow-2xl p-8 border-0 bg-white/80 backdrop-blur-md">
          <div className="space-y-1 pb-6">
            <div className="text-2xl font-bold text-center bg-gradient-to-r from-brand-700 to-feedback-700 bg-clip-text text-transparent">
              Welcome back
            </div>
            <div className="text-center text-muted-foreground">
              Sign in to your FeedbackVision account
            </div>
          </div>
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2 flex flex-col gap-1">
                <label
                  htmlFor="email"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex h-10 w-full rounded-md border  bg-white px-3 py-2 text-sm placeholder:text-gray-400  focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-brand-200 focus:border-brand-500 focus:ring-brand-500"
                />
              </div>
              <div className="space-y-2 flex flex-col gap-1 mb-8">
                <label
                  htmlFor="password"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="flex h-10 w-full rounded-md border  bg-white px-3 py-2 text-sm placeholder:text-gray-400  focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-brand-200 focus:border-brand-500 focus:ring-brand-500"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-feedback-600 hover:from-primary/90 hover:to-feedback-600/90 text-white font-medium"
              >
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">
                Don't have an account?{" "}
              </span>
              <Link
                to="/signup"
                className="text-primary hover:text-primary/80 font-medium underline underline-offset-4"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
