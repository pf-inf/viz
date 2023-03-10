/*!
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React, { Component } from "react";

export class Card extends Component {
  getFooter(){
    if(this.props.legend == null && this.props.stats == null){
      return '';
    } else {
      return(
        <div className="footer">
                  {this.props.legend}
                  {this.props.stats != null || this.props.slider != null ? <hr /> : ""}
                  <div className="stats">
                    <i className={this.props.statsIcon} /> {this.props.stats}
                  </div>
                  <div className="stats" style={{display:'block', marginTop:'-20px', height:'40px'}}>
                    {this.props.slider}
                  </div>
                </div>
      );
    }
  }
  getHeader(){
    if(this.props.title == null && this.props.category == null){
      return '';
    } else {
      return( 
        <div className={"header" + (this.props.hCenter ? " text-center" : "")}>
          <h4 className="title">{this.props.title}</h4>
          <p className="category">{this.props.category}</p>
        </div>
      );
    }
  }

  render() {
    return (
      <div className={"card" + (this.props.plain ? " card-plain" : "")} style={this.props.style}>
        {this.getHeader()}
        <div
          className={
            "content" +
            (this.props.ctAllIcons ? " all-icons" : "") +
            (this.props.ctTableFullWidth ? " table-full-width" : "") +
            (this.props.ctTableResponsive ? " table-responsive" : "") +
            (this.props.ctTableUpgrade ? " table-upgrade" : "")
          }
        >
          {this.props.content}
          {this.getFooter()}
          
        </div>
      </div>
    );
  }
}

export default Card;
