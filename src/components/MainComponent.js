import Menu from './MenuComponents';
import DishDetail from './DishdetailComponent';
import { Component } from 'react';
import Header from './HeaderCompeonent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import  { Switch, Route, Redirect, withRouter} from 'react-router-dom';
import About from './AboutComponent';
import { connect } from 'react-redux';
import { addComment, fetchComments, fetchDishes, fetchPromos }  from '../redux/ActionCreators';
import { Loading } from './LoadingComponent';
import { actions } from 'react-redux-form';



const mapDispatchToProps = (dispatch) => ({
  
    addComment: function(dishId, rating, author, comment) {
      dispatch(addComment(dishId, rating, author, comment));
    },
    fetchDishes: () =>{ dispatch(fetchDishes())},
    resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
    fetchComments: () => {dispatch(fetchComments())},
    fetchPromos: () => {dispatch(fetchPromos())}
  
});

const mapStateToProps = state => {
  return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
  }
}

class Main extends Component {
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
  }

  render(){
    
    const HomePage = () =>{
      return (
        <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]} 
              promotion={this.props.promotions.promotions.filter((promotion) => promotion.featured)[0]}
              promoLoading={this.props.promotions.isLoading}
              promoErrMess={this.props.promotions.errMess} 
              leader={this.props.leaders.filter((leaders) => leaders.featured)[0]} 
              dishesLoading= { this.props.dishes.isLoading }
              dishesErrMess = { this.props.dishes.errMess }
               />
      );
    } 

    const DishWithId = ({match}) =>{
    return(
      <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
            addComment={this.props.addComment}
            commentsErrMess={this.props.comments.errMess}
            isLoading= { this.props.dishes.isLoading }
            errMess = { this.props.dishes.errMess }
    
             />
    )

  }
  if(this.props.dishes.isLoading) {
      return(
          <div className="container">
              <div className="row">            
                  <Loading />
              </div>
          </div>
      );
  } else if (this.props.dishes.errMess) {
      return(
          <div className="container">
              <div className="row"> 
                  <div className="col-12">
                      <h4>{this.props.dishes.errMess}</h4>
                  </div>
              </div>
          </div>
      );
  }
  else
      return (
        <div>
        <Header />
        <Switch>
          <Route path='/home' component={HomePage}/>
          <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
          <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} /> } />
          <Route path='/menu/:dishId' component={DishWithId} />
          <Route path='/aboutus' component={() => <About leaders={this.props.leaders} /> } />
          <Redirect to="/home"  />
        </Switch>
        <Footer />
        </div>
    );
  }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
