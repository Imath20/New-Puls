import { useEffect, useState, Fragment } from 'react';
import Layout from '../Layout';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ProblemaDetaliata from "../Problemadetaliata";
import { problemeData } from '../problemedata';
import { useDispatch, useSelector } from 'react-redux';
import { addProblem, removeProblem } from '../../problemeSlice';
import { db } from '../../lib/firebase';
import { doc, setDoc, getDocs, collection, getDoc, deleteDoc } from 'firebase/firestore';
import { auth } from '../../lib/firebase';

// Icon components
const SearchIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
    </svg>
);

const ExternalLinkIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15,3 21,3 21,9" />
        <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
);

// Problem Card Component
const ProblemCard = ({ problem, onResolveClick }) => {
    const { index, titlu, dificultate, categorie, descriere, solved } = problem;

    const getDifficultyColorClass = (diff) => {
        switch (diff) {
            case 'ușor':
            case 'usoare':
                return 'difficulty--usor';
            case 'mediu':
            case 'medii':
                return 'difficulty--mediu';
            case 'dificil':
            case 'dificile':
                return 'difficulty--dificil';
            case 'concurs':
            case 'concursuri':
                return 'difficulty--concurs';
            default:
                return '';
        }
    };

    return (
        <div className={`problem-card${solved ? ' solved' : ''}`}>
            <div className="problem-card-header">
                <div className="problem-card-info">
                    <span className="problem-card-id">#{index}</span>
                    <h3 className="problem-card-title">{titlu}</h3>
                    <p className="problem-card-topic">{categorie}</p>
                </div>
                {solved && <div className="problem-card-solved-badge">Rezolvată</div>}
            </div>
            <div className="problem-card-footer">
                <div className={`problem-card-difficulty ${getDifficultyColorClass(dificultate)}`}>
                    {dificultate}
                </div>
                <button
                    className="problem-card-link"
                    onClick={() => onResolveClick(problem)}
                >
                    <span>Rezolvă</span>
                    <ExternalLinkIcon />
                </button>
            </div>
        </div>
    );
};

const PhysicsProblems = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const [selectedDifficulty, setSelectedDifficulty] = useState(
        params.get("difficulty") || "Toate"
    );
    const [selectedCategory, setSelectedCategory] = useState(
        params.get("category") || "Toate"
    );
    const [sortBy, setSortBy] = useState("newest");
    const [selectedProblem, setSelectedProblem] = useState(null);
    
    // Paginare
    const [currentPage, setCurrentPage] = useState(1);
    const problemsPerPage = 8; // Numărul de probleme per pagină

    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams();

        if (selectedDifficulty && selectedDifficulty !== "Toate") {
            params.set("difficulty", selectedDifficulty);
        }

        navigate({
            pathname: location.pathname,
            search: params.toString(),
        });
    }, [selectedDifficulty, navigate, location.pathname]);

    // Reset la pagina 1 când se schimbă filtrele
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedDifficulty, selectedCategory, sortBy]);

    const categories = [
        "Toate",
        "Mecanică",
        "Oscilații",
        "Unde",
        "Lissajous",
        "Seismologie",
    ];

    const difficulties = ["Toate", "ușor", "mediu", "dificil", "concurs"];

    const isSpecializedPage = location.pathname.includes("/specialized");
    const specializedTopics = ["pendul", "unde", "lissajous", "seism"];

    const relevantProblems = isSpecializedPage
        ? problemeData.filter((problem) =>
            specializedTopics.some(topic =>
                problem.topic.toLowerCase().includes(topic)
            )
        )
        : problemeData;

    const filteredProblems = relevantProblems.filter((problem) => {
        if (
            searchQuery &&
            !problem.titlu.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !problem.categorie.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
            return false;
        }

        if (selectedDifficulty !== "Toate" && problem.dificultate !== selectedDifficulty) {
            return false;
        }

        if (
            selectedCategory !== "Toate" &&
            !problem.categorie.toLowerCase().includes(selectedCategory.toLowerCase())
        ) {
            return false;
        }

        return true;
    });

    // Funcție pentru sortarea după dificultate
    const difficultyOrder = { "ușor": 1, "mediu": 2, "dificil": 3, "concurs": 4 };

    // Funcție pentru sortarea problemelor
    const sortProblems = (problems) => {
        switch (sortBy) {
            case "newest":
                // Cele mai noi - sortare descrescătoare după index
                return [...problems].sort((a, b) => b.index - a.index);
            case "oldest":
                // Cele mai vechi - sortare crescătoare după index
                return [...problems].sort((a, b) => a.index - b.index);
            case "difficulty-asc":
                // Dificultate crescătoare (ușor -> mediu -> dificil)
                return [...problems].sort((a, b) => {
                    const orderA = difficultyOrder[a.dificultate] || 0;
                    const orderB = difficultyOrder[b.dificultate] || 0;
                    if (orderA === orderB) {
                        // Dacă dificultatea este aceeași, sortăm după index
                        return a.index - b.index;
                    }
                    return orderA - orderB;
                });
            case "difficulty-desc":
                // Dificultate descrescătoare (dificil -> mediu -> ușor)
                return [...problems].sort((a, b) => {
                    const orderA = difficultyOrder[a.dificultate] || 0;
                    const orderB = difficultyOrder[b.dificultate] || 0;
                    if (orderA === orderB) {
                        // Dacă dificultatea este aceeași, sortăm după index
                        return a.index - b.index;
                    }
                    return orderB - orderA;
                });
            default:
                // Implicit - sortare după index crescător
                return [...problems].sort((a, b) => a.index - b.index);
        }
    };

    const sortedProblems = sortProblems(filteredProblems);

    // Calculul paginării
    const totalPages = Math.ceil(sortedProblems.length / problemsPerPage);
    const startIndex = (currentPage - 1) * problemsPerPage;
    const endIndex = startIndex + problemsPerPage;
    const currentProblems = sortedProblems.slice(startIndex, endIndex);

    // Funcție pentru generarea numerelor de pagină
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5; // Numărul maxim de pagini vizibile

        if (totalPages <= maxVisiblePages) {
            // Dacă avem puține pagini, le afișăm pe toate
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Dacă avem multe pagini, afișăm o selecție inteligentă
            if (currentPage <= 3) {
                // Începutul listei
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                // Sfârșitul listei
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                // Mijlocul listei
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            }
        }

        return pages;
    };

    // Funcții pentru navigarea paginării
    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const [showAddModal, setShowAddModal] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newCategory, setNewCategory] = useState(categories[1] || '');
    const [newDifficulty, setNewDifficulty] = useState(difficulties[1] || '');
    const [newEnunt, setNewEnunt] = useState('');
    const [newImages, setNewImages] = useState([]); // array de url-uri
    const [uploading, setUploading] = useState(false);
    const [newPunctajTotal, setNewPunctajTotal] = useState('');
    const [newSubpuncte, setNewSubpuncte] = useState([{ cerinta: '', punctaj: '' }]);
    const dispatch = useDispatch();

    const IMAGEKIT_PUBLIC_KEY = 'public_6rkxL+q+51xT8d2+GHpJeNSzOTE=';
    const IMAGEKIT_UPLOAD_URL = 'https://upload.imagekit.io/api/v1/files/upload';

    const handleImageUpload = async (file) => {
      if (!file) return;
      if (file.size > 2 * 1024 * 1024) {
        alert('Imaginea trebuie să fie sub 2MB!');
        return;
      }
      setUploading(true);

      // Ia semnătura de la backend
      const authRes = await fetch('/api/assistant/imagekit-auth');
      const { signature, expire, token } = await authRes.json();

      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', file.name);
      formData.append('publicKey', IMAGEKIT_PUBLIC_KEY);
      formData.append('signature', signature);
      formData.append('expire', expire);
      formData.append('token', token);

      try {
        const res = await fetch(IMAGEKIT_UPLOAD_URL, { method: 'POST', body: formData });
        const data = await res.json();
        if (data && data.url) {
          setNewImages((imgs) => [...imgs, data.url]);
        } else {
          alert('Eroare la upload poză!');
        }
      } catch (err) {
        alert('Eroare la upload poză!');
      }
      setUploading(false);
    };
    const handleAddProblem = async () => {
      if (!newTitle.trim() || !newCategory || !newDifficulty || !newEnunt.trim()) {
        alert('Completează toate câmpurile!');
        return;
      }
      const user = auth.currentUser;
      let createdByAlias = '';
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const snap = await getDoc(userRef);
        if (snap.exists() && snap.data().alias) {
          createdByAlias = snap.data().alias;
        }
      }
      const newProblem = {
        id: Date.now().toString(),
        index: nextIndex,
        titlu: newTitle,
        categorie: newCategory,
        dificultate: newDifficulty,
        descriere: newEnunt,
        images: newImages,
        punctajTotal: newPunctajTotal,
        subpuncte: newSubpuncte.filter(sp => sp.cerinta && sp.punctaj),
        createdByAlias,
      };
      dispatch(addProblem(newProblem));
      setShowAddModal(false);
      setNewTitle(''); setNewCategory(categories[1] || ''); setNewDifficulty(difficulties[1] || ''); setNewEnunt(''); setNewImages([]); setNewPunctajTotal(''); setNewSubpuncte([{ cerinta: '', punctaj: '' }]);
      if (user) {
        const userProblemRef = doc(db, 'users', user.uid, 'userProblems', newProblem.id);
        await setDoc(userProblemRef, newProblem);
      }
    };

    const userProblems = useSelector(state => state.problems.userProblems);
    const [selectedUserProblem, setSelectedUserProblem] = useState(null);

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
        if (firebaseUser) {
          // Citește problemele userului din Firestore
          const userProblemsRef = collection(db, 'users', firebaseUser.uid, 'userProblems');
          const snap = await getDocs(userProblemsRef);
          const userProblems = snap.docs.map(doc => doc.data());
          dispatch({ type: 'problems/setProblems', payload: userProblems });
        }
      });
      return () => unsubscribe();
    }, [dispatch]);

    const allProblems = [...problemeData, ...userProblems];
    const nextIndex = allProblems.length > 0 ? Math.max(...allProblems.map(p => Number(p.index) || 0)) + 1 : 1;

    if (selectedProblem) {
        return (
            <Layout>
                <ProblemaDetaliata 
                    problema={selectedProblem} 
                    onBack={() => setSelectedProblem(null)}
                />
            </Layout>
        );
    }

    if (selectedUserProblem) {
      return (
        <Layout>
          <ProblemaDetaliata
            problema={selectedUserProblem}
            onBack={() => setSelectedUserProblem(null)}
          />
        </Layout>
      );
    }

    return (
        <Layout>
            <div className="problems-page">
                <div className="problems-page-inner">
                    {/* Title */}
                    <div className="problems-page-title-row" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <h1 className="problems-page-title">Probleme de fizică</h1>
                        <button className="add-problem-btn" onClick={() => setShowAddModal(true)} title="Adaugă problemă">
                            <span style={{ fontSize: 24, fontWeight: 'bold' }}>+</span>
                        </button>
                    </div>

                    {showAddModal && (
                        <div className="add-problem-modal" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                            <div style={{ background: '#fff', padding: 24, borderRadius: 12, minWidth: 320, maxWidth: 400 }}>
                                <h2>Adaugă problemă</h2>
                                <label>Titlu:</label>
                                <input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} style={{ width: '100%', marginBottom: 8 }} />
                                <label>Categorie:</label>
                                <select value={newCategory} onChange={e => setNewCategory(e.target.value)} style={{ width: '100%', marginBottom: 8 }}>
                                    {categories.filter(c => c !== 'Toate').map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                                <label>Dificultate:</label>
                                <select value={newDifficulty} onChange={e => setNewDifficulty(e.target.value)} style={{ width: '100%', marginBottom: 8 }}>
                                    {difficulties.filter(d => d !== 'Toate').map(d => <option key={d} value={d}>{d}</option>)}
                                </select>
                                <label>Enunț:</label>
                                <textarea value={newEnunt} onChange={e => setNewEnunt(e.target.value)} style={{ width: '100%', marginBottom: 8 }} />
                                <label>Poze:</label>
                                <input type="file" accept="image/*" disabled={uploading} onChange={e => handleImageUpload(e.target.files[0])} />
                                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '8px 0' }}>
                                    {newImages.map((url, i) => <img key={i} src={url} alt="preview" style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 6 }} />)}
                                </div>
                                <label>Punctaj total:</label>
                                <input type="number" value={newPunctajTotal} onChange={e => setNewPunctajTotal(e.target.value)} style={{ width: '100%', marginBottom: 8 }} />
                                <label>Cerințe (subpuncte):</label>
                                {newSubpuncte.map((sp, i) => (
                                  <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
                                    <input type="text" placeholder="Cerință" value={sp.cerinta} onChange={e => setNewSubpuncte(subpuncte => subpuncte.map((s, j) => j === i ? { ...s, cerinta: e.target.value } : s))} style={{ flex: 2 }} />
                                    <input type="number" placeholder="Punctaj" value={sp.punctaj} onChange={e => setNewSubpuncte(subpuncte => subpuncte.map((s, j) => j === i ? { ...s, punctaj: e.target.value } : s))} style={{ flex: 1 }} />
                                    <button onClick={() => setNewSubpuncte(subpuncte => subpuncte.filter((_, j) => j !== i))} disabled={newSubpuncte.length === 1}>✕</button>
                                  </div>
                                ))}
                                <button onClick={() => setNewSubpuncte([...newSubpuncte, { cerinta: '', punctaj: '' }])} style={{ marginBottom: 8 }}>Adaugă subpunct</button>
                                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                                    <button onClick={handleAddProblem} disabled={uploading}>Salvează</button>
                                    <button onClick={() => setShowAddModal(false)} disabled={uploading}>Anulează</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Search and Filters */}
                    <div className="problems-page-filters">
                        <div className="filters-row">
                            <div className="search-container">
                                <span className="search-icon"><SearchIcon /></span>
                                <input
                                    type="text"
                                    placeholder="Caută probleme..."
                                    className="search-input"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="select-container">
                                <select
                                    className="filter-select"
                                    value={selectedDifficulty}
                                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                                >
                                    {difficulties.map((difficulty) => (
                                        <option key={difficulty} value={difficulty}>
                                            {difficulty === "Toate" ? "Toate dificultățile" : `Dificultate: ${difficulty}`}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    className="filter-select"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category === "Toate" ? "Toate categoriile" : `Categorie: ${category}`}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Category Pills */}
                    <div className="category-pills">
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={`category-pill${selectedCategory === category ? ' active' : ''}`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Results Header */}
                    <div className="results-header">
                        <p className="results-count">
                            {sortedProblems.length} probleme găsite
                            {totalPages > 1 && ` (pagina ${currentPage} din ${totalPages})`}
                        </p>
                        <select
                            className="sort-select"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="newest">Cele mai noi</option>
                            <option value="oldest">Cele mai vechi</option>
                            <option value="difficulty-asc">Dificultate (crescător)</option>
                            <option value="difficulty-desc">Dificultate (descrescător)</option>
                        </select>
                    </div>

                    {userProblems.length > 0 && (
                        <div className="user-problems-section" style={{ marginBottom: 24 }}>
                            <h2 style={{ fontSize: 18, margin: '16px 0 8px 0' }}>Probleme adăugate de tine</h2>
                            <div className="problems-grid">
                                {userProblems.map((problem) => (
                                    <div key={problem.id} className="problem-card user-problem-card" style={{ position: 'relative' }}>
                                        <div className="problem-card-header">
                                            <div className="problem-card-info" style={{ position: 'relative' }} onClick={() => setSelectedUserProblem(problem)}>
                                                <span className="problem-card-id">#{problem.index}</span>
                                                <h3 className="problem-card-title">{problem.titlu}</h3>
                                                <p className="problem-card-topic">{problem.categorie}</p>
                                                {problem.createdByAlias && (
                                                  <span style={{ position: 'absolute', top: 0, right: 0, fontSize: 12, fontStyle: 'italic', color: '#888' }}>{problem.createdByAlias}</span>
                                                )}
                                            </div>
                                            <div className="problem-card-solved-badge" style={{ background: '#4caf50', color: '#fff' }}>Adăugată de tine</div>
                                        </div>
                                        <div className="problem-card-footer">
                                            <div className={`problem-card-difficulty difficulty--${problem.dificultate}`}>{problem.dificultate}</div>
                                            {problem.images && problem.images.length > 0 && (
                                                <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
                                                    {problem.images.map((url, i) => <img key={i} src={url} alt="img" style={{ width: 32, height: 32, objectFit: 'cover', borderRadius: 4 }} />)}
                                                </div>
                                            )}
                                        </div>
                                        <div style={{ marginTop: 8, fontSize: 14 }}>{problem.descriere}</div>
                                        <button
                                            onClick={() => handleRemoveUserProblem(problem.id)}
                                            style={{ position: 'absolute', top: 8, right: 8, background: '#f44336', color: '#fff', border: 'none', borderRadius: 4, padding: '2px 8px', cursor: 'pointer' }}
                                            title="Șterge problema"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Problem Cards Grid */}
                    <div className="problems-grid">
                        {currentProblems.map((problem) => (
                            <ProblemCard
                                key={problem.id}
                                problem={problem}
                                onResolveClick={setSelectedProblem}
                            />
                        ))}
                    </div>

                    {/* No Results */}
                    {sortedProblems.length === 0 && (
                        <div className="no-results">
                            <h3>Nicio problemă găsită</h3>
                            <p>Încearcă să modifici filtrele sau să folosești alte cuvinte cheie.</p>
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="pagination">
                            <div className="pagination-navbar">
                                <button 
                                    className="pagination-btn" 
                                    disabled={currentPage === 1}
                                    onClick={goToPreviousPage}
                                >
                                    Anterior
                                </button>
                                
                                {getPageNumbers().map((page, index) => (
                                    <Fragment key={index}>
                                        {page === '...' ? (
                                            <span className="pagination-dots">...</span>
                                        ) : (
                                            <button 
                                                className={`pagination-btn${currentPage === page ? ' pagination-btn--active' : ''}`}
                                                onClick={() => goToPage(page)}
                                            >
                                                {page}
                                            </button>
                                        )}
                                    </Fragment>
                                ))}
                                
                                <button 
                                    className="pagination-btn" 
                                    disabled={currentPage === totalPages}
                                    onClick={goToNextPage}
                                >
                                    Următor
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default PhysicsProblems;