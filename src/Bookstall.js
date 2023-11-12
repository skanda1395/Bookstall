import { useState, useEffect, useCallback } from "react";
import BookList from './BookList';

export default function Bookstall() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [books, setBooks] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const cachedBooks = JSON.parse(localStorage.getItem("books"));
    if(cachedBooks !== null) setBooks(cachedBooks);

    return () => console.log(JSON.parse(localStorage.getItem("books")));
  }, []);

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

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

  const handleEdit = useCallback((id) => {
    setEditId(id);
    const toEditBook = books.find((book) => book.id === id);
    setTitle(toEditBook.title);
    setAuthor(toEditBook.author);
  }, [books]);

  const handleDelete = useCallback((id) => {
    setBooks((books) => {
      const newBooks = books.filter((book) => book.id !== id);
      return newBooks;
    });
  }, []);

  const toggleRead = useCallback((id) => {
    setBooks((books) => {
      const newBooks = books.map((book) => {
        if(book.id !== id) return book;
        return {
          ...book,
          read: !book.read
        };
      });
      return newBooks;
    });
  }, []);

  return (
    <div>
      <h1>Book Stall</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={handleBook} />
        <input type="text" value={author} onChange={handleAuthor} />
        <button type="submit">{editId ? 'Update Book' : 'Add Book'}</button>
      </form>
      <BookList books={books} handleDelete={handleDelete} handleEdit={handleEdit} toggleRead={toggleRead} />
    </div>
  );
};