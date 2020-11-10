import React, { Component } from 'react'
import { Card , CardImg, CardBody, CardTitle, CardText } from 'reactstrap';




const monthNames = [
      "Jan","Feb","Mar","Apr",
      "May","Jun","Jul","Aug",
      "Sep","Oct","Nov","Dec",
    ]

class DishdetailComponent extends Component {
    constructor(props) {
        super(props);
        this.state = null;
    }

    renderComments(comments) {
        if (comments !=null) {
            
            return comments.map((comment) =>{
                let date = new Date(comment.date);
                return(
                    <div>   
                        <ul className="list-unstyled">
                            <li>-- {comment.comment}</li>
                <li>{comment.author},     {monthNames[date.getMonth()]}, {date.getDate()}, {date.getFullYear()}</li>
                            </ul>
                    </div>
                )
            });
        } else {
            return (
                <div></div>
            );
        }

    }

    renderDish(dish) {
        if (dish != null) {
            return (
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg top src = {dish.image} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText> {dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>

                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    {this.renderComments(dish.comments)}
             </div>
            </div>
            );

        } else {
            return (
                <div></div>
            );
        }
    }

    render() {
        const dish = this.props.dish;
        return(this.renderDish(dish));
        
    }



}

export default DishdetailComponent;