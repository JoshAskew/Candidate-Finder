import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';
import { useOutletContext } from 'react-router-dom';

const CandidateSearch = () => {
  const { addCandidate } = useOutletContext<{ addCandidate: (candidate: Candidate) => void }>();
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNewCandidate = async () => {
    try {
      const candidates = await searchGithub();
      if (candidates.length > 0) {
        const randomIndex = Math.floor(Math.random() * candidates.length);
        const randomCandidate = candidates[randomIndex];
        const data = await searchGithubUser(randomCandidate.login);
        setCandidate(data);
      } else {
        setError('No candidates found');
      }
    } catch (err) {
      setError('Failed to fetch candidate data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewCandidate();
  }, []);

  const handleSaveCandidate = () => {
    if (candidate) {
      addCandidate(candidate); // Use the addCandidate function from props
      fetchNewCandidate(); // Fetch the next candidate
    }
  };

  const handleSkipCandidate = () => {
    fetchNewCandidate(); // Fetch the next candidate without saving
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {candidate && (
        <div>
          <h2>{candidate.login}</h2>
          <img src={candidate.avatar_url} alt={candidate.login} />
          {candidate.location && <p>Location: {candidate.location}</p>}
          {candidate.email && <p>Email: {candidate.email}</p>}
          {candidate.company && <p>Company: {candidate.company}</p>}
          <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
            View Profile
          </a>
          <div>
            <button onClick={handleSaveCandidate}>+</button>
            <button onClick={handleSkipCandidate}>-</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateSearch;