import React, { Component} from 'react'
import { Card , CardImg, CardBody, CardTitle, CardText, Breadcrumb, BreadcrumbItem,
             Button, Modal, ModalBody, ModalHeader, Label, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import {LocalForm, Control, Errors, Form } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl'

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <=len);
const minLength = (len) => (val) => val && (val.length >=len);

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CommentTogggle:false
        }
        this.commentToggle = this.commentToggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    commentToggle() {
        this.setState({ CommentTogggle:!this.state.CommentTogggle });
        console.log('Comment Toggle: ' + this.state.CommentTogggle);
    }
    
    handleSubmit(values) {
        this.commentToggle();
        this.props.addComment(this.props.dishId, values.rating, values.name, values.message)
        
    }

    render() {
   
            return(   
                <div className='container'>
                <Button onClick={this.commentToggle} className="btn-outline-secondary"><span className="fa fa-pencil"> Submit Comment</span></Button>
                <Modal isOpen={this.state.CommentTogggle} toggle={this.commentToggle}>
                    <ModalHeader toggle={this.commentToggle}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className='form-group'>
                                <Col md={12}><label htmlFor='rating'>Rating</label></Col>
                                <Col>
                                <Control.select model='.rating' id='rating' name='rating' className='form-control browser-default custom-select'>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Col md={12}>
                                <label htmlFor='name'>Your Name</label>
                                </Col>
                                <Col>
                                <Control.text model='.name' id='name' name='name' className='form-control' 
                                    placeholder='Your Name'
                                    validators={{
                                        required,
                                        minLength:minLength(3),
                                        maxLength:maxLength(15)
                                    }}
                                        />
                                <Errors
                                    className='text-danger'
                                    model='.name'
                                    show='touched'
                                    messages={{
                                            required: 'Required!  ',
                                            minLength: 'Must be greater than 2 characters!  ',
                                            maxLength: 'Must be 15 characters or less!  '                                  
                                    }} />
                                </Col>
                        
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="message" md={12}>Your Feedback</Label>
                                <Col >
                                    <Control.textarea model=".message" id="message" name="message"
                                        rows="6"
                                        className="form-control z-depth-1"
                                        validators={{required}} />
                                        <Errors 
                                            className="text-danger"
                                            model=".message"
                                            show="touched"
                                            messages={{
                                                required:"Message is required!"
                                            }}/>

                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Col>
                                <Button tyoe='submit' color='primary'>
                                    Submit
                                </Button>
                                </Col>        
                            </Row>
                        </Form>
                    </ModalBody>
                </Modal>
                </div>

            );
        }

}



function RenderComments({comments,addComment,dishId}) {

    if (comments !=null) {
        const com = comments.map((comment) =>{

            return(
                <div>   
                    <ul className="list-unstyled">

                        <li>-- {comment.comment}</li>

            <li>{comment.author},     {new Intl.DateTimeFormat( 'en-us', 
                                {year:'numeric', month:'short', day:'2-digit'}).format(new Date(comment.date))}</li>
                    </ul>
                </div>
            )
        });
        return (
            
        <div className="col-12 col-md-5 m-1">
            <h4>Comments</h4>
               {com}
       
            <CommentForm dishId={dishId} addComment={addComment} />
        </div>
        

        );

    } else {
        return (
            <div></div>
        );
    }
}


function RenderDish({dish}) {
    if(dish){
    return (
  
        <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg top src = {baseUrl + dish.image} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText> {dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
        
    );
    } else {
        return(<div></div>);
    }

}

const DishDetail =  (props) => {
    if (props.dish!=null) {
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                     <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
             
                    
                </div>
                <div className="row">
                   
                        <RenderDish dish={props.dish} />
                    
                        <div className='col'>       
                        <RenderComments comments={props.comments} addComment={props.addComment} dishId={props.dish.id}   />
                        
                        </div>
                   
                </div>
            </div>
            

        )

    } else {
        return(
            <div></div>
        );
    }



    }





export default DishDetail;