import axios from 'axios'

const OWNER_API_BASE_URL = "http://localhost:8090/api/v1/owner";

class OwnerService{

    getOwners(){
        return axios.get(OWNER_API_BASE_URL);
    }

    createOwner(owner){
        return axios.post(OWNER_API_BASE_URL, owner);
    }

    getOwnerById(ownerId){
        return axios.get(OWNER_API_BASE_URL+'/'+ownerId);
    }

    updateOwner(owner, ownerId){
        return axios.put(OWNER_API_BASE_URL+'/'+ownerId, owner);
    }

    deleteOwner(ownerId){
        return axios.delete(OWNER_API_BASE_URL+'/'+ownerId);
    }


}

export default OwnerService;