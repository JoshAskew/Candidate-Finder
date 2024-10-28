import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';
import { useState } from 'react';
import { Candidate } from './interfaces/Candidate.interface';

function App() {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  const addCandidate = (candidate: Candidate) => {
    setSavedCandidates((prev) => [...prev, candidate]);
  };
  return (
    <>
      <Nav />
      <main>
        <Outlet context={{ savedCandidates, addCandidate }}/>
      </main>
    </>
  );
}

export default App;
