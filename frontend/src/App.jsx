import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import Banner from "./components/Banner/Banner";
import Banner2 from "./components/Banner/Banner2";
import Footer from "./components/Footer/Footer";
import Hero from "./components/Hero/Hero";
import GoogleTranslate from "./components/Language";
import MarkdownViewer from "./components/MarkdownViewer";
import Navbar from "./components/Navbar/Navbar";
import AboutUs from "./components/pages/AboutUs";
import Citizen from "./components/pages/citizen";
import Amendments from "./components/pages/Citizens/amendments";
import DPSP from "./components/pages/Citizens/dpsp";
import Duties from "./components/pages/Citizens/duties";
import Rights from "./components/pages/Citizens/rights";
import Schedules from "./components/pages/Citizens/schedules";
import Constitution from "./components/pages/constitution";
import History from "./components/pages/constitution/history";
import Preamble from "./components/pages/constitution/preamble";
import Contact from "./components/pages/contact";
import Ebooks from "./components/pages/ebooks";
import Engage from "./components/pages/engage";
import BlogPage from "./components/pages/Engage/blog";
import DiscussionForum from "./components/pages/Engage/discussion";
import PodcastPage from "./components/pages/Engage/podcast";
import VideoPage from "./components/pages/Engage/video";
import Explore from "./components/pages/explore";
import CaseStudies from "./components/pages/Explore/casestudies";
import ConstitutionSimplified from "./components/pages/Explore/ConstitutionSimplified";
import Games from "./components/pages/games";
import Learn from "./components/pages/Learn";
import Terms from "./components/pages/terms";
import ScrollToTop from "./components/Scrolltotop";
import Services from "./components/Services/Services";
import LoginPage from "./components/LoginPage";
import Subscribe from "./components/Subscribe/Subscribe";
import VerifyOtp from './components/VerifyOtp';

import ProtectedRoute from "./components/ProtectedRoute";
import HomeRedirect from './components/HomeRedirect';
import LandingPage from './components/LandingPage';
import ProfilePage from './components/ProfilePage';
import CrosswordGame from './components/Games/Crossword';
import Word from './components/Games/WordSearch';
import { Chatbot } from './components/Chatbot';
import Dashboard from './components/Dashboard';

const AppWrapper = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      const preloader = document.getElementById("preloader");
      if (preloader) preloader.style.display = "none";
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Define routes where Navbar + Footer should NOT be shown
  const noNavbarRoutes = ["/", "/signin", "/verify-otp", "/home"];

  const showNavbarFooter = !noNavbarRoutes.includes(location.pathname);

  return (
    <>
      {showNavbarFooter && <Navbar />}
      <main className="text-black bg-white dark:bg-gray-800 dark:text-white">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomeRedirect />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/home" element={<LandingPage />} />

          {/* Protected routes */}
          <Route
            path="/hero"
            element={
              <ProtectedRoute>
                <Hero />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/crossword"
            element={
              <ProtectedRoute>
                <CrosswordGame />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chatbot"
            element={
              <ProtectedRoute>
                <Chatbot />
              </ProtectedRoute>
            }
          />
          <Route
            path="/word-search"
            element={
              <ProtectedRoute>
                < Word />
              </ProtectedRoute>
            }
          />
          <Route
            path="/services"
            element={
              <ProtectedRoute>
                <Services />
              </ProtectedRoute>
            }
          />
          <Route
            path="/banner"
            element={
              <ProtectedRoute>
                <Banner />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/subscribe"
            element={
              <ProtectedRoute>
                <Subscribe />
              </ProtectedRoute>
            }
          />
          <Route
            path="/banner2"
            element={
              <ProtectedRoute>
                <Banner2 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/footer"
            element={
              <ProtectedRoute>
                <Footer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/constitution"
            element={
              <ProtectedRoute>
                <Constitution />
              </ProtectedRoute>
            }
          />
          <Route
            path="/explore"
            element={
              <ProtectedRoute>
                <Explore />
              </ProtectedRoute>
            }
          />
          <Route
            path="/learn"
            element={
              <ProtectedRoute>
                <Learn />
              </ProtectedRoute>
            }
          />
          <Route
            path="/citizen"
            element={
              <ProtectedRoute>
                <Citizen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <ProtectedRoute>
                <Contact />
              </ProtectedRoute>
            }
          />
          <Route
            path="/engage"
            element={
              <ProtectedRoute>
                <Engage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/games"
            element={
              <ProtectedRoute>
                <Games />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ebooks"
            element={
              <ProtectedRoute>
                <Ebooks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/aboutus"
            element={
              <ProtectedRoute>
                <AboutUs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/casestudies"
            element={
              <ProtectedRoute>
                <CaseStudies />
              </ProtectedRoute>
            }
          />
          <Route
            path="/constitution/preamble"
            element={
              <ProtectedRoute>
                <Preamble />
              </ProtectedRoute>
            }
          />
          <Route
            path="/constitution/history"
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            }
          />
          <Route
            path="/citizen/rights"
            element={
              <ProtectedRoute>
                <Rights />
              </ProtectedRoute>
            }
          />
          <Route
            path="/citizen/duties"
            element={
              <ProtectedRoute>
                <Duties />
              </ProtectedRoute>
            }
          />
          <Route
            path="/citizen/dpsp"
            element={
              <ProtectedRoute>
                <DPSP />
              </ProtectedRoute>
            }
          />
          <Route
            path="/citizen/schedules"
            element={
              <ProtectedRoute>
                <Schedules />
              </ProtectedRoute>
            }
          />
          <Route
            path="/citizen/amendment"
            element={
              <ProtectedRoute>
                <Amendments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/t&C"
            element={
              <ProtectedRoute>
                <Terms />
              </ProtectedRoute>
            }
          />
          <Route
            path="/engage/discussionforum"
            element={
              <ProtectedRoute>
                <DiscussionForum />
              </ProtectedRoute>
            }
          />
          <Route
            path="/engage/blog"
            element={
              <ProtectedRoute>
                <BlogPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/engage/podcast"
            element={
              <ProtectedRoute>
                <PodcastPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/engage/video"
            element={
              <ProtectedRoute>
                <VideoPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/docs/:fileName"
            element={
              <ProtectedRoute>
                <MarkdownViewer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/translate"
            element={
              <ProtectedRoute>
                <GoogleTranslate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/explore/constitution-simplified"
            element={
              <ProtectedRoute>
                <ConstitutionSimplified />
              </ProtectedRoute>
            }
          />
        </Routes>

      </main>

      {showNavbarFooter && <Footer />}
      <ScrollToTop />
      <Analytics />
      <SpeedInsights />
    </>
  );
};

const App = () => (
  <Router>
    <AppWrapper />
  </Router>
);

export default App;