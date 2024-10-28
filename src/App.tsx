import { useState} from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';
import { Candidate } from './interfaces/Candidate.interface';

function App() {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>(() => {
    // Load candidates from local storage
    const storedCandidates = localStorage.getItem('savedCandidates');
    return storedCandidates ? JSON.parse(storedCandidates) : [];
  });

  const addCandidate = (candidate: Candidate) => {
    setSavedCandidates((prev) => {
      const newCandidates = [...prev, candidate];
      localStorage.setItem('savedCandidates', JSON.stringify(newCandidates)); // Save to local storage
      return newCandidates;
    });
  };

  const removeCandidate = (candidateId: number) => {
    setSavedCandidates((prev) => {
      const updatedCandidates = prev.filter((candidate) => candidate.id !== candidateId);
      localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates)); // Update local storage
      return updatedCandidates;
    });
  };

  return (
    <>
      <Nav />
      <main>
        <Outlet context={{ savedCandidates, addCandidate, removeCandidate }} />
      </main>
    </>
  );
}

export default App;