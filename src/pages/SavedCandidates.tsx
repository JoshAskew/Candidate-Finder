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
              {/* Other candidate details can go here */}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default SavedCandidates;