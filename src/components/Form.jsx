import React, { useState, useEffect } from "react";

function Form() {
  const [user, setUser] = useState({ name: "", comment: "" });
  const [count, setCount] = useState(0);
  const [userComments, setUserComments] = useState(
    JSON.parse(localStorage.getItem("userComments")) || []
  );

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => {
      clearInterval(timerID);
    };
  }, []);

  const tick = () => {
    setDate(new Date());
  };

  const onChangeHandler = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    localStorage.setItem("userComments", JSON.stringify(userComments));
  }, [userComments]);

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
    setCount((prevCount) => prevCount - 1);
  };

  return (
    <>
      <div
        className='card d-flex flex-column p-3 m-auto pt-5 mt-5'
        style={{ width: "20rem", height: "auto" }}
      >
        <div className='d-flex justify-content-between time'>
          <p>Total comments : {count}</p>
          <p>Time: {date.toLocaleTimeString()}</p>
        </div>
        <div className='d-flex flex-column py-3 px-2'>
          <label htmlFor='name' id='name'>
            Name
          </label>
          <input
            type='text'
            name='name'
            value={user.name}
            onChange={onChangeHandler}
          />
        </div>
        <div className='d-flex flex-column py-3 px-2'>
          <label htmlFor='comment'>Comments</label>
          <textarea
            style={{ height: "3rem" }}
            name='comment'
            id='comment'
            value={user.comment}
            onChange={onChangeHandler}
          />
        </div>
        <button type='submit' onClick={onClickHandler}>
          <div className='svg-wrapper-1'>
            <div className='svg-wrapper'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                width='24'
                height='24'
              >
                <path fill='none' d='M0 0h24v24H0z'></path>
                <path
                  fill='currentColor'
                  d='M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z'
                ></path>
              </svg>
            </div>
          </div>
          <span>Send</span>
        </button>
      </div>
      <ul className="py-2 d-flex justify-content-start flex-wrap" >
        {userComments.map((userComment, index) => (
          <li key={index}>
            <span
              className='remove '
              style={{ width: "2rem" }}
              onClick={() => removeComment(index)}
            >
              x
            </span>
            <p>Name: {userComment.name}</p>
            <p>Comment: {userComment.comment}</p>
          </li>
        ))}
      </ul>
      <hr />
    </>
  );
}

export default Form;
