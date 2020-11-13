import Menu from './MenuComponents';
import Dishdetail from './DishdetailComponent';
import { Component } from 'react';
import Header from './HeaderCompeonent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import  { Switch, Route, Redirect} from 'react-router-dom';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
    };
  }

  onDishSelect(DishId) {
      this.setState({selectedDish: DishId})
  }

  render(){
    
    const HomePage = () =>{
      return (
        <Home dish={this.state.dishes.filter((dish) => dish.featured)[0]} 
              promotion={this.state.promotions.filter((promotion) => promotion.featured)[0]} 
              leader={this.state.leaders.filter((leaders) => leaders.featured)[0]} />
      );
    }
    
    return (
      <div>
      <Header />
      <Switch>
        <Route path='/home' component={HomePage}/>
        <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
        <Route exact path='/contactus' component={Contact} />
        <Redirect to="/home" />
      </Switch>
      <Footer />
      </div>
  );
  }

}

export default Main;
