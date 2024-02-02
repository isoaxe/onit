import { useMemo, useCallback } from "react";
import { useTable } from "react-table";
import styled from "styled-components";
import { tertiaryMain } from "../util/colours";
import { API_URL } from "../util/urls";
import { StyleSheet } from "../util/types";
import { auth } from "../util/firebase";

const Button = styled.button`
  &:hover {
    cursor: pointer;
  }
`;

function UserTable(props) {
  const { users, businessId, role, refresh } = props;

  const changeRole = useCallback(
    async (userId: string) => {
      try {
        const token = await auth.currentUser.getIdToken(true);
        const requestOptions = {
          method: "POST",
          headers: { authorization: `Bearer ${token}` },
        };
        const res = await fetch(
          `${API_URL}/claims/${userId}/${businessId}`,
          requestOptions
        );
        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.error(`POST request to /claims failed: ${error}`);
      }
    },
    [businessId]
  );

  const data = useMemo(() => users, [users]);

  const columns = useMemo(() => {
    const columnArray = [
      {
        Header: "First Name",
        accessor: "displayName", // accessor is the "key" in the data
      },
      {
        Header: "Surname",
        accessor: "lastName",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Created",
        accessor: "creationTime",
      },
      {
        Header: "Role",
        accessor: "role",
      },
    ];
    const header = {
      Header: "Modify",
      accessor: "modify",
      id: "modify",
      Cell: ({ row }) => {
        function callChangeRole() {
          const uid = row.original.uid;
          changeRole(uid);
          refresh();
        }
        if (row.values.role === "staff") {
          return <Button onClick={callChangeRole}>Upgrade</Button>;
        } else if (row.values.role === "manager") {
          return <Button onClick={callChangeRole}>Downgrade</Button>;
        } else {
          return null;
        }
      },
    };
    if (role === "owner") {
      columnArray.push(header);
    }
    return columnArray;
  }, [role, changeRole, refresh]);

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    // apply the table props
    <table {...getTableProps()} style={styles.table}>
      <thead>
        {
          // Loop over the header rows
          headerGroups.map((headerGroup) => (
            // Apply the header row props
            <tr {...headerGroup.getHeaderGroupProps()}>
              {
                // Loop over the headers in each row
                headerGroup.headers.map((column) => (
                  // Apply the header cell props
                  <th {...column.getHeaderProps()} style={styles.header}>
                    {
                      // Render the header
                      column.render("Header")
                    }
                  </th>
                ))
              }
            </tr>
          ))
        }
      </thead>
      {/* Apply the table body props */}
      <tbody {...getTableBodyProps()}>
        {
          // Loop over the table rows
          rows.map((row) => {
            // Prepare the row for display
            prepareRow(row);
            return (
              // Apply the row props
              <tr {...row.getRowProps()}>
                {
                  // Loop over the rows cells
                  row.cells.map((cell) => {
                    // Apply the cell props
                    return (
                      <td {...cell.getCellProps()} style={styles.data}>
                        {
                          // Render the cell contents
                          cell.render("Cell")
                        }
                      </td>
                    );
                  })
                }
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
}

export default UserTable;

const styles: StyleSheet = {
  table: {
    padding: "3px",
  },
  header: {
    borderBottom: `3px solid ${tertiaryMain}`,
    fontWeight: "bold",
  },
  data: {
    padding: "7px",
    borderBottom: `1px solid ${tertiaryMain}`,
  },
};
