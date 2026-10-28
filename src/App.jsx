import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import MarineSupplies from './pages/MarineSupplies.jsx';
import Quality from './pages/Quality.jsx';
import Environment from './pages/Environment.jsx';
import Leadership from './pages/Leadership.jsx';
import Contact from './pages/Contact.jsx';
import Quote from './pages/Quote.jsx';
import News from './pages/News.jsx';
import NewsArticle from './pages/NewsArticle.jsx';
import Privacy from './pages/Privacy.jsx';
import Terms from './pages/Terms.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="marine-supplies-ship-chandling" element={<MarineSupplies />} />
        <Route path="quality-certifications-compliance" element={<Quality />} />
        <Route path="environmental-responsibility" element={<Environment />} />
        <Route path="leadership" element={<Leadership />} />
        <Route path="contact" element={<Contact />} />
        <Route path="request-a-quotation" element={<Quote />} />
        <Route path="news" element={<News />} />
        <Route path="news/:slug" element={<NewsArticle />} />
        <Route path="privacy-policy" element={<Privacy />} />
        <Route path="terms-and-conditions" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
