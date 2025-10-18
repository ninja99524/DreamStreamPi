import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/Toaster"; // ✅ Fixed capitalization
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Terms from "@/pages/terms";
import Privacy from "@/pages/privacy";
import Referrals from "@/pages/referrals";
import Downloads from "@/pages/downloads";
import NotFound from "@/pages/not-found";
import PiInit from "./PiInit"; // <-- Import PiInit

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/terms" component={Terms} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/referrals" component={Referrals} />
      <Route path="/downloads" component={Downloads} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <PiInit /> {/* <-- Add PiInit here so Pi SDK initializes */}
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
