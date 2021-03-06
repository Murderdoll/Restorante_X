import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Col, Label  } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import {Loading} from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

//My
const minLength = (len) => (val) => (val) && (val.length >= len);
const maxLength = (len) => (val) => !(val) || (val.length <= len);

class CommentsForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isModalOpen: false,
		};
		this.toggleModal = this.toggleModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

	render() {
		return(
			<React.Fragment>
			<Button outline onClick={this.toggleModal}>
            	<span className="fa fa-pencil fa-lg"></span> Submit Comment
            </Button>
            <Modal isOpen ={this.state.isModalOpen} toggle={this.toggleModal}>
            	<ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            	<ModalBody>
					<LocalForm onSubmit={(values) => this.handleSubmit(values)}>
						<Row className="form-group">
		            		<Col md={12}>
		            			<Label htmlFor="rating">Rating</Label>
		            		</Col>
		            		<Col md={12}>
		            			<Control.select class="form-control" model=".rating" id="rating" name="rating">
		            				<option value="1" selected>1</option>
		            				<option value="2">2</option>
		            				<option value="3">3</option>
	                            </Control.select>
		            		</Col>
		            	</Row>
		            	<Row className="form-group">
		            		<Col md={12}>
		            			<Label htmlFor="author">Your Name</Label>
		            		</Col>
		            		<Col md={12}>
		            			<Control.text model=".author" id="author" name="author"
	                                placeholder="Your Name"
	                                className="form-control"
	                                validators={{
									minLength: minLength(3), maxLength: maxLength(15)
                                    }}
	                            />
	                            <Errors
                                    className="text-danger"
                                    model=".yourname"
                                    show="touched"
                                    messages={{
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }} 
                                />
		            		</Col>
		            	</Row>
		            	<Row className="form-group">
		            		<Col md={12}>
		            			<Label htmlFor="comment">Comment</Label>
		            		</Col>
		            		<Col md={12}>
		            			<Control.textarea rows="6" model=".comment" id="comment" name="comment" className="form-control"
	                            />
		            		</Col>
		            	</Row>
		            	<Button type="submit" color="primary">
                        	Submit
                        </Button>
		            </LocalForm>
            	</ModalBody>    	
            </Modal>
                </React.Fragment>
		);
	}
}

  function RenderDish({dish}) {
		if (dish != null) {
			return(
				<div key={dish.id} className="col-12 col-md-5 m-1">
					<Card>
						<CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
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

	function RenderComments({comments, addComment, dishId}) {

		if(comments != null) {
			const com = comments.map((Actdish) =>{
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
					<CommentsForm dishId={dishId} addComment={addComment}/>
				</div>
			);
		}
		else {
			return(
				<div></div>
			);
		}
	}

  const DishDetail =(props) => {
	if (props.isLoading) {
		return(
			<div className="container">
				<div className="row">
					<Loading />
				</div>
			</div>
		);
	}
	else if (props.errMess) {
		return(
			<div className="container">
				<div className="row">
					<h4>{props.errMess}</h4>
				</div>
			</div>
		);
	}
	else if (props.dish != null)
		return (
			<div className="container">
				<div className="row">
					<Breadcrumb>
						<BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
						<BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
						<BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
					</Breadcrumb>
					<div className="col-12">
						<h3>{props.dish.name}</h3>
						<hr />
					</div>
				</div>
				<div className="row">
					<RenderDish dish={props.dish} />
					<RenderComments comments={props.comments} 
						addComment={props.addComment}
						dishId={props.dish.id}
					/>
				</div>
			</div>
		);
	else
		return(
			<div></div>
		);
  }


export default DishDetail;