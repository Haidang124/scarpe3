import React, { Component } from "react";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Navbar,
  } from "reactstrap";
import "./../css/nav.css";
class Nav extends Component {
  render() {
    return (
      <div className="my-navbar">
        <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow my-navbar">
          <button
            id="sidebarToggleTop"
            class="btn btn-link d-md-none rounded-circle mr-3"
          >
            <i class="fa fa-bars"></i>
          </button>

          <form class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
            <div class="input-group">
              <input
                type="text"
                class="form-control bg-light border-0 small"
                placeholder="Search for..."
                aria-label="Search"
                aria-describedby="basic-addon2"
              />
              <div class="input-group-append">
                <button class="btn btn-primary" type="button">
                  <i class="fas fa-search fa-sm"></i>
                </button>
              </div>
            </div>
          </form>
          <div class="navbar-nav ml-auto">
            <Dropdown isOpen={false}>
              <DropdownToggle tag="a" className="nav-link" caret>
                <i class="fas fa-bell fa-fw"></i>
                <span class="badge badge-danger badge-counter">3+</span>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem header>Header</DropdownItem>
                <DropdownItem>Some Action</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Dropdown isOpen={false}>
              <DropdownToggle tag="a" className="nav-link" caret>
                <i class="fas fa-envelope fa-fw"></i>
                <span class="badge badge-danger badge-counter">7</span>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem header>Header</DropdownItem>
                <DropdownItem>Some Action</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <span className""">Admin</span>
            <img
              src="https://randomuser.me/api/portraits/men/44.jpg"
              class="avatar"
              alt=""
            ></img>
          </div>
        </nav>
      </div>
    );
  }
}

export default Nav;
