import React, { useState } from "react";
import "./App.css";

const user = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

function App() {
  const [data, setData] = useState(user);
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  // individual checked handler
  const handleCheckboxChange = (id) => {
    const newSelectedIds = selectedIds.includes(id)
      ? selectedIds.filter((selectedId) => selectedId !== id)
      : [...selectedIds, id];

    setSelectedIds(newSelectedIds);
  };

  // all checked handler
  const handleCheckAllChange = () => {
    const allIds = data.map((user) => user.id);
    setSelectedIds(selectedIds.length === allIds.length ? [] : allIds);
  };

  // selected field removed
  const handleRemoveSelected = () => {
    // Filter out the selected rows from the data array
    const newData = data.filter((user) => !selectedIds.includes(user.id));

    // Update the data array with the new data
    setData(newData);

    // Clear the selectedIds array
    setSelectedIds([]);
  };

  debugger;
  // sort handler
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedData = [...data];
  if (sortField) {
    sortedData.sort((a, b) => {
      const valueA = a[sortField] || "";
      const valueB = b[sortField] || "";
      if (valueA < valueB) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectedIds.length === data.length}
                onChange={handleCheckAllChange}
              />
            </th>
            <th onClick={() => handleSort("id")}>ID</th>
            <th onClick={() => handleSort("firstName")}>First Name</th>
            <th onClick={() => handleSort("lastName")}>Last Name</th>
            <th onClick={() => handleSort("age")}>Age</th>
          </tr>
        </thead>
        <tbody>
          {selectedIds.length > 0 && (
            <tr>
              <td colSpan="4">{selectedIds.length} Selected</td>
              <td colSpan="1" align="right">
                <button onClick={handleRemoveSelected}>Remove Selected</button>
              </td>
            </tr>
          )}

          {sortedData.map((user) => (
            <tr key={user.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(user.id)}
                  onChange={() => handleCheckboxChange(user.id)}
                />
              </td>
              <td>{user.id}</td>
              <td>{user.firstName || "-"}</td>
              <td>{user.lastName || "-"}</td>
              <td>{user.age || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
