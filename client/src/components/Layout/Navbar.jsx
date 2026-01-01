import { Link } from "react-router";
import { Button } from "../ui/Button";
import { Eye, MessageSquare, UserCircle2 } from "lucide-react";
import { Tooltip } from "react-tooltip";
import { useAuth } from "../../utils/contexts/AuthContext";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-b-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="p-8 flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="relative">
            <Eye className="h-6 w-6 text-primary" />
            <MessageSquare className="absolute -bottom-1 -right-1 h-3 w-3 text-feedback-500" />
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-primary to-feedback-600 bg-clip-text text-transparent">
            FeedbackVision
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          {!isAuthenticated ? (
            <>
              <Link to="/login">
                <Button
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-primary to-feedback-600 hover:from-primary/90 hover:to-feedback-600/90">
                  Get Started
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard">
                <Button
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Dashboard
                </Button>
              </Link>

              <div
                className="flex items-center gap-2 p-1.5 px-3 rounded-xs cursor-pointer bg-gradient-to-r from-primary to-feedback-600 hover:from-primary/90 hover:to-feedback-600/90"
                data-tooltip-id="logout-click"
                data-tooltip-content="Click to logout!"
                role="button"
                onClick={logout}
              >
                <UserCircle2 className="size-6 text-white" />
                <div className="flex flex-col text-white">
                  <span className="text-sm leading-4">
                    {user?.name || "Devendra Khinchi"}
                  </span>
                  <span className="text-xs">
                    {user?.email || "devkhinchi@gmail.com"}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Tooltip id="logout-click" place="bottom" className="text-xs" />
    </nav>
  );
}
