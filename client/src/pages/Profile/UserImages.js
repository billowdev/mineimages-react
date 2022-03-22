import DataTable from "react-data-table-component";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Col,
  Row,
  Form,
  Card,
  Button,
  FormCheck,
  Container,
  InputGroup,
} from "react-bootstrap";

import { AccessHeader, API_URL } from "../../helpers/API";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const columns = [
  {
    name: "ID",
    selector: (row) => row.id,
    sortable: true,
    width: "100px",
  },
  {
    name: "Coverimage",
    selector: (row) => row.coverimage,
    sortable: true,
    cell: (row) => <img src={row.coverimage} width={300} alt={row.name} />,
    width: "350px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "150px",
  },
  {
    name: "Detail",
    selector: (row) => row.detail,
    sortable: true,
    cell: (row) => <p>{row.detail}</p>,
    width: "300px",
  },
  {
    name: "Latitude",
    selector: (row) => row.latitude,
    sortable: true,
    width: "200px",
  },
  {
    name: "Longitude",
    selector: (row) => row.longitude,
    sortable: true,
  },
];

function UserImages() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [sortColumn, setSortColumn] = useState("");
  const [sortColumnDirection, setSortColumnDirection] = useState("");

  const [search, setSearch] = useState("");

  const fetchData = async () => {
    setLoading(true);
    var url = `${API_URL}/user/images?page=${page}&per_page=${perPage}&delay=1`;

    if (sortColumn) {
      url += `&sort_column=${sortColumn}&sort_direction=${sortColumnDirection}`;
    }
    if (search) {
      url += `&search=${search}`;
    }
    await axios
      .get(url, {
        method: "get",
        headers: AccessHeader,
      })
      .then((response) => {
        return response;
      })
      .then((resp) => {
        console.log(resp.data.orders);
        setData(resp.data.orders);
        setTotalRows(resp.data.total);
        setLoading(false);
      });
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
  };

  const handleSort = (column, sortDirection) => {
    setSortColumn(column.name);
    setSortColumnDirection(sortDirection);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [page, sortColumn, sortColumnDirection]);

  return (
    <Container className="user-images">
      <Row>
        <h3 className="text-align-center">MineImages</h3>
        <form onSubmit={handleSearchSubmit}>
          <div class="input-group">
            <input
              type="search"
              class="form-control rounded"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-addon"
              onChange={handleSearchChange}
            />
            <button type="submit" class="btn btn-outline-primary">
              search
            </button>
          </div>
        </form>

        <DataTable
          //   title="MineImages"
          columns={columns}
          data={data}
          progressPending={loading}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
          onSort={handleSort}
        />
      </Row>
    </Container>
  );
}

export default UserImages;
