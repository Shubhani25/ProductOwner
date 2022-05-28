import React, { Component } from 'react';
import OwnerService from '../services/OwnerService';

class CreateOwner extends Component {
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
        this.saveOrUpdateOwner = this.saveOrUpdateOwner.bind(this)
    }

    componentDidMount(){

        if(this.state.OwnerId=== '_add'){
            return
        }
        else{
            OwnerService.getOwnerById(this.state.OwnerId).this( (res) =>{
                let owner = res.data;
                this.setState({
                    OwnerName: owner.OwnerName,
                    ProductId: owner.ProductId,
                    ProductName: owner.ProductName
                });
            });
        }
    }

    saveOrUpdateOwner = (e)=>{
        e.preventDefault();

        let owner = {ownerName: this.state.OwnerName, productId: this.state.ProductId, productName: this.state.ProductName};
        console.log('owner => '+ JSON.stringify(owner));

        if(this.state.OwnerId=== '_add'){
            OwnerService.createOwner(owner).then(res=>{
                this.props.history.push('/owner');
            });
        }
        else{
            OwnerService.updateOwner(owner, this.state.OwnerId).then(res=>{
                this.props.history.push("/owner");
            });
        }

        
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
        this.props.history.push('/owner');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className='text-center'>Add Owner</h3>
        }
        else{
            return <h3 className='text-center'>Update Owner</h3>
        }
    }


    render() {
        return (
            <div>
                <div className='container'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3'>
                            <h3 className='text-center'>Add Owner</h3>
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

                                    <button className='btn btn-success' onClick={this.saveOrUpdateOwner}>Save</button>
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

export default CreateOwner;