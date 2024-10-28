import { useOutletContext } from 'react-router-dom';
import { Candidate } from '../interfaces/Candidate.interface';


  const SavedCandidates = () => {
    const { savedCandidates, removeCandidate } = useOutletContext<{
      savedCandidates: Candidate[];
      removeCandidate: (id: number) => void;
    }>();

  return (
    <>
    <table>
      <h1>Potential Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p>No candidates saved yet.</p>
      ) : (
        <>
          {savedCandidates.map((candidate) => (
            <ul key={candidate.id}>
              <h2 >{candidate.login}</h2>
              <img src={candidate.avatar_url} alt={candidate.login} />
              <button onClick={() => removeCandidate(candidate.id)} style={{ marginLeft: '10px' }}>
                Remove
              </button>
              {candidate.name && <p>Name: {candidate.name}</p>}
              {candidate.location && <p className='tr'>Location: {candidate.location}</p>}
              {candidate.email && <p>Email: {candidate.email}</p>}
              {candidate.company && <p>Company: {candidate.company}</p>}
              <a href={candidate.html_url} target="_blank" rel="noopener noreferrer"></a>
            </ul>
          ))}
        </>
      )}
      </table>
    </>
  );
};

export default SavedCandidates;