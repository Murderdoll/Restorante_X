import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
//My
class DishDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderDish(dish) {
		if (dish != null) {
			return(
				<div key={dish.id} className="col-12 col-md-5 m-1">
					<Card>
						<CardImg width="100%" src={dish.image} alt={dish.name} />
						<CardBody>
							<CardTitle>{dish.name}</CardTitle>
							<CardText>{dish.description}</CardText>
						</CardBody>
					</Card>
				</div>
			);
		}
		else {
			return(
				<div></div>
			);
		}
	}

	renderComments(dish) {

		if(dish != null && dish.comments != null) {
			const com = dish.comments.map((Actdish) =>{
			return(				
		            <ul className="list-unstyled">
		              	<li className="list-item">{Actdish.comment}</li>
		              	<br/>
		               	<li className="list-item">-- {Actdish.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(Actdish.date)))}</li>
		             </ul>	
			);
			});
			return(
				<div className="col-12 col-md-5 m-1">
					<h4>Comments</h4>
					{com}
				</div>
			);
		}
		else {
			return(
				<div></div>
			);
		}
	}

  render() {
    return (
    	<div className="container">
	    	<div className="row">
	      		{this.renderDish(this.props.dish)}
	      		{this.renderComments(this.props.dish)}
	      	</div>
	    </div>
    );
  }
}

export default DishDetail;