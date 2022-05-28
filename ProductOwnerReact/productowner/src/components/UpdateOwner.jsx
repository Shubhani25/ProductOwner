import React, { Component } from 'react';
import OwnerService from '../services/OwnerService';

class UpdateOwner extends Component {
    constructor(props){
        super(props)

        this.state = {
            OwnerId: this.props.match.params.id,
            OwnerName: '',
            ProductId : '',
            ProductName: ''
        }

        this.changeOwnerNameHandler = this.changeOwnerNameHandler.bind(this);
        this.changeProductIdHandler = this.changeProductIdHandler.bind(this);
        /*this.changeProductNameHandler = this.changeProductNameHandler.bind(this);*/
        this.updateOwner = this.updateOwner.bind(this)
    }

    componentDidMount(){
        OwnerService.getOwnerById(this.state.OwnerId).this( (res) =>{
            let owner = res.data;
            this.setState({
                OwnerName: owner.OwnerName,
                ProductId: owner.ProductId,
                ProductName: owner.ProductName
            });
        } );
    }

    updateOwner = (e)=>{
        e.preventDefault();

        let owner = {ownerName: this.state.OwnerName, productId: this.state.ProductId, productName: this.state.ProductName};
        console.log('owner => '+ JSON.stringify(owner));

        OwnerService.updateOwner(owner, this.state.OwnerId).then(res=>{
            this.props.history.push("/owners");
        });
    }
    changeOwnerNameHandler=(event)=>{
        this.setState({ownerName: event.target.value});
    }

    changeProductIdHandler=(event)=>{
        this.setState({productId: event.target.value});
    }

    changeProductNameHandler=(event)=>{
        this.setState({productName: event.target.value});
    }

    cancel(){
        this.props.history.push('/owners');
    }

    render() {
        return (
            <div>
                <div className='container'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3'>
                            <h3 className='text-center'>Update Owner</h3>
                            <div className='card-body'>
                                <form>
                                    <div className='form-group'>
                                        <label>Owner name: </label>
                                        <input placeholder='owner_name' name='ownerName' className='form-control'
                                            value={this.state.OwnerName} onChange = {this.changeOwnerNameHandler}/>
                                    </div> 
                                    <div className='form-group'>
                                        <label>Product Id: </label>
                                        <input placeholder='product_id' name='productId' className='form-control'
                                            value={this.state.ProductId} onChange = {this.changeProductIdHandler}/>
                                    </div> 
                                    <div className='form-group'>
                                        <label>Product name: </label>
                                        <input placeholder='product_name' name='productName' className='form-control'
                                            value={this.state.ProductName} onChange = {this.changeProductNameHandler}/>
                                    </div> 

                                    <button className='btn btn-success' onClick={this.updateOwner}>Save</button>
                                    <button className='btn btn-danger' onClick={this.changeProductIdHandler.bind(this)} style={{marginLeft: '10px'}}>Cancel</button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UpdateOwner;