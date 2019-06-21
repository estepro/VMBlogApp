import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
  }

  componentDidMount() {
    axios.get("http://localhost:3333/api/articles").then(articles => {
      this.setState({
        articles: articles.data
      });
    });
  }

  

  render() {
    return (
      <div className="m-8">
        <ul className="index">
          {this.state.articles.map(article => (
            <li key={article.title}>
              <h2>
                <Link to={`/post/${article._id}`}>{article.title}</Link>
              </h2>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Index;
