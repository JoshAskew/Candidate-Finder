import { useOutletContext } from 'react-router-dom';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const { savedCandidates } = useOutletContext<{ savedCandidates: Candidate[] }>();

  return (
    <>
      <h1>Potential Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p>No candidates saved yet.</p>
      ) : (
        <ul>
          {savedCandidates.map((candidate) => (
            <li key={candidate.id}>
              <h2>{candidate.login}</h2>
              <img src={candidate.avatar_url} alt={candidate.login} />
              {candidate.name && <p>Name: {candidate.name}</p>}
              {candidate.location && <p>Location: {candidate.location}</p>}
              {candidate.email && <p>Email: {candidate.email}</p>}
              {candidate.company && <p>Company: {candidate.company}</p>}
              <a href={candidate.html_url} target="_blank" rel="noopener noreferrer"></a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default SavedCandidates;