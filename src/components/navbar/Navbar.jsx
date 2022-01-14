import React, { useState, useRef, useEffect } from "react";
import "./navbar.css";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import logo from "../../assets/logo.svg";

const Menu = ({ onClick }) => (
  <>
    <p>
      <a href="#home" onClick={onClick}>
        Home
      </a>
    </p>
    <p>
      <a href="#wgpt3" onClick={onClick}>
        What is GPT3?
      </a>
    </p>
    <p>
      <a href="#possibilities" onClick={onClick}>
        Open AI
      </a>
    </p>
    <p>
      <a href="#features" onClick={onClick}>
        Case Studies
      </a>
    </p>
    <p>
      <a href="#blog" onClick={onClick}>
        Library
      </a>
    </p>
  </>
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const ref = useRef();

  const handleOnClick = (e) => {
    if (e.target !== ref.current) {
      setToggleMenu(false);
    } else {
      setToggleMenu(!toggleMenu);
    }
  };

  const handleScroll = () => {
    if (window.scrollY > 150) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (toggleMenu && ref.current && !ref.current.contains(e.target)) {
        setToggleMenu(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [toggleMenu]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });

  let navbarClasses = ["gpt3__navbar"];
  if (scrolled) {
    navbarClasses.push("scrolled");
  }

  return (
    <div className={navbarClasses.join(" ")}>
      <div className="gpt3__navbar-links">
        <div className="gpt3__navbar-links_logo">
          <a href="/#">
            <img src={logo} alt="logo" />
          </a>
        </div>
        <div className="gpt3__navbar-links_container">
          <Menu />
        </div>
      </div>
      <div className="gpt3__navbar-sign">
        <p>
          <a href="/#">Sign In</a>
        </p>
        <button type="button">
          <a href="/#">Sign Up</a>
        </button>
      </div>
      <div className="gpt3__navbar-menu">
        {toggleMenu ? (
          <RiCloseLine
            color="#fff"
            size={27}
            cursor="pointer"
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color="#fff"
            size={27}
            cursor="pointer"
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <div
            className="gpt3__navbar-menu_container scale-up-center"
            ref={ref}
          >
            <div className="gpt3__navbar-menu_container-links">
              <Menu onClick={handleOnClick} />
              <div
                className="gpt3__navbar-menu_container-links-sign"
                onClick={handleOnClick}
              >
                <p>
                  <a href="/#">Sign In</a>
                </p>
                <button type="button">
                  <a href="/#">Sign Up</a>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
