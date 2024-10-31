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
      addCandidate(candidate);
      fetchNewCandidate();
    }
  };

  const handleSkipCandidate = () => {
    fetchNewCandidate();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
    <h1>Candidate Search</h1>
    <div className="card">
    {candidate && (
      <div className="card-content">
        <img className="avatar" src={candidate.avatar_url} alt={candidate.login} />
        <h2>{candidate.login}</h2>
        {candidate.name && <p><strong>Name:</strong> {candidate.name}</p>}
        {candidate.location && <p><strong>Location:</strong> {candidate.location}</p>}
        {candidate.email && <p><strong>Email:</strong> {candidate.email}</p>}
        {candidate.company && <p><strong>Company:</strong> {candidate.company}</p>}
        <br></br>
        <a href={candidate.html_url} target="_blank" rel="noopener noreferrer" className="profile-link">
          View Profile
        </a>
        <div className="button-group">
        </div>
      </div>
    )}
  </div>
  <div>
    <button className="add-button" onClick={handleSaveCandidate}>➕</button>
    <button className="skip-button" onClick={handleSkipCandidate}>➖</button>
    </div>
  </>
  );
};

export default CandidateSearch;