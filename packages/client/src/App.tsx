import { useState } from "react";
import "./App.css";

function App() {
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log(category, message);
  };

  return (
    <div>
      <h1>Notification test</h1>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-field">
          <label htmlFor="categories">Category</label>
          <select
            name="category"
            id="categories"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Select Category</option>
            <option value="sports">Sports</option>
            <option value="finance">Finance</option>
            <option value="movies">Movies</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="text">Message</label>
          <textarea
            name="message"
            id="text"
            cols="30"
            rows="10"
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
