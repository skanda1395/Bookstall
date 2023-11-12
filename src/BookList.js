import { memo } from "react";

function BookList(props) {
  console.log("Booklist renders");
  const { books, handleDelete, handleEdit, toggleRead } = props;
  const readBooks = books.filter(book => book.read);
  const unreadBooks = books.filter(book => !book.read);

  return <>
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
  </>
};

export default memo(BookList);