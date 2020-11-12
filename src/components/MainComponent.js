import Menu from './MenuComponents';
import Dishdetail from './DishdetailComponent';
import {DISHES} from '../shared/dishes'
import { Component } from 'react';
import Header from './HeaderCompeonent';
import Footer from './FooterComponent';
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
  
    return (
    <div>
      <Header />
      <Menu  dishes = { this.state.dishes}  onClick={(dishId) => this.onDishSelect(dishId)} />

      <Dishdetail dish = { this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0] } />
      <Footer />
    </div>
  );
  }

}

export default Main;
