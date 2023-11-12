import './App.css';
import { useState, useEffect } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [books, setBooks] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleBook = (e) => setTitle(e.target.value);
  const handleAuthor = (e) => setAuthor(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!author.trim() || !title.trim()) return;

    if(editId) {
      const newBooks = books.map((book) => {
        if(book.id !== editId) return book;
        return {
          ...book,
          title: title,
          author: author,
        };
      });
      setBooks(newBooks);
      setEditId(null);
    } else {
      const newBook = {
        id: Math.random(),
        title: title,
        author: author,
        read: false
      };
      setBooks([...books, newBook]);
    }
    setTitle("");
    setAuthor("");
  };

  useEffect(() => {
    console.log("getBooks from cache and set it if exists");
    const cachedBooks = JSON.parse(localStorage.getItem("books"));
    if(cachedBooks !== null) setBooks(cachedBooks);
  }, []);

  useEffect(() => {
    console.log("Set books in localStorage");
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const readBooks = books.filter(book => book.read);
  const unreadBooks = books.filter(book => !book.read);

  const handleEdit = (id) => {
    setEditId(id);
    const toEditBook = books.find((book) => book.id === id);
    setTitle(toEditBook.title);
    setAuthor(toEditBook.author);
  };
  const handleDelete = (id) => {
    const newBooks = books.filter((book) => book.id !== id);
    setBooks(newBooks);
  };
  const toggleRead = (id) => {
    const newBooks = books.map((book) => {
      if(book.id !== id) return book;
      return {
        ...book,
        read: !book.read
      };
    });
    setBooks(newBooks);
  };

  return (
    <div className="App">
      <h1>Book Stall</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={handleBook} />
        <input type="text" value={author} onChange={handleAuthor} />
        <button type="submit">{editId ? 'Update Book' : 'Add Book'}</button>
      </form>
      {unreadBooks.length > 0 &&
        <div>
          <h3>Yet to be read</h3>
          <ul>
            {unreadBooks.map((book) => {
              return (
                <li key={book.id}>{book.title} - {book.author}
                  <button onClick={() => handleEdit(book.id)}>Edit</button>
                  <button onClick={() => handleDelete(book.id)}>Delete</button>
                  <button onClick={() => toggleRead(book.id)}>Mark as read</button>
                </li>
              );
            })}
          </ul>
        </div>
      }
      {readBooks.length > 0 &&
        <div>
          <h3>Read Books</h3>
          <ul>
            {readBooks.map((book) => {
              return (
                <li key={book.id}>{book.title} - {book.author}
                  <button onClick={() => handleDelete(book.id)}>Delete</button>
                  <button onClick={() => toggleRead(book.id)}>Mark as unread</button>
                </li>
              );
            })}
          </ul>
        </div>
      }
    </div>
  );
}

export default App;
