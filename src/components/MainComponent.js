import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponents';
import Dishdetail from './DishdetailComponent';
import {DISHES} from '../shared/dishes'
import { Component } from 'react';

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
      <Navbar dark color="primary">
        <div className="container">
          <NavbarBrand> Cafe Aman</NavbarBrand>
        </div>
      </Navbar>
      <Menu  dishes = { this.state.dishes}  onClick={(dishId) => this.onDishSelect(dishId)} />

      <Dishdetail dish = { this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0] } />
    </div>
  );
  }

}

export default Main;
