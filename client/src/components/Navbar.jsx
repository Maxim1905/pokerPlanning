import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

export const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const { push } = useHistory();

  const logoutHandler = () => {
    logout();
    push("/");
  };

  return (
    <nav>
      <div class="nav-wrapper">
        <span class="brand-logo">Сокращение ссылок</span>

        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li>
            <NavLink to="/create">Создать</NavLink>
          </li>

          <li>
            <NavLink to="/links">Ссылки</NavLink>
          </li>

          <li>
            <a
              class="waves-effect waves-light btn pink darken-3"
              href="/"
              onClick={logoutHandler}
            >
              Выйти
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
