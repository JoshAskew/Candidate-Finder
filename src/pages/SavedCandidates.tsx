import { useOutletContext } from 'react-router-dom';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const { savedCandidates, removeCandidate } = useOutletContext<{
    savedCandidates: Candidate[];
    removeCandidate: (id: number) => void;
  }>();

  return (
    <>
      <h1>Potential Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p>No candidates saved yet.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Username</th>
              <th>Name</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Profile</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate) => (
              <tr key={candidate.id}>
                <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <img
                    src={candidate.avatar_url}
                    alt={candidate.login}
                    style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                  />
                </td>
                <td>{candidate.login}</td>
                <td>{candidate.name || 'N/A'}</td>
                <td>{candidate.location || 'N/A'}</td>
                <td>{candidate.email || 'N/A'}</td>
                <td>{candidate.company || 'N/A'}</td>
                <td>
                  <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
                    View Profile
                  </a>
                </td>
                <td>
                  <button className='reject' onClick={() => removeCandidate(candidate.id)}>
                    ➖
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default SavedCandidates;