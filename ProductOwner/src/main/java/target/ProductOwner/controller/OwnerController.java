package target.ProductOwner.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import target.ProductOwner.exception.ResourceNotFoundException;
import target.ProductOwner.model.Owner;
import target.ProductOwner.repository.OwnerRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class OwnerController {

    @Autowired
    private OwnerRepository ownerRepository;

    //get all owners
    @GetMapping("/owner")
    public List<Owner> getAllOwners(){
        return ownerRepository.findAll();
    }

    //create owner
    @PostMapping("/owner")
    public Owner createOwner(@RequestBody Owner owner){
        return ownerRepository.save(owner);
    }

    //get owner by id
    @GetMapping("/owner/{id}")
    public ResponseEntity<Owner> getOwnerById(@PathVariable Long id){
        Owner owner = ownerRepository.findById(id).
                orElseThrow(()-> new ResourceNotFoundException("Owner does not exist with id: "+id));

        return ResponseEntity.ok(owner);
    }

    //update owner
    @PutMapping("/owner/{id}")
    public ResponseEntity<Owner> updateOwner(@PathVariable Long id, @RequestBody Owner ownerDetails){
        Owner owner = ownerRepository.findById(id).orElseThrow(
                ()-> new ResourceNotFoundException("Owner does not exist with id: "+ id)
        );

        owner.setOwnerName(ownerDetails.getOwnerName());
        owner.setProductId(ownerDetails.getProductId());
        owner.setProductName(ownerDetails.getProductName());

        Owner updatedOwner = ownerRepository.save(owner);
        return ResponseEntity.ok(updatedOwner);
    }

    //delete owner by id
    @DeleteMapping("/owner/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteOwner(@PathVariable Long id){
        Owner owner = ownerRepository.findById(id).orElseThrow(
                ()-> new ResourceNotFoundException("Owner does not exist with id: "+ id)
        );
        ownerRepository.delete(owner);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }


}
