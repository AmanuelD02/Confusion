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
import { addComment, fetchDishes }  from '../redux/ActionCreators';
import { Loading } from './LoadingComponent';


const mapDispatchToProps = (dispatch) => ({
  
    addComment: function(dishId, rating, author, comment) {
      dispatch(addComment(dishId, rating, author, comment));
    },
    fetchDishes: () =>{ dispatch(fetchDishes())}
    
  
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
  }

  render(){
    
    const HomePage = () =>{
      return (
        <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]} 
              promotion={this.props.promotions.filter((promotion) => promotion.featured)[0]} 
              leader={this.props.leaders.filter((leaders) => leaders.featured)[0]} 
              dishesLoading= { this.props.dishes.isLoading }
              dishesErrMess = { this.props.dishes.errMess } />
      );
    } 

    const DishWithId = ({match}) =>{
    return(
      <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
            addComment={this.props.addComment }
            isLoading= { this.props.dishes.isLoading }
            ErrMess = { this.props.dishes.errMess }
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
          <Route exact path='/contactus' component={Contact} />
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
