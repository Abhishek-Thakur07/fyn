import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToDo, DeleteToDo } from "../actions/actions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import constants from "../constants/constants";
import "bootstrap/dist/css/bootstrap.min.css";

function Shop() {
  const [value, setValue] = useState({
    name: "",
    area: "",
    category: "",
    open: "",
    close: "",
  });
  const dispatch = useDispatch();
  const user = useSelector((state) => state.reducer.data);

  // Schema
  let schema = yup.object().shape({
    name: yup.string().required("Store Name is required"),
    area: yup.string().required("Area is required"),
    category: yup.string().required("Category is required"),
    open: yup.date().required("Required").typeError("INVALID_DATE"),
    close: yup.date().required("Required").typeError("INVALID_DATE"),
  });
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  // OnChange
  const handleChange = (e) => {
    let { name, value } = e.target;
    setValue((preValue) => ({ ...preValue, [name]: value }));
  };

  // OnSubmit
  const onSubmit = (data) =>
    dispatch(
      addToDo(data),
      setValue({ name: "", area: "", category: "", open: "", close: "" })
    );
  return (
    <div className="container">
      <div className="row">
        <form onSubmit={handleSubmit(onSubmit)} className="form col-5">
          <div className="mb-3">
            <label className="form-label" htmlFor="">
              Store Name
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              pattern="[A-Za-z].{3,}"
              placeholder="Enter Store Name"
              value={value.name}
              onChange={handleChange}
              {...register("name", {
                onChange: handleChange,
                value: value.name,
              })}
            />
          </div>
          {/* Area */}
          <div className="mb-3">
            <label htmlFor="">Area</label>
            <select
              name="area"
              id=""
              className="form-select"
              value={value.area}
              onChange={handleChange}
              {...register("area", {
                onChange: handleChange,
                value: value.area,
              })}
            >
              {constants.area.map((area, i) => {
                return (
                  <option value={area} key={i}>
                    {area}
                  </option>
                );
              })}
            </select>
          </div>
          {/* Category */}
          <div className="mb-3">
            <label htmlFor="">Category</label>
            <select
              name="category"
              id=""
              className="form-select"
              value={value.category}
              onChange={handleChange}
              {...register("category", {
                onChange: handleChange,
                value: value.category,
              })}
            >
              {constants.category.map((cat, i) => {
                return (
                  <option value={cat} key={i}>
                    {cat}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Open */}
          <div className="mb-3">
            <label htmlFor="" className="form-label">
              Open At:
            </label>
            <input
              type="date"
              name=""
              id=""
              className="form-control"
              {...register("open", {
                onChange: handleChange,
                value: value.open,
              })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="" className="form-label">
              Close At:
            </label>
            <input
              type="date"
              name=""
              id=""
              className="form-control"
              {...register("close", {
                onChange: handleChange,
                value: value.close,
              })}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </form>

        {/* View */}
        <div className="col-7">
          <div>
            {user.map((element) => {
              return (
                <div className="card card_div my-4 px-4" key={element.id}>
                  <div className="card-body">
                    <h4 className="card-title">{element.data.name}</h4>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {element.data.area}
                    </h6>
                    <p className="card-text">{element.data.category}</p>
                    <p className="card-text">
                      Open At: {element.data.open.toString().slice(0, 25)}
                    </p>
                    <p className="card-text">
                      Close At: {element.data.close.toString().slice(0, 25)}
                    </p>
                    <a href="#!" className="card-link">
                      Store link
                    </a>
                    <a
                      href="#!"
                      className="card-link"
                      onClick={() =>
                        dispatch(DeleteToDo(element.id), setValue({}))
                      }
                    >
                      Remove Store
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
