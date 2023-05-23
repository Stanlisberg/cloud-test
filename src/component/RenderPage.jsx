import { useEffect, useContext, useState } from "react";
import AppContext from "./context/AppContext";
import ReactPaginate from "react-paginate";
import { FaLessThan } from "react-icons/fa";
import { FaGreaterThan } from "react-icons/fa";

function RenderPage() {
  const { users, fetchUsers } = useContext(AppContext);
  const [searchCoins, setSearchCoins] = useState("");
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 3;

  useEffect(() => {
    fetchUsers();
  }, []);

  // const suggestions = getSearchSuggestions(value);
  //   setSuggestedWords(suggestions);

  //------------Pagination
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(users?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(users?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, users]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % users?.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="container">
        <div className="wrapper">
          <div className="input-div">
            <input
              type="text"
              className="input"
              placeholder="Search Users"
              onChange={(e) => setSearchCoins(e.target.value)}
            />
          </div>
          <div className="table-wrapper">
            <table className="table">
              <thead className="table-head">
                <tr className="table-row-head">
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Website</th>
                </tr>
              </thead>
              <tbody className="t-body">
                {currentItems &&
                  currentItems.length > 0 &&
                  currentItems
                    .filter((value) => {
                      if (searchCoins === "") {
                        return value;
                      } else if (
                        value.name && value.username
                          .toLowerCase()
                          .includes(searchCoins.toLowerCase())
                      ) {
                        return value;
                      }
                    })
                    .map((user) => (
                      <tr key={user.id} className="t-row-body">
                        <td className="table-data">{user.name}</td>
                        <td className="table-data">{user.username}</td>
                        <td className="table-data">{user.email}</td>
                        <td className="table-data">{user.phone}</td>
                        <td className="table-data">{user.website}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>

          <ReactPaginate
            breakLabel="..."
            nextLabel={<FaGreaterThan size={13} color='grey'/>}
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel={<FaLessThan size={13} color='grey' />}
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            pageLinkClassName="page-num"
            previousLinkClassName="page"
            nextLinkClassName="page"
            activeLinkClassName="active"
          />
        </div>
      </div>
      ``
    </>
  );
}
export default RenderPage;
