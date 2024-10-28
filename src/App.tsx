import { useState} from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';
import { Candidate } from './interfaces/Candidate.interface'; // Import the Candidate interface

function App() {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>(() => {
    // Load candidates from local storage when initializing state
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

  return (
    <>
      <Nav />
      <main>
        <Outlet context={{ savedCandidates, addCandidate }} />
      </main>
    </>
  );
}

export default App;