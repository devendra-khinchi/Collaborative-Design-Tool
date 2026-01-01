import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Button } from "../../components/ui/Button";
import {
  Image,
  Camera,
  Layers,
  Crop,
  Palette,
  Focus,
  Aperture,
  Grid,
  Move,
  RotateCw,
} from "lucide-react";
import { useAuth } from "../../utils/contexts/AuthContext";

export default function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: null };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isAuthenticated } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signup:", { name, email, password });
    const signedUp = await signup(name, email, password);
    if (signedUp) {
      navigate(from || "/dashboard", { replace: true });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from || "/dashboard", { replace: true });
    }
  }, []);

  return (
    <div className=" h-full bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
      {/* Background Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Image className="absolute top-20 left-10 h-8 w-8 text-purple-300 opacity-60" />
        <Camera className="absolute top-32 right-16 h-7 w-7 text-indigo-300 opacity-50" />
        <Layers className="absolute top-60 left-20 h-8 w-8 text-blue-300 opacity-40" />
        <Crop className="absolute top-80 right-32 h-6 w-6 text-purple-200 opacity-60" />
        <Palette className="absolute bottom-40 left-16 h-9 w-9 text-indigo-200 opacity-50" />
        <Focus className="absolute bottom-32 right-20 h-7 w-7 text-blue-400 opacity-40" />
        <Aperture className="absolute top-40 left-1/2 h-8 w-8 text-purple-300 opacity-30" />
        <Grid className="absolute bottom-60 right-1/4 h-6 w-6 text-indigo-300 opacity-40" />
        <Move className="absolute top-72 left-1/4 h-7 w-7 text-blue-300 opacity-35" />
        <RotateCw className="absolute bottom-80 left-1/3 h-6 w-6 text-purple-400 opacity-45" />

        {/* Floating image review elements */}
        <div className="absolute top-24 right-1/4 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-sm text-purple-700 opacity-60">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-300 rounded"></div>
            <span>Image.jpg</span>
          </div>
        </div>
        <div className="absolute bottom-38 left-3/4 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-sm text-indigo-700 opacity-50">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-indigo-300 rounded"></div>
            <span>Design.png</span>
          </div>
        </div>
        <div className="absolute top-56 left-[20%] bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-sm text-blue-600 opacity-40">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-300 rounded"></div>
            <span>Prototype.svg</span>
          </div>
        </div>

        {/* Geometric shapes */}
        <div className="absolute top-36 right-1/3 w-8 h-8 border-2 border-purple-300 opacity-30 rotate-45"></div>
        <div className="absolute bottom-72 left-1/4 w-6 h-6 rounded-full border-2 border-indigo-300 opacity-40"></div>
        <div className="absolute top-64 right-1/5 w-10 h-6 border-2 border-blue-300 opacity-35"></div>
      </div>

      <div className="relative flex items-center justify-center min-h-[calc(100vh-65px)] px-4 py-12">
        <div className="w-full max-w-md shadow-2xl p-8 border-0 bg-white/80 backdrop-blur-md">
          <div className="space-y-1 pb-6">
            <div className="text-2xl font-bold text-center bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent">
              Join FeedbackVision
            </div>
            <div className="text-center text-muted-foreground">
              Create your account to start reviewing designs
            </div>
          </div>
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2 flex flex-col gap-1">
                <label
                  htmlFor="name"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="flex h-10 w-full rounded-md border  bg-white px-3 py-2 text-sm placeholder:text-gray-400  focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-brand-200 focus:border-brand-500 focus:ring-brand-500"
                />
              </div>
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
              <div className="space-y-2 flex flex-col gap-1  mb-8">
                <label
                  htmlFor="password"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="flex h-10 w-full rounded-md border  bg-white px-3 py-2 text-sm placeholder:text-gray-400  focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-brand-200 focus:border-brand-500 focus:ring-brand-500"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium"
              >
                Create Account
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">
                Already have an account?{" "}
              </span>
              <Link
                to="/login"
                className="text-purple-600 hover:text-purple-500 font-medium underline underline-offset-4"
              >
                Sign in
              </Link>
            </div>

            <div className="mt-4 text-center text-xs text-muted-foreground">
              By creating an account, you agree to our{" "}
              <Link to="/terms" className="underline hover:text-purple-600">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="underline hover:text-purple-600">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
