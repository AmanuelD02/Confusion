import React from 'react'
import { Card , CardImg, CardBody, CardTitle, CardText } from 'reactstrap';


function RenderComments({comments}) {

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
        </div>
        );

    } else {
        return (
            <div></div>
        );
    }
}


function RenderDish({dish}) {
    return (
  
        <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg top src = {dish.image} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText> {dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
        
    );

}

const Dishdetail =  (props) => {
    if (props.dish!=null) {
        return(
            <div className="container">
                <div className="row">
                    <RenderDish dish = {props.dish} />
                    <RenderComments comments = {props.dish.comments} />
                </div>
            </div>
            

        )

    } else {
        return(
            <div></div>
        );
    }



    }



export default Dishdetail;