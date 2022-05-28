import React, { Component } from 'react';
import OwnerService from '../services/OwnerService';

class ListOwner extends Component {
    constructor(props){
        super(props)

        this.state={
            owners: []
        }

        this.addOwner = this.addOwner.bind(this);
        this.editOwner = this.editOwner.bind(this);
        this.deleteOwner = this.deleteOwner.bind(this);
    }
    

    deleteOwner(id){
        OwnerService.deleteOwner(id).then(res => {
             this.setState({owners: this.state.owners.filter(owner => owner.id !==id)})
        });
    }


    editOwner(id){
        this.props.history.push(`/add-owner/${id}`);
    }

    componentDidMount(){
        OwnerService.getOwners().then((res)=>{
            this.setState({owners: res.data});
        });
    }

    addOwner(){
        this.props.history.push('/addOwner/_add');
    }

    render() {
        return (
            <div>
                <h2 className='text-center'>Owners List</h2>
                <div className='row'>
                    <button className='btn btn-primary' onClick={this.addOwner}>Add Owner</button>

                </div>
                <div className='row'>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                            <th>Owner Id</th> 
                            <th>Owner Name</th>
                            <th>Product Id</th>
                            <th>Product Name</th>
                            <th>Actions</th>
                            </tr>   
                        </thead>
                        <tbody>
                            {                                                                                                                                                                                                                                                                                                                                                              
                                this.state.owners.map(
                                    owner => 
                                    <tr key={owner.ownerId}>
                                        <td>{owner.ownerId}</td>
                                        <td>{owner.ownerName}</td>
                                        <td>{owner.productId}</td>
                                        <td>{owner.productName}</td>
                                        <td>
                                            <button onClick={() => this.editOwner(owner.id) }className='btn btn-info'>Update</button>
                                        </td>
                                        <td>
                                            <button style={{marginLeft: "10px"}} onClick={() => this.deleteOwner(owner.id) }className='btn btn-danger'>Delete</button>
                                        </td>

                                        
                                    </tr>
                                )
                            }


                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListOwner;