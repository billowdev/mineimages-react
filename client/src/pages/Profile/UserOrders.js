import DataTable from "react-data-table-component";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { AccessHeader, API_URL } from "../../helpers/API";
import { Link, useNavigate } from "react-router-dom";

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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function UserOrders() {
  const [data, setData] = useState([]);
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [sortColumn, setSortColumn] = useState("");
  const [sortColumnDirection, setSortColumnDirection] = useState("");

  const [search, setSearch] = useState("");

  const fetchData = async () => {
    setLoading(true);
    var url = `${API_URL}/order?page=${page}&per_page=${perPage}&delay=1`;

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
        console.log(resp.data);
        setData(resp.data.data);
        setTotalRows(resp.data.total);
        setLoading(false);
      });
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePerRowsChange = async (newPerPage) => {
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

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      width: "100px",
    },
    {
      name: "Image",
      selector: (row) => row.Image.pathWatermark,
      cell: (row) => (
        <img
          src={row.Image.pathWatermark}
          width={150}
          height={150}
          alt={row.name}
        />
      ),
      width: "180px",
    },
    {
      name: "Name",
      selector: (row) => row.Image.name,
      sortable: true,
      width: "120px",
    },
    {
      name: "Detail",
      selector: (row) => row.Image.detail,
      sortable: true,
      // width: "180px",
    },
    {
      name: "Price",
      selector: (row) => row.Image.price,
      sortable: true,
      width: "120px",
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      // width: "120px",
    },
    {
      name: "createAt",
      selector: (row) => row.createdAt,
      cell: (row) => (
        <span>{`${row.createdAt.slice(0, 10)}  ${row.createdAt.slice(
          11,
          19
        )}`}</span>
      ),
      sortable: true,
      // width: "180px",
    },
    {
      name: "seller",
      selector: (row) => row.ImgOwner,
      cell: (row) => (
        <div>
          <Link to={`user/${row.ImgOwner}`}>
            <Button className="btn-success">owner</Button>
          </Link>
        </div>
      ),
      // sortable: true,
      // width: "110px",
    },
    {
      name: "Download",
      selector: (row) => row.ImgPathOrigin,
      cell: (row) => (
        <div>
          {/* https://stackoverflow.com/questions/57056741/how-to-download-image-in-reactjs */}
          {/* <Button className="btn-success" onClick={hadleDownloadImage(row.ImgPathOrigin, row.ImgName)}>ดาวน์โหลด</Button> */}
          <Button className="btn-success" href={row.ImgPathOrigin} download={row.ImgName}>ดาวน์โหลด</Button>
        </div>
      ),
      // sortable: true,
      // width: "140px",
    },
  ];

  return (
    <Container className="user-images">
      <Row>
        {/* <img src={fetchImage("3b22a1ad-1aba-4cf3-a9e0-bc128098faa2")}></img> */}
        <h3 className="text-align-center">ประวัติการสั่งซื้อ</h3>
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

export default UserOrders;
