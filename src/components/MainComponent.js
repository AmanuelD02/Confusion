import Menu from './MenuComponents';
import Dishdetail from './DishdetailComponent';
import {DISHES} from '../shared/dishes'
import { Component } from 'react';
import Header from './HeaderCompeonent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import  {Switch, Route, Redirect} from 'react-router-dom';
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes :DISHES,
      selectedDish: null
    };
  }

  onDishSelect(DishId) {
      this.setState({selectedDish: DishId})
  }

  render(){
    
    const HomePage = () =>{
      return (
        <Home />
      );
    }
  
    return (
      <Switch>
        <Route path='/Home' component={HomePage}/>
        <Route exact path='/menu' component={() =><Menu dishes={this.state.dishes}}/>
        <Redirect to="/Home"/>
      </Switch>
  );
  }

}

export default Main;
