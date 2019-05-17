import React, { Component } from "react";
import axios from "../../axios";
import Report from "./Report";

class ReportPanel extends Component {
  state = {
    calculations: []
  };

  handleClick = async event => {
    try {
      let response = await axios.get(`/history?report=${event.target.name}`);
      this.setState({
        calculations: response.data.map(calculation => {
          calculation.date_added = this.formatDate(calculation.date_added);
          return calculation;
        })
      });
    } catch (error) {
      console.log(error);
    }
  };

  formatDate(date) {
    date = new Date(date);
    date = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    date = date.toLocaleString("en-SG", {
      timeZone: "Asia/Singapore",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });

    return date;
  }

  render() {
    return (
      <div className="reports">
        <h1>Report</h1>
        <div className="report-buttons">
          <button onClick={this.handleClick} className="report" name="daily">
            Daily
          </button>
          <button onClick={this.handleClick} className="report" name="weekly">
            Weekly
          </button>
          <button onClick={this.handleClick} className="report" name="monthly">
            Monthly
          </button>
        </div>

        <div className="calculations">
          {this.state.calculations.map(calculation => (
            <Report
              key={calculation.date_added + calculation.result}
              calculation={calculation}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default ReportPanel;
