import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS } from '../../utils/queries';
import { useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';


const ThoughtList = ({
  thoughts,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!thoughts.length) {
    return <h3>No Thoughts Yet</h3>;


  }

  const { thoughtId } = useParams();

  const { data } = useQuery(QUERY_THOUGHTS, {
    // pass URL parameter
    variables: { thoughtId: thoughtId },
});
console.log("data", data)

  const [removeThought, { error }] = useMutation(REMOVE_THOUGHT, {
    refetchQueries: [{ query: QUERY_THOUGHTS, variables: thoughtId }],
    awaitRefetchQueries: true,
});


  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {thoughts &&
        thoughts.map((thought) => (
          <div key={thought._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${thought.thoughtAuthor}`}
                >
                  {thought.thoughtAuthor} <br />
                  <span style={{ fontSize: '1rem' }}>
                    had this thought on {thought.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You had this thought on {thought.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{thought.thoughtText}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/thoughts/${thought._id}`}
            >
              Join the discussion on this thought.
            </Link>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/thoughts/${thought._id}`}
              onClick={() => removeThought({ variables: { id: thought._id } })}
            >
              Delete this thought
            </Link>
          </div>
        ))}
    </div>
  );
};

export default ThoughtList;
