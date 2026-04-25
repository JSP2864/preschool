import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Gallery from "./pages/Gallery";
import News from "./pages/News";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import NewsManage from "./pages/admin/NewsManage";
import GalleryManage from "./pages/admin/GalleryManage";
import Inquiries from "./pages/admin/Inquiries";

export default function App() {
  const loc = useLocation();
  const isAdmin = loc.pathname.startsWith("/admin");

  return (
    <div className="flex min-h-full flex-col">
      {!isAdmin && <Navbar />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
            <Route path="news" element={<NewsManage />} />
            <Route path="gallery" element={<GalleryManage />} />
            <Route path="inquiries" element={<Inquiries />} />
          </Route>

          <Route path="*" element={<div className="p-12 text-center text-slate-500">Page not found.</div>} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
    </div>
  );
}
