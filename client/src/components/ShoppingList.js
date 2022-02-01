import React, {Component} from 'react';
import {
    Collapse,
    ListGroup,
    ListGroupItem,
    Button,
    Container,
  } from 'reactstrap'; 
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import { nanoid } from 'nanoid';
import {connect} from 'react-redux'
import {deleteItem, getItems} from '../actions/itemAction'
import PropTypes from 'prop-types'

class ShoppingList extends Component {

    componentDidMount() { 
        this.props.getItems()
    }

    onDeleteClick=id=>{
        this.props.deleteItem(id)
    }
   
    render() {
       
        const {items} = this.props.item
        return(
            <Container>
               
                <ListGroup>
                    <TransitionGroup className="shopping-list" >
                        {items.map(({_id, name})=> (
                            <CSSTransition key={_id} in={true}>
                                 <ListGroupItem >
                                     <Button
                                     className='remove-btn'
                                     
                                     color='danger'
                                     size='sm'
                                     onClick={this.onDeleteClick.bind(this, _id)}
                                     >
                                         &times;
                                     </Button>
                                     {name}
                                 </ListGroupItem>
                                 </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        )
    }
}

ShoppingList.propTypes = { 
    getItems: PropTypes.func.isRequired,
  
    items: PropTypes.object.isRequired
}

const mapStateToProps = (state) =>({
    item: state.item
})
export default connect(mapStateToProps, {getItems,deleteItem}) (ShoppingList)

