import { FormEvent, useEffect, useState } from "react";
import "./App.css";
import { LogHistoryTable } from "../LogHistoryTable/LogHistoryTable";

const fetchMessages = () => {
  return fetch("http://localhost:3000/messages").then((res) => res.json());
};

function App() {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchMessages().then(setData);
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch("http://localhost:3000/messages", {
      method: "POST",
      body: JSON.stringify({ category, message }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(() => {
        setCategory("");
        setMessage("");

        fetchMessages().then(setData);
      });
  };

  return (
    <div>
      <h1>Notification test</h1>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-field">
          <label htmlFor="categories">Category</label>
          <select
            required
            name="category"
            id="categories"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="sports">Sports</option>
            <option value="finance">Finance</option>
            <option value="movies">Movies</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="text">Message</label>
          <textarea
            required
            name="message"
            id="text"
            cols={30}
            rows={10}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <button>Submit</button>
      </form>
      <LogHistoryTable data={data} />
    </div>
  );
}

export default App;
