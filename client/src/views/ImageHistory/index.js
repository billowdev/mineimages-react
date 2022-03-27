import DataTable from "react-data-table-component";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { Row, Container } from "react-bootstrap";

import { AccessHeader, API_URL } from "../../utils/API";

function ImagesHistory() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [sortColumn, setSortColumn] = useState("");
  const [sortColumnDirection, setSortColumnDirection] = useState("");

  const [search, setSearch] = useState("");

  const fetchImageData = async () => {
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
        // console.log(resp.data.data.images)
        setData(resp.data.data.images);
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
    fetchImageData();
  };

  const [checkState, setCheckState] = useState(true);
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      width: "260px",
    },
    {
      name: "image",
      selector: (row) => row.pathOrigin,
      cell: (row) => (
        <img src={row.pathOrigin} width={200} height={200} alt={row.name} />
      ),
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Detail",
      selector: (row) => row.detail,
      sortable: true,
      cell: (row) => <p>{row.detail}</p>,
      // width: "300px",
    },
    {
      name: "price",
      selector: (row) => row.price,
      sortable: true,
      // width: "200px",
    },
    {
      name: "status",
      selector: (row) => row.status,
      cell: (row) => (
        <div>
          <span>{row.status}</span>
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchImageData();
  }, [page, sortColumn, sortColumnDirection]);

  return (
    <Container className="user-images">
      <Row>
        <div className="image-history">
          <h3 className="text-align-center">MineImages</h3>
          <Link to="/profile/images/upload"> 
          <button class="btn btn-outline-primary" href="/">
            Upload Image
          </button>
          </Link>
        </div>

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

export default ImagesHistory;
