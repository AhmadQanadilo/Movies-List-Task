"use client";

const Error = (props) => {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <p>{props.error.message}</p>
        <button onClick={() => props.reset()}>Try again</button>
      </body>
    </html>
  );
};

export default Error;
