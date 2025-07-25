import React from 'react';
import About from "@/components/About";
import Achievements from "@/components/Achievements";
import ContactUs from "@/components/ContactUs";
import Home from "@/components/Home";
import OurWork from "@/components/OurWork";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import SearchResults from "./components/pages/searchresults";
import './scss/style.scss';
import Index from "./components/pages/Index";
import Probleme from "./components/pages/Probleme";
import Simulari from "./components/pages/Simulari";
import Resurse from "./components/pages/Resurse";
import Pendule from "./components/pages/resurse/pendule";
import Unde from "./components/pages/resurse/unde";
import Lissajous from "./components/pages/resurse/lissajous";
import Seism from "./components/pages/resurse/seism";
import ScrollToTop from "./components/ScrollToTop";
import Profile from "./components/pages/Profile";
import ProblemSubmit from "./components/ProblemSubmit";
import ProblemaDetaliata from './components/Problemadetaliata';
import Layout from './components/Layout';
import { problemeData } from './components/problemedata';
import { useSelector, useDispatch } from 'react-redux';
import { setUserProblems } from './problemeSlice';
import { db } from './lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

function ProblemaDetaliataPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const userProblems = useSelector(state => state.problems.userProblems);
  const favorites = useSelector(state => state.problems.favorites);
  const [isLoading, setIsLoading] = React.useState(true);
  
  // Încarcă userProblems dacă nu sunt încărcate
  React.useEffect(() => {
    const fetchAllUserProblems = async () => {
      try {
        setIsLoading(true);
        const usersSnap = await getDocs(collection(db, 'users'));
        let allUserProblems = [];
        for (const userDoc of usersSnap.docs) {
          const userProblemsRef = collection(db, 'users', userDoc.id, 'userProblems');
          const problemsSnap = await getDocs(userProblemsRef);
          allUserProblems = allUserProblems.concat(problemsSnap.docs.map(doc => doc.data()));
        }
        dispatch(setUserProblems(allUserProblems));
      } catch (error) {
        console.error('Eroare la încărcarea problemelor:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (userProblems.length === 0) {
      fetchAllUserProblems();
    } else {
      setIsLoading(false);
    }
  }, [dispatch, userProblems.length]);
  
  const allProblems = [...problemeData, ...userProblems];
  
  // Debug: afișează informații despre căutare
  console.log('Căutare problemă cu ID:', id);
  console.log('UserProblems:', userProblems.map(p => ({ id: p.id, titlu: p.titlu })));
  console.log('Toate problemele:', allProblems.map(p => ({ id: p.id, titlu: p.titlu })));
  
  if (isLoading) {
    return (
      <Layout>
        <div style={{ padding: 32, textAlign: 'center' }}>
          Se încarcă problema...
        </div>
      </Layout>
    );
  }
  
  const problema = allProblems.find(p => String(p.id) === String(id));
  if (!problema) {
    return (
      <Layout>
        <div style={{ padding: 32, color: '#c00', fontWeight: 600 }}>
          Eroare: problema cu ID "{id}" nu a fost găsită.
          <br />
          Probleme disponibile: {allProblems.map(p => p.id).join(', ')}
          <br />
          UserProblems: {userProblems.map(p => p.id).join(', ')}
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <ProblemaDetaliata problema={problema} />
    </Layout>
  );
}

const App = () => {

  // const toggleOverflow = () => {
  //   if (document.body.style.overflow === 'hidden')
  //     document.body.style.overflow = '';
  //   else
  //     document.body.style.overflow = 'hidden';
  // }

  // document.addEventListener('keydown', e => {
  //   if (e.ctrlKey && e.key === 'k') {
  //     toggleOverflow();
  //   }
  // })

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show')
      }
      // else {
      //     entry.target.classList.remove('show')
      // }
    })
  })

  // $((() => {
  //   // For scroll animation
  //   const hiddenElements = document.querySelectorAll('.hidden');
  //   hiddenElements.forEach(el => observer.observe(el));

  //   // Sets up the navbar links for proper scrolling on click
  //   const navLinks = document.querySelectorAll("#nav-list li a");
  //   navLinks.forEach(a => {
  //     a.addEventListener('click', e => {
  //       openURL(e.target);
  //     })
  //   })
  //   navLinks[0].addEventListener('click', e => {
  //     const header = document.querySelector('header');
  //     header.scrollIntoView(true);
  //   })
  // }));

  // const openURL = linkElement => {
  //   const linkId = linkElement.dataset.href.split('#').join('');

  //   const openedSection = document.getElementById(linkId);
  //   openedSection.scrollIntoView(false);

  //   console.log(`Scrolled to ${openedSection.id}`);
  // }


  function getRootElementFontSize() {
    // Returns a number
    return parseFloat(
      // of the computed font-size, so in px
      getComputedStyle(
        // for the root <html> element
        document.documentElement
      ).fontSize
    );
  }

  function convertRem(value) {
    return value * getRootElementFontSize();
  }

  // setTimeout(() => {
  //   // convertRem(2); // 32 (px)
  //   console.log(convertRem(3.3));
  // }, 1000);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/probleme" element={<Probleme />} />
          <Route path="/probleme/:id" element={<ProblemaDetaliataPage />} />
          <Route path="/simulari" element={<Simulari />} />
          <Route path="/resurse" element={<Resurse />} />
          <Route path="/resurse/pendule" element={<Pendule />} />
          <Route path="/resurse/unde" element={<Unde />} />
          <Route path="/resurse/lissajous" element={<Lissajous />} />
          <Route path="/resurse/seism" element={<Seism />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/profil" element={<Profile />} />
          <Route path="/api-test" element={<ProblemSubmit />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;