import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const candidates = await searchGithub(); // Fetch the list of candidates
        if (candidates.length > 0) {
          // Select a random candidate from the list
          const randomIndex = Math.floor(Math.random() * candidates.length);
          const randomCandidate = candidates[randomIndex];
          const data = await searchGithubUser(randomCandidate.login); // Fetch details for the selected candidate
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

    fetchCandidate();
  }, []);

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
        </div>
      )}
    </div>
  );
};

export default CandidateSearch;