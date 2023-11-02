import React, { useState } from "react";

function Form() {
  const [user, setUser] = useState({ name: "", comment: "" });
  const [count, setCount] = useState(0);
  const [userComments, setUserComments] = useState([]);
  const onChangeHandler = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const date = new Date();
  const currentTime = date.getHours();

  const onClickHandler = (event) => {
    event.preventDefault();
    setUserComments([...userComments, user]);
    setUser({ name: "", comment: "" });
    setCount((prevCount) => prevCount + 1);
  };

  const removeComment = (commentIndex) => {
    setUserComments((prevComments) =>
      prevComments.filter((_, index) => index !== commentIndex)
    );
  };

  return (
    <>
      <div
        className='card d-flex flex-column p-3 m-auto pt-5 mt-5'
        style={{ width: "25rem", height: "auto" }}
      >
        <span>Count : {count}</span>
        <ul className='d-flex card '>
          {userComments.map((userComment, index) => (
            <li className="" key={index}>
          
              <button
                className='btn btn-warning  align-items-end'
                style={{ width: "2rem" }}
                onClick={() => removeComment(index)}
              >
                x
              </button>
              <p>Name: {userComment.name}</p>
              <p>Comment: {userComment.comment}</p>
            </li>
          ))}
        </ul>

        <p style={{fontSize:"12px"}}>Time: {currentTime}:00 </p>
        <hr />

        <div className='d-flex flex-column py-3 px-2'>
          <label htmlFor='name' id='name'>
            Name:
          </label>
          <input
            type='text'
            name='name'
            value={user.name}
            onChange={onChangeHandler}
          />
        </div>
        <div className='d-flex flex-column py-3 px-2'>
          <label htmlFor='comment'>Comments:</label>
          <textarea
            style={{ height: "10rem" }}
            name='comment'
            id='comment'
            value={user.comment}
            onChange={onChangeHandler}
          />
        </div>
        <button className="btn btn-primary"type='submit' onClick={onClickHandler}>
          Send
        </button>
      </div>
    </>
  );
}

export default Form;
