import React, { useState } from "react";
import celebsData from "./celebrities.json";
import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosArrowDropup } from "react-icons/io";
import { ImBin } from "react-icons/im";
import { FaPencilAlt } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { FaRegCircleCheck } from "react-icons/fa6";

import Dialog from "./Dialog";

const Display = () => {
  const [editView, setEditView] = useState(null);
  const [delDialog, setDelDialog] = useState(false);

  const deleteItem = (id) => {
    console.log("delete item", id);
    setDelDialog(!delDialog);
  };

  const editItem = (id) => {
    setEditView((prev) => (prev === id ? null : id));
    console.log("Edit item", id);
  };

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  };

  const [sUser, setSUser] = useState("");

  const [isExpanded, setIsExpanded] = useState(null);

  const searchUser = (e) => {
    setSUser(e.target.value.toLowerCase());
  };

  const filteredData = celebsData.filter((celeb) => {
    return (
      celeb.first.toLowerCase().includes(sUser) ||
      celeb.last.toLowerCase().includes(sUser)
    );
  });

  const toggleExpand = (id) => {
    setIsExpanded((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <input
        className="searchBox"
        onChange={searchUser}
        type="text"
        placeholder="🔍 Search user"
      />
      <div className="celebList">
        {filteredData.map((celeb, index) => (
          <li key={index} className="userContent">
            {editView === celeb.id ? (
              <>
                <div className="editingWay">
                  <div className="singleItem">
                    <div className="userPic">
                      <img src={celeb.picture} alt={celeb.first} />
                      <h3>
                        <input
                          type="text"
                          defaultValue={celeb.first + " " + celeb.last}
                        />
                      </h3>
                    </div>
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        toggleExpand(celeb.id);
                        editItem(celeb.id);
                      }}
                    >
                      {isExpanded === celeb.id && (
                        <IoIosArrowDropup className="dropdownIco" />
                      )}
                      {isExpanded !== celeb.id && (
                        <IoIosArrowDropdown className="dropdownIco" />
                      )}
                    </div>
                  </div>
                  {isExpanded === celeb.id && (
                    <div className="expandedContent">
                      <div className="biodata">
                        <p>
                          Age{" "}
                          <span>
                            <input
                              type="number"
                              defaultValue={calculateAge(celeb.dob)}
                            />{" "}
                            years
                          </span>
                        </p>
                        <p>
                          Gender{" "}
                          <span>
                            <select>
                              <option disabled>{celeb.gender}</option>
                              <option>Male</option>
                              <option>Female</option>
                              <option>Rather Not Say</option>
                            </select>
                          </span>
                        </p>
                        <p>
                          Country{" "}
                          <span>
                            <input type="text" defaultValue={celeb.country} />
                          </span>
                        </p>
                      </div>
                      <h4>Description</h4>
                      <p>
                        <textarea
                          contentEditable
                          defaultValue={celeb.description}
                        />
                      </p>

                      <div className="footer">
                        <ImCancelCircle
                          onClick={(e) => {
                            e.preventDefault();
                            deleteItem(celeb.id);
                          }}
                          className="deleteIcon"
                        />
                        <FaRegCircleCheck
                          onClick={(e) => {
                            e.preventDefault();
                            editItem(celeb.id);
                          }}
                          className="subIcon"
                        />
                        {delDialog && <Dialog setDelDialog={setDelDialog} />}
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="uneditedContent">
                <div className="singleItem">
                  <div className="userPic">
                    <img src={celeb.picture} alt={celeb.first} />
                    <h3>
                      {celeb.first} {celeb.last}
                    </h3>
                  </div>
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      toggleExpand(celeb.id);
                    }}
                  >
                    {isExpanded === celeb.id && (
                      <IoIosArrowDropup className="dropdownIco" />
                    )}
                    {isExpanded !== celeb.id && (
                      <IoIosArrowDropdown className="dropdownIco" />
                    )}
                  </div>
                </div>
                {isExpanded === celeb.id && (
                  <div className="expandedContent">
                    <div className="biodata">
                      <p>
                        Age <span>{calculateAge(celeb.dob)} years</span>
                      </p>
                      <p>
                        Gender <span>{celeb.gender}</span>
                      </p>
                      <p>
                        Country <span>{celeb.country}</span>
                      </p>
                    </div>
                    <h4>Description</h4>
                    <p>{celeb.description}</p>

                    <div className="footer">
                      <ImBin
                        onClick={(e) => {
                          e.preventDefault();
                          deleteItem(celeb.id);
                        }}
                        className="deleteIcon"
                      />
                      <FaPencilAlt
                        onClick={(e) => {
                          e.preventDefault();
                          editItem(celeb.id);
                        }}
                        className="editIcon"
                      />
                      {delDialog && <Dialog setDelDialog={setDelDialog} />}
                    </div>
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
      </div>
    </>
  );
};

export default Display;
