import { useMemo } from "react";
import { useTable } from "react-table";
import styled from "styled-components";
import { tertiaryMain } from "./../util/colours";
import { StyleSheet } from "./../util/types";


function UserTable (props) {
	const users = props.users;

	const data = useMemo(
		() => users,
		[users]
	);

	const columns = useMemo(
		() => [
			{
				Header: "First Name",
				accessor: "displayName", // accessor is the "key" in the data
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
			{
				Header: "Upgrade",
				id: "upgrade",
				Cell: ( { row } ) => {
					function callUpgradeRole () {
						const uid = row.original.uid;
						upgradeRole(uid);
					}
					if (row.values.role === "staff") {
						return (<Button onClick={callUpgradeRole} >
							Upgrade
						</Button>);
					} else if (row.values.role === "manager") {
						return (<span>upgraded</span>);
					} else {
						return null;
					}
				},
			}
		],
		[]
	);

	function upgradeRole (userId: string) {
		// Need to pass an agrument based on current user role here.
		console.log(`${userId} upgraded!`);
	}

	const tableInstance = useTable({ columns, data });

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = tableInstance;

	return (
	// apply the table props
		<table {...getTableProps()} style={styles.table}>
			<thead>
				{// Loop over the header rows
					headerGroups.map(headerGroup => (
						// Apply the header row props
						<tr {...headerGroup.getHeaderGroupProps()}>
							{// Loop over the headers in each row
								headerGroup.headers.map(column => (
									// Apply the header cell props
									<th {...column.getHeaderProps()} style={styles.header}>
										{// Render the header
											column.render("Header")}
									</th>
								))}
						</tr>
					))}
			</thead>
			{/* Apply the table body props */}
			<tbody {...getTableBodyProps()}>
				{// Loop over the table rows
					rows.map(row => {
						// Prepare the row for display
						prepareRow(row);
						return (
						// Apply the row props
							<tr {...row.getRowProps()}>
								{// Loop over the rows cells
									row.cells.map(cell => {
										// Apply the cell props
										return (
											<td {...cell.getCellProps()} style={styles.data}>
												{// Render the cell contents
													cell.render("Cell")}
											</td>
										);
									})}
							</tr>
						);
					})}
			</tbody>
		</table>
	);
}

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

const Button = styled.button`
	&:hover {
	  cursor: pointer;
	}
`;


export default UserTable;
