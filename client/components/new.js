import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

class New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      short_description: "",
      long_description: "",
      authors: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const data = {
      title: this.state.title,
      short_description: this.state.short_description,
      long_description: this.state.long_description,
      authors: this.state.authors
    };
    axios.post("http://localhost:3333/api/articles/", data).then(article => {
      alert("Article Successfully Created!");
      document.getElementById("new").reset();
      this.props.history.push("/");
    });
  }

  render() {
    return (
      <div className="m-8">
        <h1>Create a new article</h1>
        <form onSubmit={this.onSubmit} id="new">
          <div className="m-8">
            <label
              htmlFor="title"
              className="block text-grey-darker text-sm font-bold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              onChange={this.onChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="m-8">
            <label
              htmlFor="short_description"
              className="block text-grey-darker text-sm font-bold mb-2"
            >
              Short Description
            </label>
            <input
            type="text"
            name="short_description"
              onChange={this.onChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="m-8">
            <label
              htmlFor="long_description"
              className="block text-grey-darker text-sm font-bold mb-2"
            >
              Content
            </label>
            <textarea
              onChange={this.onChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
              name="long_description"
            />
          </div>
          <div className="m-8">
            <label
              htmlFor="authors"
              className="block text-grey-darker text-sm font-bold mb-2"
            >
              Authors
            </label>
            <input
            type="text"
              onChange={this.onChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
              name="authors"
            />
          </div>

          <div className="flex justify-center">
            <input
              className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
              type="submit"
              value="Save"
            />
            <Link
              className="bg-red hover:bg-red-dark text-white font-bold py-2 px-4 rounded"
              to="/"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
export default withRouter(New);
