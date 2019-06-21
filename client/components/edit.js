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
      author: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    axios
      .get(`http://localhost:3333/api/articles/${this.props.match.params.id}`)
      .then(article => {
        this.setState({
          title: article.data.title,
          short_description: article.data.short_description,
          long_description: article.data.long_description,
          authors: article.data.authors
        });
      });
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const data = {
      id: this.props.match.params.id,
      title: this.state.title,
      short_description: this.state.short_description,
      long_description: this.state.long_description,
      authors: this.state.authors
    };
    axios.post("http://localhost:3333/api/articles/", data).then(article => {
      alert("Article Successfully Updated!");
      this.props.history.push(`/post/${this.props.match.params.id}`);
    });
  }

  render() {
    return (
      <div className="m-8">
        <h1>Update an existing article</h1>
        <form onSubmit={this.onSubmit}>
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
              value={this.state.title}
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
              value={this.state.short_description}
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
              value={this.state.long_description}
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
              name="authors"
              onChange={this.onChange}
              value={this.state.authors}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
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
              to={`/post/${this.props.match.params.id}`}
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
