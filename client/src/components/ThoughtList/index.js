import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { REMOVE_THOUGHT } from '../../utils/mutations';
import Auth from '../../utils/auth';


const ThoughtList = ({
  thoughts,
  title,
  showTitle = true,
  showUsername = true,
}) => {

const [removeThought, { error }] = useMutation(REMOVE_THOUGHT);

const handleDeleteThought = async (thoughtId) => {
  // get token
  const token = Auth.loggedIn() ? Auth.getToken() : null;
  if (!token) {
    return false;
  }

  try {
    const { data } = await removeThought({
      variables: { thoughtId },
    });
  } catch (err) {
    console.error(err);
  }
};


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
              onClick={() => handleDeleteThought(thought.thoughtId)}
            >
              Delete this thought
            </Link>
          </div>
        ))}
    </div>
  );
};

export default ThoughtList;
