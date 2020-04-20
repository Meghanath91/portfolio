import React, { Component } from "react";
import axios from "axios";

class Contact extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contactName: "",
      contactEmail: "",
      contactSubject:"",
      contactMessage: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleClick(event) {
    alert("Email was submitted: Meghanath" );
  }

  handleSubmit(event) {
    event.preventDefault();

    axios
      .post("http://localhost:5000/api/contact", {
        fullName: this.state.contactName,
        Email: this.state.contactEmail,
        Subject:this.state.contactSubject,
        Message: this.state.contactMessage,
      })
      .then((res) => {
        this.setState({
          contactName:"",
          contactEmail: "",
          contactSubject:"",
          contactMessage: "", 
          });
        console.log("respose", res.data);
      });
  }

  render() {
    if (this.props.data) {
      var name = this.props.data.name;
      var street = this.props.data.address.street;
      var city = this.props.data.address.city;
      var state = this.props.data.address.state;
      var zip = this.props.data.address.zip;
      var phone = this.props.data.phone;
      var email = this.props.data.email;
      var message = this.props.data.contactmessage;
    }
    return (
      <section id="contact">
      <div className="row section-head">
        <div className="two columns header-col">
          <h1>
            <span>Get In Touch.</span>
          </h1>
        </div>

        <div className="ten columns">
          <p className="lead">{message}</p>
        </div>
      </div>

      <div className="row">
        <div className="eight columns">
          <form
            id="contactForm"
            name="contactForm"
            onSubmit={this.handleSubmit}
          >
            <fieldset>
              <div>
                <label htmlFor="contactName">
                  Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  defaultValue=""
                  size="35"
                  id="contactName"
                  name="contactName"
                  value={this.state.contactName}
                  onChange={this.handleChange}
                />
              </div>

              <div>
                <label htmlFor="contactEmail">
                  Email <span className="required">*</span>
                </label>
                <input
                  type="text"
                  defaultValue=""
                  size="35"
                  id="contactEmail"
                  name="contactEmail"
                  value={this.state.contactEmail}
                    onChange={this.handleChange}
                />
              </div>

              <div>
                <label htmlFor="contactSubject">Subject</label>
                <input
                  type="text"
                  defaultValue=""
                  size="35"
                  id="contactSubject"
                  name="contactSubject"
                  value={this.state.contactSubject}
                    onChange={this.handleChange}
                />
              </div>

              <div>
                <label htmlFor="contactMessage">
                  Message <span className="required">*</span>
                </label>
                <textarea
                  cols="50"
                  rows="15"
                  id="contactMessage"
                  value={this.state.contactMessage}
                  onChange={this.handleChange}
                  name="contactMessage"
                ></textarea>
              </div>

            
              {/* <input id="submit" type="submit" value="Submit" /> */}
              {/* <div>
                <button className="submit">Submit</button>
                <span id="image-loader">
                  <img alt="" src="images/loader.gif" />
                </span> */}

               
                <button
                id="button"
                onClick={this.handleClick}
                className="form-button"
                type="submit"
              >
                Send Message
              </button>
             

            </fieldset>
          </form>

          <div id="message-warning"> Error boy</div>
          <div id="message-success">
            <i className="fa fa-check"></i>Your message was sent, thank you!
            <br />
          </div>
        </div>

        <aside className="four columns footer-widgets">
          <div className="widget widget_contact">
            <h4>Address and Phone</h4>
            <p className="address">
              {name}
              <br />
              {street} <br />
              {city}, {state} {zip}
              <br />
              <span>{phone}</span> <br />
              <span>{email}</span>
            </p>
          </div>
        </aside>
      </div>
    </section>
    );
  }
}
export default Contact;
