import { Component } from "react";
import "isomorphic-fetch";
export default class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromEmail: "",
      toEmail: "",
      subject: "",
      content: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = async e => {
    let newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  };
  async handleSubmit(e) {
    e.preventDefault();

    let formData = {
      fromEmail: this.state.fromEmail,
      toEmail: this.state.toEmail,
      subject: this.state.subject,
      content: this.state.content
    };
    const res = await fetch(
      `https://json-body-parsing-dlesgxoluu.now.sh/?fromEmail=${encodeURIComponent(formData.fromEmail)}&toEmail=${encodeURIComponent(formData.toEmail)}&subject=${encodeURIComponent(formData.subject)}&content=${encodeURIComponent(formData.content)}`
    );
    const json = await res.json();
    if (json.statusCode === 200) {
      alert("enviado")
    }else if(json.statusCode >= 300) {
      alert("Error intente nuevamente")
    }
    await this.setState({
      fromEmail: "",
      toEmail: "",
      subject: "",
      content: ""
    });
  }
  render() {
    return (
      <div>
        <form method="post" onSubmit={this.handleSubmit}>
          <h4>Login</h4>
          <p>
            To:
            {" "}
            <input
              type="email"
              name="toEmail"
              onChange={this.handleChange}
              value={this.state.toEmail}
            />
            <br />
            From:
            {" "}
            <input
              type="email"
              name="fromEmail"
              onChange={this.handleChange}
              value={this.state.fromEmail}
            />
            <br />
            subject:
            {" "}
            <input
              type="text"
              name="subject"
              onChange={this.handleChange}
              value={this.state.subject}
            />
            <br />
            content:
            {" "}
            <textarea
              name="content"
              id=""
              cols="30"
              rows="10"
              onChange={this.handleChange}
              value={this.state.content}
            />
            <br />
          </p>
          <input type="submit" placeholder="Send Mail" />
        </form>
        <style jsx>{`
      p {
        line-height: 22px;
      }
    `}</style>
      </div>
    );
  }
}
